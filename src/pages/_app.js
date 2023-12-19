import { Fragment } from "react";
import App from "next/app";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
// import "./dashboard/inspiration/tags.css";

import "../assets/scss/dashlite.css";
import "../assets/scss/theme.css";
import "../assets/scss/styles.scss";
import "flag-icons/css/flag-icons.min.css";
import "@kenshooui/react-multi-select/dist/style.css";
// import Preloader from "../components/Preloader";
import Favourites from "../components/Favourites/Favourites";

import api, { fetchMenusFromServer } from "../lib/api";

class MyApp extends App {
  constructor(props) {
    super(props);
    // this.persistor = persistStore(props.reduxStore);
    fetchMenusFromServer(props.reduxStore);
  }

  componentDidMount() {
    if (window && window.gtag) {
      setTimeout(() => {
        window.gtag("set", "page_path", window.location.pathname);
        window.gtag("set", "page_title", document.title);
        window.gtag("set", "page_location", window.location.href);
        window.gtag("event", "page_view");
      }, 2000);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Fragment>
        <ToastProvider placement="bottom-left">
          <Provider store={reduxStore}>
            {/* <PersistGate */}
            {/* loading={<Preloader />} */}
            {/* persistor={this.persistor} */}
            {/* > */}
            <Component {...pageProps} />
            <Favourites />
            {/* </PersistGate> */}
          </Provider>
        </ToastProvider>
      </Fragment>
    );
  }
}

export default withReduxStore(MyApp);
