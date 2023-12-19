import Link from 'next/link';
import { IoIosClose } from 'react-icons/io';
import CustomScroll from 'react-custom-scroll';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '../../../lib/product';
import { deleteFromWishlist } from '../../../redux/actions/wishlistActions';

const WishlistOverlay = ({
    activeStatus,
    getActiveStatus,
    wishlistItems,
    deleteFromWishlist,
}) => {
    const { addToast } = useToasts();
    return (
        <div className={`wishlist-overlay ${activeStatus ? 'active' : ''}`}>
            <div
                className='wishlist-overlay__close'
                onClick={() => {
                    getActiveStatus(false);
                    document
                        .querySelector('body')
                        .classList.remove('overflow-hidden');
                }}
            />
            <div className='wishlist-overlay__content'>
                {/*=======  close icon  =======*/}
                <button
                    className='wishlist-overlay__close-icon'
                    onClick={() => {
                        getActiveStatus(false);
                        document
                            .querySelector('body')
                            .classList.remove('overflow-hidden');
                    }}>
                    <IoIosClose />
                </button>
                {/*=======  offcanvas wishlist content container  =======*/}
                <div className='wishlist-overlay__content-container'>
                    <h3 className='wishlist-title'>Favourites</h3>
                    {wishlistItems.length >= 1 ? (
                        <div className='wishlist-product-wrapper'>
                            <div className='wishlist-product-container'>
                                <CustomScroll allowOuterScroll={true}>
                                    {wishlistItems.map((product, i) => {
                                        const discountedPrice = getDiscountPrice(
                                            product.price,
                                            product.discount
                                        );
                                        return (
                                            <div
                                                className='single-wishlist-product'
                                                key={i}>
                                                <span className='wishlist-close-icon'>
                                                    <button
                                                        onClick={() =>
                                                            deleteFromWishlist(
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
                                                            src={process.env.PUBLIC_URL + product.thumbImage[0]}
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
                                                            {product.name}
                                                        </Link>
                                                    </h5>
                                                    <p>
                                                        <span className='discounted-price'>
                                                            ${discountedPrice}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </CustomScroll>
                            </div>
                            {/*=======  wishlist buttons  =======*/}
                            <div className='wishlist-buttons'>
                                <Link
                                    href='/favourites'
                                    as={process.env.PUBLIC_URL + '/favourites'}>
                                    view favourites
                                </Link>
                            </div>
                        </div>
                    ) : (
                        'No items found in favourites list'
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        wishlistItems: state.wishlistData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteFromWishlist: (item, addToast) => {
            dispatch(deleteFromWishlist(item, addToast));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistOverlay);
