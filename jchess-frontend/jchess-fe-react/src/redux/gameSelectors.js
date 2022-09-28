import { useSelector } from "react-redux";

export const useGameIdSelector = () => useSelector((state) => state.game.gameId)

export const useGameNextMoverSelector = () => useSelector((state) => Object.keys(state.game.moves).length % 2 === 0 ? "home" : "away")

export const useGameMovesMadeCountSelector = () => useSelector((state) => Object.keys(state.game.moves).length)

export const useGameLastThreeMovesSelector = () => useSelector((state) => 
    Object
        .values(state.game.moves)
        .map(move => { return { "positionX": move.positionX, "positionY": move.positionY, "moveBy": move.moveBy } })
        .slice(-3)
    )

export const useGameWinnerSelector = () => useSelector((state) => state.game.winner)
