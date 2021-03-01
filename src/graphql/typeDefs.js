"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
    enum ReviewType {
        RECIPE
        RESTAURANT
        PRODUCT
    }

    enum ReviewsFilter {
        RATING_LOW_TO_HIGH
        RATING_HIGH_TO_LOW
        NEWEST
    }

    enum TypesFilter {
        ALL
        RESTAURANT
        RECIPE
        PRODUCT
    }

    type User {
        id: ID!
        name: String!
        avatar: String!
        contact: String!
        reviews(limit: Int!, page: Int!): Reviews!
    }

    type Review {
        id: ID!
        title: String!
        subtitle: String!
        author: User!
        image: String!
        body: String!
        rating: Int!
        type: ReviewType!
        city: String
        address: String
        url: String
        country: String
        admin: String
        highlights: [String!]!
        lowlights: [String!]!
        video: String
    }

    type Reviews {
        region: String
        total: Int!
        result: [Review!]!
    }

    type Viewer {
        id: ID
        token: String
        avatar: String
        didRequest: Boolean!
        authorized: Boolean!
    }

    input LogInInput {
        code: String!
    }

    input addReviewInput {
        title: String!
        subtitle: String!
        body: String!
        image: String!
        type: ReviewType!
        rating: Int!
        url: String
        address: String
        highlights: [String!]!
        lowlights: [String!]!
        video: String
    }

    type Query {
        authUrl: String!
        user(id: ID!): User!
        review(id: ID!): Review!
        reviews(
            location: String
            filter: ReviewsFilter!
            typesFilter: TypesFilter!
            limit: Int!
            page: Int!
        ): Reviews!
    }

    type Mutation {
        logIn(input: LogInInput): Viewer!
        logOut: Viewer!
        deleteReview(id: ID!): Review!
        addReview(input: addReviewInput!): Review!
    }
`;
