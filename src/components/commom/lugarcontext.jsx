import React, {useState, useEffect} from "react";


export const LugarContext = React.createContext('');


export const LugarProvider = (props) => {

    const [lugarIDC, setLugarIDC] = useState('');

        return (
            <LugarContext.Provider value={{lugarIDC, setLugarIDC}}>
                {props.children}
            </LugarContext.Provider>
        )
    }