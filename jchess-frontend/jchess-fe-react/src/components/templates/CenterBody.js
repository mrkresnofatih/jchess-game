import { css } from '@emotion/css'
import React from 'react'
import { themeColorPalette } from '../../constants/colors'
import { useSystemThemeSelector } from '../../redux/systemSelectors'

const CenterBody = ({children}) => {
    const systemTheme = useSystemThemeSelector()

    const styles = {
        bodyContainer: css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 69px);
          background-color: ${themeColorPalette[systemTheme]["color-5"]};
          overflow: hidden;
        `
      }
  return (
    <div className={styles.bodyContainer}>
        {children}
    </div>
  )
}

export default CenterBody

