import { createContext, useState } from "react"

export const Mode = createContext()

export default function Context({ children }) {

    const [mode, setMode] = useState('light')

    return (
        <Mode.Provider value={{ mode, setMode }}>
            <div className={mode}>
                {children}
            </div>
        </Mode.Provider>
    )
}
