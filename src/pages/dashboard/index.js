import Head from 'next/head';

import { LayoutDashlite } from '../../components/Layout';
import WithAuth from '../../components/WithAuth';

import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import ArtistDashboard from '../../components/Dashboard/ArtistDashboard';

import Cookies from 'js-cookie';

import CustomerDashboard from '../../components/Dashboard/CustomerDashboard';

const Dashboard = ({ user }) => {
  const [busy, setBusy] = useState(false);
  const [isSidebarShown, setIsSidebarShown] = useState(false);

  useEffect(() => {
    if (isSidebarShown) {
      document.body.classList.add('nav-shown');
    } else {
      document.body.classList.remove('nav-shown');
    }
  }, [isSidebarShown]);

  const chooseDashboard = () => {
    if (user.artist_id) {
      return <ArtistDashboard />;
    }
    if (!user.artist_id) {
      return <CustomerDashboard />;
    }
  };

  return (
    <LayoutDashlite
      busy={busy}
      setBusy={setBusy}
      user={user}
      isSidebarShown={isSidebarShown}
      setIsSidebarShown={setIsSidebarShown}
    >
      {/* Page Title */}
      <Head>
        <title>Dashboard | My Account | 3d Infinite</title>
      </Head>

      {chooseDashboard()}

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

export default connect(mapStateToProps)(WithAuth(Dashboard));
