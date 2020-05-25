import React from 'react'

export const Context = React.createContext({
    preloader: false,
    togglePreloader: () => {}
})