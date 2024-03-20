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
