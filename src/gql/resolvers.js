import DuplicateUser from 'errors/DuplicateUser';
import UserDoesNotExist from 'errors/UserDoesNotExist';
import PasswordsMissmatch from 'errors/PasswordsMissmatch';

import Badge from 'models/Badge';
import Club from 'models/Club';
import Reservation from 'models/Reservations';
import Game from 'models/Game';
import User from 'models/User';
import File from 'models/File';

import bcrypt from 'bcrypt';

import signToken from 'utils/signToken';

require('dotenv').config();

const resolvers = {
  User: {
    async __resolveReference(reference) {
      const user = await User.findOne({ _id: reference.id });
      return user;
    },
    badges: async (parent, args) => {
      const badges = [];
      await Promise.all(parent.badgeIds.map(async (badgeId) => {
        const badge = await Badge.findById(badgeId);
        badges.push(badge);
      }));

      return badges;
    },
    club: async (parent, args) => {
      if (parent.clubId) {
        const club = await Club.findById(parent.clubId);
        return club;
      } return null;
    },
    reservations: async (parent, args) => {
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
    userProfileFile: async (parent, args) => {
      if (parent.userProfileFileId) {
        const file = await File.findById(parent.userProfileFileId);
        return file;
      } return null;
    },
  },
  Query: {
    /* user related queries */
    getUser: async (parent, args, { user }) => {
      const userToReturn = await User.findOne({ email: args.email });
      console.log({ user });
      return userToReturn;
    },
    getUsers: async (parent, args, { user }) => {

    },
    allUsers: async (parent, args, { user }) => {

    },
  },
  Mutation: {
    /* user related mutations */
    loginUser: async (parent, args) => {
      const userWithHash = await User.findOne({ email: args.userInput.email });
      if (!userWithHash) {
        throw new UserDoesNotExist();
      }

      const match = new Promise((resolve, reject) => {
        bcrypt.compare(args.userInput.password, userWithHash.password, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
      });

      if (!(await match)) {
        throw new PasswordsMissmatch();
      }

      const token = await signToken(userWithHash);
      return token;
    },
    registerUser: async (parent, args) => {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new DuplicateUser();
      }

      /* encrypt password before saving it to the mongo database */
      const passwordHash = await bcrypt.hash(args.userInput.password, 10);
      const userToRegister = args.userInput;
      userToRegister.password = passwordHash;

      const newUser = await User.create(userToRegister);
      const token = await signToken(newUser);

      return token;
    },
    editUser: async (parent, args, { user }) => {

    },
    deleteUser: async (parent, args, { user }) => {

    },
  },
};

export default resolvers;
