import {gql} from "apollo-server-express";

export class AuthTypeDef {
    public static typeDef = gql`
    
    type User {
    id: String!
    email: String!
    password: String!
    }
    
    type CreatedUser {
    id: String!
    secret: String!
    qrCodeUrl: String!
    }
    
    type Login {
    userId: String!
    token: String!
    }
    
    input UserInput {
    email: String!
    password: String!
    secretKey: String!
    }
    
    input RegisterUserInput {
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
    create(user: RegisterUserInput!): CreatedUser!
    changePassword(user: UserUpdateInput): Boolean!
    }
    `;
}
