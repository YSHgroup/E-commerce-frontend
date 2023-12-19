import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';

import WithAuth from '../WithAuth';

import api from '../../lib/api';
import { downloadFile, IT_CUSTOMER_BUY_CREDITS } from '../../lib/common';
import { fetchUser } from '../../redux/actions/userActions';
import { useDispatch, connect } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import Paginator from 'react-hooks-paginator';

import Cookies from 'js-cookie';

const CustomerDashboard = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [currentPurchasesPage, setCurrentPurchasesPage] = useState(1);
  const [currentInvoicesPage, setCurrentInvoicesPage] = useState(1);
  const [offset, setOffset] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    updatePurchasesData();
  }, [user, currentPurchasesPage]);

  useEffect(() => {
    updateInvoicesData();
  }, [user, currentInvoicesPage]);

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

  const productsElements = products.rows?.original?.data && products.rows?.original?.data.length
    ? (products.rows.original.data.map(el => (
      <div
        className="space-mb--r50 col-xxl-3 col-lg-6 col-md-3 col-sm-4 col-xs-6"
        key={el.id}
      >
        <div className="product-grid">
          <div className="product-grid__image">
            <a
              className="image-wrap"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                // downloadFile(el);
              }}
            >
              <img
                src={el.image_main}
                className="img-fluid"
                alt={el.name}
              />
            </a>
          </div>
          <div className="product-grid__content">
            <div className="title">
              <h3>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    // downloadFile(el);
                  }}
                >
                  <p>
                    { el.brand_name
                      ? <b>{el.brand_name + ' '}</b>
                      : <span>&nbsp;</span> }
                  </p>
                  {el.name}
                </a>
              </h3>
            </div>
            <div className="price">
              <span className="main-price">$ {el.regular_price}</span>
            </div>
          </div>
        </div>
      </div>
    ))) : (
      <p>No purchases yet.</p>
    );

    const invoicesRows = invoices?.rows?.map(el => (
        <tr
            className="tb-odr-item"
            key={ el.id }
        >
            <td className="tb-odr-info">
                <span className="tb-odr-id">
                    <Link
                        href={`/dashboard/invoices/${el.invoice_id}`}
                        as={`/dashboard/invoices/${el.invoice_id}`}
                    >
                      #{ el.invoice_id }
                    </Link>
                </span>
                <span className="tb-odr-date">{ el.created_date }</span>
            </td>
            <td className="tb-odr-amount">
                <span className="tb-odr-total">
                    <span className="amount">$ { el.total || 0 }</span>
                </span>
            </td>
            <td className="tb-odr-target">
                <span className="tb-odr-target">
                    <span className="target">{ el.type == IT_CUSTOMER_BUY_CREDITS ? 'Credits' : 'Products' }</span>
                </span>
            </td>
        </tr>
    ));
  
  return (
    <Fragment>
      <Row className="row g-gs">
        <Col lg={6} col={12} className="col-xxl-7">
          <div className="nk-block-head nk-block-head-sm pb-4">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title page-title">
                Purchased
              </h4>
            </div>
          </div>
          <div className="nk-block">
            <div className="card">
              <div className="card-inner">
                <Row>
                  {productsElements}
                </Row>
                {(products?.count || 0) > (products?.perPage || 0) ? (
                  <Row>
                    <Col>
                      <Paginator
                        totalRecords={products.count}
                        pageLimit={products.perPage}
                        pageNeighbours={2}
                        setOffset={setOffset}
                        currentPage={currentPurchasesPage}
                        setCurrentPage={setCurrentPurchasesPage}
                        pageContainerClassName='mb-0 mt-0 pagination justify-content-center justify-content-md-start'
                        pagePrevText='«'
                        pageNextText='»'
                      />
                    </Col>
                  </Row>
                ) : ''}
              </div>
            </div>
          </div>

        </Col>

        <Col lg={6} col={12} className="col-xxl-5">
          <div className="nk-block-head nk-block-head-sm pb-4">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title page-title">
                Invoices
              </h4>
            </div>
          </div>
          <div className="nk-block">
            <div className="card">
              <div className="card-inner">
                {invoices.rows && invoices.rows.length
                  ? (
                    <table className="table table-orders">
                      <thead className="tb-odr-head">
                        <tr className="tb-odr-item">
                          <th className="tb-odr-info">
                            <span className="tb-odr-id">Order ID</span>
                            <span className="tb-odr-date d-inline-block">Date</span>
                          </th>
                          <th className="tb-odr-amount">
                            <span className="tb-odr-total">Amount</span>
                          </th>
                          <th className="tb-odr-target">
                            <span className="tb-odr-target">Bought</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="tb-odr-body">
                        {invoicesRows}
                      </tbody>
                    </table>
                  ) : (
                    <p>No invoices yet.</p>
                  )
                }
                {(invoices?.count || 0) > (invoices?.perPage || 0)
                  ? (
                    <Row>
                      <Col>
                        <Paginator
                          totalRecords={invoices.count}
                          pageLimit={invoices.perPage}
                          pageNeighbours={2}
                          setOffset={setOffset}
                          currentPage={currentInvoicesPage}
                          setCurrentPage={setCurrentInvoicesPage}
                          pageContainerClassName='mb-0 mt-0 pagination justify-content-center justify-content-md-start'
                          pagePrevText='«'
                          pageNextText='»'
                        />
                      </Col>
                    </Row>
                  ) : ''
                }
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
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

export default connect(mapStateToProps)(WithAuth(CustomerDashboard));
