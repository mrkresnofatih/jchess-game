import { css } from '@emotion/css'
import React from 'react'
import { APIAddNewMove } from '../api/addNewMove'
import { APIGetNewGame } from '../api/getNewGame'
import CenterBody from '../components/templates/CenterBody'
import Page from '../components/templates/Page'
import SideBarBody from '../components/templates/SideBarBody'
import PageButton from '../components/widgets/PageButton'
import PageHeader from '../components/widgets/PageHeader'
import { themeColorPalette } from '../constants/colors'
import { useGameIdSelector, useGameLastThreeMovesSelector, useGameMovesMadeCountSelector, useGameMovesSelector, useGameNextMoverSelector, useGameWinnerSelector } from '../redux/gameSelectors'
import { useSystemThemeSelector } from '../redux/systemSelectors'

const Game = () => {
    const pageHeaderButton = <PageButton
        text={'New Game!'}
        onClick={APIGetNewGame}
    />
    const pageHeaderComp = <PageHeader button={pageHeaderButton} />

    const systemTheme = useSystemThemeSelector()

    const styles = {
        gameBox: css`
            height: 20px;
            width: 20px;
            text-align: center;
            font-size: 12px;
            color: ${themeColorPalette[systemTheme]["color-6"]};
            border: 1px solid ${themeColorPalette[systemTheme]["color-5"]};
            background-color: ${themeColorPalette[systemTheme]["color-4"]};
    
            :hover {
                cursor: pointer;
                background-color: ${themeColorPalette[systemTheme]["color-1"]};
            }
        `,
        gameBoxRow: css`
            display: flex;
            flex-direction: row;
        `,
        relativePosition: css`
            position: relative;
        `,
        sidebarTitle: css`
            font-size: 24px;
            margin-bottom: 24px;
            color: ${themeColorPalette[systemTheme]["color-6"]};
        `,
        sidebarStatline: css`
            font-size: 16px;
            margin-bottom: 8px;
            color: ${themeColorPalette[systemTheme]["color-6"]};
            `,
        sidebarMoveline: css`
            font-size: 16px;
            margin-left: 16px;
            color: ${themeColorPalette[systemTheme]["color-6"]};
        `
    }
    
    const gameId = useGameIdSelector()
    const turnToMove = useGameNextMoverSelector()
    const totalMovesMade = useGameMovesMadeCountSelector()
    const lastThreeMoves = useGameLastThreeMovesSelector()
    const winner = useGameWinnerSelector()
    const sidebarContent = <div>
        <h2 className={styles.sidebarTitle}>GameStats</h2>
        {winner !== null ? (<p className={styles.sidebarStatline}>Winner: {winner}</p>) : (
            <p className={styles.sidebarStatline}>Turn-To-Move: {turnToMove}</p>
        )}
        <p className={styles.sidebarStatline}>Game-ID: {gameId}</p>
        <p className={styles.sidebarStatline}>Total-Moves-Made: {totalMovesMade}</p>
        {lastThreeMoves.length > 0 && <>
            <p className={styles.sidebarStatline}>Last-3-Moves-Made:</p>
            {lastThreeMoves.map((move, index) => (
                <p key={index} className={styles.sidebarMoveline}>{`--> ${move.positionX}-${move.positionY} (${move.moveBy})`}</p>
            ))}
        </>}
    </div>

    const gameMoves = useGameMovesSelector()
    
    const GameBoard = () => {
        return (
            <CenterBody>
                {[...Array(150)].map((_, rowIndex) => {
                    return (<div key={rowIndex} className={styles.gameBoxRow}>
                        {[...Array(150)].map((_, colIndex) => {
                            const keyId = colIndex + "-" + rowIndex
                            const marker = gameMoves[keyId] === undefined ? "" : (gameMoves[keyId].moveBy === "home" ? "X" : "O")
                            return <div 
                                key={keyId}
                                className={styles.gameBox} 
                                onClick={() => {
                                    console.log("clicked: " + keyId);
                                    APIAddNewMove(colIndex, rowIndex)
                                }}
                            >{marker}</div>
                        })}
                    </div>)
                })}
            </CenterBody>
        )
    }

    const pageBodyContent = <SideBarBody sidebarContent={sidebarContent} >
        <GameBoard/>
    </SideBarBody>

    return (
        <Page
            pageHeader={pageHeaderComp}
            pageBody={pageBodyContent}
        />
    )
}

export default Game

