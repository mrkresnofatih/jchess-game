import { css } from '@emotion/css'
import React from 'react'
import { useDispatch } from 'react-redux'
import {themeColorPalette} from '../../constants/colors'
import { pageNames } from '../../constants/routing'
import { useSystemThemeSelector } from '../../redux/systemSelectors'
import { setPage } from '../../redux/systemSlice'

const PageHeader = ({button}) => {
  const dispatch = useDispatch()
  const goToHomePageAction = () => dispatch(setPage(pageNames.HOME))

  const systemTheme = useSystemThemeSelector()

  const styles = {
    container: css`
        padding: 16px;
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: ${themeColorPalette[systemTheme]["color-1"]};
        color: white;
    `
  }

  return (
    <div className={styles.container}>
        <h2 onClick={goToHomePageAction}>JChess</h2>
        {button}
    </div>
  )
}

export default PageHeader

