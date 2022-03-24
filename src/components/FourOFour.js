import React from "react";
import {ThemeContext} from "../contexts/theme";

export default function FourOFour(props) {
  console.log(props);
  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <p className={`error bg-${theme}`}>404</p>
      )}
    </ThemeContext.Consumer>
  )
}