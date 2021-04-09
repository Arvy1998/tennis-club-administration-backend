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

    enum UserLevel {
        LEVEL_1_5
        LEVEL_2_0
        LEVEL_2_5
        LEVEL_3_0
        LEVEL_3_5
        LEVEL_4_0
        LEVEL_4_5
        LEVEL_5_0
        LEVEL_5_5
        LEVEL_6_0_7_0
        LEVEL_7_0
    }

    type User {
        id: ID!
        firstName: String
        lastName: String
        sex: UserGender
        email: String!
        role: UserRole
        level: UserLevel
        address: String
        city: String
        phoneNumber: String
        password: String
        badges: [Badge]
        club: Club
        reservations: [Reservation]
        games: [Game]
        friends: [User]
        userProfilePhoto: String
        createdAt: DateTime
        updatedAt: DateTime
        token: String
    }

    type Badge {
        id: ID!
        title: String
        description: String
        badgeIcon: String
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Club {
        id: ID!
        title: String
        description: String
        creator: User
        clubLogo: String
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

    type PlayField {
        id: ID!
        title: String
        address: String
        cost: Float
        ownerPhoneNumber: String
        ownerEmailAddress: String
        courtsNumber: Int
        courtType: String
        courtFloorType: String
        additionalInformation: String
        webpage: String
        workHours: String
        rating: Int

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
        level: UserLevel
        address: String
        city: String
        phoneNumber: String
        password: String
        newPassword: String
        newEmail: String
        badges: [ID]
        clubId: ID
        reservationIds: [ID]
        gameIds: [ID]
        friendIds: [ID]
        userProfilePhoto: String
    }

    input UserQueryInput {
        level: Float
        address: String
        city: String
        clubId: ID
        gameId: ID
    }

    input PlayFieldInput {
        id: ID
        title: String
        address: String
        cost: Float
        ownerPhoneNumber: String
        ownerEmailAddress: String
        courtsNumber: Int
        courtType: String
        courtFloorType: String
        additionalInformation: String
        webpage: String
        workHours: String
        rating: Int
        playFieldPhoto: String
        city: String
    }

    input PlayFieldQueryInput {
        courtsNumber: Int
        courtType: String
        courtFloorType: String
        city: String
        rating: Int
        cost: Float
    }

    input ReservationInput {
        startDateTime: DateTime
        duration: Int
        userId: String
        isRecurring: Boolean
        recurringDate: DateTime
        recurringPeriod: RecurringPeriod
        recurringEvery: Int
    }

    type Query {
        # user related queries
        getUser(email: String!): User
        getUsers(query: UserQueryInput!): [User]
        allUsers: [User]! @isAdmin

        # playfields related queries
        getPlayField(id: ID!): PlayField
        listPlayFields(playFieldQueryInput: PlayFieldQueryInput): [PlayField]
    }

    type Mutation {
        # user related mutations
        loginUser(userInput: UserInput!): User
        registerUser(userInput: UserInput!): User

        editUser(email: String!, userInput: UserInput!): User
        deleteUser(email: String!): User

        # playfield related mutations
        createPlayField(playFieldInput: PlayFieldInput!): PlayField
        updatePlayField(id: ID!, playFieldInput: PlayFieldInput!): PlayField
        deletePlayField(id: ID!): PlayField

        # reservation related mutations
        createReservation(reservationInput: ReservationInput!): Reservation
        updateReservation(id: ID!, reservationInput: ReservationInput!): Reservation
        deleteReservation(id: ID!): Reservation
    }
`;

export default typeDefs;
