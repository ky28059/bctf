'use server'

import type { BadTokenResponse, RateLimitResponse, UserNotFoundResponse } from '@/util/errors';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '@/util/config';


export type ProfileData = {
    name: string,
    ctftimeId: null,
    division: string,
    score: number,
    globalPlace: number | null,
    divisionPlace: number | null,
    solves: Solve[]
}

export type MyProfileData = ProfileData & {
    // bloods: [],
    teamToken: string,
    allowedDivisions: string[],
    id: string,
    email: string
}

export type Solve = {
    category: string,
    name: string,
    points: number,
    solves: number,
    id: string,
    createdAt: number // epoch ms
}

type ProfileResponse<T extends ProfileData> = {
    kind: 'goodUserData',
    message: string,
    data: T
}

export async function getProfile(id: string): Promise<ProfileResponse<ProfileData> | UserNotFoundResponse> {
    const res = await fetch(`${process.env.API_BASE}/users/${id}`, {
        cache: 'no-store' // TODO: devise clever revalidate-on-demand scheme for this?
    });
    return res.json();
}

export async function getMyProfile(token: string): Promise<ProfileResponse<MyProfileData> | BadTokenResponse> {
    const res = await fetch(`${process.env.API_BASE}/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
}

type UpdateUserResponse = {
    kind: 'goodUserUpdate',
    message: 'Your account was successfully updated',
    data: {
        user: {
            name: string,
            email: string,
            division: string
        }
    }
}

export type UpdateProfilePayload = {
    name?: string,
    division?: string
}
export async function updateProfile(payload: UpdateProfilePayload) {
    const c = await cookies();

    const token = c.get(AUTH_COOKIE_NAME)?.value;
    if (!token)
        return { error: 'Not authenticated.' };

    const res: UpdateUserResponse | RateLimitResponse = await (await fetch(`${process.env.API_BASE}/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })).json();

    if (res.kind === 'badRateLimit')
        return { error: `You are doing this too fast! Try again in ${res.data.timeLeft} ms.` };

    return { ok: true };
}

type UpdateEmailResponse = {
    kind: 'goodVerifySent',
    message: 'The account verification email was sent.',
    data: null
}

type DivisionNotAllowedResponse = {
    kind: 'badEmailChangeDivision',
    message: 'You are not allowed to stay in your division with this email.',
    data: null
}

export async function updateEmail(email: string) {
    const c = await cookies();

    const token = c.get(AUTH_COOKIE_NAME)?.value;
    if (!token)
        return { error: 'Not authenticated.' };

    const emailRes: UpdateEmailResponse | DivisionNotAllowedResponse = await (await fetch(`${process.env.API_BASE}/users/me/auth/email`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email })
    })).json();

    if (emailRes.kind !== 'goodVerifySent')
        return { error: emailRes.message };

    return { ok: true };
}
