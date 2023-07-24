import { stringify } from '@billjs/query-string'
import { pipe, Effect } from 'effect'
import { fetchApi, isResponseOK, FetchError, parseJson, APIError } from './safe_fetch'
import { personParser, Person } from './schema/person'
import { companyParser, Company } from './schema/company'

const personQueryURL = 'https://api.lusha.com/person?'
const companyQueryURL = 'https://api.lusha.com/company?'

export type CompanyQueryParams = 
    | Readonly<{ company: string, }> 
    | Readonly<{ domain: string, }> 

export type PersonQueryParams = Readonly<{
    firstName: string,
    lastName: string,
    linkedinUrl?: string,
}> & CompanyQueryParams

type QueryParams = PersonQueryParams | CompanyQueryParams

type ToURLWithQueryString = (url: string, queryParams: QueryParams) => URL
const toURLWithQueryString: ToURLWithQueryString = (url, queryParams) => {
    return new URL(url.concat(stringify(queryParams)))
}

type ToAPIKeyHeader = (apiKey: string) => { readonly api_key: string }
const toAPIKeyHeader: ToAPIKeyHeader = apiKey => ({
    api_key: apiKey
})

type FetchLushaApi = (apiKey: string, queryURL: string, queryParams: QueryParams) => Effect.Effect<never, FetchError, Response>
const fetchLushaApi: FetchLushaApi = (apiKey, queryURL, queryParams) => fetchApi(
    toURLWithQueryString(queryURL, queryParams), {
    headers: toAPIKeyHeader(apiKey)
})

type PersonApi = (apiKey: string) => (queryParams: PersonQueryParams) => Effect.Effect<never, APIError, Person>
const personApi: PersonApi = apiKey => queryParams => pipe(
    fetchLushaApi(apiKey, personQueryURL, queryParams),
    Effect.flatMap(isResponseOK),
    Effect.flatMap(parseJson(personParser))
)

type CompanyApi = (apiKey: string) => (queryParams: CompanyQueryParams) => Effect.Effect<never, APIError, Company>
const companyApi: CompanyApi = apiKey => queryParams => pipe(
    fetchLushaApi(apiKey, companyQueryURL, queryParams),
    Effect.flatMap(isResponseOK),
    Effect.flatMap(parseJson(companyParser))
)

export type PersonQuery = (apiKey: string) => (queryParams: PersonQueryParams) => Promise<Person>
export const personQuery: PersonQuery = apiKey => queryParams => Effect.runPromise(personApi(apiKey)(queryParams))

export type CompanyQuery = (apiKey: string) => (queryParams: CompanyQueryParams) => Promise<Company>
export const companyQuery: CompanyQuery = apiKey => queryParams => Effect.runPromise(companyApi(apiKey)(queryParams))
