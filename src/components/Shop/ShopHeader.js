import { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { MdViewComfy, MdApps, MdList } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { setActiveLayout } from '../../lib/product';
import { isLoggedIn } from '../../lib/auth';

const ShopHeader = ({
    sortedProductCount,
    productCount,
    getLayout,
    layoutClass,
    listMode,
    filteredWishlist,
    filteredPurchased,
    productsSortOrder,
    setFilteredWishlist,
    setFilteredPurchased,
    setProductsSortOrder
}) => {
    const [orderDropdownShow, setOrderDropdownShow] = useState(false);
    
    const orderOptions = {
        new: 'Newest',
        name: 'Name',
        price_asc: 'Price &#8599;',
        price_desc: 'Price &#8600;',
    }
    const toggleFilteredWishlist = () => {
        setFilteredWishlist(!filteredWishlist);
    }
    const toggleFilteredPurchased = () => {
        setFilteredPurchased(!filteredPurchased);
    }
    const onProductsSortOrderChange = key => {
        setOrderDropdownShow(false);
        setProductsSortOrder(key);
    }

    useEffect(() => {
        setProductsSortOrder('new');
    }, []);

    return (
        <div className='shop-header'>
            <Container className={layoutClass ? layoutClass : ''}>
                <Row className='align-items-center'>
                    <Col md={4} lg={5} className='text-center text-md-left'>
                        Showing {sortedProductCount} of {productCount} result
                    </Col>

                    <Col md={8} lg={7}>
                        <div className='shop-header__filter-icons justify-content-center justify-content-md-end'>
                            <div className='filter-buttons text-center'>
                                { isLoggedIn() && (
                                    <Fragment>
                                        <button
                                            className={`lezada-button light-button lezada-button--small wishlist${ filteredWishlist ? ' active' : '' }`}
                                            title='Filter favourites'
                                            onClick={ toggleFilteredWishlist }
                                        >
                                            Favourites
                                        </button>
                                        <button
                                            className={`lezada-button light-button lezada-button--small mx-3 purchased${ filteredPurchased ? ' active' : '' }`}
                                            title='Filter purchased'
                                            onClick={ toggleFilteredPurchased }
                                        >
                                            Purchased
                                        </button>
                                    </Fragment>
                                )}
                                <Dropdown
                                    show={ orderDropdownShow }
                                    onMouseLeave={ () => setOrderDropdownShow(false) }
                                    className='mt-2 mt-sm-0'
                                >
                                    <Dropdown.Toggle
                                        className='space-mr--10 light-dropdown-button'
                                        bsPrefix='custom'
                                        variant='custom'
                                        onClick={ () => setOrderDropdownShow(!orderDropdownShow) }
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: `Sort by: ${ orderOptions[productsSortOrder]}`
                                            }}
                                        ></span>
                                        &nbsp;
                                        <IoIosArrowDown />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    { Object.keys(orderOptions).map(key => (
                                        <Dropdown.Item
                                            key={ key }
                                            onClick={() => { onProductsSortOrderChange(key) }}
                                            href='#'
                                            dangerouslySetInnerHTML={{ __html: orderOptions[key] }}
                                        >
                                        </Dropdown.Item>
                                    )) }
                                    </Dropdown.Menu> 
                                </Dropdown>
                            </div>
                            <div className='single-icon grid-icons d-none d-lg-block'>
                                <button
                                    onClick={(e) => {
                                        getLayout('grid three-column');
                                        setActiveLayout(e);
                                    }}>
                                    <MdApps />
                                </button>

                                <button
                                    className='active'
                                    onClick={(e) => {
                                        getLayout('grid four-column');
                                        setActiveLayout(e);
                                    }}>
                                    <MdViewComfy />
                                </button>
                                {listMode === false ? (
                                    ''
                                ) : (
                                    <button
                                        onClick={(e) => {
                                            getLayout('list');
                                            setActiveLayout(e);
                                        }}>
                                        <MdList />
                                    </button>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ShopHeader;
