import type {BadLoginTokenResponse, EmailAlreadyExistsResponse} from '@/util/errors';


type RegisterResponse = {
    kind: 'goodRegister',
    message: string,
    data: {
        authToken: string
    }
}

export async function register(email: string, name: string): Promise<RegisterResponse | EmailAlreadyExistsResponse> {
    const res = await fetch(`${process.env.API_BASE}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, name})
    });

    return res.json();
}

type LoginResponse = {
    kind: 'goodLogin',
    message: string,
    data: {
        authToken: string
    }
}

export async function login(token: string): Promise<LoginResponse | BadLoginTokenResponse> {
    const res = await fetch(`${process.env.API_BASE}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({teamToken: token})
    });

    return res.json();
}
