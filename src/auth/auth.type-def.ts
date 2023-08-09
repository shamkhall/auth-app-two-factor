import {gql} from "apollo-server-express";

export class AuthTypeDef {
    public static typeDef = gql`
    
    type User {
    id: String!
    email: String!
    password: String!
    }
    
    type Login {
    userId: String!
    token: String!
    }
    
    input UserInput {
    email: String!
    password: String!
    }
    
    input UserUpdateInput {
    id: String!
    newPassword: String!
    }
    
    type Query {
    getAll: [User!]!
    login(user: UserInput!): Login!
    }
    
    type Mutation {
    create(user: UserInput): Boolean!
    changePassword(user: UserUpdateInput): Boolean!
    }
    `;
}
