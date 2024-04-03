'use server'

import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

// Utils
import {AUTH_COOKIE_NAME} from '@/util/config';


// The response type of the registration endpoint if email verification is *not* enabled.
type RegisterResponse = {
    kind: 'goodRegister',
    message: string,
    data: {
        authToken: string
    }
}

type EmailAlreadyExistsResponse = {
    kind: 'badKnownEmail',
    message: 'An account with this email already exists.',
    data: null
}

type RegistrationNotAllowedResponse = {
    kind: 'badCompetitionNotAllowed',
    message: 'You are not allowed to join this CTF.',
    data: null
}

type BadNameResponse = {
    kind: 'badName',
    message: 'The name should only use english letters, numbers, and symbols.',
    data: null
}

type RegisterError = EmailAlreadyExistsResponse | RegistrationNotAllowedResponse | BadNameResponse;

export async function register(email: string, name: string) {
    const res: RegisterResponse | RegisterError = await (await fetch(`${process.env.API_BASE}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, name})
    })).json();

    if (res.kind !== 'goodRegister')
        return {error: res.message};

    cookies().set(AUTH_COOKIE_NAME, res.data.authToken);

    return {ok: true};
}

// The response type of the registration endpoint if email verification *is* enabled.
type EmailVerificationResponse = {
    data: null
    kind: 'goodVerifySent'
    message: 'The account verification email was sent.'
}

export async function registerWithEmailVerification(email: string, name: string) {
    console.log({email, name});

    const res: EmailVerificationResponse | RegisterError = await (await fetch(`${process.env.API_BASE}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, name})
    })).json();

    console.log(res);

    if (res.kind !== 'goodVerifySent')
        return {error: res.message};

    return {ok: true};
}

type LoginResponse = {
    kind: 'goodLogin',
    message: string,
    data: {
        authToken: string
    }
}

export type BadLoginTokenResponse = {
    kind: 'badTokenVerification',
    message: 'The token provided is invalid.',
    data: null
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
