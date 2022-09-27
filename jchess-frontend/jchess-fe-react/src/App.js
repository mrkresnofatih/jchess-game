import React from "react";
import { pageNames } from "./constants/routing";
import Game from "./pages/Game";
import Home from "./pages/Home";
import { useSystemPageSelector } from "./redux/systemSelectors";

function App() {
  const systemPage = useSystemPageSelector()

  switch (systemPage) {
    case pageNames.HOME:
      return (
        <Home/>
      )
    case pageNames.GAME:
      return (
        <Game/>
      )
    default:
      return (
        <div>Error 404</div>
      )
  }
}

export default App;
