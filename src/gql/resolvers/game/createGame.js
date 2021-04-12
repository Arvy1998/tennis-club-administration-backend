import UserNotAuthorized from 'errors/UserNotAuthorized';

import Game from 'models/Game';
import User from 'models/User';
import _ from 'lodash';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';

const createGame = async (parent, args, { user }) => {
    let gameToEdit = args.gameInput;
    const userForAuthorization = await User.findOne({ email: user.email });

    /* only allow creating game if it's not another user */
    if (user.userId !== userForAuthorization._id.toString()) {
        throw new UserNotAuthorized();
    }

    let firstTeamsScore = 0;
    let secondTeamsScore = 0;

    gameToEdit.matches.map(match => {
        if (match.firstTeamScore > match.secondTeamScore) firstTeamsScore++;
        if (match.firstTeamScore < match.secondTeamScore) secondTeamsScore++;
        else {
            firstTeamsScore++;
            secondTeamsScore++;
        }
    });

    let firstTeamFirstPlayerRating;
    let firstTeamSecondPlayerRating;
    let secondTeamFirstPlayerRating;
    let secondTeamSecondPlayerRating;

    let firstTeamFirstPlayer = await User.findOne({ _id: gameToEdit.firstTeamFirstPlayerId });
    if (!firstTeamFirstPlayer.rating) {
        firstTeamFirstPlayerRating = 0;
    } else if (firstTeamFirstPlayer && firstTeamFirstPlayer.rating) {
        firstTeamFirstPlayerRating = firstTeamFirstPlayer.rating + firstTeamsScore;
    }

    let firstTeamSecondPlayer = await User.findOne({ _id: gameToEdit.firstTeamSecondPlayerId });
    if (!firstTeamSecondPlayer.rating) {
        firstTeamSecondPlayerRating = 0;
    } else if (firstTeamSecondPlayer && firstTeamSecondPlayer.rating) {
        firstTeamSecondPlayerRating = firstTeamSecondPlayer.rating + firstTeamsScore;
    }

    let secondTeamFirstPlayer = await User.findOne({ _id: gameToEdit.secondTeamFirstPlayerId });
    if (!secondTeamFirstPlayer.rating) {
        secondTeamFirstPlayerRating = 0;
    } else if (secondTeamFirstPlayer && secondTeamFirstPlayer.rating) {
        secondTeamFirstPlayerRating = secondTeamFirstPlayer + secondTeamsScore;
    }

    let secondTeamSecondPlayer = await User.findOne({ _id: gameToEdit.secondTeamSecondPlayerId });
    if (!secondTeamSecondPlayer.rating) {
        secondTeamSecondPlayerRating = 0;
    } else if (secondTeamSecondPlayer && secondTeamSecondPlayer.rating) {
        secondTeamSecondPlayerRating = secondTeamSecondPlayer + secondTeamsScore;
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
    return newGame;
};

export default createGame;
