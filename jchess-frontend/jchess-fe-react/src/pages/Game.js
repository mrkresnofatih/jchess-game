import { css } from '@emotion/css'
import React from 'react'
import CenterBody from '../components/templates/CenterBody'
import Page from '../components/templates/Page'
import SideBarBody from '../components/templates/SideBarBody'
import PageButton from '../components/widgets/PageButton'
import PageHeader from '../components/widgets/PageHeader'
import { themeColorPalette } from '../constants/colors'
import { useGameLastThreeMovesSelector, useGameMovesMadeCountSelector, useGameNextMoverSelector, useGameWinnerSelector } from '../redux/gameSelectors'
import { useSystemThemeSelector } from '../redux/systemSelectors'

const Game = () => {
    const pageHeaderButton = <PageButton
        text={'New Game!'}
        onClick={() => console.log("new game!")}
    />
    const pageHeaderComp = <PageHeader button={pageHeaderButton} />

    const systemTheme = useSystemThemeSelector()

    const styles = {
        gameBox: css`
            height: 20px;
            width: 20px;
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
        `
    }

    const turnToMove = useGameNextMoverSelector()
    const totalMovesMade = useGameMovesMadeCountSelector()
    const lastThreeMoves = useGameLastThreeMovesSelector()
    console.log(lastThreeMoves)
    const winner = useGameWinnerSelector()
    const sidebarContent = <div>
        <h2 className={styles.sidebarTitle}>GameStats</h2>
        {winner !== null ? (<p className={styles.sidebarStatline}>Winner: {winner}</p>) : (
            <p className={styles.sidebarStatline}>Turn-To-Move: {turnToMove}</p>
        )}
        <p className={styles.sidebarStatline}>Total-Moves-Made: {totalMovesMade}</p>
        {lastThreeMoves.length > 0 && <>
            <p className={styles.sidebarStatline}>Last-3-Moves-Made:</p>
            {lastThreeMoves.map((move, index) => (
                <p key={index} className={styles.sidebarMoveline}>{`--> ${move.positionX}-${move.positionY} (${move.moveBy})`}</p>
            ))}
        </>}
    </div>
    
    const GameBoard = () => {
        return (
            <CenterBody>
                {[...Array(150)].map((_, rowIndex) => {
                    return (<div key={rowIndex} className={styles.gameBoxRow}>
                        {[...Array(150)].map((_, colIndex) => {
                            return <div 
                                key={rowIndex + "-" + colIndex}
                                className={styles.gameBox} 
                                onClick={() => console.log("clicked: " + rowIndex + " - " + colIndex)}
                            />
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

