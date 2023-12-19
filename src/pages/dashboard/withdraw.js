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
import ArtistTotalSalesChartBlock from '../../components/Dashboard/ArtistTotalSalesChartBlock';
import ArtistTotalEarningsChartBlock from '../../components/Dashboard/ArtistTotalEarningsChartBlock';
import ArtistTotalPayoutsChartBlock from '../../components/Dashboard/ArtistTotalPayoutsChartBlock';
import { Fragment } from 'react';
import Link from 'next/link';

const MIN_PAYOUT_AMOUNT = 50;

const Withdraw = ({ user }) => {
    const [busy, setBusy] = useState(false);
    const [isSidebarShown,  setIsSidebarShown] = useState(false);
    const [isPayoutRequestModalShown,  setIsPayoutRequestModalShown] = useState(false);
    const [isPayoutRequestFormValid,  setIsPayoutRequestFormValid] = useState(true);
    const [artist,  setArtist] = useState({});
    const [payoutRequests,  setPayoutRequests] = useState([]);
    const [offset,  setOffset] = useState([]);
    const [currentPayoutsPage,  setCurrentPayoutsPage] = useState(1);

    const [totalSales,  setTotalSales] = useState(0);
    const [totalDownloads,  setTotalDownloads] = useState(0);
    const [salesChartData,  setSalesChartData] = useState([]);

    const [totalEarnings,  setTotalEarnings] = useState(0);
    const [earningsChartData,  setEarningsChartData] = useState([]);
    
    const [totalPayouts,  setTotalPayouts] = useState(0);
    const [payoutsChartData,  setPayoutsChartData] = useState([]);

    const [payoutRequestFormInput, setPayoutRequestFormInput] = useState({ amount: MIN_PAYOUT_AMOUNT });
    useEffect(() => {
        clientValidation(payoutRequestFormInput);
    }, [payoutRequestFormInput])

    const [payoutRequestErrors, setPayoutRequestErrors] = useState({ amount: [] });
    
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
        if (isPayoutRequestModalShown) {
            document.body.classList.add('modal-open');
            document.body.style.paddingRight = '15px';
            document.querySelector('.nk-header.nk-header-fixed').style.paddingRight = '29px';
        } else {
            document.body.classList.remove('modal-open');
            document.body.style.paddingRight = '0px';
            if (document.querySelector('.nk-header')) {
                document.querySelector('.nk-header').style.paddingRight = '14px';
            }
        }
    }, [isPayoutRequestModalShown]);

    useEffect(() => {
        updateSalesEarningsData();
    }, [user]);

    const updateSalesEarningsData = () => {
        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .get('/api/v1/dashboard/artist-data-withdraw')
                    .then((response) => {
                        setTotalSales(response.data.salesChart.totalSales);
                        setTotalDownloads(response.data.salesChart.totalDownloads);
                        setSalesChartData(response.data.salesChart.data);

                        setTotalEarnings(response.data.earningsChart.totalEarnings);
                        setEarningsChartData(response.data.earningsChart.data);
                        
                        setTotalPayouts(response.data.payoutsChart.totalPayouts);
                        setPayoutsChartData(response.data.payoutsChart.data);

                        setArtist(response.data.artist);
                        setPayoutRequestFormInput({ amount: response.data.artist.payout });
                    })
                    .catch(error => {
                        console.log('Error on fetching of the payout requests list:', error);
                    });
            });
    };
    
    useEffect(() => {
        updatePayoutRequestsData();
    }, [user, currentPayoutsPage]);

    const updatePayoutRequestsData = () => {
        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .get('/api/v1/dashboard/payout-requests'
                            + '?page=' + currentPayoutsPage)
                    .then((response) => {
                        setPayoutRequests(response.data);
                    })
                    .catch(error => {
                        console.log('Error on fetching of the payout requests list:', error);
                    });
            });
    };

    const updatePayoutRequestFormInput = (e) => {
        e.persist();

        setPayoutRequestFormInput({ amount: e.target.value });
    }

    const clientValidation = (inputs) => {
        let isFormValid = true;
        
        let errors = { amount: [] };
        
        if (inputs.amount === '') {
            errors.amount.push('Amount should be specified');
            isFormValid = false;
        }

        if (isNaN(inputs.amount)) {
            errors.amount.push('Amount should be a float number');
            isFormValid = false;
        }
        
        if (inputs.amount < MIN_PAYOUT_AMOUNT) {
            errors.amount.push('Amount should be more than $' + MIN_PAYOUT_AMOUNT.toFixed(2));
            isFormValid = false;
        }

        if (inputs.amount > artist.unpaidEarnings) {
            errors.amount.push('Amount should be less than your unpaid earnings ($' 
                + artist.unpaidEarnings.toFixed(2) + ')');
            isFormValid = false;
        }

        setIsPayoutRequestFormValid(isFormValid);
        setPayoutRequestErrors(errors);

        return isFormValid;
    };

    const showRequestPayoutModal = (e) => {
        e.preventDefault();

        setIsPayoutRequestModalShown(true);

        return false;
    }

    const submitPayoutRequest = (e) => {
        e.preventDefault();
        if (!clientValidation(payoutRequestFormInput)) {
            return false;
        }
        setBusy(true);
        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .post('/api/v1/dashboard/payout-requests', payoutRequestFormInput)
                    .then((response) => {
                        if (response.data.errors) {
                            setPayoutRequestErrors(error.response.data.errors);
                        } else {
                            updatePayoutRequestsData();
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        error.response?.data?.errors && setPayoutRequestErrors(error.response.data.errors);
                    });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsPayoutRequestModalShown(false);
                setBusy(false);
            });

        return false;
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 0 : return 'secondary';
            case 1 : return 'warning';
            case 2 : return 'success';
            case 3 : return 'danger';
        }
    }

    const payoutRequestElements = payoutRequests.rows?.map(el =>
        <tr
            className="tb-odr-item"
            key={ el.id }
        >
            <td className="tb-odr-info">
                <span className="tb-odr-id">
                    #{ el.invoice_id }
                </span>
                <span className="tb-odr-date">
                    {el.created_date }
                </span>
            </td>
            <td className="tb-odr-amount">
                <span className="tb-odr-total">
                    <span className="amount">
                        ${ el.amount }
                    </span>
                </span>
                <span className="tb-odr-status">
                    <span className={`badge badge-dot badge-${ getStatusStyle(el.status) }`}>
                        { el.statusName }
                    </span>
                </span>
            </td>
            <td className="tb-odr-action">
                { el.statusName === 'Paid' ? (
                    <Fragment>
                        <div className="tb-odr-btns d-none d-md-inline">
                            <a
                                href={`${ process.env.BASE_URL }/api/v1/dashboard/payout-invoice/print/${ el.invoice_id }`}
                                className="btn btn-dim btn-sm btn-white btn-icon btn-primary"
                                title="Print invoice"
                                target="_blank"
                            >
                                <em className="icon ni ni-printer-fill"></em>
                            </a>
                            <Link
                                href={`/dashboard/payout-invoices/${ el.invoice_id }`}
                                className="btn btn-dim btn-sm btn-primary"
                                title="View invoice">
                                    View
                            </Link>
                        </div>
                        <Link
                            href={`/dashboard/payout-invoices/${ el.invoice_id }`}
                            className="btn btn-pd-auto d-md-none">
                            <em className="icon ni ni-chevron-right"></em>
                        </Link>
                    </Fragment>
                ) : <span>&nbsp;</span> }
            </td>
        </tr>
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
                <title>Withdraw | My Account | 3d Infinite</title>
            </Head>

            <div className="nk-block-head nk-block-head-sm pb-4">
                <div className="nk-block-between">
                    <div className="nk-block-head-content">
                        <h4 className="nk-block-title page-title">
                            Withdraw
                        </h4>
                    </div>
                    <div className="nk-block-head-content">
                        <ul className="nk-block-tools g-3">
                            <li>
                                <a
                                    href="#"
                                    className="btn btn-primary"
                                    onClick={ showRequestPayoutModal }
                                >
                                    Request Payout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="g-gs withdraw-page">
                <Row>
                    <Col md={6}>
                        <ArtistTotalSalesChartBlock
                            chartData={ salesChartData }
                            totalSales={ totalSales }
                            totalDownloads={ totalDownloads }
                        />
                    </Col>
                    <Col md={6} className="mt-4 mt-md-0">
                        <ArtistTotalPayoutsChartBlock
                            chartData={ payoutsChartData }
                            totalPayouts={ totalPayouts }
                        />
                        <ArtistTotalEarningsChartBlock
                            chartData={ earningsChartData }
                            totalEarnings={ totalEarnings }
                        />
                    </Col>
                </Row>

                <div className="nk-block">
                    <div className="card">
                        <div className="card-inner">
                            <div className="card-title-group">
                                <div className="card-title">
                                    <h5 className="title mb-3">All Payout Requests</h5>
                                </div>
                            </div>
                        </div>
                        <div className="card-inner p-0">
                            { payoutRequests.rows && payoutRequests.rows.length
                                ? (
                                    <table className="table table-payment-requests">
                                        <thead className="tb-odr-head">
                                            <tr className="tb-odr-item">
                                                <th className="tb-odr-info">
                                                    <span className="tb-odr-id">Order ID</span>
                                                    <span className="tb-odr-date d-none d-md-inline-block">Date</span>
                                                </th>
                                                <th className="tb-odr-amount">
                                                    <span className="tb-odr-total">Amount</span>
                                                    <span className="tb-odr-status d-none d-md-inline-block">Status</span>
                                                </th>
                                                <th className="tb-odr-action">&nbsp;</th>
                                            </tr>
                                        </thead>
                                        <tbody className="tb-odr-body">
                                            { payoutRequestElements }
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="p-3">No payout requests yet.</p>
                                )
                            }
                            { (payoutRequests?.count || 0) > (payoutRequests?.perPage || 0) ? (
                                <Row>
                                    <Col>
                                        <Paginator
                                            totalRecords={ payoutRequests.count }
                                            pageLimit={ payoutRequests.perPage }
                                            pageNeighbours={2}
                                            setOffset={ setOffset }
                                            currentPage={ currentPayoutsPage }
                                            setCurrentPage={ setCurrentPayoutsPage }
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
            </div>

            <div 
                className={`modal fade${ isPayoutRequestModalShown ? ' show' : '' }`}
                tabIndex="-1"
                id="user-fullname-edit"
                style={{ display: isPayoutRequestModalShown ? 'block' : 'none' }}
                {   // define conditional tag attributes
                    ...(isPayoutRequestModalShown 
                        ? { 'aria-modal' : true, role: 'dialog' } 
                        : { 'aria-hidden': true } ) 
                }
            >
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <a
                            href="#"
                            className="close"
                            onClick={ (e) => {
                                e.preventDefault();
                                setIsPayoutRequestModalShown(false);
                            }}>
                            <em className="icon ni ni-cross-sm"></em>
                        </a>
                        <div className="modal-body modal-body-lg">
                            <h5 className="title">Request Payout</h5>
                            <div className="tab-content">
                                <div className="row gy-4">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label
                                                className="form-label"
                                                htmlFor="amount"
                                            >
                                                Amount of Payout, $
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="amount"
                                                name="amount" 
                                                placeholder="Enter Amount"
                                                value={ payoutRequestFormInput.amount }
                                                onChange={ updatePayoutRequestFormInput }
                                            />
                                            <div className='text-danger pt-2'>
                                                { payoutRequestErrors.amount
                                                    && payoutRequestErrors.amount[0] }&nbsp;
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                            <li>
                                                <a
                                                    href="#"
                                                    className={
                                                        `btn btn-lg btn-primary${ 
                                                            !isPayoutRequestFormValid ? ' disabled' : ''
                                                        }`
                                                    }
                                                    onClick={ submitPayoutRequest }
                                                >
                                                    Submit Request
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="link link-light"
                                                    onClick={ (e) => {
                                                        e.preventDefault();
                                                        setIsPayoutRequestModalShown(false);
                                                    }}
                                                >
                                                    Cancel
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
            { 
                isPayoutRequestModalShown 
                    ? <div 
                        className="modal-backdrop fade show"
                        onClick={ () => setIsPayoutRequestModalShown(false) }
                    ></div> 
                    : '' 
            }
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

export default connect(mapStateToProps)(WithAuth(Withdraw));
