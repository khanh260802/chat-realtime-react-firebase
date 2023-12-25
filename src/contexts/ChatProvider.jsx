import React, { createContext } from 'react'
import { useReducer } from 'react';
export const ChatContext = createContext();   
const initialState = {
    chatId: "null",
    user: {}
}
const reducer = (state, action) => { 
    switch(action.type) {
        case "CHANGE_USER": 
            return {...state, ...action.payload};
        default:
            return state
    }
}
const ChatProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState); 
    return (
        <ChatContext.Provider value={{chatData:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider