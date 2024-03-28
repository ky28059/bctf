'use server'

import type {BadLoginTokenResponse, EmailAlreadyExistsResponse} from '@/util/errors';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

// Utils
import {AUTH_COOKIE_NAME} from '@/util/config';
import {revalidatePath} from 'next/cache';


type RegisterResponse = {
    kind: 'goodRegister',
    message: string,
    data: {
        authToken: string
    }
}

export async function register(email: string, name: string) {
    const res: RegisterResponse | EmailAlreadyExistsResponse = await (await fetch(`${process.env.API_BASE}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, name})
    })).json();

    if (res.kind !== 'goodRegister')
        return {error: res.message};

    cookies().set(AUTH_COOKIE_NAME, res.data.authToken);

    return {ok: true};
}

type LoginResponse = {
    kind: 'goodLogin',
    message: string,
    data: {
        authToken: string
    }
}

export async function login(token: string) {
    const res: LoginResponse | BadLoginTokenResponse = await (await fetch(`${process.env.API_BASE}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({teamToken: token})
    })).json();

    if (res.kind !== 'goodLogin')
        return {error: res.message};

    cookies().set(AUTH_COOKIE_NAME, res.data.authToken);

    return {ok: true};
}

export async function logout() {
    cookies().delete(AUTH_COOKIE_NAME);
    return redirect('/');
}
