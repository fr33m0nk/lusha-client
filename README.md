# [Lusha Client (Typescript/Javascript)](https://github.com/fr33m0nk/lusha-client)

- This client library supports the [latest API from Lusha](https://www.lusha.com/docs/)
- This client uses [Effect](https://www.effect.website/) library. Effect is definitely worth looking into.
- However, it exposes the Promise based functions for usage
- If there is a demand, I will expose Effect based functions in later releases.

## Usage

### [Person query API](https://www.lusha.com/docs/#person-api)

```typescript
import {personQuery, PersonQueryParams, Person} from "./index";

const queryParams: PersonQueryParams = {
    firstName: "James", 
    lastName: "Bond",
    company: "British"
}

personQuery("API_KEY")(queryParams).then((r: Person) => {
  console.log("\n Yay Person Search \n")
  console.log(r)
  console.log("\n ------- \n")
}).catch((error) => {
  console.log("\n Nay Person Search \n")
  console.log(error)
})
```

### [Company query API](https://www.lusha.com/docs/#company-api)

```typescript
import {companyQuery, CompanyQueryParams, Company} from "./index";

const companyQueryParams: CompanyQueryParams = {domain: "google.com"}

companyQuery("API_KEY")(companyQueryParams).then((r: Company) => {
  console.log("\n Yay Company Search \n")
  console.log(r)
  console.log("\n ------- \n")
}).catch((error) => {
  console.log("\n Nay Company Search \n")
  console.log(error)
})
```