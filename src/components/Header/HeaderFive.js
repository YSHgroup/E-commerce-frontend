import { useState, useEffect, Fragment } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import { connect } from "react-redux";
import {
  IoIosSearch,
  IoMdPerson,
  IoIosHeartEmpty,
  IoIosCart,
  IoIosMenu,
  IoIosArrowDown,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoYoutube
} from "react-icons/io";
import Navigation from "./elements/Navigation";
import AboutOverlay from "./elements/AboutOverlay";
import SearchOverlay from "./elements/SearchOverlay";
import CartOverlay from "./elements/CartOverlay";
import WishlistOverlay from "./elements/WishlistOverlay";
import MobileMenu from "./elements/MobileMenu";

const HeaderFive = ({ aboutOverlay, cartItems, wishlistItems }) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [offCanvasAboutActive, setOffCanvasAboutActive] = useState(false);
  const [offCanvasSearchActive, setOffCanvasSearchActive] = useState(false);
  const [offCanvasCartActive, setOffCanvasCartActive] = useState(false);
  const [offCanvasWishlistActive, setOffCanvasWishlistActive] = useState(false);
  const [offCanvasMobileMenuActive, setOffCanvasMobileMenuActive] = useState(
    false
  );

  useEffect(() => {
    const header = document.querySelector("header");
    setHeaderTop(header.offsetTop);
    setHeaderHeight(header.offsetHeight);
    window.addEventListener("scroll", handleScroll);
    scroll > headerTop
      ? (document.body.style.paddingTop = `${headerHeight}px`)
      : (document.body.style.paddingTop = 0);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <Fragment>
      <header
        className={`topbar-shadow is-sticky`}
      >
        <div className="header-top-area border-bottom--grey space-pt--10 space-pb--10 d-none d-lg-block">
          <Container className="wide">
            <div className="header-top">
              <div className="header-top__left">
                <div className="language-change change-dropdown">
                  <span>English</span> <IoIosArrowDown />
                  <ul>
                    <li>
                      <button>English</button>
                    </li>
                    <li>
                      <button>Deustch</button>
                    </li>
                  </ul>
                </div>
                <span className="header-separator">|</span>
                <div className="currency-change change-dropdown">
                  <span>USD</span> <IoIosArrowDown />
                  <ul>
                    <li>
                      <button>USD</button>
                    </li>
                    <li>
                      <button>EUR</button>
                    </li>
                  </ul>
                </div>
                <span className="header-separator">|</span>
                <div className="order-online-text">
                  Order Online Call
                  <span className="number">(0123) 456789</span>
                </div>
              </div>
              <div className="header-top__right">
                <div className="signup-link">
                  <Link
                    href="/other/login-register"
                    as={process.env.PUBLIC_URL + "/other/login-register"}
                  >
                    Signup / Login
                  </Link>
                </div>
                <span className="header-separator">|</span>
                <div className="top-social-icons">
                  <ul>
                    <li>
                      <a href="https://www.twitter.com" target="_blank">
                        <IoLogoTwitter />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com" target="_blank">
                        <IoLogoFacebook />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com" target="_blank">
                        <IoLogoInstagram />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com" target="_blank">
                        <IoLogoYoutube />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="header-bottom-area">
          <Container className="wide">
            <div className="header-content d-flex align-items-center justify-content-between position-relative space-py-mobile-only--30">
              {/* logo */}
              <div className="header-content__logo space-pr--15">
                <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/3d-infinite-logo.png"}
                    className="img-fluid"
                    alt=""
                    style={{ width: '200px' }}
                  />
                </Link>
              </div>

              {/* navigation */}
              <Navigation />

              {/* icons */}
              <div className="header-content__icons space-pl--15">
                <ul className="d-none d-lg-block">
                  <li>
                    <button
                      onClick={() => {
                        setOffCanvasSearchActive(true);
                        document
                          .querySelector("body")
                          .classList.add("overflow-hidden");
                      }}
                    >
                      <IoIosSearch />
                    </button>
                  </li>
                  <li>
                    <Link
                      href="/other/login-register"
                      as={process.env.PUBLIC_URL + "/other/login-register"}
                    >
                      <IoMdPerson />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/favourites'
                      as={
                        process.env.PUBLIC_URL +
                        '/favourites'
                      }
                      legacyBehavior>
                      <button>
                        <IoIosHeartEmpty />
                        { wishlistItems.length >= 1 ? (
                          <span className='count'>
                            {wishlistItems.length
                              ? wishlistItems.length
                              : ''}
                          </span>
                        ) : (
                          ''
                        )}
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setOffCanvasCartActive(true);
                        document
                          .querySelector("body")
                          .classList.add("overflow-hidden");
                      }}
                    >
                      <IoIosCart />
                      {cartItems.length >= 1 ? (
                        <span className="count">
                          {cartItems.length ? cartItems.length : ""}
                        </span>
                      ) : (
                        ""
                      )}
                    </button>
                  </li>
                </ul>

                <ul className="d-block d-lg-none">
                  <li>
                    <Link
                      href='/favourites'
                      as={
                        process.env.PUBLIC_URL +
                        '/favourites'
                      }
                      legacyBehavior>
                      <button>
                        <IoIosHeartEmpty />
                        { wishlistItems.length >= 1 ? (
                          <span className='count'>
                            {wishlistItems.length
                              ? wishlistItems.length
                              : ''}
                          </span>
                        ) : (
                          ''
                        )}
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/other/cart"
                      as={process.env.PUBLIC_URL + "/other/cart"}
                    >
                      <IoIosCart />
                      {cartItems.length >= 1 ? (
                        <span className="count">
                          {cartItems.length ? cartItems.length : ""}
                        </span>
                      ) : (
                        ""
                      )}
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => setOffCanvasMobileMenuActive(true)}>
                      <IoIosMenu />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>
      </header>

      {/* about overlay */}
      {aboutOverlay === false ? (
        ""
      ) : (
        <AboutOverlay
          activeStatus={offCanvasAboutActive}
          getActiveStatus={setOffCanvasAboutActive}
        />
      )}
      {/* search overlay */}
      <SearchOverlay
        activeStatus={offCanvasSearchActive}
        getActiveStatus={setOffCanvasSearchActive}
      />

      {/* cart overlay */}
      <CartOverlay
        activeStatus={offCanvasCartActive}
        getActiveStatus={setOffCanvasCartActive}
      />

      {/* wishlist overlay */}
      <WishlistOverlay
        activeStatus={offCanvasWishlistActive}
        getActiveStatus={setOffCanvasWishlistActive}
      />
      {/* Mobile Menu */}
      <MobileMenu
        activeStatus={offCanvasMobileMenuActive}
        getActiveStatus={setOffCanvasMobileMenuActive}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData
  };
};

export default connect(mapStateToProps)(HeaderFive);
