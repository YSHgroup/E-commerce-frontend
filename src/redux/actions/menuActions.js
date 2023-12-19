export const FETCH_MENU_SUCCESS = 'FETCH_MENU_SUCCESS';

const fetchMenuSuccess = (menu) => ({
    type: FETCH_MENU_SUCCESS,
    payload: menu
});

// fetch menu
export const fetchMenu = (menu) => {
    return (dispatch) => {
        dispatch(fetchMenuSuccess(menu));
    };
};
