export type BadTokenResponse = {
    kind: 'badToken',
    message: 'The token provided is invalid.',
    data: null
}

export type BadTokenVerificationResponse = {
    kind: 'badTokenVerification',
    message: 'The token provided is invalid.',
    data: null
}

export type UserNotFoundResponse = {
    kind: 'badUnknownUser',
    message: 'The user does not exist.',
    data: null
}

export type RateLimitResponse = {
    kind: 'badRateLimit',
    message: 'You are trying this too fast',
    data: {
        timeLeft: number // ms
    }
}

export type CTFNotStartedResponse = {
    kind: 'badNotStarted',
    message: 'The CTF has not started yet.',
    data: null
}

export type CTFEndedResponse = {
    kind: 'badEnded',
    message: 'The CTF has ended.',
    data: null
}
