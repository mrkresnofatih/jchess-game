import { css } from '@emotion/css'
import React from 'react'
import { themeColorPalette } from '../../constants/colors'
import { useSystemThemeSelector } from '../../redux/systemSelectors'

const SideBarBody = ({children, sidebarContent}) => {
    const systemTheme = useSystemThemeSelector()

    const styles = {
        container: css`
            display: flex;
            height: calc(100vh - 69px);
            background-color: ${themeColorPalette[systemTheme]["color-5"]};
        `,
        sidebarContainer: css`
            display: flex;
            width: 350px;
            padding: 16px;
            flex-direction: column;
            background-color: ${themeColorPalette[systemTheme]["color-3"]};
        `,
        flexContainer: css`
            width: calc(100vw - 350px);
            background-color: palevioletred;
        `
    }

  return (
    <div className={styles.container}>
        <div className={styles.flexContainer}>
            {children}
        </div>
        <div className={styles.sidebarContainer}>
            {sidebarContent}
        </div>
    </div>
  )
}

export default SideBarBody

