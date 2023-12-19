import Swiper from 'react-id-swiper';
import { Container, Row, Col } from 'react-bootstrap';

const BrandSingleSlider = ({ sliderData }) => {
    const params = {
        loop: false,
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        effect: 'fade',
        watchSlidesVisibility: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: null,
            clickable: false
        },
        renderPrevButton: () => {
            return null;
        },
        renderNextButton: () => {
            return null;
        }
    };
    
    const getSliderContent = () => {
        return (
            <Swiper {...params}>
                {sliderData &&
                    sliderData.map((single, i) => {
                        return (
                            <div
                                className='hero-slider-five__slide bg-img'
                                style={{
                                    backgroundImage: `url(${single.image})`
                                }}
                                key={i}>
                                <div className='shadow'></div>
                                <Container className='h-100'>
                                    <Row className='align-items-end flex-column flex-lg-row h-100 justify-content-center justify-content-end row row'>
                                        <Col
                                            lg={6}
                                            className='order-2 order-lg-1'>
                                            <div className='align-items-center d-flex flex-column hero-slider-five__content mb-5 pb-4 text-white'>
                                                <h5 className='sub-title'>
                                                    {single.subtitle}
                                                </h5>
                                                <h1
                                                    className='title text-white'
                                                    dangerouslySetInnerHTML={{
                                                        __html: single.title
                                                    }}
                                                />
                                                <div className='mb-5'>
                                                    {single.excerpt}
                                                </div>

                                                { single.url 
                                                    ? <div className='slider-link'>
                                                        <a
                                                            href={ single.url.indexOf('http') > -1
                                                                ? single.url
                                                                : `https://${single.url}`
                                                            }
                                                            target='_blank'
                                                            className='lezada-button lezada-button--medium main-slider-btn'
                                                        >
                                                            Official Website
                                                        </a>
                                                    </div>
                                                    : ''
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        );
                    })}
            </Swiper>
        )
    }

    return (
        <div className={`hero-slider-five`}>
            <div className='brand-single-slider'>
                { getSliderContent() }
            </div>
        </div>
    );
};

export default BrandSingleSlider;
