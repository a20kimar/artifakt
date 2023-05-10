const typeDefs = `
  type Employee {
    id: Int!
    fName: String!
    lName: String!
    area: String!
    position: String!
    birthday: String!
    gender: Int!
    philhealth: String!
    hiringdate: String!
    pagibig: String!
    tin: String!
    ssid: String!
    company: Int!
    rate: String!
    status: Int!
    companyobj: Company
  }

  type Company {
    id: Int!
    name: String!
    rate: Int!
    code: String!
    employees: [Employee]
  }

  scalar StringOrInt

  type Query {
    employees: [Employee!]!
    employee(id: StringOrInt!): [Employee]
    companies: [Company!]!
    company(id: StringOrInt!): [Company]
  }
`

module.exports = typeDefs;