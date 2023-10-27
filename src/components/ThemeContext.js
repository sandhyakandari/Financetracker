import { createContext, useContext, useState } from "react";

const ThemeContext=createContext();

export const ThemeProvider=({children})=>{

    const defaultValue=JSON.parse(localStorage.getItem('financetheme')) || '';
    const[theme,setTheme]=useState(defaultValue);
    const values={
        theme,setTheme
    }
    return(<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>)
}
export const useTheme=()=>useContext(ThemeContext);