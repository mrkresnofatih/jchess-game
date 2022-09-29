import { css } from '@emotion/css'
import React from 'react'
import { useDispatch } from 'react-redux'
import { themeColorPalette } from '../../constants/colors'
import { useSystemErrorSelector, useSystemIsLoadingSelector, useSystemSuccessSelector, useSystemThemeSelector } from '../../redux/systemSelectors'
import { hideErrorModal, hideSuccessModal } from '../../redux/systemSlice'

const Page = ({pageHeader, pageBody}) => {
  const dispatch = useDispatch()
  const isLoading = useSystemIsLoadingSelector()
  const errMessage = useSystemErrorSelector()
  const infoMessage = useSystemSuccessSelector()
  return (
    <div>
        {isLoading && <Modal
          type={"LOADING"}
          message={"please wait"}
        />}
        {errMessage && <Modal
          type={"ERROR"}
          message={errMessage}
          followupText={"Close"}
          followupAction={() => dispatch(hideErrorModal())}
        />}
        {infoMessage && <Modal
          type={"INFO"}
          message={infoMessage}
          followupText={"Ok"}
          followupAction={() => dispatch(hideSuccessModal())}
        />}
        {pageHeader}
        {pageBody}
    </div>
  )
}

export default Page

const Modal = ({type, message, followupText, followupAction}) => {
  const systemTheme = useSystemThemeSelector()
  const styles = {
    backdrop: css`
      background-color: ${themeColorPalette[systemTheme]["color-6"]};
      opacity: 0.5;
      height: 100vh;
      width: 100vw;
      position: absolute;
      z-index: 10;
    `,
    dialog: css`
      background-color: ${themeColorPalette[systemTheme]["color-1"]};
      padding: 24px;
      position: absolute;
      z-index: 15;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    `,
    title: css`
      color: ${themeColorPalette[systemTheme]["color-5"]};
      font-size: 20px;
      font-weight: 500;
    `,
    followup: css`
      margin-top: 20px;
      background-color: ${themeColorPalette[systemTheme]["color-3"]};
      color: ${themeColorPalette[systemTheme]["color-6"]};
      padding: 8px 24px;

      :hover {
        cursor: pointer;
        opacity: 0.9;
      }
    `
  }
  return (
    <>
      <div className={styles.dialog}>
        <h3 className={styles.title}>[{type.toUpperCase()}: {message.toUpperCase()}]</h3>
        {followupText && <label className={styles.followup} onClick={followupAction}>{followupText}</label>}
      </div>
      <div className={styles.backdrop}/>
    </>
  )
}
