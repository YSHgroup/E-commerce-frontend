import { useEffect } from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Preloader from '../Preloader';

const LayoutFullSize = ({ children, bgImage, busy, showSignInAdv, additionalClass }) => {
    useEffect(() => {
        document.querySelector('#__next').style.height = '100%';
    }, []);

    if (busy) {
        return <Preloader />;
    }
    return (
        <div
            className={`canvas-wrapper ${additionalClass}`}
            style={{ backgroundImage: `url(${bgImage.url || ''})` }}
        >
            <div className='canvas'>
                <Container fluid={'sm'}>
                    <Row>
                        <Col className='d-none d-xl-block col-xl-5'>
                            <div className='inner-container'>
                                <div>
                                    <Link href='/' as={process.env.PUBLIC_URL} className='label'>
                                        <span className='company-name'>
                                            <img src='/assets/images/3dinfinite_white_logo.png' />
                                            3d Infinite
                                        </span>
                                    </Link>
                                    { showSignInAdv ? <p className='label'>Sign in or create an account</p> : "" }
                                </div>
                            </div>
                        </Col>
                        <Col className='col-12 col-md-9 col-lg-7 col-xl-7 mx-md-auto'>
                            <div className='inner-container justify-center'>
                                { children }
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Link
                    href={`/inspiration/${bgImage?.page_id || ''}`}
                    as={`${process.env.PUBLIC_URL}/inspiration/${bgImage?.page_id || ''}`}
                    className='source'>
                    { bgImage.name }
                    { bgImage.brand_name?.length ? ` by ${bgImage.brand_name}` : '' }
                </Link>
            </div>
        </div>
    );
};

export default LayoutFullSize;
