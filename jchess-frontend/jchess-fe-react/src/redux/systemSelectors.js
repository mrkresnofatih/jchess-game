import { useSelector } from "react-redux";

export const useSystemPageSelector = () => useSelector((state) => state.system.page)

export const useSystemThemeSelector = () => useSelector((state) => state.system.theme)