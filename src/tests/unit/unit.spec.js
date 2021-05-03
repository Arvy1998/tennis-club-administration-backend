import getUser from '../../gql/resolvers/user/getUser';
import editUser from '../../gql/resolvers/user/editUser';
import deleteUser from '../../gql/resolvers/user/deleteUser';
import createPlayField from '../../gql/resolvers/playField/createPlayField';
import updatePlayField from '../../gql/resolvers/playField/updatePlayField';
import getPlayField from '../../gql/resolvers/playField/getPlayField';
import listPlayFields from '../../gql/resolvers/playField/listPlayFields';
import deletePlayField from '../../gql/resolvers/playField/deletePlayField';
import createGame from '../../gql/resolvers/game/createGame';
import updateGame from '../../gql/resolvers/game/updateGame';
import getGame from '../../gql/resolvers/game/getGame';
import listGames from '../../gql/resolvers/game/listGames';
import deleteGame from '../../gql/resolvers/game/deleteGame';
import createReservation from '../../gql/resolvers/reservation/createReservation';
import getReservationsByPlayfieldId from '../../gql/resolvers/reservation/getReservationsByPlayfieldId';
import getReservationsByUserId from '../../gql/resolvers/reservation/getReservationsByUserId';
import updateReservation from '../../gql/resolvers/reservation/updateReservation';
import deleteReservation from '../../gql/resolvers/reservation/deleteReservation';
import getClub from '../../gql/resolvers/club/getClub';
import listClubs from '../../gql/resolvers/club/listClubs';
import createClub from '../../gql/resolvers/club/createClub';
import updateClub from '../../gql/resolvers/club/updateClub';
import deleteClub from '../../gql/resolvers/club/deleteClub';
import getClubByCreatorId from '../../gql/resolvers/club/getClubByCreatorId';
import editUserById from '../../gql/resolvers/user/editUserById';
import listBadges from '../../gql/resolvers/badge/listBadges';
import createNews from '../../gql/resolvers/news/createNews';
import updateNews from '../../gql/resolvers/news/updateNews';
import deleteNews from '../../gql/resolvers/news/deleteNews';
import getNews from '../../gql/resolvers/news/getNews';
import listNews from '../../gql/resolvers/news/listNews';

import connectDatabase from '../../connectDatabase';

connectDatabase();

const context = {
    user: {
        userId: '607dd689093f9e1848684a8a',
        role: 'ADMIN',
        password: '$2b$10$CF/B0Sm2CHDTk4x7PLb59.GJeWO.dPkJlRpEluNJb0KRI/ExvaXVW',
        email: 'admin@admin.lt',
    },
};

describe("getUser()", () => {
    it("should return user by given mail address", async () => {
        expect((await getUser(null, { email: 'admin@admin.lt' }, context)).email).toEqual("admin@admin.lt");
    });
});

describe("editUser()", () => {
    it("should return edited user object", async () => {
        expect((await editUser(null, {
            email: 'admin@admin.lt',
            input: {
                firstName: 'Arvydas',
                mainHand: 'Right',
                level: 'LEVEL_6_0_7_0',
            },
        }, context)).firstName).toEqual("Arvydas");
    });
});

describe("deleteUser()", () => {
    it("should return removed user's stringified ID value", async () => {
        expect((await deleteUser(null, { id: '607b527f074ce758b89351c3' }, context))._id).toEqual("607b527f074ce758b89351c3");
    });
});

describe("createPlayField()", () => {
    it("should create a new playfield property in database and return new object's stringified ID value", async () => {
        expect((await createPlayField(null, {
            input: {
                title: 'Auto Test 0',
                description: 'Auto Test 0',
            },
        }, context))).toHaveProperty('_id');
    });
});

describe("updatePlayField()", () => {
    it("should update a new playfield property in database and return updated playfield's object", async () => {
        expect((await updatePlayField(null, {
            id: '607dd9c007bfb26870820fcb',
            input: {
                title: 'Auto Test 1',
                description: 'Auto Test 1',
            },
        }, context)).title).toEqual("Auto Test 1");
    });
});

describe("getPlayField()", () => {
    it("should fetch single playfield object by given stringified ID value", async () => {
        expect((await getPlayField(null, { id: '6070d1cacc3e806980bbd469' }, context)).ownerPhoneNumber).toEqual("(8 315) 75 490");
    });
});

describe("listPlayFields()", () => {
    it("should fetch all existing playfields from database, expected an response as an array", async () => {
        expect((await listPlayFields(null, null, context)).length > 0).toEqual(true);
    });
});

describe("deletePlayField()", () => {
    it("should remove existing playfield object from database by giving stringified object's ID value", async () => {
        expect((await deletePlayField(null, { id: '60820867b0c749494095f770' }, context))._id).toEqual("60820867b0c749494095f770");
    });
});

describe("createGame()", () => {
    it("should create a new game's object and return it's object, owns ID property", async () => {
        expect((await createGame(null, {
            input: {
                date: '2021-04-17T21:20:17.817+00:00',
                firstTeamFirstPlayerId: '60319dd8e50cf149204925ed',
                secondTeamFirstPlayerId: '60319d9de50cf149204925eb',
                matches: [{
                    firstTeamScore: 1,
                    secondTeamScore: 5,
                }, {
                    firstTeamScore: 0,
                    secondTeamScore: 1,
                }],
            },
        }, context))).toHaveProperty('_id');
    });
});

describe("updateGame()", () => {
    it("should return edited game's object", async () => {
        expect((await updateGame(null, {
            id: '607c3816e355f0237c160525',
            input: {
                matches: [{
                    firstTeamScore: 0,
                    secondTeamScore: 5,
                }, {
                    firstTeamScore: 0,
                    secondTeamScore: 2,
                }],
            },
        }, context))).toHaveProperty('_id');
    });
});

describe("getGame()", () => {
    it("should return single game's object by given stringified object's ID value", async () => {
        expect((await getGame(null, { id: '607c3816e355f0237c160525' }, context))._id).toEqual("607c3816e355f0237c160525");
    });
});

describe("listGames()", () => {
    it("should return list of the game's objects, expected an response as an array", async () => {
        expect((await listGames(null, null, context)).length > 0).toEqual(true);
    });
});

describe("deleteGame()", () => {
    it("should remove existing game's object from database by giving stringified object's ID value", async () => {
        expect((await deleteGame(null, { id: '60820867b0c749494095f770' }, context))._id).toEqual("60820867b0c749494095f770");
    });
});

describe("createReservation()", () => {
    it("should create a new reservation's object and return it's object, owns ID property", async () => {
        expect((await createReservation(null, {
            input: {
                startDateTime: '2021-06-17T10:20:17.817+00:00',
                endDateTime: '2021-06-17T12:20:17.817+00:00',
                userId: '60319d9de50cf149204925eb',
                playFieldId: '607456d8207b055c7c33dcfa',
                totalCost: 47.97,
                status: 'Active',
            },
        }, context))).toHaveProperty('_id');
    });
});

describe("getReservationsByPlayfieldId()", () => {
    it("should return list of reservation's objects by given stringified object's ID value of playfield's _id:ObjectId", async () => {
        expect((await getReservationsByPlayfieldId(null, { playFieldId: '6070d1cacc3e806980bbd469' }, context)).length > 0).toEqual(true);
    });
});

describe("getReservationsByUserId()", () => {
    it("should return list of reservation's objects by given stringified object's ID value of user's _id:ObjectId", async () => {
        expect((await getReservationsByUserId(null, { userId: '607dd689093f9e1848684a8a' }, context)).length > 0).toEqual(true);
    });
});

describe("updateReservation()", () => {
    it("should return edited reservation's object", async () => {
        expect((await updateReservation(null, {
            id: '607b527f074ce758b89351c3',
            input: {
                status: 'Canceled',
            },
        }, context))).toHaveProperty('_id');
    });
});

describe("deleteReservation()", () => {
    it("should remove existing reservation's object from database by giving stringified object's ID value", async () => {
        expect((await deleteReservation(null, { id: '6070d1cacc3e806980bbd469' }, context))._id).toEqual("6070d1cacc3e806980bbd469");
    });
});

describe("getClub()", () => {
    it("should return single club's object by given stringified object's ID value", async () => {
        expect((await getClub(null, { id: '607c7c57f716524a34e7a1e0' }, context)).creatorId).toEqual("606cef5502f47a54f0c045eb");
    });
});

describe("listClubs()", () => {
    it("should return list of the club's objects, expected an response as an array", async () => {
        expect((await listClubs(null, null, context)).length > 0).toEqual(true);
    });
});

describe("createClub()", () => {
    it("should create a new club's object and return it's object, owns ID property", async () => {
        expect((await createClub(null, {
            input: {
                title: 'Test Club',
                description: 'Test Club Description'
            },
        }, context))).toHaveProperty('_id');
    });
});

describe("updateClub()", () => {
    it("should return edited club's object", async () => {
        expect((await updateClub(null, {
            id: '607dd9c007bfb26870820fcb',
            input: {
                title: 'Teniso Megėjai!',
            },
        }, context))).toHaveProperty('_id');
    });
});

describe("deleteClub()", () => {
    it("should remove existing club's object from database by giving stringified object's ID value", async () => {
        expect((await deleteClub(null, { id: '60820867b0c749494095f770' }, context))._id).toEqual("60820867b0c749494095f770");
    });
});

describe("getClubByCreatorId()", () => {
    it("should return club's object by given stringified object's ID value of user's _id:ObjectId as a creator's ID value", async () => {
        expect((await getClubByCreatorId(null, { id: '606cef5502f47a54f0c045eb' }, context))._id).toEqual("607c7c57f716524a34e7a1e0");
    });
});

describe("editUserById()", () => {
    it("should return edited user object by user's _id:ObjectId", async () => {
        expect((await editUserById(null, {
            id: '607dd689093f9e1848684a8a',
            input: {
                firstName: 'Arvydas',
                mainHand: 'Right',
                level: 'LEVEL_6_0_7_0',
            },
        }, context)).mainHand).toEqual("Right");
    });
});

describe("listBadges()", () => {
    it("should return list of the badge's objects, expected an response as an array", async () => {
        expect((await listBadges(null, null, context)).length > 0).toEqual(true);
    });
});

describe("createNews()", () => {
    it("should create a new news object and return it's object, owns ID property", async () => {
        expect((await createNews(null, {
            input: {
                title: 'Test',
                description: 'Test',
                firstClubPlayingId: '607dd9c007bfb26870820fcb',
                secondClubPlayingId: '607c7c57f716524a34e7a1e0',
                playFieldId: '607459c5207b055c7c33dcfd',
                date: '2021-04-26T14:00'
            },
        }, context)).title).toEqual("Test");
    });
});

describe("updateNews()", () => {
    it("should return edited news object", async () => {
        expect((await updateNews(null, {
            id: '6081b057093f9e1848684a8c',
            input: {
                title: 'Test 2',
                date: '2021-04-26T14:00'
            },
        }, context)).title).toEqual("Test 2");
    });
});

describe("deleteNews()", () => {
    it("should remove existing new's object from database by giving stringified object's ID value", async () => {
        expect((await deleteNews(null, { id: '607c7c57f716524a34e7a1e0' }, context))._id).toEqual("607c7c57f716524a34e7a1e0");
    });
});

describe("getNews()", () => {
    it("should return single new's object by given stringified object's ID value", async () => {
        expect((await getNews(null, { id: '6081f43a850f3d4dc4bc51ac' }, context))._id).toEqual("6081f43a850f3d4dc4bc51ac");
    });
});

describe("listNews()", () => {
    it("should return list of the news objects, expected an response as an array", async () => {
        expect((await listNews(null, null, context)).length > 0).toEqual(true);
    });
});