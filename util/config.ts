export const SOLVES_PAGE_SIZE = 10;
export const SCOREBOARD_PAGE_SIZE = 100;

export const AUTH_COOKIE_NAME = 'ctf_clearance';


export type CTFConfig = {
    // Controlled by `01-ui.yaml`; for the most part, we don't care about these.
    ctfName: string,
    meta: {
        description: string,
        url: string,
    },
    homeContent: string,

    // Controlled by `02-ctf.yaml`
    origin: string,
    divisions: { [id: string]: string }, // {id: name}
    startTime: number, // epoch ms
    endTime: number, // epoch ms
}

type ConfigResponse = {
    kind: 'goodClientConfig',
    message: 'The client config was retrieved.',
    data: CTFConfig
}

export async function getConfig(): Promise<ConfigResponse> {
    const res = await fetch(`${process.env.API_BASE}/integrations/client/config`);
    return res.json();
}
