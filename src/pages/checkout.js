import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import { getDiscountPrice } from '../lib/product';
import { IoMdCash } from 'react-icons/io';

import { BreadcrumbOne } from '../components/Breadcrumb';
import { LayoutOne } from '../components/Layout';

import { fetchUser } from '../redux/actions/userActions';
import { deleteAllFromCart } from '../redux/actions/cartActions';
import api from '../lib/api';

import router from 'next/router';
import { useToasts } from 'react-toast-notifications';

const Checkout = ({ user, cartItems, deleteAllFromCart }) => {
    let cartTotalPrice = 0;
    const dispatch = useDispatch();
    const [processing, setProcessing] = useState(false);
    const [isTermsCheckboxChecked, setIsTermsCheckboxChecked] = useState(false);
    const { addToast } = useToasts();

    useEffect(() => {
        document.querySelector('body').classList.remove('overflow-hidden');

        dispatch(fetchUser());
    }, []);

    const purchase = (e) => {
        e.preventDefault();

        // setBusy(true);
        setProcessing(true);

        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .post('/api/v1/checkout', cartItems.map(el => ({
                        id: el.id,
                        quantity: el.quantity,
                        platformId: el.platformId,
                        renderId: el.renderId
                    })))
                    .then(() => {
                        setProcessing(false);

                        addToast('Purchase Successful!', {
                            appearance: 'success',
                            autoDismiss: true
                        });

                        deleteAllFromCart();

                        router.push('/dashboard');
                    })
                    .catch((error) => {
                        setProcessing(false);

                        if (error.response.status === 433) {
                            addToast("You don't have enough credits", {
                                appearance: 'error'
                            });
                        }
                    });
            });
    };

    return (
        <LayoutOne>
            {/* Page Title */}
            <Head>
                <title>Checkout | 3d Infinite</title>
            </Head>

            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle='Checkout'
                backgroundImage='/assets/images/backgrounds/breadcrumb-bg-shop.png'>
                <ul className='breadcrumb__list'>
                    <li>
                        <Link href='/' as={process.env.PUBLIC_URL + '/'}>
                            Home
                        </Link>
                    </li>

                    <li>Checkout</li>
                </ul>
            </BreadcrumbOne>
            <div className='checkout-area space-mt--r130 space-mb--r130'>
                <Container>
                    {cartItems && cartItems.length >= 1 ? (
                        <Row>
                            <Col>
                                <div className='lezada-form'>
                                    <form className='checkout-form'>
                                        <div className='row row-40'>
                                            <div className='col-lg-12'>
                                                <div className='row'>
                                                    {/* Cart Total */}
                                                    <div className='col-12 space-mb--50'>
                                                        <h4 className='checkout-title'>
                                                            Cart Total
                                                        </h4>
                                                        <div className='checkout-cart-total'>
                                                            <h4>
                                                                Product{' '}
                                                                <span>
                                                                    Total
                                                                </span>
                                                            </h4>
                                                            <ul>
                                                                {cartItems.map(
                                                                    (
                                                                        product,
                                                                        i
                                                                    ) => {
                                                                        const discountedPrice = getDiscountPrice(
                                                                            product.price,
                                                                            product.discount
                                                                        );

                                                                        cartTotalPrice +=
                                                                            discountedPrice *
                                                                            product.quantity;
                                                                        return (
                                                                            <li key={i}>
                                                                                { product.brand
                                                                                    ? <b>{ product.brand.name + ' ' }</b>
                                                                                    : '' }
                                                                                { product.name }{' '}
                                                                                ({ product.platformRenderName }){' '}

                                                                                <span>
                                                                                    ${' '}{discountedPrice}
                                                                                </span>
                                                                            </li>
                                                                        );
                                                                    }
                                                                )}
                                                            </ul>
                                                            <p>
                                                                Sub Total{' '}
                                                                <span>
                                                                    ${' '}
                                                                    {cartTotalPrice.toFixed(2)}
                                                                </span>
                                                            </p>
                                                            <h4>
                                                                Grand Total{' '}
                                                                <span>
                                                                    ${' '}
                                                                    {cartTotalPrice.toFixed(2)}
                                                                </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                    {/* Payment Method */}
                                                    <div className='col-12'>
                                                        <h4 className='checkout-title'>
                                                            Payment Details
                                                        </h4>
                                                        <div className='checkout-payment-method'>
                                                            <div className='single-method'>
                                                                You have{' '}
                                                                {user.credits}{' '}
                                                                Credit(s)
                                                                available.
                                                            </div>
                                                            <div className='single-method'>
                                                                <input
                                                                    type='checkbox'
                                                                    id='accept_terms'
                                                                    checked={ isTermsCheckboxChecked }
                                                                    onChange={ () => setIsTermsCheckboxChecked(
                                                                        !isTermsCheckboxChecked
                                                                    ) }
                                                                />
                                                                <label htmlFor='accept_terms'>
                                                                    I’ve read and accept{' '}
                                                                    <Link href='/toc' as={process.env.PUBLIC_URL + '/toc'} target='_blank'>
                                                                        <u>the terms &amp; conditions</u>
                                                                    </Link>
                                                                    {' '}and{' '}
                                                                    <Link
                                                                        href='/privacy-policy'
                                                                        as={process.env.PUBLIC_URL + '/privacy-policy'}
                                                                        target='_blank'>
                                                                        <u>privacy policy</u>
                                                                    </Link>.
                                                                </label>
                                                            </div>
                                                        </div>
                                                        { isTermsCheckboxChecked
                                                            ? (
                                                                <div>
                                                                    <button
                                                                        className="lezada-button lezada-button--medium space-mr--20 space--mt--20"
                                                                        onClick={purchase}
                                                                    >
                                                                        {processing ? (
                                                                            <div
                                                                                className='spinner'
                                                                                id='spinner'
                                                                            >
                                                                                Purchase in progress...
                                                                            </div>
                                                                        ) : (
                                                                            'Purchase'
                                                                        )}
                                                                    </button>
                                                                    <Link
                                                                        as={'/dashboard/add-credit'}
                                                                        href={'/dashboard/add-credit'}
                                                                        className="lezada-button lezada-button--medium space-mt--20">
                                                                            Buy credits
                                                                    </Link>
                                                                </div>
                                                            ) : (
                                                                <p className="mt-3">
                                                                    Please, read and accept the Terms &amp; Conditions
                                                                    and Privacy Policy above.
                                                                </p>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col>
                                <div className='item-empty-area text-center'>
                                    <div className='item-empty-area__icon space-mb--30'>
                                        <IoMdCash />
                                    </div>
                                    <div className='item-empty-area__text'>
                                        <p className='space-mb--30'>
                                            No items found in cart to checkout
                                        </p>
                                        <Link
                                            href='/products'
                                            as={process.env.PUBLIC_URL + '/products'}
                                            className='lezada-button lezada-button--medium'>
                                                Shop Now
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </div>
        </LayoutOne>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userData,
        cartItems: state.cartData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteAllFromCart: (addToast) => {
            dispatch(deleteAllFromCart(addToast));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
