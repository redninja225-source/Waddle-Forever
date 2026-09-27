type PlayerInfo = {
  id: number;
  name: string;
};

type ItemInfo = {
  id: number;
  name: string;
  type: number;
  member: boolean;
};

type StampInfo = {
  id: number;
  name: string;
  category: string;
  rank: string;
};

type RoomInfo = {
  id: number;
  name: string;
};

type TrainerData = {
  players: PlayerInfo[];
  items: ItemInfo[];
  stamps: StampInfo[];
  rooms: RoomInfo[];
};

const trainerApi = (window as any).api;
const trainerPlayerSelect = document.getElementById('player-select') as HTMLSelectElement;
const itemSelect = document.getElementById('item-select') as HTMLSelectElement;
const stampSelect = document.getElementById('stamp-select') as HTMLSelectElement;
const roomSelect = document.getElementById('room-select') as HTMLSelectElement;
const itemSearch = document.getElementById('item-search') as HTMLInputElement;
const stampSearch = document.getElementById('stamp-search') as HTMLInputElement;
const roomSearch = document.getElementById('room-search') as HTMLInputElement;
const statusElement = document.getElementById('status')!;

let state: TrainerData = {
  players: [],
  items: [],
  stamps: [],
  rooms: []
};

const itemTypes: Record<number, string> = {
  1: 'Color',
  2: 'Head',
  3: 'Face',
  4: 'Neck',
  5: 'Body',
  6: 'Hand',
  7: 'Feet',
  8: 'Pin',
  9: 'Background',
  10: 'Award'
};

function selectedPlayerId(): number | null {
  const id = Number(trainerPlayerSelect.value);
  return Number.isFinite(id) && id > 0 ? id : null;
}

function setStatus(message: string) {
  statusElement.textContent = message;
}

function run(command: string, description: string) {
  const id = selectedPlayerId();
  if (id === null) {
    setStatus('No player is selected.');
    return;
  }

  trainerApi.runCommand({ id, command });
  setStatus(`${description}: ${command}`);
}

function fillSelect<T>(
  select: HTMLSelectElement,
  values: T[],
  getValue: (value: T) => number,
  getText: (value: T) => string,
  emptyText: string
) {
  select.replaceChildren();
  if (values.length === 0) {
    const option = document.createElement('option');
    option.textContent = emptyText;
    option.disabled = true;
    select.appendChild(option);
    return;
  }

  values.forEach(value => {
    const option = document.createElement('option');
    option.value = String(getValue(value));
    option.textContent = getText(value);
    select.appendChild(option);
  });
  select.selectedIndex = 0;
}

function renderPlayers() {
  fillSelect(
    trainerPlayerSelect,
    state.players,
    player => player.id,
    player => player.name,
    'No online players'
  );
}

function renderItems() {
  const query = itemSearch.value.trim().toLowerCase();
  const items = state.items.filter(item => {
    return item.name.toLowerCase().includes(query) || String(item.id).includes(query);
  }).slice(0, 500);

  fillSelect(
    itemSelect,
    items,
    item => item.id,
    item => `${item.id} • ${item.name} • ${itemTypes[item.type] ?? 'Item'}${item.member ? ' • Member' : ''}`,
    'No matching items'
  );
}

function renderStamps() {
  const query = stampSearch.value.trim().toLowerCase();
  const stamps = state.stamps.filter(stamp => {
    return stamp.name.toLowerCase().includes(query) ||
      stamp.category.toLowerCase().includes(query) ||
      String(stamp.id).includes(query);
  }).slice(0, 500);

  fillSelect(
    stampSelect,
    stamps,
    stamp => stamp.id,
    stamp => `${stamp.id} • ${stamp.name} • ${stamp.category}`,
    'No matching stamps'
  );
}

function renderRooms() {
  const query = roomSearch.value.trim().toLowerCase();
  const rooms = state.rooms.filter(room => {
    return room.name.toLowerCase().includes(query) || String(room.id).includes(query);
  });

  fillSelect(
    roomSelect,
    rooms,
    room => room.id,
    room => `${room.id} • ${room.name}`,
    'No matching rooms'
  );
}

function refreshAll() {
  renderPlayers();
  renderItems();
  renderStamps();
  renderRooms();
  setStatus(state.players.length > 0 ? 'Trainer ready.' : 'No online players found.');
}

window.addEventListener('trainer-data', event => {
  state = (event as CustomEvent).detail as TrainerData;
  refreshAll();
});

document.getElementById('refresh-button')!.addEventListener('click', () => {
  trainerApi.fetchTrainerData();
});

document.getElementById('advanced-button')!.addEventListener('click', () => {
  trainerApi.openCommands();
});

document.querySelectorAll('[data-coins]').forEach(button => {
  button.addEventListener('click', () => {
    const amount = (button as HTMLElement).dataset.coins!;
    run(`ac ${amount}`, 'Coins updated');
  });
});

document.getElementById('add-coins-button')!.addEventListener('click', () => {
  const amount = Number((document.getElementById('coin-amount') as HTMLInputElement).value);
  if (!Number.isInteger(amount) || amount === 0) {
    setStatus('Enter a nonzero whole number of coins.');
    return;
  }
  run(`ac ${amount}`, 'Coins updated');
});

document.getElementById('add-item-button')!.addEventListener('click', () => {
  if (itemSelect.value === '') {
    setStatus('Select an item first.');
    return;
  }
  run(`ai ${itemSelect.value}`, 'Item added');
});

document.getElementById('all-items-button')!.addEventListener('click', () => {
  run('ai all', 'All items added');
});

document.getElementById('member-button')!.addEventListener('click', () => {
  run('member', 'Membership toggled');
});

document.getElementById('add-stamp-button')!.addEventListener('click', () => {
  if (stampSelect.value === '') {
    setStatus('Select a stamp first.');
    return;
  }
  run(`stamp ${stampSelect.value}`, 'Stamp added');
});

document.getElementById('all-stamps-button')!.addEventListener('click', () => {
  run('stamp all', 'All available stamps added');
});

document.getElementById('awards-button')!.addEventListener('click', () => {
  run('awards', 'PSA awards added');
});

document.getElementById('join-room-button')!.addEventListener('click', () => {
  if (roomSelect.value === '') {
    setStatus('Select a room first.');
    return;
  }
  run(`jr ${roomSelect.value}`, 'Joined room');
});

document.querySelectorAll('[data-cj-wins]').forEach(button => {
  button.addEventListener('click', () => {
    const wins = (button as HTMLElement).dataset.cjWins!;
    run(`cjwin ${wins}`, 'Card-Jitsu progress updated');
  });
});

document.getElementById('powercards-button')!.addEventListener('click', () => {
  run('powercards', 'Power cards added');
});

document.getElementById('add-card-button')!.addEventListener('click', () => {
  const cardId = Number((document.getElementById('card-id') as HTMLInputElement).value);
  const amount = Number((document.getElementById('card-amount') as HTMLInputElement).value);
  if (!Number.isInteger(cardId) || cardId <= 0 || !Number.isInteger(amount) || amount <= 0) {
    setStatus('Enter a valid card ID and amount.');
    return;
  }
  run(`addcard ${cardId} ${amount}`, 'Card added');
});

document.querySelectorAll('[data-amulet]').forEach(button => {
  button.addEventListener('click', () => {
    const element = (button as HTMLElement).dataset.amulet!;
    run(`amulet ${element}`, 'Amulet gem toggled');
  });
});

document.getElementById('rename-button')!.addEventListener('click', () => {
  const name = (document.getElementById('rename-input') as HTMLInputElement).value.trim();
  if (name === '') {
    setStatus('Enter a new penguin name.');
    return;
  }
  run(`rename ${name}`, 'Penguin renamed');
});

document.getElementById('safechat-button')!.addEventListener('click', () => {
  run('safechat', 'Safe chat toggled');
});

document.getElementById('nosave-button')!.addEventListener('click', () => {
  run('nosave', 'Saving disabled');
});

document.getElementById('enablesave-button')!.addEventListener('click', () => {
  run('enablesave', 'Saving enabled');
});

itemSearch.addEventListener('input', renderItems);
stampSearch.addEventListener('input', renderStamps);
roomSearch.addEventListener('input', renderRooms);
