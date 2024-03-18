type RegisterResponse = {
    kind: 'goodRegister',
    message: string,
    data: {
        authToken: string
    }
}

export async function register(email: string, name: string) {
    const res: RegisterResponse = await (await fetch(`${process.env.API_BASE}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, name})
    })).json();

    return res.data.authToken;
}

type LoginResponse = {
    kind: 'goodLogin',
    message: string,
    data: {
        authToken: string
    }
}

export async function login(token: string) {
    const res: LoginResponse = await (await fetch(`${process.env.API_BASE}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({teamToken: token})
    })).json();

    return res.data.authToken;
}
