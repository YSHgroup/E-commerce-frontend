import React, { useEffect } from 'react';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import api from '../../lib/api';
import { fetchUserSuccess } from '../../redux/actions/userActions';

import { useToasts } from 'react-toast-notifications';
import { useDispatch } from 'react-redux';

export const CheckOutForm = ({ user }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [selectedCredit, setSelectedCredit] = useState(15);
    const [total, setTotal] = useState(15);

    const { addToast } = useToasts();

    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedCredit < 15 || setSelectedCredit > 5000) return;
        setTotal(selectedCredit);
        setError(false);
    }, [selectedCredit]);

    const handleChange = (event) => {
        setSelectedCredit(event.target.value);
    };

    const checkCreditValue = () => {
        if (selectedCredit < 15) {
            setTotal(15);
            setError("Mininum can't be under 15");
        }

        if (selectedCredit > 5000) {
            setTotal(5000);
            setError("Maximum can't be above 5000");
        }
    };

    const cardStyle = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#32325d'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        }
    };

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        cardElement.on('change', function (event) {
            setProcessing(false);
            if (event.error) {
                setError(event.error.message);
            } else {
                setError(false);
            }

            cardElement.update({
                disabled: false
            });
        });

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: user.fullName,
                email: user.email
            }
        });

        if (error) {
            setProcessing(false);
            setError(error.message);
            // console.log('[error]', error);
        } else {
            setError(null);

            api()
                .get('/sanctum/csrf-cookie')
                .then(() => {
                    api()
                        .post('/api/v1/checkout/credits', {
                            paymentMethod: paymentMethod,
                            credits: selectedCredit
                        })
                        .then((response) => {
                            setProcessing(false);

                            cardElement.clear();

                            addToast('Purchase Successful!', {
                                appearance: 'success',
                                autoDismiss: true
                            });

                            dispatch(fetchUserSuccess(response.data));
                        })
                        .catch((error) => {
                            setProcessing(false);
                        });
                });

            // console.log('[PaymentMethod]', paymentMethod, selectedCredit);
        }
    };

    return (
        <div>
            <div className='d-flex'>
                <div className='flex-grow-1 mr-4 mt-4'>
                    <h3>Select your amount</h3>

                    <p>
                        Choose a pre select amount or enter your own
                        <br />
                        <span className='note'>Note: 1 Credit = US$1</span>
                    </p>

                    <ul className='d-flex button-group'>
                        {[15, 30, 90, 120, 200, 250].map((item, idx) => (
                            <li
                                key={idx}
                                className={
                                    selectedCredit === item
                                        ? 'btn btn-dark space-mr--10 w-25'
                                        : 'btn btn-light space-mr--10 w-25'
                                }
                                onClick={() => {
                                    setSelectedCredit(item);
                                }}>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <p className='mt-3'>Other (Min 15 - Max 5000)</p>

                    <input
                        type='number'
                        min='15'
                        max='5000'
                        className='form-control col-md-6'
                        onChange={handleChange}
                        onBlur={checkCreditValue}
                        value={selectedCredit}
                    />

                    <p className='mt-5 text-danger'>{error}</p>
                </div>

                <div className='border flex-grow-1 p-4 rounded-lg'>
                    <h3>Purchase</h3>

                    <table className='table table-light mb-5'>
                        <tbody>
                            <tr>
                                <td>Item</td>
                                <td className='text-right'>{total} Credits</td>
                            </tr>

                            <tr>
                                <td>Sub total</td>
                                <td className='text-right'>US${total}</td>
                            </tr>

                            <tr>
                                <td className='border-top font-weight-bold'>
                                    Total
                                </td>
                                <td className='text-right border-top font-weight-bold'>
                                    US${total}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <form onSubmit={handleSubmit}>
                        <CardElement options={cardStyle} />

                        <button
                            type='submit'
                            className='btn btn-block btn-dark'
                            disabled={!stripe || processing || error}>
                            {processing ? (
                                <div className='spinner' id='spinner'>
                                    Payment in progress...
                                </div>
                            ) : (
                                'Pay now'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
