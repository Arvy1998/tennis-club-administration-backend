import Badge from 'models/Badge';
import Club from 'models/Club';
import Reservation from 'models/Reservations';
import Game from 'models/Game';
import User from 'models/User';
import File from 'models/File';

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
    getUser: async (parent, args) => {

    },
    getUsers: async (parent, args) => {

    },
  },
  Mutation: {
    /* user related mutations */
    loginUser: async (parent, args) => {

    },
    registerUser: async (parent, args) => {

    },
    editUser: async (parent, args) => {

    },
    deleteUser: async (parent, args) => {

    },
  },
};

export default resolvers;
