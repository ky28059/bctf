export type BadTokenResponse = {
    kind: 'badToken',
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

export type BadLoginTokenResponse = {
    kind: 'badTokenVerification',
    message: 'The token provided is invalid.',
    data: null
}

export type EmailAlreadyExistsResponse = {
    kind: 'badKnownEmail',
    message: 'An account with this email already exists.',
    data: null
}
