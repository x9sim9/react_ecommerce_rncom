# RSpec Tests

This project uses [RSPEC](https://rspec.info/) for testing

If you are new to RSpec this tutorial is a great starting point:

- https://www.tutorialspoint.com/rspec/index.htm

### Commands

| Command        | Description                                                     |
|----------------|-----------------------------------------------------------------|
| `npm run test` | Run all RSpec Tests. See `/spec/README.md` for more information |

### Folders

| Folder                  | Description                                                         |
|-------------------------|---------------------------------------------------------------------|
| `/fabricators`          | model mocks using [Fabrication](https://fabricationgem.org/)        |
| `/graphql/mutations`    | tests for all GraphQL Mutations defined in `/app/graphql/mutations` | 
| `/graphql/queries`      | tests for all GraphQL Queries defined in `/app/graphql/queries`     | 
| `/graphql/types`        | tests for all GraphQL Types defined in `/app/graphql/types`         | 
| `/models`               | tests for all Models defined in `/app/models`                       | 
| `/support/assets`       | all assets used during testing                                      | 
| `/support/helpers`      | helper functions for testing                                        | 
| `/support/initializers` | for initializing extra rspec functionality (fabricators, etc...)    | 
| `/support/matchers`     | custom matchers used during testing                                 | 