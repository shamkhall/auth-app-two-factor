import {gql} from "apollo-server-express";

export class AuthTypeDef {
    public static typeDef = gql`
    
    type User {
    email: String!
    password: String!
    }
    
    type Query {
    getAll: [User!]!
    }
    
    type Mutation {
    create: Boolean!
    }
    `;
}
