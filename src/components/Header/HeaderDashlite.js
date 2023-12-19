import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import api from '../../lib/api';
import { isLoggedIn, logOut } from '../../lib/auth';
import { deleteAllFromWishlist } from '../../redux/actions/wishlistActions';
import { useDispatch } from 'react-redux';

const HeaderDashlite = ({
    user,
    setBusy,
    isSidebarShown,
    setIsSidebarShown
}) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const bodyClassList = document.querySelector('body').classList;
        bodyClassList.add('nk-body');
        bodyClassList.add('bg-lighter');
        bodyClassList.add('npc-general');
        bodyClassList.add('has-sidebar');
    }, []);

    const menuClick = () => {
        setShowUserMenu(!showUserMenu);
    }

    const logOutHandler = () => {
        setBusy(true);

        dispatch(deleteAllFromWishlist());

        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .post('/logout')
                    .then(() => logOut(dispatch));
            });
    };

    const logoUrl = process.env.PUBLIC_URL + '/assets/images/3d-infinite-logo.png';

    if (!isLoggedIn) {
        return ('Access denied');
    }

    return (
        <Fragment>
            <div className="nk-header nk-header-fixed is-light">
                <div className="container-fluid">
                    <div className="nk-header-wrap">
                        <div className="nk-menu-trigger d-xl-none ml-n1">
                            <a
                                href="#"
                                className="nk-nav-toggle nk-quick-nav-icon"
                                data-target="sidebarMenu"
                                onClick={ () => { setIsSidebarShown(!isSidebarShown); } }
                            >
                                <em className="icon ni ni-menu"></em>
                            </a>
                        </div>
                        <div className="nk-header-brand d-xl-none">
                            <Link
                                href='/dashboard'
                                as={process.env.PUBLIC_URL + '/dashboard'}
                                className="logo-link">
                                <img
                                    src={ logoUrl }
                                    className='img-fluid logo-dark logo-img'
                                    alt='logo-dark'
                                    srcSet={ logoUrl }
                                />
                            </Link>
                        </div>

                        <div className="nk-header-tools">
                            
                            <ul className="nk-quick-nav">
                                <li>
                                    <Link
                                        href='/'
                                        as={ process.env.PUBLIC_URL + '/' }
                                        title="Front page"
                                        className="home-link">
                                        <em className="icon ni ni-home-fill"></em>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/dashboard/add-credit'
                                        as={ '/dashboard/add-credit' }
                                        title="Add Credits"
                                        className="add-credits">
                                        <em className="icon ni ni-plus-circle-fill"></em>
                                    </Link>
                                </li>
                                <li className="user-credits">
                                    Credits: ${ user.credits || '0.00' }
                                </li>
                                <li className={`dropdown user-dropdown${ showUserMenu ? ' show' : '' }`}>
                                    <a
                                        href="#"
                                        className="dropdown-toggle mr-n1"
                                        data-toggle="dropdown"
                                        onClick={ menuClick }
                                        aria-expanded={ showUserMenu }
                                    >
                                        <div className="user-toggle">
                                            <div className="user-avatar sm">
                                                <em className="icon ni ni-user-alt"></em>
                                            </div>
                                            <div className="user-info d-none d-xl-block">
                                                <div className="user-status user-status-active">
                                                    USER
                                                </div>
                                                <div className="user-name dropdown-indicator">
                                                    { user.fullName }
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <div
                                        className={
                                            `dropdown-menu dropdown-menu-md dropdown-menu-right${ showUserMenu
                                                ? ' show' : '' }`
                                        }
                                    >
                                        <div
                                            className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block"
                                        >
                                            <div className="user-card">
                                                <div className="user-avatar">
                                                    <img
                                                        className="h-8 w-8 rounded-full object-cover"
                                                        src="https://ui-avatars.com/api/?name=Tom+Sawyer&amp;color=7F9CF5&amp;background=EBF4FF"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="user-info">
                                                    <span className="lead-text">
                                                        { user.fullName }
                                                    </span>
                                                    <span className="sub-text">
                                                        { user.email }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-inner">
                                            <ul className="link-list">
                                                <li>
                                                    <Link 
                                                        href='/dashboard/settings'
                                                        as={process.env.PUBLIC_URL + '/dashboard/settings'}
                                                    >
                                                        <em className="icon ni ni-setting-alt"></em>
                                                        <span>Account Settings</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="dropdown-inner">
                                            <ul className="link-list">
                                                <form
                                                    method="POST"
                                                    action="/logout"
                                                >
                                                    <input type="hidden" name="_token" />
                                                    <li>
                                                        <a
                                                            href="#"
                                                            onClick={ logOutHandler }
                                                        >
                                                            <em className="icon ni ni-signout"></em>
                                                            <span>Sign out</span>
                                                        </a>
                                                    </li>
                                                </form>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartData,
        wishlistItems: state.wishlistData
    };
};

export default connect(mapStateToProps)(HeaderDashlite);
