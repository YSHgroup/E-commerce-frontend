import router from 'next/router';
import Cookies from 'js-cookie';
import cookie from 'cookie';
import getStore from './getStore';
import { fetchWishlist } from '../redux/actions/wishlistActions';
import { fetchUser, logoutUser } from '../redux/actions/userActions';

export const isLoggedIn = (reqCookies = null) => {
    // if we don't have request cookies, get the cookie from client
    if (!reqCookies) {
        return !!Cookies.get('tdi_is_user_logged_in');
    }

    // otherwise get cookie from server
    return !!cookie.parse(reqCookies).tdi_is_user_logged_in;
};

export const logIn = () => {
    Cookies.set('tdi_is_user_logged_in', true, {
        expires: 86400,
        sameSite: 'lax',
    });

    const store = getStore();
    const state = store.getState();
    const url = state?.miscData?.returnUrl || null;
    
    store.dispatch(fetchUser());
    store.dispatch(fetchWishlist());

    if (url) {
        // remove the domain part from url
        console.log(url.replace(/https?:\/\/.+?\//, '/'));
        return router.push(url.replace(/https?:\/\/.+?\//, '/'));
    }
    return router.push('/dashboard');
};

export const registerSuccess = () => {
    Cookies.set('tdi_registration_success', true, {
        sameSite: 'lax',
    });

    router.push('/registration-success');
};

export const purchaseSuccess = (message) => {
    router.push('/dashboard');
};

export const logOut = async (dispatch) => {
    if (typeof window !== 'undefined') {
        // remove logged in user's cookie and redirect to login page
        Cookies.remove('tdi_is_user_logged_in', {
            expires: 86400,
            sameSite: 'lax',
        });
        if (dispatch) {
            dispatch(logoutUser());
        }

        router.push('/login');
    }
};
