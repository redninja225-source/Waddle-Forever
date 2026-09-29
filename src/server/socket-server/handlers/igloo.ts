import { World } from "@server/socket-server/world/world";
import { Igloo, IglooFurniture, PenguinJson, PenguinRepository } from "@server/database/database";
import { FURNITURE } from "@server/game-logic/furniture";
import { getFlooringCost, getIglooCost } from "@server/game-logic/iglooItems";
import { getStamp } from "./puffle";
import { PenguinHandler } from "./handlers";


export async function getIglooFromId(world: World, db: PenguinRepository, ownerId: number): Promise<Igloo | undefined> {
  return world.getById(ownerId)?.igloo.activeIgloo ??
    ((data: PenguinJson | null): Igloo | undefined => {
      if (data === null) {
        return undefined;
      }
      return data.igloos.find(igloo => igloo.id === data.igloo);
    })(await db.get(ownerId));
}

export function getFurnitureString(furniture: IglooFurniture): string {
  return furniture.map((furniture) => {
    return [
      furniture.id,
      furniture.x,
      furniture.y,
      furniture.rotation,
      furniture.frame
    ].join('|')
  }).join(',');
}

export const getIglooOld: PenguinHandler<[number]> = async (ctx, ownerId) => {
  const { world, db, msg, penguin } = ctx;
  const igloo = await getIglooFromId(world, db, ownerId);
  if (igloo === undefined) {
    return;
  }

  msg.send(penguin, 'gm', ownerId, igloo.type, igloo.music, igloo.flooring, getFurnitureString(igloo.furniture));
}

function getModernIglooString(igloo: Igloo, index: number): string {
  const likeCount = 0;
  return [
    igloo.id,
    index,
    0, // TODO don't know what this is
    igloo.locked ? 1 : 0,
    igloo.music,
    igloo.flooring,
    igloo.location,
    igloo.type,
    likeCount,
    getFurnitureString(igloo.furniture)
  ].join(':');
}

export const handleGetIglooCpip: PenguinHandler<[number]> = async ({ world, penguin, msg, data, db }, penguinId) => {
  const igloo = await getIglooFromId(world, db, penguinId);
  if (igloo === undefined) {
    return;
  }

  if (!data.isVanillaEngine()) {
    msg.send(penguin, 'gm', penguinId, igloo.type, igloo.music, igloo.flooring, getFurnitureString(igloo.furniture));
  } else {
    msg.send(penguin, 'gm', penguinId, getModernIglooString(igloo, 1));
  }
}

// the vanilla client sends the igloo owner ID as an argument, but it is unused
export const handleGetIglooItems: PenguinHandler<string[]> = ({ msg, penguin }) => {
  // No idea what these zeros are used for
  const zeros = '0000000000';
  const furnitureInfo = penguin.igloo.furniture.map((pair) => {
    const [id, amount] = pair;
    return `${id}|${zeros}|${amount}`;
  });
  
  const floorings = penguin.igloo.floorings;
  const igloos = penguin.igloo.types;
  const locations = penguin.igloo.locations;
  const information = [
    furnitureInfo,
    // this ... is for the other types which don't have "amount"
    ...[
      floorings,
      igloos,
      locations
    ].map((items) => {
      return items.map(item => `${item}|${zeros}`)
    })
  ].map((infoArray) => {
    return infoArray.join(',');
  })
  msg.send(penguin, 'gii', ...information);
}

export const handleAddFurniture: PenguinHandler<[number]> = (ctx, furnitureId) => {
  const { penguin, msg, prst } = ctx;
  const cost = FURNITURE.get(furnitureId)?.cost ?? 0;
  penguin.igloo.addFurniture(furnitureId, 1);
  msg.send(penguin, 'af', furnitureId, penguin.currency.discount(cost));
  prst(penguin);
};

// the "buy multiple furniture" action, sent when buying the maximum amount at once
// the arguments appear to be pairs of furnitureId, amount
export const handleBuyMultipleFurniture: PenguinHandler<string[]> = (ctx, ...args) => {
  const { penguin, msg, prst } = ctx;
  for (let i = 0; i < args.length; i += 2) {
    const id = Number(args[i]);
    const amount = args[i + 1] === undefined ? 1 : Math.max(1, Number(args[i + 1]));
    if (Number.isNaN(id)) {
      continue;
    }
    const cost = FURNITURE.get(id)?.cost ?? 0;
    const owned = penguin.igloo.getFurnitureAmount(id);
    const added = Math.max(Math.min(amount, 99 - owned), 0);
    if (added === 0) {
      continue;
    }
    penguin.igloo.addFurniture(id, added);
    msg.send(penguin, 'af', id, penguin.currency.discount(cost * added));
  }
  prst(penguin);
};

// sent when entering/exiting the igloo editing mode, only used to inform the server
export const handleSetIglooManagement: PenguinHandler<string[]> = () => {
};

export const handleRemoveIglooLayout: PenguinHandler<[number]> = ({ penguin, prst }, layoutId) => {
  penguin.igloo.removeIglooLayout(layoutId);
  prst(penguin);
};

// likes for each igloo layout, used by the igloo list UI
export const handleGetAllIglooLayoutLikes: PenguinHandler<string[]> = ({ msg, penguin }) => {
  // TODO like system, no likes exist so the list is empty
  msg.send(penguin, 'gaili', penguin.id, '');
};

export const handleAddIgloo: PenguinHandler<[number]> = (ctx, iglooId) => {
  const { penguin, msg, prst, data } = ctx;
  const cost = getIglooCost(iglooId);
  
  if (data.isAfterOwnedIgloos()) {
    penguin.igloo.addIglooType(iglooId);
  } else {
    // unknown if music was reset or not in the original
    penguin.igloo.updateIgloo({ type: iglooId, music: 0, flooring: 0, furniture: [] });
  }
  
  msg.send(penguin, 'au', iglooId, penguin.currency.discount(cost));
  prst(penguin);
}

export const handleUpdateIglooType: PenguinHandler<[number]> = ({ prst, penguin }, iglooType) => {
  // is it not required to remove flooring etc?
  penguin.igloo.updateIgloo({ type: iglooType });
  prst(penguin);
}

export const handleAddFlooring: PenguinHandler<[number]> = (ctx, flooring) => {
  const { msg, penguin, prst, data } = ctx;
  const cost = getFlooringCost(flooring);

  if (data.isVanillaEngine()) {
    // placeholder for when flooring inventory was added (before it was auto updated)
    penguin.igloo.addFlooring(flooring);
  } else {
    penguin.igloo.updateIgloo({ flooring });
  }

  msg.send(penguin, 'ag', flooring, penguin.currency.discount(cost));
  prst(penguin);
};

export function processFurniture(furnitureItems: string[]): IglooFurniture {
  return furnitureItems.map((furnitureString) => {
    const [furniture, x, y, rotation, frame] = furnitureString.split('|').map((str) => Number(str))
    return {
      id: furniture,
      x,
      y,
      rotation,
      frame
    }
  })
}

const addFullHouseStamp: PenguinHandler<[]> = (ctx) => {
  getStamp(ctx.data, ctx.msg, ctx.penguin, 23);
}

export const handleUpdateIgloo: PenguinHandler<string[]> = (ctx, ...furnitureItems) => {
  const { prst, penguin } = ctx;
  const igloo = processFurniture(furnitureItems);
  if (igloo.length === 99) {
    addFullHouseStamp(ctx);
  }

  penguin.igloo.updateIgloo({ furniture: igloo });
  prst(penguin);
}

// the client sends a %-joined serialized layout string:
// layoutId%type%flooring%location%music%furniture1,furniture2,...
export const handleUpdateIglooNew: PenguinHandler<string[]> = (ctx, ...args) => {
  const { prst, penguin } = ctx;
  const num = (i: number, fallback: number): number => {
    const v = Number(args[i]);
    return Number.isNaN(v) ? fallback : v;
  };
  const layoutId = num(0, 0);
  const type = num(1, 0);
  const flooring = num(2, 0);
  const location = num(3, 0);
  const music = num(4, 0);
  const furnitureData = args[5] ?? '';

  if (layoutId !== 0) {
    penguin.igloo.setActiveIgloo(layoutId);
  }
  const furniture = furnitureData === '' ? [] : processFurniture(furnitureData.split(','));
  if (furniture.length >= 99) {
    addFullHouseStamp(ctx);
  }

  penguin.igloo.updateIgloo({ type, music, flooring, location, furniture });
  prst(penguin);
}

export const handleUpdateIglooOld: PenguinHandler<string[]> = (ctx, type, ...rest) => {
  const { penguin, prst } = ctx;
  
  // music ID is placed at the start, though it may not be present
  const [furnitureItems, music] = rest[0].includes('|')
    ? [rest, 0]
    : [rest.slice(1), Number(rest[0])];
  
  const igloo = processFurniture(furnitureItems);
  penguin.igloo.updateIgloo({ furniture: igloo, type: Number(type), music });
  prst(penguin);
}

export const handleGetFurniture: PenguinHandler<[]> = (ctx) => {
  const { msg, penguin } = ctx;
  const furniture = penguin.igloo.getAllFurniture().flatMap(([id, amount]) => new Array(amount).fill(id));
  msg.send(penguin, 'gf', ...furniture);
}

export const handleGetFurnitureNew: PenguinHandler<[]> = ({ msg, penguin }) => {
  msg.send(penguin, 'gf', ...penguin.igloo.getAllFurniture().map(pair => pair.join('|')));
}

export const handleOpenIgloo: PenguinHandler<(string | number)[]> = (ctx) => {
  const { world, penguin } = ctx;

  world.openIgloo(penguin);
}

export const handleCloseIgloo: PenguinHandler<(string | number)[]> = (ctx) => {
  const { world, penguin } = ctx;

  world.closeIgloo(penguin);
}

export const handleGetOpenIgloos: PenguinHandler<[]> = (ctx) => {
  const { msg, penguin, world } = ctx;

  // TODO need to figure out how to make this penguin "nickname" properly display
  // on showHint, without modding. Seems to require an old shell
  // (and for the newer shells, what is the proper map SWF to use?)
  //TODO sendXtEmptyLast?
  msg.send(penguin, 'gr', ...world.getOpenIglooPlayers().map(p => `${p.id}|${p.name}`));
}

export const handleUpdateMusic: PenguinHandler<[number]> = (ctx, music) => {
  const { penguin, prst } = ctx;
  penguin.igloo.updateIgloo({ music });
  prst(penguin);
}

export const handleGetIglooTypes: PenguinHandler<[]> = ({ msg, penguin }) => {
  msg.send(penguin, 'go', penguin.igloo.types.join('|'));
}

export const handleGetIglooLikes: PenguinHandler<[]> = ({ msg, penguin }) => {
  const id = 1; // TODO Unsure what this ID is
  const likeCount = 0; // TODO like system
  // TODO unsure what this 200 is
  msg.send(penguin, 'gili', id, 200, JSON.stringify({
    likedby: {
      counts: {
        count: likeCount,
        maxCount: likeCount,
        accumCount: likeCount
      },
      IDs: []
    }
  }));
}

export const handleGetDj3kTracks: PenguinHandler<[]> = ({ msg, penguin }) => {
  msg.send(penguin, 'ggd', '');
}

export const handleGetAllIglooLayouts: PenguinHandler<[number]> = async ({ msg, penguin, db, world }, ownerId) => {
  // client may request another player's layouts (visiting via the map)
  const owner = world.getById(ownerId);
  let layouts: Array<[number, Igloo]>;
  if (owner !== undefined) {
    layouts = owner.igloo.getAllLayouts();
  } else {
    const data = await db.get(ownerId);
    if (data === null) {
      return;
    }
    layouts = data.igloos.map(igloo => [igloo.id, igloo]);
  }
  // TODO unsure what the 0 is
  msg.send(penguin, 'gail', ownerId, 0, ...layouts.map(([index, layout]) => getModernIglooString(layout, index)));
}

// the vanilla client sends a "1,1,1" string argument, which is unused
export const handleAddIglooLayout: PenguinHandler<string[]> = ({ msg, penguin, prst }) => {
  const [id, igloo] = penguin.igloo.addIglooLayout();
  // TODO document better what this slot-index is for in the engine 3 string
  msg.send(penguin, 'al', penguin.id, getModernIglooString(igloo, id));
  prst(penguin);
}

export const handleUpdateIglooLayout: PenguinHandler<[number, string]> = ({ prst, penguin }, layoutId, locks) => {
  penguin.igloo.setActiveIgloo(layoutId);
  
  locks.split(',').map(str => str.split('|')).forEach(([i, locked]) => {
    penguin.igloo.setLocked(Number(i), locked === '1');
  });
  
  prst(penguin);
}

export const handleAddIglooLocation: PenguinHandler<[number]> = ({ prst, penguin, msg }, location) => {
  penguin.igloo.addIglooLocation(location);
  // TODO cost deducting
  msg.send(penguin, 'aloc', location, penguin.currency.coins);
  prst(penguin);
}

export const handleGetMusicTracks: PenguinHandler<[]> = ({ msg, penguin }) => {
  const playerTracks: string[] = []; // TODO player tracks
  msg.send(penguin, 'getmymusictracks', playerTracks.length, playerTracks.join(','));
}