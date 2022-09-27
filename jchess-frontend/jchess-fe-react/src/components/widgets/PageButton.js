import { css } from '@emotion/css'
import React from 'react'
import { themeColorPalette } from '../../constants/colors'
import { useSystemThemeSelector } from '../../redux/systemSelectors'

const PageButton = ({text, onClick}) => {  
  const systemTheme = useSystemThemeSelector()

  const styles = {
    container: css`
        padding: 8px 16px;
        color: ${themeColorPalette[systemTheme]["color-6"]};
        background-color: ${themeColorPalette[systemTheme]["color-3"]};
        border-radius: 4px;

        :hover {
            opacity: 0.9;
            cursor: pointer;
        }
    `
  }

  return (
    <div 
        className={styles.container}
        onClick={onClick}
    >{text}</div>
  )
}

export default PageButton
