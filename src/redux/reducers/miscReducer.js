import {
    SET_CURRENT_ROOM,
    SET_RETURN_URL
} from '../actions/miscActions';

const initState = {
    currentRoom: null,
    returnUrl: null
};

const miscReducer = (state = initState, action) => {    
    if (action.type === SET_CURRENT_ROOM) {
        state.currentRoom = action.payload;
        return state;
    }

    if (action.type === SET_RETURN_URL) {
        state.returnUrl = action.payload;
        return state;
    }

    return state;
};

export default miscReducer;
