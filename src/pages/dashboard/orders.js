import Head from 'next/head';

import { LayoutDashlite } from '../../components/Layout';
import WithAuth from '../../components/WithAuth';

import api from '../../lib/api';
import { fetchUser } from '../../redux/actions/userActions';

import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Paginator from 'react-hooks-paginator';
import { useDispatch, connect } from 'react-redux';

import Cookies from 'js-cookie';
import { ProductElement } from '../../components/Product';

const Orders = ({ user }) => {
    const [busy, setBusy] = useState(false);
    const [isSidebarShown,  setIsSidebarShown] = useState(false);
    const [products,  setProducts] = useState([]);
    const [offset,  setOffset] = useState([]);
    const [currentPurchasesPage,  setCurrentPurchasesPage] = useState(1);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    useEffect(() => {
        if (isSidebarShown) {
            document.body.classList.add('nav-shown');
        } else {
            document.body.classList.remove('nav-shown');
        }
    }, [isSidebarShown]);

    useEffect(() => {
        updatePurchasesData();
    }, [user, currentPurchasesPage]);

    const updatePurchasesData = () => {
        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .get('/api/v1/dashboard/purchases'
                            + '?page=' + currentPurchasesPage)
                    .then((response) => {
                        setProducts(response.data);
                    })
                    .catch(error => {
                        console.log('Error on fetching of the purchases list:', error);
                    });
            });
    };

    const productsElements = products.rows?.original?.data && products.rows?.original?.data.length 
        ? products.rows.original.data.map((el, index) => (
            <ProductElement
                element={ el }
                index={ index }
                key={ index }
            />
        )) : (
            <p>No purchased products yet.</p>
        );

    return (
        <LayoutDashlite 
            busy={ busy }
            setBusy={ setBusy }
            user={ user }
            isSidebarShown={ isSidebarShown }
            setIsSidebarShown={ setIsSidebarShown }
        >
            {/* Page Title */}
            <Head>
                <title>Orders | My Account | 3d Infinite</title>
            </Head>

            <div className="nk-block-head nk-block-head-sm pb-4">
                <div className="nk-block-between">
                    <div className="nk-block-head-content">
                        <h4 className="nk-block-title page-title">
                            Purchased Products
                        </h4>
                    </div>
                </div>
            </div>

            <div className="nk-block">
                <div className="card">
                    <div className="card-inner">
                        <Row>
                            { productsElements }
                        </Row>
                        { (products?.count || 0) > (products?.perPage || 0) ? (
                            <Row>
                                <Col>
                                    <Paginator
                                        totalRecords={ products.count }
                                        pageLimit={ products.perPage }
                                        pageNeighbours={2}
                                        setOffset={ setOffset }
                                        currentPage={ currentPurchasesPage }
                                        setCurrentPage={ setCurrentPurchasesPage }
                                        pageContainerClassName='mb-0 mt-0 pagination justify-content-center justify-content-md-start'
                                        pagePrevText='«'
                                        pageNextText='»'
                                    />
                                </Col>
                            </Row>
                        ) : '' }
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps)(WithAuth(Orders));
