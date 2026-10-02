import { Request } from 'express';
import { getMediaFile } from "@server/game-data/files";
import { SettingsManager } from "@server/settings";
import { GameData } from "@server/timelines/game-data";

function injectRuffleIntoHtml(html: string, ip: string, loginPort: number, worldPort: number, isBrowser: boolean) {
  // WF_LOGIN_SOCKET_URL / WF_WORLD_SOCKET_URL can point to wss:// reverse-proxied
  // endpoints when hosting behind HTTPS; otherwise Ruffle proxies to ws:// on the
  // same hostname that served the page.
  const loginSocketUrl = process.env.WF_LOGIN_SOCKET_URL;
  const worldSocketUrl = process.env.WF_WORLD_SOCKET_URL;

  const injectedScript = `
    <script>
      (function () {
        var pageHost = window.location.hostname;
        var loginProxyUrl = ${JSON.stringify(loginSocketUrl ?? '')} || ('ws://' + pageHost + ':${loginPort}');
        var worldProxyUrl = ${JSON.stringify(worldSocketUrl ?? '')} || ('ws://' + pageHost + ':${worldPort}');
        var socketHost = ${JSON.stringify(ip)};
        window.RufflePlayer = window.RufflePlayer || {};
        window.RufflePlayer.config = Object.assign({}, window.RufflePlayer.config, {
          socketProxy: [
            { host: socketHost, port: ${loginPort}, proxyUrl: loginProxyUrl },
            { host: socketHost, port: ${worldPort}, proxyUrl: worldProxyUrl },
            { host: pageHost, port: ${loginPort}, proxyUrl: loginProxyUrl },
            { host: pageHost, port: ${worldPort}, proxyUrl: worldProxyUrl }
          ]
        });
      })();
    </script>
    ${isBrowser ? '<script src="/ruffle/ruffle.js"></script>' : ''}
  `;

  return html.replace('</head>', `${injectedScript}</head>`);
}

export async function overrideIndexHtml(d: GameData, s: SettingsManager, b: Buffer | string, req?: Request): Promise<Buffer | string> {
  let newFileRef: string | null = null;

  if (s.settings.minified_website && !d.isVanillaEngine()) {
    if (d.getAs3()) {
      newFileRef = 'websites:minified/minified-classic-as3.html';
    } else if (d.isPreCpip()) {
      newFileRef = 'websites:minified/minified-precpip.html';
    } else if (d.useCompositePaths()) {
      newFileRef = 'websites:minified/minified-early-cpip.html'
    } else {
      newFileRef = 'websites:minified/minified-cpip.html'
    }
  }

  if (newFileRef !== null) {
    b = await getMediaFile(newFileRef);
  }

  if (typeof b !== 'string') {
    b = b.toString();
  }

  // The Electron client uses a real Flash plugin; only browsers need Ruffle.
  const isBrowser = req === undefined || !(req.headers['user-agent'] ?? '').includes('Electron');

  return injectRuffleIntoHtml(b, s.targetIP, s.loginPort, s.worldPort, isBrowser);
}
