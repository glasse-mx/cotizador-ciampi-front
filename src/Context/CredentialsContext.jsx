import React, { useState, useEffect } from 'react'

export const AppContext = React.createContext([
    {},
    () => { }
])

export const useAppContext = () => {
    return React.useContext(AppContext)
}

export const AppProvider = ({ children }) => {


    const initialCredentials = JSON.parse(localStorage.getItem('thai-credentials')) || null;
    const [credentials, setCredentials] = useState(initialCredentials);

    /**
     * Get credentials from localStorage
     * @returns void
     * 
     */
    useEffect(() => {
        let thai = localStorage.getItem('thai-credentials')
        thai = null !== thai ? JSON.parse(thai) : ''
        setCredentials(thai)
    }, [])

    /**
     * Save credentials in localStorage
     * @param {object} credentials
     * @returns void
     * 
     */
    useEffect(() => {
        if (credentials !== null) {
            localStorage.setItem('thai-credentials', JSON.stringify(credentials));
        }
    }, [credentials]);

    return (
        <AppContext.Provider value={[credentials, setCredentials]}>
            {children}
        </AppContext.Provider>
    )
}