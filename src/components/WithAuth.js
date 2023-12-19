import React from 'react';
import { isLoggedIn } from '../lib/auth';
import redirectTo from '../lib/redirectTo';
import { setReturnUrl } from '../redux/actions/miscActions';
import getStore from '../lib/getStore';

export default function withAuth(Component) {

    const AuthComponent = (props) => {
        return <Component {...props} />;
    };

    AuthComponent.getInitialProps = async (context) => {
        const isUserLoggedIn = isLoggedIn(context?.req?.headers?.cookie || '');

        if (!isUserLoggedIn) {
            const store = getStore();
            if (store && context.pathname) {
                store.dispatch(setReturnUrl(context.pathname));
            }
            redirectTo('/login', context);
        }

        return {
            status: {
                isUserLoggedIn: isUserLoggedIn,
            },
        };
    };
    
    return AuthComponent;
}
