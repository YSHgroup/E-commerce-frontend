import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { LayoutDashlite } from '../../components/Layout';
import WithAuth from '../../components/WithAuth';

import { logOut } from '../../lib/auth';
import api from '../../lib/api';
import { fetchUser } from '../../redux/actions/userActions';

import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';

import Cookies from 'js-cookie';

import { loadStripe } from '@stripe/stripe-js';
import { closeMenuOnClickOutside } from '../../lib/common';


const FileDownload = require('js-file-download');

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const Products = ({ user, status }) => {
    const [busy, setBusy] = useState(false);
    const [isSortOptionsShown, setIsSortOptionsShown] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOption, setSortOption] = useState('none');
    const [sortOptions, setSortOptions] = useState({
        'none': 'None',
        'top-earnings': 'Top earning products',
        'best-sellers': 'Best sellers per downloads'
    });

    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchUser());
        // this page is available for artists only
        if (!user.artist_id) {
            router.push(process.env.PUBLIC_URL + '/dashboard');
        }
        return closeMenuOnClickOutside(setIsSortOptionsShown);
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [searchKeyword, sortOption])

    const toggleSortOptionsDropdown = (e) => {
        e.preventDefault();
        setIsSortOptionsShown(!isSortOptionsShown);
        return false;
    }

    const selectSortOption = (e, key) => {
        e.preventDefault();
        setSortOption(key);
        return false;
    }

    let delayedFunction = false;
    const changeKeyword = (e) => {
        const keyword = document.querySelector('#search-field').value;
        clearTimeout(delayedFunction);
        if (!keyword.length || keyword.length > 2) {
            delayedFunction = setTimeout(() => {
                setSearchKeyword(keyword);
            }, 500);
        }
    }

    const fetchProducts = () => {
        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                .get('/api/v1/dashboard/products'
                    + '?searchKeyword=' + encodeURIComponent(searchKeyword)
                    + '&sortOption=' + sortOption
                )
                .then((response) => {
                    setProducts(response.data.data);
                })
                .catch(error => {
                    console.log('Error on fetching of the product list:', error);
                });
            });
    }

    const sortOptionsElements = Object.keys(sortOptions).map(key => (
        <li key={ key }>
            <a
                href="#"
                onClick={ (e) => selectSortOption(e, key) }
            >
                <span>{ sortOptions[key] }</span>
            </a>
        </li>
    ))

    const getProductsElements = () => {
        if (!products.length) {
            return <div className="nk-tb-item">
                <strong>No products here.</strong>
            </div>
        }
        return products.map((el, index) => (
            <div className="nk-tb-item" key={ index }>
                <div className="nk-tb-col">
                    <span className="tb-product">
                        <img
                            src={ el.image_main }
                            alt={ el.name }
                            className="thumb"
                        />
                        <div className="user-card">
                            <div className="user-info">
                                <span className="tb-lead">
                                    { el.name }
                                </span>
                                <span>SKU# { el.sku }</span>
                            </div>
                        </div>
                    </span>
                </div>

                <div className="nk-tb-col tb-col-mb">
                    <span className="tb-status">{ el.brand_name || 'unknown' }</span>
                </div>

                <div className="nk-tb-col tb-col-mb">
                    <span className="tb-status">${ el.regular_price }</span>
                </div>

                <div className="nk-tb-col tb-col-mb">
                    <span className="tb-status">${ el.total_earnings || '0.00' }</span>
                </div>

                <div className="nk-tb-col tb-col-mb">
                    <span className="tb-status">{ el.sales_count }</span>
                </div>

                <div className="nk-tb-col tb-col-md">
                    <span className="tb-amount">{ el.created_at }</span>
                </div>
            </div>
        ));
    };

    return (
        <LayoutDashlite 
            busy={ busy }
            setBusy={ setBusy }
            user={ user }
        >
            {/* Page Title */}
            <Head>
                <title>Products | My Account | 3d Infinite</title>
            </Head>

            <div className="nk-block-head nk-block-head-sm pb-4">
                <div className="nk-block-between">
                    <div className="nk-block-head-content">
                        <h4 className="nk-block-title page-title">
                            What you have
                        </h4>
                    </div>
                    <div className="nk-block-head-content">
                        <div className="toggle-wrap nk-block-tools-toggle">
                            <a href="#" className="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="more-options"><em className="icon ni ni-more-v"></em></a>
                            <div className="toggle-expand-content" data-content="more-options">
                                <ul className="nk-block-tools g-3">
                                    <li>
                                        <div className="form-control-wrap">
                                            <div className="form-icon form-icon-right">
                                                <em className="icon ni ni-search"></em>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control search-field"
                                                id="search-field"
                                                placeholder="Search Product by Name"
                                                onKeyUp={ changeKeyword }
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className={`drodown${ isSortOptionsShown ? ' show' : '' }`}>
                                            <a
                                                href="#"
                                                className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-dim btn-white"
                                                data-toggle="dropdown"
                                                aria-expanded={ isSortOptionsShown ? 'true' : 'false' }
                                                onClick={ (e) => toggleSortOptionsDropdown(e) }
                                            >
                                                { sortOption != 'none' ? sortOptions[sortOption] : 'Sort By' }
                                            </a>
                                            <div
                                                className={
                                                    `dropdown-menu dropdown-menu-right`
                                                    + (isSortOptionsShown ? ' show' : '')
                                                }
                                            >
                                                <ul className="link-list-opt no-bdr">
                                                    { sortOptionsElements }
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Row className="g-gs">
                <Col xs={12}>
                    <div className="nk-tb-list is-separate mb-3">
                        <div className="nk-tb-item nk-tb-head">
                            <div className="nk-tb-col"><span className="sub-text">Name</span></div>
                            <div className="nk-tb-col"><span className="sub-text">Brand</span></div>
                            <div className="nk-tb-col"><span className="sub-text">Price</span></div>
                            <div className="nk-tb-col tb-col-md"><span className="sub-text">Total Earnings</span></div>
                            <div className="nk-tb-col tb-col-mb"><span className="sub-text">Total Sales</span></div>
                            <div className="nk-tb-col tb-col-md"><span className="sub-text">Created At</span></div>
                        </div>
                        { getProductsElements() }
                    </div>
                </Col>
            </Row>
        </LayoutDashlite>
    );
};

const mapStateToProps = (state) => {
    const success = Cookies.get('tdi_purchase_success');
    let status = {
        success: false
    };

    if (!!success) {
        status = {
            success: success
        };

        if (success.new) {
            success.new = false;
        }
    }

    return {
        user: state.userData,
        status
    };
};

export default connect(mapStateToProps)(WithAuth(Products));
