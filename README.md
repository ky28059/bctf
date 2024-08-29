# bctf

The updated website for b01lers CTF!

This website was heavily inspired by [LA CTF](https://platform.lac.tf/) and the default rCTF frontend.

### Running locally

This is a custom Next.js frontend wrapping [rCTF](https://rctf.redpwn.net/) as a backend. To configure rCTF, edit the
config files in `/conf.d` [as normal](https://rctf.redpwn.net/configuration/). In `conf.d`,

- `01-ui.yaml` defines rCTF's UI config values. These values are mostly ignored by the custom frontend, but necessary
for styling certain things that we don't have full control over (ex. the email template).
- `02-ctf.yaml` defines metadata for the actual CTF, including divisions, start / end time, and the frontend URL.
- `03-db.yaml` defines config options for rCTF's underlying databases.
- `04-email.yaml` defines config options for email verification. This includes an API key so isn't committed, but an
example is included in `04-email.example.yaml`.
- `05-uploads.yaml` defines config options for GCS uploads. This includes a private key and service account email so
isn't committed, but an example is included in `05-uploads.example.yaml`.
- `06-secrets.yaml` defines secret rCTF values such as the token key.

To run just the frontend, first install dependencies with
```bash
npm i
```
In `next.config.js`, set `RCTF_BASE` to the public URL of the backend rCTF instance, and `KLODD_URL` to the public URL of
the Klodd instancer frontend:
```js
const RCTF_BASE = 'http://ctf.b01lers.com:9000';

const nextConfig = {
    env: {
        API_BASE: `${RCTF_BASE}/api/v1`,
        KLODD_URL: 'https://klodd.localhost.direct'
    },
    // ...
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
docker compose up -d --build
```

### Configuring
Further config options can be edited in `/util/config.ts`:
```ts
export const SOLVES_PAGE_SIZE = 10;
export const SCOREBOARD_PAGE_SIZE = 100;

export const AUTH_COOKIE_NAME = 'ctf_clearance';
```
- `SOLVES_PAGE_SIZE` — The number of solves to show on each page of the solves modal.
- `SCOREBOARD_PAGE_SIZE` — The number of teams to show on each page of the scoreboard.
- `AUTH_COOKIE_NAME` — The name of the auth token cookie.
