import UserNotAuthorized from 'errors/UserNotAuthorized';

import Game from 'models/Game';
import User from 'models/User';
import _ from 'lodash';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';
import userGameBadgeCriterias from 'utils/userGameBadgeCriterias';

const createGame = async (parent, args, { user }) => {
    let gameToEdit = args.gameInput;
    const userForAuthorization = await User.findOne({ email: user.email });

    /* only allow creating game if it's not another user */
    if (user.userId !== userForAuthorization._id.toString()) {
        throw new UserNotAuthorized();
    }

    let firstTeamsScore = 0;
    let secondTeamsScore = 0;

    let includesTrenner = false;
    let peopleCount = 0;

    gameToEdit.matches.map(match => {
        if (match.firstTeamScore > match.secondTeamScore) firstTeamsScore++;
        if (match.firstTeamScore < match.secondTeamScore) secondTeamsScore++;
        else {
            firstTeamsScore++;
            secondTeamsScore++;
        }
    });

    let firstTeamFirstPlayerRating = 0;
    let firstTeamSecondPlayerRating = 0;
    let secondTeamFirstPlayerRating = 0;
    let secondTeamSecondPlayerRating = 0;

    let firstTeamFirstPlayer = await User.findOne({ _id: gameToEdit.firstTeamFirstPlayerId });
    if (firstTeamFirstPlayer && !firstTeamFirstPlayer.rating) {
        firstTeamFirstPlayerRating = 1;
    } 
    if (firstTeamFirstPlayer) {
        firstTeamFirstPlayerRating = firstTeamFirstPlayer.rating + firstTeamsScore;
        peopleCount++;

        if (firstTeamFirstPlayer.role === 'TRENNER') {
            includesTrenner = true;
        }
    }

    let firstTeamSecondPlayer = await User.findOne({ _id: gameToEdit.firstTeamSecondPlayerId });
    if (firstTeamSecondPlayer && !firstTeamSecondPlayer.rating) {
        firstTeamSecondPlayerRating = 1;
    } 
    if (firstTeamSecondPlayer) {
        firstTeamSecondPlayerRating = firstTeamSecondPlayer.rating + firstTeamsScore;
        peopleCount++;

        if (firstTeamSecondPlayer.role === 'TRENNER') {
            includesTrenner = true;
        }
    }

    let secondTeamFirstPlayer = await User.findOne({ _id: gameToEdit.secondTeamFirstPlayerId });
    if (secondTeamFirstPlayer && !secondTeamFirstPlayer.rating) {
        secondTeamFirstPlayerRating = 1;
    } 
    if (secondTeamFirstPlayer) {
        secondTeamFirstPlayerRating = secondTeamFirstPlayer.rating + secondTeamsScore;
        peopleCount++;

        if (secondTeamFirstPlayer.role === 'TRENNER') {
            includesTrenner = true;
        }
    }

    let secondTeamSecondPlayer = await User.findOne({ _id: gameToEdit.secondTeamSecondPlayerId });
    if (secondTeamSecondPlayer && !secondTeamSecondPlayer.rating) {
        secondTeamSecondPlayerRating = 1;
    } 
    if (secondTeamSecondPlayer) {
        secondTeamSecondPlayerRating = secondTeamSecondPlayer.rating + secondTeamsScore;
        peopleCount++;
        
        if (secondTeamSecondPlayer.role === 'TRENNER') {
            includesTrenner = true;
        }
    }

    await User.findOneAndUpdate(
        { _id: gameToEdit.firstTeamFirstPlayerId },
        { rating: firstTeamFirstPlayerRating },
        { new: true },
    );

    if (gameToEdit.firstTeamSecondPlayerId) {
        await User.findOneAndUpdate(
            { _id: gameToEdit.firstTeamSecondPlayerId },
            { rating: firstTeamSecondPlayerRating },
            { new: true },
        );
    }

    await User.findOneAndUpdate(
        { _id: gameToEdit.secondTeamFirstPlayerId },
        { rating: secondTeamFirstPlayerRating },
        { new: true },
    );

    if (gameToEdit.secondTeamSecondPlayerId) {
        await User.findOneAndUpdate(
            { _id: gameToEdit.secondTeamSecondPlayerId },
            { rating: secondTeamSecondPlayerRating },
            { new: true },
        );
    }

    gameToEdit.date = new Date();

    const newGame = await Game.create(filterNotDefinedFields(gameToEdit));

    await Promise.all([
        userGameBadgeCriterias(
            firstTeamFirstPlayer,
            firstTeamFirstPlayerRating,
            gameToEdit.firstTeamFirstPlayerId,
            includesTrenner,
            firstTeamsScore > secondTeamsScore ? 'WON' : 'LOST',
            peopleCount,
        ),
        userGameBadgeCriterias(
            firstTeamSecondPlayer,
            firstTeamSecondPlayerRating,
            gameToEdit.firstTeamSecondPlayerId,
            includesTrenner,
            firstTeamsScore > secondTeamsScore ? 'WON' : 'LOST',
            peopleCount,
        ),
        userGameBadgeCriterias(
            secondTeamFirstPlayer,
            secondTeamFirstPlayerRating,
            gameToEdit.secondTeamFirstPlayerId,
            includesTrenner,
            firstTeamsScore < secondTeamsScore ? 'WON' : 'LOST',
            peopleCount,
        ),
        userGameBadgeCriterias(
            secondTeamSecondPlayer,
            secondTeamSecondPlayerRating,
            gameToEdit.secondTeamSecondPlayerId,
            includesTrenner,
            firstTeamsScore < secondTeamsScore ? 'WON' : 'LOST',
            peopleCount,
        ),
    ])

    return newGame;
};

export default createGame;
