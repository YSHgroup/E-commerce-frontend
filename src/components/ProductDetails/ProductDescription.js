import { useState, useEffect, Fragment } from 'react';
import { Dropdown } from 'react-bootstrap';
import { IoIosHeartEmpty, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import { getProductCartQuantity } from '../../lib/product';
import api from '../../lib/api';
import { isLoggedIn } from '../../lib/auth';
import router, { useRouter } from 'next/router';

const ProductDescription = ({
    product,
    productPrice,
    discountedPrice,
    cartItems,
    wishlistItem,
    addToast,
    addToCart,
    addToWishlist,
    deleteFromWishlist
}) => {
    const [selectedProductColor, setSelectedProductColor] = useState(
        product.variation ? product.variation[0].color : ''
    );
    const [selectedProductSize, setSelectedProductSize] = useState(
        product.variation ? product.variation[0].size[0].name : ''
    );
    const [productStock, setProductStock] = useState(
        product.variation ? product.variation[0].size[0].stock : product.stock
    );
    const [quantityCount, setQuantityCount] = useState(1);

    const [isProductPurchased, setIsProductPurchased] = useState(false);

    const [productWishesCount, setProductWishesCount] = useState(product.wishesCount);

    const { query } = useRouter();

    const productCartQty = getProductCartQuantity(
        cartItems,
        product,
        selectedProductColor,
        selectedProductSize
    );

    const params = {};
    const materials = [];

    product.parameters.map((item) => {
        params[item.slug] = item;

        // is it Material?
        if (item.groupid == 4) {
            materials.push(item);
        }
    });

    const dimensionsCm = {
        width: params['width'],
        height: params['height'],
        depth: params['depth']
    };

    const dimensionsIn = {
        width: params['width-in'],
        height: params['height-in'],
        depth: params['depth-in']
    };

    const cartItem = cartItems.filter(
        (cartItem) => cartItem.id === product.id
    )[0];

    const fetchProduct = async () => {
        const {
            data: { data: productsData }
        } = await api().get(`/api/v1/products/${query.slug}`);

        setIsProductPurchased(productsData.isPurchased);
    };

    useEffect(() => {
        fetchProduct();
    }, [product]);

    useEffect(() => {
        document.querySelector('#dropdown-button').classList.remove('btn');
        document.querySelector('#dropdown-button').classList.remove('btn-secondary');
    }, []);

    function createMarkup(content) {
        return { __html: content };
    }

    const renderAddToCardButton = () => {
        if (!productStock || productStock < 0) {
            return (
                <button
                    className='lezada-button lezada-button--medium product-content__ofs space-mr--10'
                    disabled={1}
                >
                    Out of Stock
                </button>
            )
        }
        if (isProductPurchased) {
            return (
                <button
                    disabled={1}
                    className='lezada-button lezada-button--medium product-content__cart space-mr--10'
                >
                    Purchased
                </button>
            )
        }
        return (
            <Dropdown>
                <Dropdown.Toggle
                    variant='secondary'
                    id='dropdown-button'
                    className='lezada-button lezada-button--medium product-content__cart space-mr--10'
                >
                    { cartItem !== undefined
                        ? 'Added To Cart'
                        : 'Add To Cart' }
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    { product.fileFormats.map((el, index) => (
                        <Dropdown.Item
                            key={ index }
                            onClick={() => { 
                                addToCart(
                                    product,
                                    addToast,
                                    quantityCount,
                                    selectedProductColor,
                                    selectedProductSize,
                                    el.platformId,
                                    el.renderId,
                                    el.name
                                )
                            }}
                            href='#'
                        >
                            { el.name }
                        </Dropdown.Item>
                    )) }
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    const handleWishlistClick = () => {
        if (wishlistItem !== undefined) {
            return () => {
                deleteFromWishlist(product, addToast);
                setProductWishesCount(productWishesCount-1);
            }
        }
        return () => {
            addToWishlist(product, addToast);
            if (isLoggedIn()) {
                const handlerAddedToWishlist = () => setProductWishesCount(productWishesCount+1);
                document.addEventListener('onAddedToWishlist', () => {
                    handlerAddedToWishlist();
                    document.removeEventListener('onAddedToWishlist', handlerAddedToWishlist);
                });
            }
        }
    }

    const onProductVariantChanged = (target) => {
        return () => {
            router.push(`${process.env.PUBLIC_URL}/product/${target}`);
        };
    }

    const renderProductVariants = () => {
        if (!product.variants || !product.variants.prev) {
            return '';
        }
        return (
            <div
                className='product-content__variants'
            >
                <button
                    className='button-prev button-nav'
                    onClick={ onProductVariantChanged(product.variants.prev) }
                >
                    <IoIosArrowBack />
                </button>
                <button
                    className='lezada-button lezada-button--medium product-content__variant space-mr--10'
                >
                    Variants
                </button>
                <button
                    className='button-next button-nav'
                    onClick={ onProductVariantChanged(product.variants.next) }
                >
                    <IoIosArrowForward />
                </button>
            </div>
        );
    }

    return (
        <div className='product-content'>
            { product.brand
                ?   <div className='product-content__brand'>
                        <Link
                            href={`/brands/${product.brand.slug}`}
                            as={process.env.PUBLIC_URL + '/brands/' + product.brand.slug}
                        >
                            {product.brand.name}
                        </Link>
                    </div>
                : ''
            }
            <h1 className='product-content__title'>
                {product.name}
            </h1>

            <div className='product-content__price space-mb--20'>
                {product.discount > 0 ? (
                    <Fragment>
                        <span className='main-price discounted'>
                            $ {productPrice}
                        </span>
                        <span className='main-price'>$ {discountedPrice}</span>
                    </Fragment>
                ) : (
                    <span className='main-price'>$ {productPrice}</span>
                )}
            </div>
            <div className='product-content__description space-mb--30'>
                <p dangerouslySetInnerHTML={createMarkup(product.fullDescription)}></p>
            </div>

            <Fragment>
                <div className='product-content__button-wrapper d-flex align-items-center'>
                    { renderAddToCardButton() }

                    <button
                        className={`product-content__wishlist space-mr--10 ${
                            wishlistItem !== undefined ? 'active' : ''
                        }`}
                        title={
                            wishlistItem !== undefined
                                ? 'Added to favourites'
                                : 'Add to favourites'
                        }
                        onClick={ handleWishlistClick() }
                    >
                        <IoIosHeartEmpty />
                        { productWishesCount > 0 &&
                            <span className='product-content__wishes-count'>{productWishesCount}</span> }
                    </button>
                </div>

                <div className='product-content__button-wrapper d-flex align-items-center'>
                    { renderProductVariants() }
                </div>

                <div className='product-content__other-info space-mt--50'>
                    <table>
                        <tbody>
                            <tr className='single-info'>
                                <td className='value'>
                                    <a
                                        href={product.official_website_url}
                                        target='_blank'
                                    >
                                        <b>Official Website</b>
                                    </a>
                                </td>
                            </tr>
                            <tr className='single-info'>
                                <td className='value'>
                                    <a
                                        href={product.tearsheet_url}
                                        target='_blank'
                                    >
                                        <b>Tearsheet</b>
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td>&nbsp;</td>
                            </tr>

                            <tr className='single-info'>
                                <td className='title'>Code: </td>
                                <td className='value'>{product.sku}</td>
                            </tr>

                            <tr className='single-info'>
                                <td className='title'>Dimension (cm):</td>
                                <td className='value'>
                                    {dimensionsCm && (
                                        <span>
                                            {dimensionsCm.width?.['short-name']}:{' '}
                                            {dimensionsCm.width?.value}{'cm'}&nbsp;&nbsp;&nbsp;
                                            {dimensionsCm.depth?.['short-name']}:{' '}
                                            {dimensionsCm.depth?.value}{'cm'}&nbsp;&nbsp;&nbsp;
                                            {dimensionsCm.height?.['short-name']}:{' '}
                                            {dimensionsCm.height?.value}{'cm'}
                                        </span>
                                    )}
                                </td>
                            </tr>

                            <tr className='single-info'>
                                <td className='title'>Dimension (in):</td>
                                <td className='value'>
                                    {dimensionsIn && (
                                        <span>
                                            {dimensionsIn.width?.['short-name']}:{' '}
                                            {dimensionsIn.width?.value}{'in'}&nbsp;&nbsp;&nbsp;
                                            {dimensionsIn.depth?.['short-name']}:{' '}
                                            {dimensionsIn.depth?.value}{'in'}&nbsp;&nbsp;&nbsp;
                                            {dimensionsIn.height?.['short-name']}:{' '}
                                            {dimensionsIn.height?.value}{'in'}
                                        </span>
                                    )}
                                </td>
                            </tr>

                            <tr className='single-info'>
                                <td className='title'>Platform:</td>
                                <td className='value'>
                                    {product.platforms.length ? product.platforms.join(', ') : 'none'}
                                </td>
                            </tr>

                            <tr className='single-info'>
                                <td className='title'>Render:</td>
                                <td className='value'>
                                    {product.renders.length ? product.renders.join(', ') : 'none'}
                                </td>
                            </tr>

                            <tr className='single-info'>
                                <td className='title'>Material:</td>
                                <td className='value'>
                                    {materials &&
                                        materials
                                            .map((item) => {
                                                return item.name;
                                            })
                                            .join(', ')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Fragment>
        </div>
    );
};

export default ProductDescription;
