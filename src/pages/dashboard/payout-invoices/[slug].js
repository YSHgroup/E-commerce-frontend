import Head from 'next/head';
import Link from 'next/link';

import { LayoutDashlite } from '../../../components/Layout';
import WithAuth from '../../../components/WithAuth';

import api from '../../../lib/api';
import { fetchUser } from '../../../redux/actions/userActions';

import { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const FileDownload = require('js-file-download');

const PayoutInvoice = ({ user }) => {
    const router = useRouter();
    const query = router.query;
    
    const [busy, setBusy] = useState(false);
    const [isSidebarShown,  setIsSidebarShown] = useState(false);
    const [invoice,  setInvoice] = useState([]);

    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
        fetchInvoice(query.slug);
    }, []);

    const fetchInvoice = (slug) => {
        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .get('/api/v1/dashboard/payout-invoice/' + slug)
                    .then(response => {
                        setInvoice(response.data);
                    })
                    .catch(error => {
                        console.log('Error on fetching of the payout invoice:', error);
                    });
            });            
    };

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
                <title>Payout Invoice | My Account | 3d Infinite</title>
            </Head>

            <div className="nk-block-head">
                <div className="nk-block-between g-3">
                    <div className="nk-block-head-content">
                        <h3 className="nk-block-title page-title">
                            Invoice <strong className="text-primary small">#{ invoice.invoice_id }</strong>
                        </h3>
                        <div className="nk-block-des text-soft">
                            <ul className="list-inline">
                                <li>
                                    Created At: <span className="text-base">{ invoice.created_at }</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="nk-block-head-content">
                        <Link
                            href="/dashboard/withdraw"
                            className="btn btn-outline-light bg-white d-none d-sm-inline-flex">
                            <em className="icon ni ni-arrow-left"></em>
                            <span>Back</span>
                        </Link>
                        <Link
                            href="/dashboard/withdraw"
                            className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none">
                            <em className="icon ni ni-arrow-left"></em>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="nk-block">
                <div className="invoice">
                    <div className="invoice-action">
                        <a 
                            className="btn btn-icon btn-lg btn-white btn-dim btn-outline-primary"
                            href={`${ process.env.BASE_URL }/api/v1/dashboard/payout-invoice/print/${ invoice.invoice_id }`}
                            target="_blank"
                        >
                            <em className="icon ni ni-printer-fill"></em>
                        </a>
                    </div>
                    <div className="invoice-wrap">
                        <div className="invoice-brand text-center">
                            <img 
                                src={ process.env.PUBLIC_URL + '/assets/images/3d-infinite-logo.png' }
                                srcSet={ process.env.PUBLIC_URL + '/assets/images/3d-infinite-logo.png 1x' }
                                alt=""
                                style={{ width: "auto" }}
                            />
                        </div>
                        <div className="invoice-head">
                            <div className="invoice-contact">
                                <span className="overline-title">Invoice To</span>
                                <div className="invoice-contact-info">
                                    <h4 className="title">{ invoice.artist?.user?.fullName }</h4>
                                </div>
                            </div>
                            <div className="invoice-desc">
                                <h3 className="title">Invoice</h3>
                                <ul className="list-plain">
                                    <li className="invoice-id"><span>Invoice ID</span>:<span>{ invoice.invoice_id }</span></li>
                                    <li className="invoice-date"><span>Date</span>:<span>{ invoice.created_at }</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="invoice-bills">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="w-150px">Item ID</th>
                                            <th className="w-60">Description</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>3D Infinite Commission Payout</td>
                                            <td>$1.00</td>
                                            <td>{ invoice.amount }</td>
                                            <td>${ invoice.amount }</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="2"></td>
                                            <td colSpan="2">Subtotal</td>
                                            <td>${ invoice.amount }</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"></td>
                                            <td colSpan="2">Processing fee</td>
                                            <td>$0.00</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"></td>
                                            <td colSpan="2">TAX</td>
                                            <td>$0.00</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"></td>
                                            <td colSpan="2">Grand Total</td>
                                            <td>${ invoice.amount }</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div className="nk-notes ff-italic fs-12px text-soft">
                                    Invoice was created on a computer and is valid without the signature and seal.
                                </div>
                            </div>
                        </div>
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

export default connect(mapStateToProps)(WithAuth(PayoutInvoice));
