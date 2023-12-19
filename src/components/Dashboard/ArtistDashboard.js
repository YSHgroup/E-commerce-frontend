import { Row, Col } from 'react-bootstrap';

import WithAuth from '../WithAuth';

import api from '../../lib/api';
import { closeMenuOnClickOutside } from '../../lib/common';
import { fetchUser } from '../../redux/actions/userActions';
import { useDispatch, connect } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import ArtistDashboardChartBlock from './ArtistDashboardChartBlock';

import Cookies from 'js-cookie';

import { loadStripe } from '@stripe/stripe-js';

const ArtistDashboard = () => {
  const [busy, setBusy] = useState(false);

  const [artist, setArtist] = useState([]);

  const [isTimeRangeShown, setIsTimeRangeShown] = useState(false);
  const [timeRanges, setTimeRanges] = useState([]);
  const [timeRange, setTimeRange] = useState(false);

  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());

    getTimeRanges();

    return closeMenuOnClickOutside(setIsTimeRangeShown);
  }, []);

  useEffect(() => {
    if (timeRange) {
      updateDashboardData();
    }
  }, [timeRange]);

  const getTimeRanges = () => {
    api()
      .get('/sanctum/csrf-cookie')
      .then(() => {
        api()
          .get('/api/v1/dashboard/time-ranges')
          .then((response) => {
            setTimeRanges(response.data);
            setTimeRange(Object.keys(response.data)[0]);
          })
          .catch(error => {
            console.log('Error on fetching of the time ranges list:', error);
          });
      });
  };

  const timeRangeToggleClick = (e) => {
    e.preventDefault();
    setIsTimeRangeShown(!isTimeRangeShown);
    return false;
  }

  const timeRangeClick = (e, key) => {
    e.preventDefault();
    setTimeRange(key);
    return false;
  };

  const updateDashboardData = () => {
    api()
      .get('/sanctum/csrf-cookie')
      .then(() => {
        api()
          .get('/api/v1/dashboard/artist-data?range=' + timeRange)
          .then((response) => {
            setArtist(response.data.artist);
            setTotalEarnings(response.data.totalEarnings);
            setTotalSales(response.data.totalSales);
            setChartData(response.data);
            setTopProducts(response.data.topProducts.original.data);
          })
          .catch(error => {
            console.log('Error on fetching of the time ranges list:', error);
          });
      });
  };

  const timeRangeElements = Object.keys(timeRanges).map(key => (
    <li key={key}>
      <a
        href="#"
        onClick={(e) => timeRangeClick(e, key)}
      >
        <span>{timeRanges[key]}</span>
      </a>
    </li>
  ));

  const topProductsElements = topProducts.map((el, index) => (
    <li className="item" key={index}>
      <div className="info">
        <div className="title">{index + 1}</div>
      </div>
      <div className="thumb">
        <img
          src={el.image_main}
          alt={el.name}
        />
      </div>
      <div className="info">
        <div className="title">
          { el.brand_name ? <b>{el.brand_name + ' '}</b> : '' }
          {el.name}
        </div>
        <div className="price">${el.regular_price}</div>
      </div>
      <div className="total">
        <div className="amount">${el.sum}</div>
        <div className="count">{el.count} Sold</div>
      </div>
    </li>
  ))

  return (
    <Fragment>
      <div className="nk-block-head nk-block-head-sm pb-4">
        <div className="nk-block-between">
          <div className="nk-block-head-content">
            <h4 className="nk-block-title page-title">
              Artist dashboard
            </h4>
          </div>

          <div className="nk-block-head-content">
            <div className="toggle-wrap nk-block-tools-toggle">
              <div data-content="pageMenu">
                <ul className="nk-block-tools g-3" style={{ justifyContent: "flex-end" }}>
                  <li>
                    <div
                      className={`drodown${isTimeRangeShown ? ' show' : ''}`}
                    >
                      <a
                        href="#"
                        className="dropdown-toggle btn btn-white btn-dim btn-outline-light"
                        data-toggle="dropdown"
                        aria-expanded={isTimeRangeShown ? 'true' : 'false'}
                        onClick={timeRangeToggleClick}
                      >
                        <em className="d-inline icon ni ni-calender-date"></em>
                        <span>{timeRanges[timeRange]}</span>
                        <em className="dd-indc icon ni ni-chevron-right"></em>
                      </a>
                      <div
                        className={
                          `dropdown-menu dropdown-menu-right`
                          + (isTimeRangeShown ? ' show' : '')
                        }
                      >
                        <ul className="link-list-opt no-bdr">
                          {timeRangeElements}
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

      <Row className="row g-gs">
        <Col lg={6} col={12}>
          <ArtistDashboardChartBlock
            chartData={chartData}
            totalEarnings={totalEarnings}
            totalSales={totalSales}
          />
        </Col>

        <Col lg={6} col={12}>
          <div className="nk-block">
            <div className="card">
              <div className="card-inner">
                <div className="card-title-group align-start mb-2">
                  <div className="card-title">
                    <h6 className="title">Total Values</h6>
                  </div>
                </div>
                <ul className="nk-store-statistics">
                  <li className="item">
                    <em className="icon bg-info-dim ni ni-coin-alt-fill"></em>
                    <div className="info">
                      <div className="title">Total Earnings</div>
                      <div className="count">${artist?.totalEarningsAllTime || 0}</div>
                    </div>
                  </li>
                  <li className="item">
                    <em className="icon bg-info-dim ni ni-coin-alt"></em>
                    <div className="info">
                      <div className="title">Unpaid Earnings</div>
                      <div className="count">${(artist?.unpaidEarnings || 0).toFixed(2)}</div>
                    </div>
                  </li>
                  <li className="item">
                    <em className="icon bg-pink-dim ni ni-package-fill"></em>
                    <div className="info">
                      <div className="title">Products in Portfolio</div>
                      <div className="count">{artist?.productsCount || 0}</div>
                    </div>
                  </li>
                  <li className="item">
                    <em className="icon bg-primary-dim ni ni-percent"></em>
                    <div className="info">
                      <div className="title">Commission</div>
                      <div className="count">{(artist?.fee || 0) * 100}%</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="row g-gs">
        <Col xs={12}>
          <div className="nk-block">
            <div className="card">
              <div className="card-inner">
                <div className="card-title-group align-start mb-2">
                  <div className="card-title">
                    <h6 className="title">Top Products</h6>
                  </div>
                </div>
                <ul className="nk-top-products">
                  {topProductsElements}
                </ul>
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

export default connect(mapStateToProps)(WithAuth(ArtistDashboard));
