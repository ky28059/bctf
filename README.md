# bctf

The updated website for b01lers CTF!

This website was heavily inspired by [LA CTF](https://platform.lac.tf/) and the default rCTF frontend.

### Running locally

This is a custom Next.js frontend wrapping [rCTF](https://rctf.redpwn.net/) as a backend. To configure rCTF, edit the
config files in `/conf.d` [as normal](https://rctf.redpwn.net/configuration/).

To run just the frontend, first install dependencies with
```bash
npm i
```
In `next.config.js`, set `env.API_URL` to the public API URL of the rCTF instance:
```js
const nextConfig = {
    env: {
        API_BASE: 'http://ctf.b01lers.com:9000/api/v1'
    }
}
```
Then, run
```bash
npm run dev
```
to start the development server on `localhost:3000`.

To start rCTF, you'll need a `.env` file in the project root exporting database credentials:
```env
RCTF_DATABASE_PASSWORD=...
RCTF_REDIS_PASSWORD=...
RCTF_GIT_REF=master
```
(this file can be copied after running [rCTF's install script](https://rctf.redpwn.net/installation/)).

You can then start both the rCTF backend and production frontend instance simultaneously with
```bash
docker-compose up -d --build
```

### Configuring
Further config options can be edited in `/util/config.ts`:
```ts
export const SOLVES_PAGE_SIZE = 10;
export const SCOREBOARD_PAGE_SIZE = 100;

export const AUTH_COOKIE_NAME = 'ctf_clearance'
```
- `SOLVES_PAGE_SIZE` — The number of solves to show on each page of the solves modal.
- `SCOREBOARD_PAGE_SIZE` — The number of teams to show on each page of the scoreboard.
- `AUTH_COOKIE_NAME` — The name of the auth token cookie.
