# Hazelnut Technical Assessment

## Summary
For the technical assessment, you will create an API endpoint that receives order data, calculates the order total, stores the order information in a database, and returns the order totals. Use your best judgment for database schema, project structure, test item data, or anything else that is not specified in the requirements.

## Tech Stack
The required elements for this stack are:

1) Git
2) Node.js
3) Express
4) Sequelize
5) Any SQL database

In addition to these, any tools, frameworks or libraries can be used as you see fit.

## Requirements
1. For any address in FL, a tax rate of 7% should be added to the total.
2. For any address in GA, a tax of 10% should be added to the total.
3. For any other state, no tax should be included.
4. Item price should be loaded from the database
5. An error should be returned if one or more items is not found in the database
6. The subtotal (total before tax) and total (total after tax) should be returned if all items are found successfully
7. The order information should be stored in the database
8. All responses should follow JSend specification (https://github.com/omniti-labs/jsend)

## Optional Features
1. Full or partial unit testing of code using Jest
2. Validation that state is a valid US state
3. Validation of address
4. Provide documentation for the API using Swagger or another API documentation too

## How to run the project?
1. Clone the repo
2. Run `npm install`
3. Change db settings in config.json
4. Run `npx sequelize-cli db:migrate`
5. Run `npx sequelize-cli db:seed:all`

## Documentation
https://documenter.getpostman.com/view/686930/UVkgwJaN#intro