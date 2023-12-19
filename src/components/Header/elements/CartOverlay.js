import Link from 'next/link';
import { IoIosClose } from 'react-icons/io';
import CustomScroll from 'react-custom-scroll';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '../../../lib/product';
import { deleteFromCart } from '../../../redux/actions/cartActions';

const CartOverlay = ({
    activeStatus,
    getActiveStatus,
    cartItems,
    deleteFromCart
}) => {
    let cartTotalPrice = 0;
    const { addToast } = useToasts();
    return (
        <div className={`cart-overlay ${activeStatus ? 'active' : ''}`}>
            <div
                className='cart-overlay__close'
                onClick={() => {
                    getActiveStatus(false);
                    document
                        .querySelector('body')
                        .classList.remove('overflow-hidden');
                }}
            />
            <div className='cart-overlay__content'>
                {/*=======  close icon  =======*/}
                <button
                    className='cart-overlay__close-icon'
                    onClick={() => {
                        getActiveStatus(false);
                        document
                            .querySelector('body')
                            .classList.remove('overflow-hidden');
                    }}>
                    <IoIosClose />
                </button>
                {/*=======  offcanvas cart content container  =======*/}
                <div className='cart-overlay__content-container'>
                    <h3 className='cart-title'>Cart</h3>
                    {cartItems.length >= 1 ? (
                        <div className='cart-product-wrapper'>
                            <div className='cart-product-container'>
                                <CustomScroll allowOuterScroll={true}>
                                    {cartItems.map((product, i) => {
                                        const discountedPrice = getDiscountPrice(
                                            product.price,
                                            product.discount
                                        );

                                        cartTotalPrice +=
                                            discountedPrice * product.quantity;

                                        return (
                                            <div
                                                className='single-cart-product'
                                                key={i}>
                                                <span className='cart-close-icon'>
                                                    <button
                                                        onClick={() =>
                                                            deleteFromCart(
                                                                product,
                                                                addToast
                                                            )
                                                        }>
                                                        <IoIosClose />
                                                    </button>
                                                </span>
                                                <div className='image'>
                                                    <Link
                                                        href={`/product/${product.slug}`}
                                                        as={`${process.env.PUBLIC_URL}/product/${product.slug}`}>
                                                        <img
                                                            src={
                                                                process.env
                                                                    .PUBLIC_URL +
                                                                product
                                                                    .thumbImage[0]
                                                            }
                                                            className='img-fluid'
                                                            alt=''
                                                        />
                                                    </Link>
                                                </div>
                                                <div className='content'>
                                                    <h5>
                                                        <Link
                                                            href={`/product/${product.slug}`}
                                                            as={`${process.env.PUBLIC_URL}/product/${product.slug}`}>
                                                            <b>{ product.brand?.name }</b>
                                                            {' '} { product.name }
                                                        </Link>
                                                    </h5>
                                                    <p>
                                                        <span className='discounted-price'>
                                                            $ {discountedPrice}{' '}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </CustomScroll>
                            </div>
                            {/*=======  subtotal calculation  =======*/}
                            <p className='cart-subtotal'>
                                <span className='subtotal-title'>
                                    Subtotal:
                                </span>
                                <span className='subtotal-amount'>
                                    $ { cartTotalPrice }
                                </span>
                            </p>
                            {/*=======  cart buttons  =======*/}
                            <div className='cart-buttons'>
                                <Link
                                    href='/cart'
                                    as={process.env.PUBLIC_URL + '/cart'}>
                                    view cart
                                </Link>
                                <Link
                                    href='/checkout'
                                    as={process.env.PUBLIC_URL + '/checkout'}>
                                    checkout
                                </Link>
                            </div>
                        </div>
                    ) : (
                        'No items found in cart'
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteFromCart: (item, addToast) => {
            dispatch(deleteFromCart(item, addToast));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
