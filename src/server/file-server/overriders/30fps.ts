import { changeFrameRate } from "@common/flash/manipulate";
import { SettingsManager } from "@server/settings";
import { GameData } from "@server/timelines/game-data";

export async function makeSwfFps(d: GameData, s: SettingsManager, b: Buffer | string): Promise<Buffer | string> {
  if (typeof b === 'string') {
    b = Buffer.from(b);
  }
  
  if (s.settings.fps > 0) {
    b = changeFrameRate(b, s.settings.fps);
  }

  return b;
}