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
const UPDATED_USER = 'UPDATED_USER';

export const loginUser = (loginInfo) => {
    const user = axios.post('/api/login', loginInfo);
    
    return {
        type: LOGGED_IN,
        payload: user
    }
}

export const logoutUser = () => {

    const user = axios.delete('/api/logout');

    return {
        type: LOGGED_OUT,
        payload: user
    }
}

export const updateUser = (updatedUser) => {
    const user = axios.put('/api/users', updatedUser);

    return {
        type: UPDATED_USER,
        payload: user
    }
}

export default function reducer(state=initialState, action){

    switch(action.type){

        case `${LOGGED_IN}_FULFILLED`: {
            
            
            const { id, username, email, recommendations, watchlist, follows } = action.payload.data;
            
            return {
                ...state,
                loggedIn: true,
                id,
                username,
                email,
                recommendations,
                follows,
                watchlist
            }
        }

        case `${LOGGED_IN}_REJECTED`: {
            return {
                ...state,
                errorMessages: action.payload
            }
        }
        case `${UPDATED_USER}_FULFILLED`: {

            const { user_id, username, email, recommendations, watchlist, follows } = action.payload.data;
            
            return {
                ...state,
                id: user_id,
                username,
                email,
                recommendations,
                follows,
                watchlist
            }
        }

        case `${UPDATED_USER}_REJECTED`: {
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