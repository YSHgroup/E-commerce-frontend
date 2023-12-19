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
import ProductGrid from './ProductGrid';

const ProductGridWrapper = ({
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
  column,
  purchasedProductsIds
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
          const isProductPurchased = !!(purchasedProductsIds.filter(
            (purchasedProductId) => purchasedProductId === product.id
          )[0]);
          product = {
            ...product,
            isPurchased: product.isPurchased || isProductPurchased
          };

          return (
            <ProductGrid
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
              column={column}
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
      selectedProductSize,
      platformId,
      renderId,
      platformRenderName
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize,
          platformId,
          renderId,
          platformRenderName
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridWrapper);
