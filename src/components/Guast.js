import React from 'react';
import { isLoggedIn } from '../lib/auth';
import redirectTo from '../lib/redirectTo';

export default function Guast(Component) {
    const AuthComponent = (props) => {
        return <Component {...props} />;
    };

    AuthComponent.getInitialProps = (context) => {
        const isUserLoggedIn = isLoggedIn(context?.req?.headers?.cookie || '');

        if (isUserLoggedIn) {
            redirectTo('/dashboard', context);
        }

        return { user: { isLoggedIn: isUserLoggedIn } };
    };

    return AuthComponent;
}
