import Badge from 'models/Badge';
import Club from 'models/Club';
import Reservation from 'models/Reservations';
import Game from 'models/Game';
import User from 'models/User';
import PlayField from '../models/PlayField';

/* authorization and user */
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
      const games = [];
      await Promise.all(parent.gameIds.map(async (gameId) => {
        const game = await Game.findById(gameId);
        games.push(game);
      }));

      return games;
    },
    friends: async (parent, args) => {
      const friends = [];
      await Promise.all(parent.friendIds.map(async (friendId) => {
        const friend = await User.findById(friendId);
        friends.push(friend);
      }));

      return friends;
    },
  },
  PlayField: {
    async __resolveReference(reference) {
      const playField = await PlayField.findOne({ _id: reference.id });
      return playField;
    },
  },
  Query: {
    /* user related queries */
    getUser: async (parent, args, context) => getUser(parent, args, context),
    getUsers: async (parent, args, { user }) => {

    },
    allUsers: async () => {
      const users = await User.find();
      return users;
    },
    /* playfield related queries */
    getPlayField: async (parent, args, context) => getPlayField(parent, args, context),
    listPlayFields: async (parent, args, context) => listPlayFields(parent, args, context),
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
  },
};

export default resolvers;
