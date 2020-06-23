import React from 'react'

export const Context = React.createContext({
    preloader: false,
    togglePreloader: () => {},
    user: undefined,
    resetUser: () => {},
    publishing: false,
    post: undefined,
    setPublishing: () => {},
    setPost: () => {},
    toast: false,
    toastMessage: '',
    toastIT: () => {}
})