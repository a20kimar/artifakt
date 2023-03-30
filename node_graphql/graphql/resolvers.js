const dboperation = require('../dboperations')


const resolvers = {

    Query: {
        employee: (parent, { id }) => dboperation.getEmployee(id),
        employees: () => dboperation.getEmployees(),
        company: (parent, { id }) => dboperation.getCompany(id),
        companies: () => dboperation.getCompanies()
    },
    Employee: {
        companyobj: (parent) => dboperation.getCompany(parent.company)
    },
    Company: {
        employees: (parent) => dboperation.getEmployeesInCompany(parent.id)
    }
}

module.exports = resolvers