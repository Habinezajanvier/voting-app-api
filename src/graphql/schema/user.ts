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

    input LoginData {
        email: String!
        password: String!
    }

    type Error {
        error: String!
        status: String!
    }

    interface Response {
       status: String!
       message: String! 
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

    type AuthData implements Response {
        token: String!
        data: User!
        status: String!
        message: String!
    }

    union AuthResponse = AuthData | Error

    type Mutation {
        createUser(input: SignupData!): AuthResponse
        userLogin(input: LoginData!): AuthResponse
        updateUser(id: Int!, input: SignupData): User
    }

    type Query {
        getUser(id: String): User
        getUsers: [User]
    }
`);

export default schema;
