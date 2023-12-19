import {
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    LOGOUT_USER
} from '../actions/userActions';

const initState = {
    first_name: '',
    last_name: '',
};

const userReducer = (state = initState, action) => {
    if (action.type === FETCH_USER_SUCCESS) {
        state = action.payload;
        return state;
    }

    if (action.type === FETCH_USER_ERROR) {
        return state;
    }
    
    if (action.type === LOGOUT_USER) {
        state = action.payload;
        return state;
    }

    return state;
};

export default userReducer;
