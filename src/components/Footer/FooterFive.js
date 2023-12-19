import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { IoIosArrowRoundUp } from 'react-icons/io';
import { animateScroll } from 'react-scroll';
import { SubscribeEmail } from '../Newsletter';

const FooterFive = () => {
    const [scroll, setScroll] = useState(0);
    const [top, setTop] = useState(0);

    useEffect(() => {
        setTop(100);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        animateScroll.scrollToTop();
    };

    const handleScroll = () => {
        setScroll(window.scrollY);
    };
    return (
        <footer className='border-top space-pt--100 space-pb--50 bg-color--beige'>
            <Container className='wide'>
                <Row>
                    <Col className='footer-single-widget space-mb--50'>
                        {/* logo */}
                        <div
                            className='logo space-mb--35'
                            style={{ marginTop: '-5px', marginRight: '25px' }}>
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    '/assets/images/3d-infinite-logo.png'
                                }
                                className='img-fluid'
                                alt=''
                                width='250'
                            />
                        </div>

                        {/*=======  copyright text  =======*/}
                        <div className='footer-single-widget__copyright'>
                            &copy; {new Date().getFullYear() + ' '}
                            <a
                                href='https://www.3dinfinite.com'
                                target='_blank'>
                                3d Infinite.
                            </a>
                            <span>All Rights Reserved.</span>
                        </div>
                    </Col>

                    <Col className='footer-single-widget space-mb--50'>
                        <h5 className='footer-single-widget__title'>INFORMATION</h5>
                        <nav className='footer-single-widget__nav'>
                            <ul>
                                <li>
                                    <a href='/about'>About us</a>
                                </li>
                                <li>
                                    <a href='/faq'>FAQ</a>
                                </li>
                                <li>
                                    <a href='/contact'>Contact</a>
                                </li>
                            </ul>
                        </nav>
                    </Col>

                    <Col className='footer-single-widget space-mb--50'>
                        <h5 className='footer-single-widget__title'>
                            USEFUL LINKS
                        </h5>
                        <nav className='footer-single-widget__nav'>
                            <ul>
                                <li>
                                    <a href='/privacy-policy'>Privacy Policy</a>
                                </li>
                                <li>
                                    <a href='/cookie-policy'>Cookie Policy</a>
                                </li>
                                <li>
                                    <a href='/toc'>Terms of Use</a>
                                </li>
                            </ul>
                        </nav>
                    </Col>

                    <Col className='footer-single-widget space-mb--50'>
                        <h5 className='footer-single-widget__title'>
                            FOLLOW US ON
                        </h5>
                        <nav className='footer-single-widget__nav footer-single-widget__nav--social'>
                            <ul>
                                <li>
                                    <a href='https://www.twitter.com'>
                                        <FaTwitter />
                                    </a>
                                </li>
                                <li>
                                    <a href='https://www.facebook.com'>
                                        <FaFacebookF />
                                    </a>
                                </li>
                                <li>
                                    <a href='https://www.instagram.com'>
                                        <FaInstagram />
                                    </a>
                                </li>
                                <li>
                                    <a href='https://www.youtube.com'>
                                        <FaYoutube />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </Col>

                    <Col className='footer-single-widget space-mb--50'>
                        <div className='footer-subscribe-widget'>
                            <h2 className='footer-subscribe-widget__title'>
                                Subscribe
                            </h2>
                            <p className='footer-subscribe-widget__subtitle'>
                                Subscribe to our newsletter to receive news on
                                update.
                            </p>
                            {/* email subscription */}
                            <SubscribeEmail />
                        </div>
                    </Col>
                </Row>
            </Container>
            <button
                className={`scroll-top ${scroll > top ? 'show' : ''}`}
                onClick={() => scrollToTop()}
            >
                <IoIosArrowRoundUp />
            </button>
        </footer>
    );
};

export default FooterFive;
