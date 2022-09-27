import { css } from '@emotion/css'
import React from 'react'
import CenterBody from '../components/templates/CenterBody'
import Page from '../components/templates/Page'
import SideBarBody from '../components/templates/SideBarBody'
import PageButton from '../components/widgets/PageButton'
import PageHeader from '../components/widgets/PageHeader'
import { themeColorPalette } from '../constants/colors'
import { useSystemThemeSelector } from '../redux/systemSelectors'

const Game = () => {
    const pageHeaderButton = <PageButton
        text={'New Game!'}
        onClick={() => console.log("new game!")}
    />
    const pageHeaderComp = <PageHeader button={pageHeaderButton} />
    const sidebarContent = <div>content</div>

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
        `
    }
    
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

