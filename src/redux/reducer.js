import axios from 'axios';

const initialState = {
    id: '',
    username: '',
    email: '',
    watchlist: [],
    follows: [],
    recommendations: [],
    loggedIn: false
}

const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

export const loginUser = (loginInfo) => {
    const user = axios.post('/api/login', loginInfo)
    
    return {
        type: LOGGED_IN,
        payload: user
    }
}

export const logoutUser = () => {
    const user = axios.get('/api/logout').then(res => {
        return res.data
    })
    return {
        type: LOGGED_OUT,
        payload: user
    }
}

export default function reducer(state=initialState, action){
    switch(action.type){

        case `${LOGGED_IN}_FULFILLED`: {
            
            return {
                ...state,
                loggedIn: true,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                recommendations: action.payload.recommendations,
                follows: action.payload.follows,
                watchlist: action.payload.watchlist
            }
        }

        case `${LOGGED_IN}_REJECTED`: {
            return {
                ...state,
                errorMessages: action.payload
            }
        }

        case `${LOGGED_OUT}_FULFILLED`: {
            return {
                ...state,
                loggedIn: false
            }
        }

        case `${LOGGED_OUT}_REJECTED`: {
            return {
                ...state,
                errorMessages: action.payload
            }
        }
        default: {
            return state;
        }
    }
}