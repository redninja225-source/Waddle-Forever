import express from 'express';

import { FileServer } from "@server/file-server";
import { SettingsManager } from "@server/settings";
import { GameData } from "@server/timelines/game-data";
import { PhpServer } from './php-server';
import { PenguinRepository } from '@server/database/database';

export class HttpServer {
  private fileServer: FileServer;
  private phpServer: PhpServer;

  constructor(gameData: GameData, private settings: SettingsManager, db: PenguinRepository) {
    this.fileServer = new FileServer(gameData, settings);
    this.phpServer = new PhpServer(settings, db, gameData);
  }

  public async setupServer() {
    const app = express();
    app.use(this.fileServer.getExpressRouter());
    app.use(this.phpServer.getExpressRouter());

    await new Promise<void>((resolve, reject) => {
      app.listen(this.settings.targetPort, () => {
        console.log(`HTTP server listening on port ${this.settings.targetPort}`);
        resolve();
      }).on('error', (err) => {
        reject(err)
      })
    })
  }
}