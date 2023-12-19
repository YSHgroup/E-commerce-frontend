import { Fragment, useState } from 'react';
import Link from 'next/link';
import { IoIosHeartEmpty, IoIosShuffle, IoIosSearch, IoIosHeart, IoIosBasket } from 'react-icons/io';
import { Tooltip } from 'react-tippy';
import ProductModal from './ProductModal';

const ProductGridThree = ({
    product,
    discountedPrice,
    productPrice,
    cartItem,
    wishlistItem,
    compareItem,
    bottomSpace,
    addToCart,
    addToWishlist,
    deleteFromWishlist,
    addToCompare,
    deleteFromCompare,
    addToast,
    cartItems,
    sliderClass
}) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <Fragment>
            <div
                className={ `product-grid ${sliderClass ? sliderClass : ''}
                    ${ bottomSpace ? bottomSpace : '' }
                    ${ cartItem !== undefined ? ' added-to-cart' : ''}
                    ${ product.isPurchased ? ' purchased' : '' }` }
            >
                {/*=======  single product image  =======*/}
                <div className='product-grid__image'>
                    <Link
                        href={`/product/${product.slug}`}
                        as={process.env.PUBLIC_URL + '/product/' + product.slug}
                        className='image-wrap'>
                        <img
                            src={process.env.PUBLIC_URL + product.thumbImage[0]}
                            className='img-fluid'
                            alt={product.name}
                        />
                        {product.thumbImage.length > 1 ? (
                            <img
                                src={process.env.PUBLIC_URL + product.thumbImage[1]}
                                className='img-fluid'
                                alt={product.name}
                            />
                        ) : (
                            ''
                        )}
                    </Link>
                    <div className='product-grid__floating-badges'>
                        {product.discount && product.discount > 0 ? (
                            <span className='onsale'>-{product.discountPercent}%</span>
                        ) : (
                            ''
                        )}
                        {product.new ? <span className='hot'>New</span> : ''}
                        {product.stock === 0 ? (
                            <span className='out-of-stock'>out</span>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className='product-grid__floating-icons'>
                        {product.isPurchased
                            ?   <Tooltip
                                    title="Purchased"
                                    position="left"
                                    trigger="mouseenter"
                                    animation="shift"
                                    arrow={true}
                                    duration={200}
                                >
                                    <button><IoIosBasket /></button>
                                </Tooltip>
                            : ''}
                        {/* add to wishlist */}
                        <Tooltip
                            title={
                                wishlistItem !== undefined
                                    ? 'Added to favourites'
                                    : 'A dd to favourites'
                            }
                            position='left'
                            trigger='mouseenter'
                            animation='shift'
                            arrow={true}
                            duration={200}>
                            <button
                                onClick={
                                    wishlistItem !== undefined
                                        ? () =>
                                              deleteFromWishlist(
                                                  product,
                                                  addToast
                                              )
                                        : () => addToWishlist(product, addToast)
                                }
                                className={ wishlistItem !== undefined ? 'active' : '' }>
                                { wishlistItem !== undefined ? <IoIosHeart />  : <IoIosHeartEmpty /> }
                            </button>
                        </Tooltip>

                        {/* quick view */}
                        <Tooltip
                            title='Quick view'
                            position='left'
                            trigger='mouseenter'
                            animation='shift'
                            arrow={true}
                            duration={200}>
                            <button
                                onClick={() => setModalShow(true)}
                                className='d-none d-lg-block'>
                                <IoIosSearch />
                            </button>
                        </Tooltip>
                    </div>
                </div>

                {/*=======  single product content  =======*/}
                <div className='product-grid__content'>
                    <div className='title'>
                        <h3>
                            <Link
                                href={`/product/${product.slug}`}
                                as={process.env.PUBLIC_URL + '/product/' + product.slug}
                            >
                                <p>
                                    {product.brand
                                        ? <b>{product.brand.name}</b>
                                        : <span>&nbsp;</span>}
                                </p>
                                {product.name}
                            </Link>
                        </h3>
                        {/* add to cart */}
                        {product.affiliateLink ? (
                            <a href={product.affiliateLink} target='_blank'>
                                Buy now
                            </a>
                        ) : product.variation &&
                          product.variation.length >= 1 ? (
                            <Link
                                href={`/product/${product.slug}`}
                                as={process.env.PUBLIC_URL + '/product/' + product.slug}
                            >
                                Select Option
                            </Link>
                        ) : (
                            <button
                                onClick={() => addToCart(product, addToast)}
                                disabled={
                                    cartItem !== undefined ||
                                    product.isPurchased
                                }
                            >
                                { product.isPurchased
                                    ? 'Purchased'
                                    : cartItem !== undefined
                                        ? 'Added to cart'
                                        : 'Add to cart' }
                            </button>
                        )}
                    </div>
                    <div className='price'>
                        {product.discount > 0 ? (
                            <Fragment>
                                <span className='main-price discounted'>
                                    ${productPrice}
                                </span>
                                <span className='discounted-price'>
                                    ${discountedPrice}
                                </span>
                            </Fragment>
                        ) : (
                            <span className='main-price'>${productPrice}</span>
                        )}
                    </div>
                </div>
            </div>
            {/* product modal */}
            <ProductModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                product={product}
                discountedprice={discountedPrice}
                productprice={productPrice}
                cartitems={cartItems}
                cartitem={cartItem}
                wishlistitem={wishlistItem}
                compareitem={compareItem}
                addtocart={addToCart}
                addtowishlist={addToWishlist}
                deletefromwishlist={deleteFromWishlist}
                addtocompare={addToCompare}
                deletefromcompare={deleteFromCompare}
                addtoast={addToast}
            />
        </Fragment>
    );
};

export default ProductGridThree;
