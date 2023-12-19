import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import {
    addToCart,
    decreaseQuantity,
    deleteFromCart,
    deleteAllFromCart,
    cartItemStock
} from '../redux/actions/cartActions';
import { getDiscountPrice } from '../lib/product';
import { BreadcrumbOne } from '../components/Breadcrumb';
import { IoIosClose, IoMdCart } from 'react-icons/io';
import { LayoutOne } from '../components/Layout';

const Cart = ({
    cartItems,
    decreaseQuantity,
    addToCart,
    deleteFromCart,
    deleteAllFromCart
}) => {
    const [quantityCount] = useState(1);
    const { addToast } = useToasts();
    let cartTotalPrice = 0;

    useEffect(() => {
        document.querySelector('body').classList.remove('overflow-hidden');
    });

    return (
        <LayoutOne>
            {/* Page Title */}
            <Head>
                <title>Cart | 3d Infinite</title>
            </Head>

            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle='Cart'
                backgroundImage='/assets/images/backgrounds/breadcrumb-bg-shop.png'>
                <ul className='breadcrumb__list'>
                    <li>
                        <Link href='/' as={process.env.PUBLIC_URL + '/'}>
                            Home
                        </Link>
                    </li>

                    <li>Cart</li>
                </ul>
            </BreadcrumbOne>

            {/* cart content */}
            <div className='cart-content space-mt--r130 space-mb--r130'>
                <Container>
                    {cartItems && cartItems.length >= 1 ? (
                        <Row>
                            <Col lg={12}>
                                {/* cart table */}
                                <table className='cart-table'>
                                    <thead>
                                        <tr>
                                            <th
                                                className='product-name'
                                                colSpan='5'>
                                                Product
                                            </th>
                                            <th className='product-price'>
                                                Price
                                            </th>
                                            <th className='product-remove'>
                                                &nbsp;
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((product, i) => {
                                            const discountedPrice = getDiscountPrice(
                                                product.price,
                                                product.discount
                                            );

                                            cartTotalPrice +=
                                                discountedPrice *
                                                product.quantity;
                                            return (
                                                <tr key={i}>
                                                    <td className='product-thumbnail'>
                                                        <Link
                                                            href={`/product/${product.slug}`}
                                                            as={`${process.env.PUBLIC_URL}/product/${product.slug}`}>
                                                            <img
                                                                src={process.env.PUBLIC_URL + product.thumbImage[0]}
                                                                className='img-fluid'
                                                                alt=''
                                                            />
                                                        </Link>
                                                    </td>
                                                    <td className='product-name'>
                                                        <Link
                                                            href={`/product/${product.slug}`}
                                                            as={`${process.env.PUBLIC_URL}/product/${product.slug}`}>
                                                            { product.brand
                                                                ? <b>{product.brand.name + ' '}</b>
                                                                : ''}
                                                            { product.name }{' '}({ product.platformRenderName })
                                                        </Link>
                                                        {product.selectedProductColor &&
                                                        product.selectedProductSize ? (
                                                            <div className='product-variation'>
                                                                <span>
                                                                    Color:{' '}
                                                                    {
                                                                        product.selectedProductColor
                                                                    }
                                                                </span>
                                                                <span>
                                                                    Size:{' '}
                                                                    {
                                                                        product.selectedProductSize
                                                                    }
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </td>

                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>

                                                    <td className='product-price'>
                                                        <span className='price'>
                                                            $ {discountedPrice}
                                                        </span>
                                                    </td>

                                                    <td className='product-remove'>
                                                        <button
                                                            onClick={() =>
                                                                deleteFromCart(
                                                                    product,
                                                                    addToast
                                                                )
                                                            }>
                                                            <IoIosClose />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </Col>
                            <Col lg={12} className='space-mb--r100'>
                                <div className='cart-coupon-area space-pt--30 space-pb--30'>
                                    <Row className='align-items-center'>
                                        <Col
                                            lg={12}
                                            className='text-left text-lg-right'>
                                            <button
                                                className='lezada-button lezada-button--medium'
                                                onClick={() =>
                                                    deleteAllFromCart(addToast)
                                                }>
                                                clear cart
                                            </button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col lg={5} className='ml-auto'>
                                <div className='cart-calculation-area'>
                                    <h2 className='space-mb--40'>
                                        Cart totals
                                    </h2>
                                    <table className='cart-calculation-table space-mb--40'>
                                        <tbody>
                                            <tr>
                                                <th>SUBTOTAL</th>
                                                <td className='subtotal'>
                                                    ${' '}
                                                    {cartTotalPrice.toFixed(2)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>TOTAL</th>
                                                <td className='total'>
                                                    ${' '}
                                                    {cartTotalPrice.toFixed(2)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='cart-calculation-button text-center'>
                                        <Link
                                            href='/checkout'
                                            as={
                                                process.env.PUBLIC_URL +
                                                '/checkout'
                                            }
                                            className='lezada-button lezada-button--medium'>
                                                proceed to checkout
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col>
                                <div className='item-empty-area text-center'>
                                    <div className='item-empty-area__icon space-mb--30'>
                                        <IoMdCart />
                                    </div>
                                    <div className='item-empty-area__text'>
                                        <p className='space-mb--30'>
                                            No items found in cart
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
        cartItems: state.cartData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item, addToast, quantityCount) => {
            dispatch(addToCart(item, addToast, quantityCount));
        },
        decreaseQuantity: (item, addToast) => {
            dispatch(decreaseQuantity(item, addToast));
        },
        deleteFromCart: (item, addToast) => {
            dispatch(deleteFromCart(item, addToast));
        },
        deleteAllFromCart: (addToast) => {
            dispatch(deleteAllFromCart(addToast));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
