import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { connect } from 'react-redux';
const useFastspring = require("use-fastspring")
const logoUrl = process.env.PUBLIC_URL + '/assets/images/3d-infinite-logo.png';

const customerPages = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'ni-dashboard-fill'
  },
  {
    path: '/dashboard/orders',
    title: 'Orders',
    icon: 'ni-bag-fill'
  },
  {
    path: '/dashboard/favourites',
    title: 'Favourites',
    icon: 'ni-bag-fill'
  },
  {
    path: '/dashboard/settings',
    title: 'Account Settings',
    icon: 'ni-users-fill'
  },
  {
    path: '/dashboard/add-credit',
    id: 'add-credit',
    title: 'Buy Credit',
    icon: 'ni-coin-alt-fill'
  },
  {
    path: '/dashboard/invoices',
    title: 'Invoices',
    icon: 'ni-coin-alt-fill'
  }
];

const artistPages = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'ni-dashboard-fill'
  },
  {
    path: '/dashboard/products',
    title: 'Products',
    icon: 'ni-package-fill'
  },
  {
    path: '/dashboard/withdraw',
    title: 'Withdraw',
    icon: 'ni-coin-alt-fill'
  },
  {
    path: '/dashboard/orders',
    title: 'Purchased Products',
    icon: 'ni-bag-fill'
  },
  {
    path: '/dashboard/favourites',
    title: 'Favourites',
    icon: 'ni-bag-fill'
  },
  {
    path: '/dashboard/invoices',
    title: 'Payment History',
    icon: 'ni-coin-alt-fill'
  },
  {
    path: '/dashboard/settings',
    title: 'Account Settings',
    icon: 'ni-users-fill'
  },
  {
    path: '/dashboard/inspiration',
    // path: '#',
    id: 'inspiration',
    title: 'Inspiration',
    icon: 'ni-dashboard-fill'
  }
];

const SidebarDashlite = ({ user, isSidebarShown, setIsSidebarShown }) => {
  const [isCompactSidebar, setIsCompactSidebar] = useState(false);

  const router = useRouter();

  const pages = user.artist_id ? artistPages : customerPages;

  const compactSidebarClick = () => {
    setIsCompactSidebar(!isCompactSidebar);
  };

  const menuItems = pages.map((el) => (
    <li
      className={`nk-menu-item${router.asPath == el.path ? ' active current-page' : ''
        }`}
      key={el.path}>
      <Link href={el.path} as={process.env.PUBLIC_URL + el.path} legacyBehavior>
        {
          // el.id === 'add-credit' ?
          // <a
          //     className='nk-menu-link'
          //     data-fsc-item-path-value="credit"
          //     data-fsc-action="Reset,Add,Checkout"
          // >
          //     <span className='nk-menu-icon'>
          //         <em className={`icon ni ${el.icon}`}></em>
          //     </span>
          //     <span className='nk-menu-text'>{el.title}</span>
          // </a>
          // :
          <a className='nk-menu-link'>
            <span className='nk-menu-icon'>
              <em className={`icon ni ${el.icon}`}></em>
            </span>
            <span className='nk-menu-text'>{el.title}</span>
          </a>
        }
      </Link>
    </li>
  ));

  return (
    <div
      className={`nk-sidebar nk-sidebar-fixed is-light
                    ${isCompactSidebar ? ' is-compact' : ''}
                    ${isSidebarShown ? ' nk-sidebar-active' : ''}`}
      data-content='sidebarMenu'>
      <div className='nk-sidebar-element nk-sidebar-head'>
        <div className='nk-sidebar-brand'>
          <Link
            href='/'
            as={process.env.PUBLIC_URL + '/'}
            className='logo-link nk-sidebar-logo'>
            <img
              className='logo-light logo-img'
              src={logoUrl}
              srcSet={logoUrl}
              alt='logo'
            />
            <img
              className='logo-dark logo-img'
              src={logoUrl}
              srcSet={logoUrl}
              alt='logo-dark'
            />
            <img
              className='logo-small logo-img logo-img-small'
              src={logoUrl}
              srcSet={logoUrl}
              alt='logo-small'
            />
          </Link>
        </div>
        <div className='nk-menu-trigger mr-n2'>
          <a
            href='#'
            className={`nk-nav-toggle nk-quick-nav-icon d-xl-none${isSidebarShown ? ' toggle-active' : ''
              }`}
            data-target='sidebarMenu'
            onClick={() => setIsSidebarShown(false)}>
            <em className='icon ni ni-arrow-left'></em>
          </a>
          <a
            href='#'
            className='nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex'
            data-target='sidebarMenu'
            onClick={compactSidebarClick}>
            <em className='icon ni ni-menu'></em>
          </a>
        </div>
      </div>

      <div className='nk-sidebar-element'>
        <div className='nk-sidebar-content'>
          <div className='nk-sidebar-menu' data-simplebar>
            <ul className='nk-menu'>{menuItems}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData
  };
};

export default connect(mapStateToProps)(SidebarDashlite);
