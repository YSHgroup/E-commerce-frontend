import Head from 'next/head';

import { LayoutDashlite } from '../../components/Layout';
import WithAuth from '../../components/WithAuth';

import api from '../../lib/api';
import { fetchUser } from '../../redux/actions/userActions';

import { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';

import Cookies from 'js-cookie';

const Settings = ({ user }) => {
    const [busy, setBusy] = useState(false);
    const [isSidebarShown,  setIsSidebarShown] = useState(false);
    const [isUserProfileModalShown,  setIsUserProfileModalShown] = useState(false);
    const [isUserProfileFormValid,  setIsUserProfileFormValid] = useState(true);
    const [tab,  setTab] = useState('profile');
    const [logins,  setLogins] = useState([]);

    const [userProfileFormInput, setUserProfileFormInput] = useState({
        first_name: user.first_name,
        last_name: user.last_name
    });
    useEffect(() => {
        clientValidation(userProfileFormInput);
    }, [userProfileFormInput])

    const [userProfileErrors, setUserProfileErrors] = useState({
        first_name: [],
        last_name: []
    });
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    useEffect(() => {
        updateLogins();
    }, [user])

    useEffect(() => {
        if (isSidebarShown) {
            document.body.classList.add('nav-shown');
        } else {
            document.body.classList.remove('nav-shown');
        }
    }, [isSidebarShown]);
    
    useEffect(() => {
        if (isUserProfileModalShown) {
            document.body.classList.add('modal-open');
            document.body.style.paddingRight = '15px';
            document.querySelector('.nk-header.nk-header-fixed').style.paddingRight = '29px';
        } else {
            document.body.classList.remove('modal-open');
            document.body.style.paddingRight = '0px';
            if (document.querySelector('.nk-header')) {
                document.querySelector('.nk-header').style.paddingRight = '14px';
            }
        }
    }, [isUserProfileModalShown]);

    const updateUserProfileFormInput = (e) => {
        e.persist();

        setUserProfileFormInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const clientValidation = (inputs) => {
        let isFormValid = true;
        
        let errors = {
            first_name: [],
            last_name: []
        };
        
        Object.keys(userProfileFormInput).forEach(key => {
            if (inputs[key] === '') {
                errors[key].push('Field should be specified');
                isFormValid = false;
            }
        });

        setIsUserProfileFormValid(isFormValid);
        setUserProfileErrors(errors);

        return isFormValid;
    };

    const submitUserProfileUpdateForm = (e) => {
        e.preventDefault();
        if (!clientValidation(userProfileFormInput)) {
            return false;
        }
        setBusy(true);
        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .post('/api/v1/dashboard/user-profile-update', userProfileFormInput)
                    .then((response) => {
                        if (response.data.errors) {
                            setUserProfileErrors(error.response.data.errors);
                        } else {
                            dispatch(fetchUser());
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        error.response?.data?.errors && setUserProfileErrors(error.response.data.errors);
                    });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsUserProfileModalShown(false);
                setBusy(false);
            });
    }

    const updateLogins = () => {
        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .get('/api/v1/dashboard/sessions')
                    .then((response) => {
                        setLogins(response.data);
                    })
                    .catch(error => {
                        console.log('Error on fetching of the logins list:', error);
                    });
            });
    }
    
    const loginRows = logins.map((el, index) => (
        <tr key={ index }>
            <td className="tb-col-os">
                { el.agent }
            </td>
            <td className="tb-col-ip">
                <span className="sub-text">{ el.ip_address }</span>
            </td>
            <td className="tb-col-time">
                <span className="sub-text">{ el.is_current_device ? 'This device' : el.last_active }</span>
            </td>
        </tr>
    ));

    return (
        <LayoutDashlite 
            busy={ busy }
            setBusy={ setBusy }
            user={ user }
            isSidebarShown={ isSidebarShown }
            setIsSidebarShown={ setIsSidebarShown }
        >
            {/* Page Title */}
            <Head>
                <title>Account Settings | My Account | 3d Infinite</title>
            </Head>

            <div className="nk-block">
                <div className="card">
                    <div className="card-aside-wrap">
                        { tab === 'profile' ? (
                            <div className="card-inner card-inner-lg">
                                <div className="nk-block-head nk-block-head-lg">
                                    <div className="nk-block-between">
                                        <div className="nk-block-head-content">
                                            <h4 className="nk-block-title">Personal Information</h4>
                                            <div className="nk-block-des">
                                                <p>Basic info, like your name and email.</p>
                                            </div>
                                        </div>
                                        <div className="nk-block-head-content align-self-start d-lg-none">
                                            <a href="#" className="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside">
                                                <em className="icon ni ni-menu-alt-r"></em>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-block">
                                    <div className="nk-data data-list">
                                        <div className="data-head">
                                            <h6 className="overline-title">Basics</h6>
                                        </div>
                                        <div 
                                            className="data-item"
                                            data-toggle="1"
                                            onClick={ () => setIsUserProfileModalShown(true) }
                                        >
                                            <div className="data-col">
                                                <span className="data-label">Full Name</span>
                                                <span className="data-value">{ user.fullName }</span>
                                            </div>
                                            <div className="data-col data-col-end">
                                                <span className="data-more">
                                                    <em className="icon ni ni-forward-ios"></em>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <div className="data-col">
                                                <span className="data-label">Email</span>
                                                <span className="data-value">{ user.email }</span>
                                            </div>
                                            <div className="data-col data-col-end">
                                                <span className="data-more disable">
                                                    <em className="icon ni ni-lock-alt"></em>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="data-item">
                                            <div className="data-col">
                                                <span className="data-label">Country</span>
                                                <span className="data-value">
                                                    { user.country ? user.country.name : <i>(undefined)</i> }
                                                </span>
                                            </div>
                                            <div className="data-col data-col-end">
                                                <span className="data-more disable">
                                                    <em className="icon ni ni-lock-alt"></em>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : '' }
                        { tab === 'settings' ? (
                            <div className="card-inner card-inner-lg">
                                <div className="nk-block-head nk-block-head-lg">
                                    <div className="nk-block-between">
                                        <div className="nk-block-head-content">
                                            <h4 className="nk-block-title">Settings</h4>
                                            <div className="nk-block-des">
                                                <p>Your settings here.</p>
                                            </div>
                                        </div>
                                        <div className="nk-block-head-content align-self-start d-lg-none">
                                            <a href="#" className="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside">
                                                <em className="icon ni ni-menu-alt-r"></em>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-block">
                                    <div className="nk-data data-list">
                                        <div className="data-head">
                                            <h6 className="overline-title">Basics</h6>
                                        </div>
                                        <div>Settings are under development</div>
                                    </div>
                                </div>
                            </div>
                        ) : '' }
                        { tab === 'activity' ? (
                            <div className="card-inner card-inner-lg">
                                <div className="nk-block-head nk-block-head-lg">
                                    <div className="nk-block-between">
                                        <div className="nk-block-head-content">
                                            <h4 className="nk-block-title">Login Activity</h4>
                                            <div className="nk-block-des">
                                                <p>Here is your last 10 login activities log.</p>
                                            </div>
                                        </div>
                                        <div className="nk-block-head-content align-self-start d-lg-none">
                                            <a href="#" className="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside">
                                                <em className="icon ni ni-menu-alt-r"></em>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-block">
                                    <table className="table table-ulogs">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="tb-col-os">
                                                    <span className="overline-title">
                                                        Browser 
                                                        <span className="d-sm-none">/ IP</span>
                                                    </span>
                                                </th>
                                                <th className="tb-col-ip">
                                                    <span className="overline-title">IP</span>
                                                </th>
                                                <th className="tb-col-time">
                                                    <span className="overline-title">Time</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { loginRows }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : '' }
                        <div className="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg toggle-screen-lg" data-content="userAside" data-toggle-screen="lg" data-toggle-overlay="true">
                            <div className="card-inner-group" data-simplebar="init">
                                <div className="simplebar-wrapper" style={{ margin: 0 }}>
                                    <div className="simplebar-height-auto-observer-wrapper">
                                        <div className="simplebar-height-auto-observer"></div>
                                    </div>
                                    <div className="simplebar-mask">
                                        <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
                                            <div className="simplebar-content-wrapper" style={{ height: "auto", overflow: "hidden" }}>
                                                <div className="simplebar-content" style={{ padding: 0 }}>
                                                    <div className="card-inner">
                                                        <div className="user-card">
                                                            <div className="user-avatar bg-primary">
                                                                <span>
                                                                    {   // make abbreviation here
                                                                        user.fullName
                                                                            .split(' ')
                                                                            .map((el) => el[0].toUpperCase())
                                                                            .join('')
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="user-info">
                                                                <span className="lead-text">{ user.fullName }</span>
                                                                <span className="sub-text">{ user.email }</span>
                                                            </div>
                                                            <div className="user-action">
                                                                <div className="dropdown">
                                                                    <a className="btn btn-icon btn-trigger mr-n2" data-toggle="dropdown" href="#">
                                                                        <em className="icon ni ni-more-v"></em>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <ul className="link-list-opt no-bdr">
                                                                            <li>
                                                                                <a href="#">
                                                                                    <em className="icon ni ni-camera-fill"></em>
                                                                                    <span>Change Photo</span>
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">
                                                                                    <em className="icon ni ni-edit-fill"></em>
                                                                                    <span>Update Profile</span>
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-inner">
                                                        <div className="user-account-info py-0">
                                                            <h6 className="overline-title-alt">Account Balance</h6>
                                                            <div className="user-balance">
                                                                { user.credits || '0.00' }{' '}
                                                                <small className="currency currency-btc">
                                                                    USD
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-inner p-0">
                                                        <ul className="link-list-menu">
                                                            <li>
                                                                <a
                                                                    className={ tab === "profile" ? "active" : "" }
                                                                    href="#"
                                                                    onClick={ (e) => {
                                                                        e.preventDefault();
                                                                        setTab('profile');
                                                                    }}
                                                                >
                                                                    <em className="icon ni ni-user-fill-c"></em>
                                                                    <span>Personal Profile</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className={ tab === "settings" ? "active" : "" }
                                                                    href="#"
                                                                    onClick={ (e) => {
                                                                        e.preventDefault();
                                                                        setTab('settings');
                                                                    }}
                                                                >
                                                                    <em className="icon ni ni-setting-alt-fill"></em>
                                                                    <span>Settings</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className={ tab === "activity" ? "active" : "" }
                                                                    href="#"
                                                                    onClick={ (e) => {
                                                                        e.preventDefault();
                                                                        setTab('activity');
                                                                    }}
                                                                >
                                                                    <em className="icon ni ni-activity-round-fill"></em>
                                                                    <span>Login Activity</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="simplebar-placeholder" style={{ width: "auto", height: "446px" }}></div>
                                </div>
                                <div className="simplebar-track simplebar-horizontal" style={{ visibility: "hidden" }}>
                                    <div className="simplebar-scrollbar" style={{ width: 0, display: "none" }}></div>
                                </div>
                                <div className="simplebar-track simplebar-vertical" style={{ visibility: "hidden" }}>
                                    <div className="simplebar-scrollbar" style={{ height: 0, display: "none" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div 
                className={`modal fade${ isUserProfileModalShown ? ' show' : '' }`}
                tabIndex="-1"
                id="user-fullname-edit"
                style={{ display: isUserProfileModalShown ? 'block' : 'none' }}
                {   // define conditional tag attributes
                    ...(isUserProfileModalShown 
                        ? { 'aria-modal' : true, role: 'dialog' } 
                        : { 'aria-hidden': true } ) 
                }
            >
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <a
                            href="#"
                            className="close"
                            onClick={ (e) => {
                                e.preventDefault();
                                setIsUserProfileModalShown(false);
                            }}>
                            <em className="icon ni ni-cross-sm"></em>
                        </a>
                        <div className="modal-body modal-body-lg">
                            <h5 className="title">Update Profile</h5>
                            <ul className="nk-nav nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href="#personal">
                                        Personal
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="personal">
                                    <div className="row gy-4">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label
                                                    className="form-label"
                                                    htmlFor="first-name"
                                                >
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="first-name"
                                                    name="first_name" 
                                                    placeholder="Enter First name"
                                                    defaultValue={ userProfileFormInput.first_name }
                                                    onChange={ updateUserProfileFormInput }
                                                />
                                                <div className='text-danger pt-2'>
                                                    { userProfileErrors.first_name 
                                                        && userProfileErrors.first_name[0] }&nbsp;
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label
                                                    className="form-label"
                                                    htmlFor="last-name"
                                                >
                                                    Last Name
                                                </label>
                                                <input 
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="last-name"
                                                    name="last_name"
                                                    placeholder="Enter Last name"
                                                    defaultValue={ userProfileFormInput.last_name }
                                                    onChange={ updateUserProfileFormInput }
                                                />
                                                <div className='text-danger pt-2'>
                                                    { userProfileErrors.last_name 
                                                        && userProfileErrors.last_name[0] }&nbsp;
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                                <li>
                                                    <a
                                                        href="#"
                                                        className={
                                                            `btn btn-lg btn-primary${ 
                                                                !isUserProfileFormValid ? ' disabled' : ''
                                                            }`
                                                        }
                                                        onClick={ submitUserProfileUpdateForm }
                                                    >
                                                        Update Profile
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="link link-light"
                                                        onClick={ (e) => {
                                                            e.preventDefault();
                                                            setIsUserProfileModalShown(false);
                                                        }}
                                                    >
                                                        Cancel
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
            { 
                isUserProfileModalShown 
                    ? <div 
                        className="modal-backdrop fade show"
                        onClick={ () => setIsUserProfileModalShown(false) }
                    ></div> 
                    : '' 
            }
        </LayoutDashlite>
    );
};

const mapStateToProps = (state) => {
    const success = Cookies.get('tdi_purchase_success');
    let status = {
        success: false
    };

    if (!!success) {
        status = {
            success: success
        };

        if (success.new) {
            success.new = false;
        }
    }

    return {
        user: state.userData,
        status
    };
};

export default connect(mapStateToProps)(WithAuth(Settings));
