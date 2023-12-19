// favouriteReducer handles Favourites modal window only.
// It does not care about wishlist items (see wishlistReducer for that).
import api from '../../lib/api';
import {
    DELETE_FROM_FAVOURITE,
    SHOW_FAVGROUP,
    HIDE_FAVGROUP
} from '../actions/favouriteActions';
import { DELETE_FROM_WISHLIST } from '../actions/wishlistActions';

const initState = {
    show: false,
    item: null
};

const favouriteReducer = (state = initState, action) => {
    if (action.type === DELETE_FROM_FAVOURITE) {
        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .post('/api/v1/favourites/' + action.payload.id, {
                        _method: 'DELETE'
                    })
                    .then(response => {
                        if (response.data.success) {
                            if (action.addToast) {
                                setTimeout(() => {
                                    action.addToast('Removed From Favourites', {
                                        appearance: 'error',
                                        autoDismiss: true
                                    });
                                }, 1000);
                            }
                            action.dispatch({ type: DELETE_FROM_WISHLIST, payload: action.payload });
                        }
                    });
            });
    }

    if (action.type === SHOW_FAVGROUP) {
        return {
            show: true,
            item: action.payload
        };
    }

    if (action.type === HIDE_FAVGROUP) {
        return {
            show: false,
            item: null
        };
    }

    return state;
};

export default favouriteReducer;
