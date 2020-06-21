import React from 'react'

export const Context = React.createContext({
    preloader: false,
    togglePreloader: () => {},
    user: undefined,
    resetUser: () => {},
    publishing: false,
    setPublishing: () => {},
    toast: false,
    toastMessage: '',
    toastIT: () => {}
})