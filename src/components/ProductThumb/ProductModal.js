import { Fragment, useState, useEffect } from 'react';
import { Modal, Row, Col, Dropdown } from 'react-bootstrap';
import { IoIosHeartEmpty } from 'react-icons/io';
import Swiper from 'react-id-swiper';
import CustomScroll from 'react-custom-scroll';
import Link from 'next/link';

const ProductModal = (props) => {
    const {
        product,
        discountedprice,
        productprice,
        wishlistitem,
        addtocart,
        addtowishlist,
        deletefromwishlist,
        addtoast,
        cartitem
    } = props;

    const [dropdownShow, setDropdownShow] = useState(false);

    useEffect(() => {
        document.querySelectorAll('.dropdown-button').forEach((el) => {
            el.classList.remove('btn');
            el.classList.remove('btn-secondary');
        });
    }, [props.show]);

    const gallerySwiperParams = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    };

    const params = {};
    const materials = [];
    const matArray = ['wood', 'marble', 'leather', 'metal'];

    product.parameters.map((item) => {
        params[item.slug] = item;

        if (matArray.includes(item.slug)) {
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
                    { cartitem !== undefined
                        ? 'Added To Cart'
                        : 'Add To Cart' }
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    { product.fileFormats.map((el, index) => (
                        <Dropdown.Item
                            key={ index }
                            onClick={() => { 
                                if (cartitem === undefined) {
                                    addtocart(
                                        product,
                                        addtoast,
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
        <Modal
            show={props.show}
            onHide={props.onHide}
            className='product-quickview'
            centered>
            <Modal.Body>
                <Modal.Header closeButton></Modal.Header>
                <div className='product-quickview__image-wrapper'>
                    <Swiper {...gallerySwiperParams}>
                        {product.image &&
                            product.image.map((single, key) => {
                                return (
                                    <div key={key}>
                                        <div className='single-image'>
                                            <img
                                                src={
                                                    process.env.PUBLIC_URL +
                                                    single
                                                }
                                                className='img-fluid'
                                                alt=''
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </Swiper>
                </div>
                <Row>
                    <Col md={7} sm={12} className='ml-auto'>
                        <CustomScroll allowOuterScroll={true}>
                            <div className='product-quickview__content'>
                                <h2 className='product-quickview__title space-mb--20'>
                                    {product.name}
                                </h2>
                                {product.brand
                                    ?   <div className='product-quickview__brand space-mb--20'>
                                            <Link
                                                href={`/brands/${product.brand.slug}`}
                                                as={process.env.PUBLIC_URL + `/brands/` + product.brand.slug}
                                            >
                                                { product.brand.name }
                                            </Link>
                                        </div>
                                    : ''}
                                <div className='product-quickview__price space-mb--20'>
                                    {product.discount > 0 ? (
                                        <Fragment>
                                            <span className='main-price discounted'>
                                                $ {productprice}
                                            </span>
                                            <span className='main-price'>
                                                $ {discountedprice}
                                            </span>
                                        </Fragment>
                                    ) : (
                                        <span className='main-price'>
                                            $ {productprice}
                                        </span>
                                    )}
                                </div>

                                <div className='product-quickview__description space-mb--30'>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: product.shortDescription
                                        }}></p>
                                </div>

                                <div className='product-quickview__description space-mb--30'>
                                    <table className='table table-borderless'>
                                        <tbody>
                                            <tr className='single-info'>
                                                <td className='font-weight-bold pl-0 title'>
                                                    Dimension (cm):
                                                </td>
                                                {dimensionsCm.width &&
                                                    dimensionsCm.height &&
                                                    dimensionsCm.depth && (
                                                        <td className='value'>
                                                            {
                                                                dimensionsCm
                                                                    .width[
                                                                    'short-name'
                                                                ]
                                                            }{' '}
                                                            :{' '}
                                                            {
                                                                dimensionsCm
                                                                    .width.value
                                                            }{' '}
                                                            {
                                                                dimensionsCm
                                                                    .height[
                                                                    'short-name'
                                                                ]
                                                            }{' '}
                                                            :{' '}
                                                            {
                                                                dimensionsCm
                                                                    .height
                                                                    .value
                                                            }{' '}
                                                            {
                                                                dimensionsCm
                                                                    .depth[
                                                                    'short-name'
                                                                ]
                                                            }{' '}
                                                            :{' '}
                                                            {
                                                                dimensionsCm
                                                                    .depth.value
                                                            }
                                                        </td>
                                                    )}
                                            </tr>

                                            <tr className='single-info'>
                                                <td className='font-weight-bold pl-0 title'>
                                                    Dimension (in):
                                                </td>
                                                {dimensionsIn.width &&
                                                    dimensionsIn.height &&
                                                    dimensionsIn.depth && (
                                                        <td className='value'>
                                                            {
                                                                dimensionsIn
                                                                    .width[
                                                                    'short-name'
                                                                ]
                                                            }{' '}
                                                            :{' '}
                                                            {
                                                                dimensionsIn
                                                                    .width.value
                                                            }{' '}
                                                            {
                                                                dimensionsIn
                                                                    .height[
                                                                    'short-name'
                                                                ]
                                                            }{' '}
                                                            :{' '}
                                                            {
                                                                dimensionsIn
                                                                    .height
                                                                    .value
                                                            }{' '}
                                                            {
                                                                dimensionsIn
                                                                    .depth[
                                                                    'short-name'
                                                                ]
                                                            }{' '}
                                                            :{' '}
                                                            {
                                                                dimensionsIn
                                                                    .depth.value
                                                            }
                                                        </td>
                                                    )}
                                            </tr>

                                            <tr className='single-info'>
                                                <td className='font-weight-bold pl-0 title'>
                                                    Platform:
                                                </td>
                                                <td className='value'>
                                                    {params['3ds-max-2014']
                                                        ? params['3ds-max-2014']
                                                              .name
                                                        : ''}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <Fragment>
                                    <div className='product-quickview__button-wrapper d-flex align-items-center'>
                                        { renderAddToCardButton() }

                                        <button
                                            className={`product-quickview__wishlist space-mr--10 ${
                                                wishlistitem !== undefined
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            title={
                                                wishlistitem !== undefined
                                                    ? 'Added to favourites'
                                                    : 'Add to favourites'
                                            }
                                            onClick={
                                                wishlistitem !== undefined
                                                    ? () =>
                                                        deletefromwishlist(
                                                            product,
                                                            addtoast
                                                        )
                                                    : () =>
                                                        addtowishlist(
                                                            product,
                                                            addtoast
                                                        )
                                            }>
                                            <IoIosHeartEmpty />
                                        </button>
                                    </div>
                                </Fragment>
                            </div>
                        </CustomScroll>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;
