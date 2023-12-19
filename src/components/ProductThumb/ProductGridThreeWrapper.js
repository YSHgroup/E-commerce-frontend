import { Fragment } from 'react';

import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '../../lib/product';
import { addToCart } from '../../redux/actions/cartActions';
import {
    addToWishlist,
    deleteFromWishlist
} from '../../redux/actions/wishlistActions';
import {
    addToCompare,
    deleteFromCompare
} from '../../redux/actions/compareActions';
import ProductGridThree from './ProductGridThree';

const ProductGridThreeWrapper = ({
    products,
    bottomSpace,
    addToCart,
    addToWishlist,
    deleteFromWishlist,
    addToCompare,
    deleteFromCompare,
    cartItems,
    wishlistItems,
    compareItems,
    sliderClass
}) => {
    const { addToast } = useToasts();
    return (
        <Fragment>
            {products &&
                products.map((product) => {
                    const discountedPrice = getDiscountPrice(
                        product.price,
                        product.discount
                    );
                    const productPrice = product.price;
                    const cartItem = cartItems.filter(
                        (cartItem) => cartItem.id === product.id
                    )[0];
                    const wishlistItem = wishlistItems.filter(
                        (wishlistItem) => wishlistItem.id === product.id
                    )[0];
                    const compareItem = compareItems.filter(
                        (compareItem) => compareItem.id === product.id
                    )[0];

                    return (
                        <ProductGridThree
                            key={product.id}
                            product={product}
                            discountedPrice={discountedPrice}
                            productPrice={productPrice}
                            cartItem={cartItem}
                            wishlistItem={wishlistItem}
                            compareItem={compareItem}
                            bottomSpace={bottomSpace}
                            addToCart={addToCart}
                            addToWishlist={addToWishlist}
                            deleteFromWishlist={deleteFromWishlist}
                            addToCompare={addToCompare}
                            deleteFromCompare={deleteFromCompare}
                            addToast={addToast}
                            cartItems={cartItems}
                            sliderClass={sliderClass}
                        />
                    );
                })}
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartData,
        wishlistItems: state.wishlistData,
        compareItems: state.compareData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (
            item,
            addToast,
            quantityCount,
            selectedProductColor,
            selectedProductSize
        ) => {
            dispatch(
                addToCart(
                    item,
                    addToast,
                    quantityCount,
                    selectedProductColor,
                    selectedProductSize
                )
            );
        },
        addToWishlist: (item, addToast) => {
            dispatch(addToWishlist(item, addToast));
        },
        deleteFromWishlist: (item, addToast) => {
            dispatch(deleteFromWishlist(item, addToast));
        },
        addToCompare: (item, addToast) => {
            dispatch(addToCompare(item, addToast));
        },
        deleteFromCompare: (item, addToast) => {
            dispatch(deleteFromCompare(item, addToast));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductGridThreeWrapper);
