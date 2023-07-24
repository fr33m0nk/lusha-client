import { Effect, Either, pipe } from 'effect'
import { ParseError } from '@effect/schema/ParseResult'

export type FetchError = {
    _tag: "FetchError",
    error: Error
}

export type ResponseError = {
    _tag: "ResponseError",
    error: Error
}

export type JSONError = {
    _tag: "JSONError",
    error: Error
}

export type APIError = FetchError | ResponseError | JSONError | ParseError

type ToError = (error: unknown) => Error
const toError: ToError = error => error instanceof Error ? error : (new Error(String(error)))

type FetchApi = (input: RequestInfo | URL, init?: RequestInit) => Effect.Effect<never, FetchError, Response>
export const fetchApi: FetchApi = (input, init?) =>
    Effect.tryPromise({
        try: () => fetch(input, init),
        catch: (error): FetchError =>
        ({
            _tag: "FetchError",
            error: toError(error)
        })
    })

type IsResponseOK = (response: Response) => Either.Either<ResponseError, Response>
export const isResponseOK: IsResponseOK = response => {
    return response.ok ? Either.right(response) : Either.left({
        _tag: "ResponseError",
        error: toError(`API responded with ${response.status}`)
    })
}

type ParseJson = <T>(parser: (rawJson: any) => Either.Either<ParseError, T>) =>
    (response: Response) => Effect.Effect<never, JSONError | ParseError, T>
export const parseJson: ParseJson = parser => response =>
    pipe(
        Effect.tryPromise({
            try: () => response.json(),
            catch: (error): JSONError =>
            ({
                _tag: "JSONError",
                error: toError(error)
            })
        }),
        Effect.flatMap(parser)
    )  