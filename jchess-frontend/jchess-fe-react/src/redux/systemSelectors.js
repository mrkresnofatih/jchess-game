import { useSelector } from "react-redux";

export const useSystemPageSelector = () => useSelector((state) => state.system.page)

export const useSystemThemeSelector = () => useSelector((state) => state.system.theme)

export const useSystemIsLoadingSelector = () => useSelector((state) => state.system.loadingModal)

export const useSystemErrorSelector = () => useSelector((state) => state.system.errorModalMessage)

export const useSystemSuccessSelector = () => useSelector((state) => state.system.successModalMessage)
