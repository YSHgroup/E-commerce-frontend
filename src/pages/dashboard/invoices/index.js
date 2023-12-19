import Head from 'next/head';

import { LayoutDashlite } from '../../../components/Layout';
import WithAuth from '../../../components/WithAuth';

import api from '../../../lib/api';
import { IT_CUSTOMER_BUY_CREDITS } from '../../../lib/common';
import { fetchUser } from '../../../redux/actions/userActions';

import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Paginator from 'react-hooks-paginator';
import { useDispatch, connect } from 'react-redux';

import Cookies from 'js-cookie';

const FileDownload = require('js-file-download');

const PaymentHistory = ({ user }) => {
    const [busy, setBusy] = useState(false);
    const [isSidebarShown,  setIsSidebarShown] = useState(false);
    const [invoices,  setInvoices] = useState([]);
    const [offset,  setOffset] = useState([]);
    const [currentInvoicesPage,  setCurrentInvoicesPage] = useState(1);
    
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
        updateInvoicesData();
    }, [user, currentInvoicesPage]);

    const updateInvoicesData = () => {
        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .get('/api/v1/dashboard/invoices'
                        + '?page=' + currentInvoicesPage)
                    .then((response) => {
                        setInvoices(response.data);
                    })
                    .catch(error => {
                        console.log('Error on fetching of the invoices list:', error);
                    });
            });
    };

    const invoicesRows = invoices?.rows?.map(el => (
        <tr
            className="tb-odr-item"
            key={ el.id }
        >
            <td className="tb-odr-info">
                <span className="tb-odr-id">
                    <a href="#">#{ el.invoice_id }</a>
                </span>
                <span className="tb-odr-date">{ el.created_date }</span>
            </td>
            <td className="tb-odr-amount">
                <span className="tb-odr-total">
                    <span className="amount">$ { el.total }</span>
                </span>
            </td>
            <td className="tb-odr-obtained">
                <span className="tb-odr-total">
                    <span className="tb-odr-obtained">
                        { el.type == IT_CUSTOMER_BUY_CREDITS ? 'Credits' : 'Products' }
                    </span>
                </span>
            </td>
            <td className="tb-odr-action">
                <div className="tb-odr-btns d-none d-sm-inline">
                    <a
                        href={`${ process.env.BASE_URL }/api/v1/invoice/download/${ el.invoice_id }`}
                        target="_blank"
                        className="btn btn-icon btn-white btn-dim btn-sm btn-primary"
                    >
                        <em className="icon ni ni-printer-fill"></em>
                    </a>
                    <a
                        href={`/dashboard/invoices/${ el.invoice_id }`}
                        className="btn btn-dim btn-sm btn-primary"
                    >
                        View
                    </a>
                </div>
                <a
                    href={`/dashboard/invoices/${ el.invoice_id }`}
                    className="btn btn-pd-auto d-sm-none"
                >
                    <em className="icon ni ni-chevron-right"></em>
                </a>
            </td>
        </tr>
    ));

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
                <title>Invoices | My Account | 3d Infinite</title>
            </Head>

            <Row>
                <Col>
                    <div className="nk-block-head nk-block-head-sm pb-4">
                        <div className="nk-block-between">
                            <div className="nk-block-head-content">
                                <h4 className="nk-block-title page-title">
                                    Invoices
                                </h4>
                                <div className="nk-block-des text-soft">
                                    <p>You have total { invoices.count || 0 } invoices.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="nk-block">
                        <div className="card">
                            <div className="card-inner p-0">
                                { invoices.rows && invoices.rows.length
                                    ? (
                                        <table className="table table-orders">
                                            <thead className="tb-odr-head">
                                                <tr className="tb-odr-item">
                                                    <th className="tb-odr-info">
                                                        <span className="tb-odr-id">Order ID</span>
                                                        <span className="tb-odr-date d-none d-md-inline-block">Date</span>
                                                    </th>
                                                    <th className="tb-odr-amount">
                                                        <span className="tb-odr-total">Amount</span>
                                                    </th>
                                                    <th className="tb-odr-obtained">
                                                        <span className="tb-odr-obtained">Obtained</span>
                                                    </th>
                                                    <th className="tb-odr-action">
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="tb-odr-body">
                                                { invoicesRows }
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="p-3">No invoices yet.</p>
                                    )
                                }
                                { (invoices?.count || 0) > (invoices?.perPage || 0) ? (
                                    <Row>
                                        <Col>
                                            <Paginator
                                                totalRecords={ invoices.count }
                                                pageLimit={ invoices.perPage }
                                                pageNeighbours={2}
                                                setOffset={ setOffset }
                                                currentPage={ currentInvoicesPage }
                                                setCurrentPage={ setCurrentInvoicesPage }
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

export default connect(mapStateToProps)(WithAuth(PaymentHistory));
