# Improvements

**Author:** Dixit Jain
**Role:** SE 2
**Time taken:** 5 hours

## Suggestions
* The api-schema suggests the the successful response from '/orders/:id/quotes' should have status 'RECEIVED', which in my humble opinion, should be 'QUOTED'
* As we scale, the api test-suite will be very hard to maintain as different test cases are dependent on each other. Something like Cypress should be a good alternative 
* Implementing linting rules such as: no usage of unused variables/ imports, import statement sorting etc should be really great
* I have not seen FDDD approach in a large SAAS repository, so I do not understand it as well, but it does seem like there was some redundant code being created
* I would like to move utility functions to a common place such that they can be shared between tests and derivers
* I would like to create constants such that we aren't repeating fixed values such as 'UPS' at multiple places

## Non Functional Requiremnts
* Scalability
    *  It is important to design the architecture in a way that its easily scalable. It could mean implementing things like worker jobs to handle resource intensive tasks such as large csv upload, writing non-blocking code where possible
* Security
    * It is very important for an application to be secure. It becomes more important when applicatin is handling more sensitive data such as medical records, financial data. This could be achieved by implementing techniques such as input validation using tools like zod, joi, session management, auth libs such as Oauth etc