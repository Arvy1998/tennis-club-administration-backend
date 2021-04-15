import Badge from 'models/Badge';
import Club from 'models/Club';
import Reservation from 'models/Reservation';
import Game from 'models/Game';
import User from 'models/User';
import PlayField from '../models/PlayField';

/* authorization and user, resolver operations */
import loginUser from './resolvers/authorization/loginUser';
import registerUser from './resolvers/authorization/registerUser';
import getUser from './resolvers/user/getUser';
import editUser from './resolvers/user/editUser';
import deleteUser from './resolvers/user/deleteUser';
import createPlayField from './resolvers/playField/createPlayField';
import updatePlayField from './resolvers/playField/updatePlayField';
import getPlayField from './resolvers/playField/getPlayField';
import listPlayFields from './resolvers/playField/listPlayFields';
import deletePlayField from './resolvers/playField/deletePlayField';
import createGame from './resolvers/game/createGame';
import updateGame from './resolvers/game/updateGame';
import getGame from './resolvers/game/getGame';
import listGames from './resolvers/game/listGames';
import deleteGame from './resolvers/game/deleteGame';
import createReservation from './resolvers/reservation/createReservation';
import getReservationsByPlayfieldId from './resolvers/reservation/getReservationsByPlayfieldId';
import getReservationsByUserId from './resolvers/reservation/getReservationsByUserId';

require('dotenv').config();

const resolvers = {
  User: {
    async __resolveReference(reference) {
      const user = await User.findOne({ _id: reference.id });
      return user;
    },
    badges: async (parent) => {
      const badges = [];
      await Promise.all(parent.badgeIds.map(async (badgeId) => {
        const badge = await Badge.findById(badgeId);
        badges.push(badge);
      }));

      return badges;
    },
    club: async (parent) => {
      if (parent.clubId) {
        const club = await Club.findById(parent.clubId);
        return club;
      } return null;
    },
    reservations: async (parent) => {
      const reservations = [];
      await Promise.all(parent.reservations.map(async (reservationId) => {
        const reservation = await Reservation.findById(reservationId);
        reservations.push(reservation);
      }));

      return reservations;
    },
    games: async (parent, args) => {
      const games = await Game.find();

      const userGames = games.filter(game => 
        game.firstTeamFirstPlayerId === parent.id ||
        game.firstTeamSecondPlayerId === parent.id ||
        game.secondTeamFirstPlayerId === parent.id ||
        game.secondTeamSecondPlayerId === parent.id
      )

      return userGames;
    },
  },
  PlayField: {
    async __resolveReference(reference) {
      const playField = await PlayField.findOne({ _id: reference.id });
      return playField;
    },
  },
  Reservation: {
    async __resolveReference(reference) {
      const reservation = await Reservation.findOne({ _id: reference.id });
      return reservation;
    },
    user: async (parent) => {
      const user = await User.findOne({ _id: parent.userId });
      return user;
    },
    playField: async (parent) => {
      const playField = await PlayField.findOne({ _id: parent.playFieldId });
      return playField;
    }
  },
  Game: {
    firstTeamFirstPlayer: async (parent, args) => {
      const user = await User.findOne({ _id: parent.firstTeamFirstPlayerId });
      return user;
    },
    firstTeamSecondPlayer: async (parent, args) => {
      const user = await User.findOne({ _id: parent.firstTeamSecondPlayerId });
      return user;
    },
    secondTeamFirstPlayer: async (parent, args) => {
      const user = await User.findOne({ _id: parent.secondTeamFirstPlayerId });
      return user;
    },
    secondTeamSecondPlayer: async (parent, args) => {
      const user = await User.findOne({ _id: parent.secondTeamSecondPlayerId });
      return user;
    },
  },
  Query: {
    /* user related queries */
    getUser: async (parent, args, context) => getUser(parent, args, context),
    allUsers: async () => {
      const users = await User.find();
      return users;
    },
    getPlayers: async () => {
      const players = await User.find({ role: 'PLAYER' });
      return players;
    },
    /* playfield related queries */
    getPlayField: async (parent, args, context) => getPlayField(parent, args, context),
    listPlayFields: async (parent, args, context) => listPlayFields(parent, args, context),
    /* reservations related queries */
    getReservationsByPlayfieldId: async (parent, args, context) => getReservationsByPlayfieldId(parent, args, context),
    getReservationsByUserId: async (parent, args, context) => getReservationsByUserId(parent, args, context),
    /* games related queries */
    getGame: async (parent, args, context) => getGame(parent, args, context),
    listGames: async (parent, args, context) => listGames(parent, args, context),
  },
  Mutation: {
    /* user related mutations */
    loginUser: async (parent, args) => loginUser(parent, args),
    registerUser: async (parent, args) => registerUser(parent, args),
    editUser: async (parent, args, context) => editUser(parent, args, context),
    deleteUser: async (parent, args, context) => deleteUser(parent, args, context),
    /* playfield related mutations */
    createPlayField: async (parent, args, context) => createPlayField(parent, args, context),
    updatePlayField: async (parent, args, context) => updatePlayField(parent, args, context),
    deletePlayField: async (parent, args, context) => deletePlayField(parent, args, context),
    /* reservations related mutations */
    createReservation: async (parent, args, context) => createReservation(parent, args, context),
    /* games related mutations */
    createGame: async (parent, args, context) => createGame(parent, args, context),
    updateGame: async (parent, args, context) => updateGame(parent, args, context),
    deleteGame: async (parent, args, context) => deleteGame(parent, args, context),
  },
};

export default resolvers;
