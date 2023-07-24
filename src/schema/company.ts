import * as Schema from '@effect/schema/Schema'
import { ParseError } from '@effect/schema/ParseResult'
import { Either } from 'effect/Either'

export const companySchema = Schema.struct({
    data: Schema.struct({
        description: Schema.nullable(Schema.string),
        domain: Schema.nullable(Schema.string),
        employees: Schema.nullable(Schema.string),
        founded: Schema.nullable(Schema.string),
        founders: Schema.nullable(Schema.string),
        logo: Schema.nullable(Schema.string),
        name: Schema.nullable(Schema.string),
        website: Schema.nullable(Schema.string),
        social: Schema.nullable(Schema.struct({
            facebook: Schema.optional(Schema.struct({
                url: Schema.optional(Schema.string),
                bio: Schema.optional(Schema.string),
            })),
            linkedin: Schema.optional(Schema.struct({
                url: Schema.optional(Schema.string),
                bio: Schema.optional(Schema.string),
            })),
            twitter: Schema.optional(Schema.struct({
                url: Schema.optional(Schema.string),
                bio: Schema.optional(Schema.string),
                following:  Schema.optional(Schema.number),
                followers:  Schema.optional(Schema.number),
            })),
            crunchbase: Schema.optional(Schema.struct({
                url: Schema.optional(Schema.string),
                bio: Schema.optional(Schema.string)
            })),
        })),
        meta: Schema.struct({
            matches_this_month: Schema.number
        })
    })
})

export type Company = Schema.To<typeof companySchema>

type CompanyParser = (rawJson: any) => Either<ParseError, Company>
export const companyParser: CompanyParser = Schema.parseEither(companySchema)