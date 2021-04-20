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
import updateReservation from './resolvers/reservation/updateReservation';
import deleteReservation from './resolvers/reservation/deleteReservation';
import getClub from './resolvers/club/getClub';
import listClubs from './resolvers/club/listClubs';
import createClub from './resolvers/club/createClub';
import updateClub from './resolvers/club/updateClub';
import deleteClub from './resolvers/club/deleteClub';
import getClubByCreatorId from './resolvers/club/getClubByCreatorId';
import editUserById from './resolvers/user/editUserById';

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
  Club: {
    users: async (parent, args) => {
      let users = [];
      if (parent.userIds) {
        await Promise.all(parent.userIds.map(async (userId) => {
          const user = await User.findOne({ _id: userId });
          users.push(user);
        }));
      }
      return users;
    },
  },
  Query: {
    /* user related queries */
    getUser: async (parent, args, context) => getUser(parent, args, context),
    allUsers: async () => {
      const users = await User.find();
      const filtered = users.filter(user => user.status === 'ACTIVE');
      return filtered;
    },
    getPlayers: async () => {
      const players = await User.find({ role: 'PLAYER' });
      const filtered = players.filter(user => user.status === 'ACTIVE');
      return filtered;
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
    /* clubs related queries */
    getClub: async (parent, args, context) => getClub(parent, args, context),
    listClubs: async (parent, args, context) => listClubs(parent, args, context),
    getClubByCreatorId: async (parent, args, context) => getClubByCreatorId(parent, args, context),
  },
  Mutation: {
    /* user related mutations */
    loginUser: async (parent, args) => loginUser(parent, args),
    registerUser: async (parent, args) => registerUser(parent, args),
    editUser: async (parent, args, context) => editUser(parent, args, context),
    editUserById: async (parent, args, context) => editUserById(parent, args, context),
    deleteUser: async (parent, args, context) => deleteUser(parent, args, context),
    /* playfield related mutations */
    createPlayField: async (parent, args, context) => createPlayField(parent, args, context),
    updatePlayField: async (parent, args, context) => updatePlayField(parent, args, context),
    deletePlayField: async (parent, args, context) => deletePlayField(parent, args, context),
    /* reservations related mutations */
    createReservation: async (parent, args, context) => createReservation(parent, args, context),
    updateReservation: async (parent, args, context) => updateReservation(parent, args, context),
    deleteReservation: async (parent, args, context) => deleteReservation(parent, args, context),
    /* games related mutations */
    createGame: async (parent, args, context) => createGame(parent, args, context),
    updateGame: async (parent, args, context) => updateGame(parent, args, context),
    deleteGame: async (parent, args, context) => deleteGame(parent, args, context),
    /* clubs related mutations */
    createClub: async (parent, args, context) => createClub(parent, args, context),
    updateClub: async (parent, args, context) => updateClub(parent, args, context),
    deleteClub: async (parent, args, context) => deleteClub(parent, args, context),
  },
};

export default resolvers;
