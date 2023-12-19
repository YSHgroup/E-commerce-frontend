import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { IoIosArrowRoundUp } from 'react-icons/io';
import { animateScroll } from 'react-scroll';
import { Tooltip } from 'react-tippy';

const FooterDashlite = () => {
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
        <div className="nk-footer">
            <div className="container-fluid">
                <div className="nk-footer-wrap">
                    <div className="nk-footer-copyright">
                        © { new Date().getFullYear() } 3D Infinite, LLC
                    </div>
                    <div className="nk-footer-links">
                        <ul className="nav nav-sm">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Terms</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Privacy</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Help</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterDashlite;
