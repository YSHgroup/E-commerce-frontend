import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import api from '../../lib/api';
import { fetchUserSuccess } from '../../redux/actions/userActions';

export const AccountDetailsForm = ({ user }) => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        firstName: null,
        lastName: null,
        email: null
    });

    const [processing, setProcessing] = useState(false);

    const { addToast } = useToasts();

    const dispatch = useDispatch();

    useEffect(() => {
        setState({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
        });
    }, [user]);

    const handleInputChage = (event) => {
        setState({
            ...state,
            [event.target.id]: event.target.value
        });

        setErrors({
            ...errors,
            [event.target.id]: null
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setProcessing(true);

        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .post('/api/v1/user/update', state)
                    .then((response) => {
                        setProcessing(false);

                        addToast('User updated successful!', {
                            appearance: 'success',
                            autoDismiss: true
                        });

                        dispatch(fetchUserSuccess(response.data));
                    })
                    .catch((error) => {
                        setProcessing(false);
                        if (error.response.status === 422) {
                            setErrors(error.response.data.errors);
                        } else {
                            addToast(error.message, {
                                appearance: 'error',
                                autoDismiss: true
                            });
                        }
                    });
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Row>
                <Col lg={6}>
                    <div className='single-input-item'>
                        <label htmlFor='first-name' className='required'>
                            First Name
                        </label>
                        <input
                            type='text'
                            id='firstName'
                            value={state.firstName}
                            onChange={handleInputChage}
                        />
                        {errors.firstName && (
                            <div className='text-danger pt-2'>
                                {errors.firstName[0]}
                            </div>
                        )}
                    </div>
                </Col>
                <Col lg={6}>
                    <div className='single-input-item'>
                        <label htmlFor='last-name' className='required'>
                            Last Name
                        </label>
                        <input
                            type='text'
                            id='lastName'
                            value={state.lastName}
                            onChange={handleInputChage}
                        />
                        {errors.lastName && (
                            <div className='text-danger pt-2'>
                                {errors.lastName[0]}
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
            <div className='single-input-item'>
                <label htmlFor='email' className='required'>
                    Email Address
                </label>
                <input
                    type='email'
                    id='email'
                    value={state.email}
                    onChange={handleInputChage}
                />
                {errors.email && (
                    <div className='text-danger pt-2'>{errors.email[0]}</div>
                )}
            </div>
            <fieldset>
                <legend>Password change</legend>
                <div className='single-input-item'>
                    <label htmlFor='current-pwd' className='required'>
                        Current Password
                    </label>
                    <input type='password' id='current-pwd' />
                </div>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='single-input-item'>
                            <label htmlFor='new-pwd' className='required'>
                                New Password
                            </label>
                            <input type='password' id='new-pwd' />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='single-input-item'>
                            <label htmlFor='confirm-pwd' className='required'>
                                Confirm Password
                            </label>
                            <input type='password' id='confirm-pwd' />
                        </div>
                    </div>
                </div>
            </fieldset>
            <div className='single-input-item'>
                <button>
                    {processing ? (
                        <div className='spinner' id='spinner'>
                            Saving...
                        </div>
                    ) : (
                        'Save Changes'
                    )}
                </button>
            </div>
        </form>
    );
};
