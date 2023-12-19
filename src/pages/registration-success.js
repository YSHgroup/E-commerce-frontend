import Link from 'next/link';
import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import { LayoutOne } from '../components/Layout';
import { BreadcrumbOne } from '../components/Breadcrumb';

import redirectTo from '../lib/redirectTo';
import Cookies from 'js-cookie';

const RegistrationSuccess = () => {
    return (
        <LayoutOne>
            {/* Page Title */}
            <Head>
                <title>Registration Success | 3d Infinite</title>
            </Head>

            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle='Registration Success'
                backgroundImage='/assets/images/backgrounds/breadcrumb-bg-login.jpeg'>
                <ul className='breadcrumb__list'>
                    <li>
                        <Link href='/' as={process.env.PUBLIC_URL + '/'}>
                            Home
                        </Link>
                    </li>

                    <li>Registration Success</li>
                </ul>
            </BreadcrumbOne>

            <div className='registration-success space-mt--r130 space-mb--r130'>
                <div className='section-title-container space-mb--40'>
                    <Container>
                        <Row>
                            <Col xl={5} lg={6} md={8} className='mx-auto dashlite-success-block'>
                                {/* section title */}
                                <div>
                                    <h5>
                                        Success!
                                    </h5>
                                    <p className='text-success'>
                                        Congratulations! You account is created
                                        successfully. Please, verify your email
                                        address in order to activate this
                                        account.
                                    </p>
                                    <p className='text-success'>
                                        Please check your spam folder if no
                                        verification email received.
                                    </p>
                                    <p className='text-success'>
                                        Thanks!
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </LayoutOne>
    );
};

RegistrationSuccess.getInitialProps = (ctx) => {
    const success = !!Cookies.get('tdi_registration_success');

    if (!success) {
        redirectTo('/', ctx);
    }

    return {
        status: {
            success: success,
        },
    };
};

export default RegistrationSuccess;
