import { FETCH_MENU_SUCCESS } from '../actions/menuActions';

const initState = [];

const menuReducer = (state = initState, action) => {
    if (action.type === FETCH_MENU_SUCCESS) {
        state = { ...action.payload };
        return state;
    }

    return state;
};

export default menuReducer;
