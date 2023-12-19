import { FETCH_BRANDS_SUCCESS } from '../actions/brandActions';

const initState = [];

const brandReducer = (state = initState, action) => {
    if (action.type === FETCH_BRANDS_SUCCESS) {
        state = action.payload.slice(0);
        return state;
    }

    return state;
};

export default brandReducer;
