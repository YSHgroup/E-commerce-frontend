import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';

const ImageTextContentTwo = ({ brand }) => {
    return (
        <div className='image-text-content-area space-mb--50'>
            <Container>
                <Row className='align-items-center'>
                    <Col md={6}>
                        <div className='cosmetics-home-intro mb-4 mb-md-0'>
                            <h2 className='title'>{brand.name}</h2>
                            <p
                                className='description'
                                dangerouslySetInnerHTML={{
                                    __html: brand.description,
                                }}></p>

                            <a className='lezada-shop-link' href={brand.url}>
                                Visit Website
                            </a>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='single-banner-image text-center text-md-right'>
                            <img
                                src={ brand.image_about }
                                className='img-fluid'
                                alt=''
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ImageTextContentTwo;
