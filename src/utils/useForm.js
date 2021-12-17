import { useState } from 'react';

const useForm = (defaultState = {}) => {

    const [state, setState] = useState(defaultState);

    const handleChange = (e) => {
        // e.persist();
        setState(state => (
            {
                ...state, 
                [e.target.name]: e.target.value,
            }
            )
        );
        // console.log(state);
    }
    
    return [state, handleChange];
}

export default useForm;