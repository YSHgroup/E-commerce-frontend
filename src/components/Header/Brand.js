import { useState, useEffect, Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Link from 'next/link';

const Brand = ({ brand }) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector('header');
    setHeaderTop(header.offsetTop);
    setHeaderHeight(header.offsetHeight);
    window.addEventListener('scroll', handleScroll);
    scroll > headerTop
      ? (document.body.style.paddingTop = `${headerHeight}px`)
      : (document.body.style.paddingTop = 0);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <Fragment>
      <header
        className={`topbar-shadow`}>
        <Container className='wide'>
          <div className='header-content d-flex align-items-center justify-content-center position-relative space-py-mobile-only--30'>
            {/* navigation */}
            <nav className='header-content__navigation space-pr--15 space-pl--15 d-none d-lg-block'>
              <ul>
                <li>
                  <Link
                    href={`/brands/${brand.slug}`}
                    as={`${process.env.PUBLIC_URL}/brands/${brand.slug}`}>
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/brands/${brand.slug}/about`}
                    as={`${process.env.PUBLIC_URL}/brands/${brand.slug}/about`}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/brands/${brand.slug}/inspiration`}
                    as={`${process.env.PUBLIC_URL}/brands/${brand.slug}/inspiration`}>
                    Inspirations
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </Container>
      </header>
    </Fragment>
  );
};

export default Brand;
