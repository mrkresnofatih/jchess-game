import { css, cx } from '@emotion/css'
import React from 'react'
import { useDispatch } from 'react-redux'
import { APIGetNewGame } from '../api/getNewGame'
import CenterBody from '../components/templates/CenterBody'
import Page from '../components/templates/Page'
import PageButton from '../components/widgets/PageButton'
import PageHeader from '../components/widgets/PageHeader'
import { themeColorPalette } from '../constants/colors'
import { pageNames } from '../constants/routing'
import { useSystemThemeSelector } from '../redux/systemSelectors'
import { setPage } from '../redux/systemSlice'

const Home = () => {
    const dispatch = useDispatch()
    const goToNewGameAction = () => APIGetNewGame(() => dispatch(setPage(pageNames.GAME)))

    const systemTheme = useSystemThemeSelector()

    const styles = {
        centralizeText: css`
            text-align: center;
        `,
        welcomeText: css`
            color: ${themeColorPalette[systemTheme]["color-1"]};
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 6px;
        `,
        welcomeSubText: css`
            font-size: 24px;
            font-weight: 300;
        `
    }

    const pageHeaderButton = <PageButton 
        text={'Play Now!'} 
        onClick={goToNewGameAction} 
    />
    const pageHeaderComp = <PageHeader button={pageHeaderButton}/>
    const pageBodyContent = <CenterBody>
        <h3 className={cx(styles.centralizeText, styles.welcomeText)}>Welcome to J-Chess!</h3>
        <p className={cx(styles.centralizeText, styles.welcomeSubText)}>Play Javanese chess for free!</p>
    </CenterBody>

    return (
        <Page
            pageHeader={pageHeaderComp}
            pageBody={pageBodyContent}
        />
    )
}

export default Home

