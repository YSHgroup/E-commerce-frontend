import { Fragment, useState, useEffect } from 'react';
import { Dropdown, Col } from 'react-bootstrap';
import Link from 'next/link';
import { IoIosHeartEmpty, IoIosShuffle, IoIosSearch, IoIosHeart, IoIosBasket } from 'react-icons/io';
import { Tooltip } from 'react-tippy';
import ProductModal from './ProductModal';

const ProductGridList = ({
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
    cartItems
}) => {
    const [modalShow, setModalShow] = useState(false);
    const [dropdownShow, setDropdownShow] = useState(false);

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

    useEffect(() => {
        document.querySelectorAll('.dropdown-button').forEach((el) => {
            el.classList.remove('btn');
            el.classList.remove('btn-secondary');
        });
    }, [product]);

    const renderAddToCardButton = () => {
        if (product.isPurchased) {
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
            <Dropdown
                show={ dropdownShow }
                onMouseLeave={ () => setDropdownShow(false) }
            >
                <Dropdown.Toggle
                    variant='secondary'
                    className='lezada-button lezada-button--medium product-content__cart space-mr--10 dropdown-button'
                    onClick={ () => setDropdownShow(!dropdownShow) }
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
                                if (cartItem === undefined) {
                                    addToCart(
                                        product,
                                        addToast,
                                        1,
                                        0,
                                        0,
                                        el.platformId,
                                        el.renderId,
                                        el.name
                                    )
                                }
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

    return (
        <Fragment>
            <Col lg={3} md={6} className={bottomSpace ? bottomSpace : ''}>
                <div
                    className={
                        'product-grid'
                        + `${ cartItem !== undefined ? ' added-to-cart' : ''}`
                        + `${ product.isPurchased ? ' purchased' : '' }`
                    }
                >
                    {/*=======  single product image  =======*/}
                    <div className='product-grid__image'>
                        <Link
                            href={`/product/${product.slug}`}
                            as={process.env.PUBLIC_URL + '/product/' + product.slug}
                            className='image-wrap'>
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    product.thumbImage[0]
                                }
                                className='img-fluid'
                                alt={product.name}
                            />
                            {product.thumbImage.length > 1 ? (
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        product.thumbImage[1]
                                    }
                                    className='img-fluid'
                                    alt={product.name}
                                />
                            ) : (
                                ''
                            )}
                        </Link>
                        <div className='product-grid__floating-badges'>
                            {product.discount && product.discount > 0 ? (
                                <span className='onsale'>
                                    -{product.discountPercent}%
                                </span>
                            ) : (
                                ''
                            )}
                            {product.new ? (
                                <span className='hot'>New</span>
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
                                        : 'Add to favourites'
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
                                            : () =>
                                                addToWishlist(
                                                    product,
                                                    addToast
                                                )
                                    }
                                    className={
                                        wishlistItem !== undefined
                                            ? 'active'
                                            : ''
                                    }>
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
                                    href={process.env.PUBLIC_URL + '/product/' + product.slug}
                                    as={process.env.PUBLIC_URL + '/product/' + product.slug}
                                >
                                    <p>
                                        { product.brand
                                            ? <b>{ product.brand.name }</b>
                                            : <span>&nbsp;</span> }
                                    </p>
                                    {product.name}
                                </Link>
                            </h3>
                            { renderAddToCardButton() } 
                        </div>
                        <div className='price'>
                            {product.discount > 0 ? (
                                <Fragment>
                                    <span className='main-price discounted'>
                                        $ {productPrice}
                                    </span>
                                    <span className='discounted-price'>
                                        $ {discountedPrice}
                                    </span>
                                </Fragment>
                            ) : (
                                <span className='main-price'>
                                    $ {productPrice}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className='product-list'>
                    {/*=======  single product image  =======*/}
                    <div className='product-list__image'>
                        <Link
                            href={process.env.PUBLIC_URL + '/product/' + product.slug}
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
                        <div className='product-list__floating-badges'>
                            {product.discount && product.discount > 0 ? (
                                <span className='onsale'>
                                    -{product.discountPercent}%
                                </span>
                            ) : (
                                ''
                            )}
                            {product.new ? (<span className='hot'>New</span>) : ('')}
                        </div>
                        <div className='product-list__floating-icons'>
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
                                        : 'Add to favourites'
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
                                            : () =>
                                                  addToWishlist(
                                                      product,
                                                      addToast
                                                  )
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
                    <div className='product-list__content'>
                        <div className='row'>
                            <div className='col-xxl-6 col-12'>
                                <div className='title'>
                                    { product.brand
                                        ? 
                                            <div className='brand'>
                                                <Link
                                                    href={process.env.PUBLIC_URL + '/brands/' + product.brand.slug}
                                                    as={process.env.PUBLIC_URL + '/brands/' + product.brand.slug}
                                                >
                                                    <b>{ product.brand.name }</b>
                                                </Link>
                                            </div>
                                        : ''}
                                    <h3>
                                        <Link
                                            href={process.env.PUBLIC_URL + '/product/' + product.slug}
                                            as={process.env.PUBLIC_URL + '/product/' + product.slug}
                                        >
                                            { product.name }
                                        </Link>
                                    </h3>
                                    
                                </div>
                                <div className='price'>
                                    {product.discount > 0 ? (
                                        <Fragment>
                                            <span className='main-price discounted'>
                                                $ {productPrice}
                                            </span>
                                            <span className='discounted-price'>
                                                $ {discountedPrice}
                                            </span>
                                        </Fragment>
                                    ) : (
                                        <span className='main-price'>
                                            $ {productPrice}
                                        </span>
                                    )}
                                </div>

                                <div
                                    className='short-description'
                                    dangerouslySetInnerHTML={{__html: product.shortDescription}}
                                ></div>
                                <div className='add-to-cart'>
                                    <button
                                        onClick={() => addToCart(product, addToast)}
                                        className='lezada-button lezada-button--medium'>
                                        {cartItem !== undefined
                                            ? 'Added to cart'
                                            : 'Add to cart'}
                                    </button>
                                </div>
                                <table className='space-mt--10'>
                                    <tbody>
                                        <tr className='single-info'>
                                            <td className='value'>
                                                <a
                                                    href={product.officialWebsiteUrl}
                                                    target='_blank'
                                                >
                                                    <b>Official Website</b>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr className='single-info'>
                                            <td className='value'>
                                                <a
                                                    href={product.tearsheetUrl}
                                                    target='_blank'
                                                >
                                                    <b>Tearsheet</b>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-xxl-6 col-12'>
                                <table>
                                    <tbody>
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
                                                {materials && materials.map((item) => {
                                                        return item.name;
                                                    })
                                                    .join(', ')}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </Col>
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

export default ProductGridList;
