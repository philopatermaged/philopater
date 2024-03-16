import { jwtDecode } from 'jwt-decode';
import { createContext, useState } from 'react';


export let UserContext = createContext()

export function UserContextProvider({ children }) {
    let [userToken, setToken] = useState(null)
    let data = null
    if (userToken != null) {
        data = jwtDecode(userToken)
    }
    return <UserContext.Provider value={{ data, userToken, setToken }}>
        {children}
    </UserContext.Provider>


}