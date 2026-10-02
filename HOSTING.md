# Hosting Waddle Forever in a browser

Waddle Forever can run as a standalone server that players reach from a normal web
browser — no downloads or Flash install needed. Browsers are served the game through
[Ruffle](https://ruffle.rs), a Flash emulator bundled with this program, while the
Electron client keeps using real Flash.

> [!CAUTION]
> The server is not hardened against malicious players. Only host it for people you
> trust.

## Requirements

- Node.js and yarn (to run the server), or a prebuilt server binary
- The `media` folder (run `yarn build-packages` and make sure `media/` is next to
  wherever you run the server from)
- Ports forwarded/open on the host machine (or reachable through your reverse proxy)

## Running

The easiest way is the bundled launcher — download the repository onto the server
machine and run:

- Windows: `server-start.bat`
- Linux: `./server-start.sh`

It stores user data in the server folder, creates a starter `settings.json`
(port 4004), installs dependencies and builds if needed, then starts the server.
If a prebuilt `dist/WaddleForeverServer*.exe` exists it is used instead, so no
Node.js install is required in that case.

Manually, it's just:

```bash
yarn install
yarn build-packages
yarn dev
```

or run a built server binary (`yarn build-server-win-x64` → `dist/WaddleForeverServer-<version>.exe`).

## Configuration

The address can be set two ways — environment variables (handy for scripts/services)
or keys in `settings.json` (persistent, no env setup). Env vars win if both exist.

| Env var | `settings.json` key | Default | Description |
| --- | --- | --- | --- |
| `WF_HOST` | `server_host` | `127.0.0.1` | Address advertised to game clients (local IP, public IP, or domain). |
| `WF_PORT` | `server_port` | `24105` | HTTP port. Login listens on `+1`, world on `+2`. |
| `WF_DATA_DIR` | — | OS data folder | Folder for user data (penguins, settings, mods). See below. |
| `WF_LOGIN_SOCKET_URL` | — | `ws://<page host>:<login port>` | Full override for the login WebSocket proxy URL. |
| `WF_WORLD_SOCKET_URL` | — | `ws://<page host>:<world port>` | Full override for the world WebSocket proxy URL. |

### Example: local IP on port 4004

```powershell
$env:WF_HOST = "192.168.1.50"; $env:WF_PORT = "4004"; yarn dev
```

or in `settings.json`:

```json
{ "server_host": "192.168.1.50", "server_port": 4004 }
```

The server then uses **4004** for the site, **4005** for login, **4006** for world.
Players on the network open `http://192.168.1.50:4004/`.

## User data

Penguin saves, `settings.json`, and mods live in the *user data folder*:

- Normally this is the OS data dir (`%APPDATA%\WaddleForever` on Windows,
  `~/.waddleforever` on Linux).
- In dev mode (`yarn dev`) or when a `.uselocal` file exists next to the program,
  it uses the current working directory instead — i.e. `data/`, `settings.json`,
  and `mods/` sit in the folder you run it from.
- `WF_DATA_DIR=/path/to/folder` overrides it entirely — recommended for a hosted
  server so everything stays in one place you control.

## Reverse proxy / HTTPS

Browsers block `ws://` connections from `https://` pages. If you proxy the site over
HTTPS, map two additional `wss://` endpoints to the login and world ports and set
`WF_LOGIN_SOCKET_URL` / `WF_WORLD_SOCKET_URL`.

Example nginx config for `https://play.example.com` proxying to a machine at
`192.168.1.50` running with `WF_PORT=4004`:

```nginx
server {
    listen 443 ssl;
    server_name play.example.com;
    # ssl_certificate ... (e.g. Let's Encrypt)

    location / {
        proxy_pass http://192.168.1.50:4004;
        proxy_set_header Host $host;
    }

    location /login-socket {
        proxy_pass http://192.168.1.50:4005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /world-socket {
        proxy_pass http://192.168.1.50:4006;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

with:

```bash
WF_HOST=192.168.1.50 WF_PORT=4004 \
WF_LOGIN_SOCKET_URL=wss://play.example.com/login-socket \
WF_WORLD_SOCKET_URL=wss://play.example.com/world-socket \
yarn dev
```

`WF_HOST` stays the internal address — that's what the game client "thinks" it's
connecting to; the socket proxy URLs are what the browser actually dials.

## Limitations

- **AS2 eras only.** Ruffle's ActionScript 3 support is incomplete, so dates that use
  the modern AS3 client (mid-2013 onward) will not work in a browser. Pick a date
  before ~May 2013 in `settings.json` (`version`/`main_version`, and `game_mode` if
  using the timeline).
- Everything else (media files, newspapers, parties) is served the same way as the
  desktop client, so browser players see whatever date/mods the host has configured.
