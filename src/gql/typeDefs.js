import gql from 'graphql-tag';

const typeDefs = gql`
    scalar DateTime

    directive @isAdmin on FIELD_DEFINITION

    enum UserRole {
        PLAYER
        TRENNER
        ADMIN
    }

    enum ResultType {
        VICTORY
        DEFEAT
    }

    enum RecurringPeriod {
        DAY
        WEEK
        MONTH
        YEAR
    }

    enum UserGender {
        MALE
        FEMALE
        OTHER
    }

    type User {
        id: ID!
        firstName: String
        lastName: String
        sex: UserGender
        email: String!
        role: UserRole
        level: Float
        address: String
        city: String
        phoneNumber: String
        password: String
        badges: [Badge]
        club: Club
        reservations: [Reservation]
        games: [Game]
        friends: [User]
        userProfileFile: File
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Badge {
        id: ID!
        title: String
        description: String
        badgeIconFile: File
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Club {
        id: ID!
        title: String
        description: String
        creator: User
        clubLogoFile: File
        createdAt: DateTime
        updatedAt: DateTime
    }

    type File {
        id: ID!
        fileName: String
        mime: String
        size: Float
        user: User
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Game {
        id: ID!
        date: DateTime
        result: ResultType
        scores: [Score]
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Reservation {
        id: ID!
        startDateTime: DateTime
        duration: Int
        user: User
        isRecurring: Boolean
        recurringDate: DateTime
        recurringPeriod: RecurringPeriod
        recurringEvery: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Score {
        id: ID!
        scoreNumber: Int
        numberOfWins: Int
        numberOfLoses: Int
        scoreMultiplier: Float
        game: Game
        opponents: [User]
        createdAt: DateTime
        updatedAt: DateTime
    }

    input UserInput {
        id: ID
        firstName: String
        lastName: String
        sex: UserGender
        email: String
        role: UserRole
        level: Float
        address: String
        city: String
        phoneNumber: String
        password: String
        badges: [ID]
        clubId: ID
        reservationIds: [ID]
        gameIds: [ID]
        friendIds: [ID]
        userProfileFile: ID
    }

    input UserQueryInput {
        level: Float
        address: String
        city: String
        clubId: ID
        gameId: ID
    }

    type Query {
        # user related queries
        getUser(email: String!): User
        getUsers(query: UserQueryInput!): [User]
        allUsers: [User]! @isAdmin
    }

    type Mutation {
        # user related mutations
        loginUser(userInput: UserInput!): String
        registerUser(userInput: UserInput!): String

        editUser(email: String!, userInput: UserInput!): User
        deleteUser(email: String!): User
    }
`;

export default typeDefs;
