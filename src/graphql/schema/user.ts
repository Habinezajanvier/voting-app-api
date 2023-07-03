import { buildSchema } from "graphql";

const schema = buildSchema(`
    input SignupData {
        email: String!
        firstname: String!
        lastname: String!
        password: String!
        country: String!
        phoneNumber: String!
    }

    type User {
        id: Int!
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        phoneNumber: String!
        country: String
    }

    type Mutation {
        createUser(input: SignupData!): User
        updateUser(id: Int!, input: SignupData): User
    }

    type Query {
        getUser(id: String): User
        getUsers: [User]
    }
`);

export default schema;
