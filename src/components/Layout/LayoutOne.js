import { Fragment, useState, useEffect } from 'react';
import { HeaderOne } from '../Header';
import { FooterFive } from '../Footer';
import CookieConsent from 'react-cookie-consent';
import Preloader from '../Preloader';
import Link from 'next/link';

const LayoutOne = ({ children, aboutOverlay, busy }) => {
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
        if (countdown <= 0 && document.querySelector('.CookieConsent button')) {
            return document.querySelector('.CookieConsent button').click();
        }

        const interval = setInterval(() => {
            setCountdown(countdown > 0 ? countdown - 1 : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);
    
    if (busy) {
        return <Preloader />;
    }
    return (
        <Fragment>
            <HeaderOne aboutOverlay={aboutOverlay || false} />
            {children}
            <FooterFive />
            <CookieConsent
                location="bottom"
                buttonText={"Perfect! (" + countdown + ")"}
                expires={90}
                style={{
                    backgroundColor: "#fcfcfc",
                    color: "#777",
                    borderTop: "1px solid #ddd",
                    alignItems: "center",
                    lineHeight: "1.3em",
                }}
                buttonStyle={{
                    background: "auto",
                    color: "#fff",
                    padding: "15px 40px",
                }}
                buttonClasses="lezada-button lezada-button--medium"
            >
                This website uses cookies to enhance the user experience.
                You agree with the{" "}
                <Link
                    href={'/cookie-policy'}
                    as={process.env.PUBLIC_URL + '/cookie-policy'}
                    style={{ color: "#333" }}>
                    Cookie Policy
                </Link>{" "}
                if you continue to use the website.
                {" "}
            </CookieConsent>
        </Fragment>
    );
};

export default LayoutOne;
