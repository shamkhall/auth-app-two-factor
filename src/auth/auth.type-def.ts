import {gql} from "apollo-server-express";

export class AuthTypeDef {
    public static typeDef = gql`
    
    type User {
    name: String!
    }
    
    type Query {
    getAll: [User!]!
    }
    `;
}
