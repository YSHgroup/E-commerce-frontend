import api from '../../lib/api';
import { SHOW_FAVGROUP, DELETE_FROM_FAVOURITE } from './favouriteActions';

export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const DELETE_FROM_WISHLIST = 'DELETE_FROM_WISHLIST';
export const DELETE_ALL_FROM_WISHLIST = 'DELETE_ALL_FROM_WISHLIST';
export const FETCH_WISHLIST_SUCCESS = 'FETCH_WISHLIST_SUCCESS';
export const FETCH_WISHLIST_ERROR = 'FETCH_WISHLIST_ERROR';

// add to favourites at the server
export const addToWishlist = (item, addToast) => {
    return (dispatch) => {
        dispatch({ type: SHOW_FAVGROUP, payload: item });
    };
};

// add to favourites at the client list
export const addToClientWishlist = (item, addToast) => {
    return (dispatch) => {
        dispatch({ type: ADD_TO_WISHLIST, payload: item });
    };
};

// delete from wishlist
export const deleteFromWishlist = (item, addToast) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_FROM_FAVOURITE,
            payload: item,
            addToast,
            dispatch
        });
    };
};

//delete all from wishlist
export const deleteAllFromWishlist = (addToast) => {
    return (dispatch) => {
        if (addToast) {
            addToast('Removed All From Favourites', {
                appearance: 'error',
                autoDismiss: true
            });
        }
        dispatch({ type: DELETE_ALL_FROM_WISHLIST });
    };
};

export const fetchWishlistSuccess = (wishlist) => ({
    type: FETCH_WISHLIST_SUCCESS,
    payload: wishlist
});

export const fetchWishlistError = () => ({
    type: FETCH_WISHLIST_ERROR,
    payload: []
})

export const fetchWishlist = () => {
    return (dispatch) => {
        api()
            .get('/api/v1/favourites')
            .then((response) => {
                dispatch(fetchWishlistSuccess(response.data.data));
            })
            .catch(() => {
                dispatch(fetchWishlistError());
            })
    }
}