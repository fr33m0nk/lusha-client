import * as Schema from '@effect/schema/Schema'
import { ParseError } from '@effect/schema/ParseResult'
import { Either } from 'effect/Either'

export const personSchema = Schema.struct({
    data: Schema.struct({
        company: Schema.struct({
            foundedYear: Schema.nullable(Schema.string),
            language: Schema.nullable(Schema.string),
            logo: Schema.nullable(Schema.string),
            name: Schema.nullable(Schema.string),
            numberOfEmployees: Schema.nullable(Schema.number),
            overview: Schema.nullable(Schema.string),
            website: Schema.nullable(Schema.string),
        }),
        emailAddresses: Schema.array(Schema.struct({
            email: Schema.nullable(Schema.string),
            mailServer: Schema.nullable(Schema.string),
            type: Schema.nullable(Schema.string),
        })),
        location: Schema.struct({
            country: Schema.nullable(Schema.string),
            country_iso2: Schema.nullable(Schema.string),
            continent: Schema.nullable(Schema.string),
            raw_location: Schema.nullable(Schema.string),
            state: Schema.nullable(Schema.string),
            stateCode: Schema.nullable(Schema.string),
            is_eu_contact: Schema.nullable(Schema.string),
        }),
        familyName: Schema.nullable(Schema.string),
        firstName: Schema.nullable(Schema.string),
        fullName: Schema.nullable(Schema.string),
        phoneNumbers: Schema.array(Schema.struct({
            countryCallingCode: Schema.nullable(Schema.string),
            countryCode: Schema.nullable(Schema.string),
            countryName: Schema.nullable(Schema.string),
            internationalNumber: Schema.nullable(Schema.string),
            localizedNumber: Schema.nullable(Schema.string),
            regionalCode: Schema.nullable(Schema.string),
        })),
        jobTitles: Schema.array(Schema.struct({
            title: Schema.nullable(Schema.string),
            departments: Schema.array(Schema.string),
            seniority: Schema.nullable(Schema.string)
        })),
        meta: Schema.struct({
            matches_this_month: Schema.number
        })
    })
})

export type Person = Schema.To<typeof personSchema>

type PersonParser = (rawJson: any) => Either<ParseError, Person>
export const personParser: PersonParser = Schema.parseEither(personSchema)