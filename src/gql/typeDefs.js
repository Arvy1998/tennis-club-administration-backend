import gql from 'graphql-tag';

const typeDefs = gql`
    scalar DateTime
    scalar IBAN

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

    enum UserStatus {
        ACTIVE
        BLOCKED
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
        mainHand: String
        details: String
        rating: Int
        status: UserStatus
    }

    type Badge {
        id: ID!
        title: String
        description: String
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Club {
        id: ID!
        title: String
        description: String
        creator: User
        clubLogo: String
        users: [User]
        createdAt: DateTime  
        updatedAt: DateTime
    }

    type Match {
        firstTeamScore: Int
        secondTeamScore: Int
    }

    type Game {
        id: ID!
        date: DateTime!
        
        firstTeamFirstPlayer: User
        firstTeamSecondPlayer: User
        secondTeamFirstPlayer: User
        secondTeamSecondPlayer: User

        matches: [Match]

        createdAt: DateTime
        updatedAt: DateTime
    }

    type Reservation {
        id: ID!
        startDateTime: DateTime
        endDateTime: DateTime
        user: User
        isRecurring: Boolean
        recurringDate: DateTime
        recurringPeriod: RecurringPeriod
        recurringEvery: Int
        playField: PlayField
        totalCost: Float
        paid: Boolean
        status: String

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
        city: String

        playFieldPhoto: String

        paymentRecipient: String
        paymentIBAN: IBAN

        createdAt: DateTime
        updatedAt: DateTime
    }

    type News {
        id: ID!
        title: String
        description: String
        firstClubPlaying: Club
        secondClubPlaying: Club
        date: DateTime
        playField: PlayField
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
        mainHand: String
        details: String
        status: UserStatus
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
        playFieldPhoto: String
        city: String
        paymentRecipient: String
        paymentIBAN: IBAN
    }

    input PlayFieldQueryInput {
        courtsNumber: Int
        courtType: String
        courtFloorType: String
        city: String
        cost: Float
    }

    input ReservationInput {
        startDateTime: DateTime
        endDateTime: DateTime
        userId: String
        playFieldId: String
        isRecurring: Boolean
        recurringDate: DateTime
        recurringPeriod: RecurringPeriod
        recurringEvery: Int
        totalCost: Float
        paid: Boolean
        status: String
    }

    input MatchInput {
        firstTeamScore: Int
        secondTeamScore: Int
    }

    input GameInput {
        matches: [MatchInput]
        
        firstTeamFirstPlayerId: ID!
        firstTeamSecondPlayerId: ID
        secondTeamFirstPlayerId: ID!
        secondTeamSecondPlayerId: ID
    }

    input ClubInput {
        title: String
        description: String
        creatorId: ID
        clubLogo: String
        userIds: [ID]
    }

    input NewsInput {
        title: String
        description: String
        firstClubPlayingId: ID
        secondClubPlayingId: ID
        date: DateTime
        playFieldId: ID
    }

    input PaymentInput {
        IBAN: String
        CVC: Int
        YYMM: String
        totalCost: Float
    }

    type Query {
        # user related queries
        getUser(email: String!): User
        allUsers: [User]
        getPlayers: [User]
        getUserById(id: ID!): User

        # playfields related queries
        getPlayField(id: ID!): PlayField
        listPlayFields(playFieldQueryInput: PlayFieldQueryInput): [PlayField]

        # reservations related queries
        getReservationsByPlayfieldId(playFieldId: ID!): [Reservation]
        getReservationsByUserId(userId: ID!): [Reservation]
        listReservations: [Reservation]

        # games related queries
        getGame(id: ID!): Game
        listGames: [Game]

        # clubs related queries
        getClub(id: ID!): Club
        listClubs: [Club]
        getClubByCreatorId(creatorId: ID!): Club

        # badges related queries
        listBadges: [Badge]

        # news related queries
        getNews(id: ID!): News
        listNews: [News]
    }

    type Mutation {
        # user related mutations
        loginUser(userInput: UserInput!): User
        registerUser(userInput: UserInput!): User

        editUser(email: String!, userInput: UserInput!): User
        editUserById(id: ID!, userInput: UserInput!): User
        deleteUser(email: String!): User

        # playfield related mutations
        createPlayField(playFieldInput: PlayFieldInput!): PlayField
        updatePlayField(id: ID!, playFieldInput: PlayFieldInput!): PlayField
        deletePlayField(id: ID!): PlayField

        # reservation related mutations
        createReservation(reservationInput: ReservationInput!): Reservation
        updateReservation(id: ID!, reservationInput: ReservationInput!): Reservation
        deleteReservation(id: ID!): Reservation

        # game related mutations
        createGame(gameInput: GameInput!): Game
        updateGame(id: ID!, gameInput: GameInput!): Game
        deleteGame(id: ID!): Game 

        # club related mutations
        createClub(clubInput: ClubInput!): Club
        updateClub(id: ID!, clubInput: ClubInput!): Club
        deleteClub(id: ID!): Club

        # news related mutations
        createNews(newsInput: NewsInput!): News
        updateNews(id: ID!, newsInput: NewsInput!): News
        deleteNews(id: ID!): News
        
        # payment mutation
        doPayment(reservationId: ID!, paymentInput: PaymentInput!): Reservation
    }
`;

export default typeDefs;
