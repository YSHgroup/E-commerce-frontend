// favouriteAction handles how Favourites modal window works
export const ADD_TO_FAVOURITE = 'ADD_TO_FAVOURITE';
export const DELETE_FROM_FAVOURITE = 'DELETE_FROM_FAVOURITE';
export const SHOW_FAVGROUP = 'SHOW_FAVGROUP';
export const HIDE_FAVGROUP = 'HIDE_FAVGROUP';

export const hideFavgroup = () => {
    return (dispatch) => {
        dispatch({ type: HIDE_FAVGROUP });
    };
};
