import Swiper from 'react-id-swiper';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const CategorySlider = ({
    categoryData,
    spaceBottomClass,
    showCount = true,
    className = 'wide',
    style,
    t //type
}) => {
    const params = {
        loop: false,
        slidesPerView: 3,
        spaceBetween: 50,
        grabCursor: true,
        // autoplay: {
        //   delay: 5000,
        //   disableOnInteraction: false,
        // },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        renderPrevButton: () => (
            <button className='swiper-button-prev ht-swiper-button-nav'>
                <IoIosArrowRoundBack />
            </button>
        ),
        renderNextButton: () => (
            <button className='swiper-button-next ht-swiper-button-nav'>
                <IoIosArrowRoundForward />
            </button>
        ),
        breakpoints: t == 'other' ? {
            2048: {
                slidesPerView: 5,
                spaceBetween: 53
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 50
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        } : {
            1024: {
                slidesPerView: 3,
                spaceBetween: 53
            },
            768: {
                slidesPerView: 2
            },
            640: {
                slidesPerView: 2
            },
            320: {
                slidesPerView: 1
            }
        }
    };
    return (
        <div
            className={`product-category-slider-container ${spaceBottomClass ? spaceBottomClass : ''
                }`} style={{ ...style }}>
            <Container className={className}>
                <Row>
                    <Col lg={12}>
                        <Swiper {...params} rebuildOnUpdate={true}>
                            {categoryData &&
                                categoryData.map((single, i) => {
                                    return (
                                        <div
                                            className='single-category single-category--two overflow-visible'
                                            key={i} >
                                            <div className='single-category__image single-category__image--two' style={{ position: 'static' }}>
                                            <Link
                                                href={`/inspiration/[slug]?slug=${single.id}`}
                                                as={
                                                    process.env.PUBLIC_URL +
                                                    '/inspiration/' +
                                                    single.id
                                                }
                                                className='banner-link'
                                                style={{position:'static'}}>
                                                <img
                                                    src={single.img_name}
                                                    className={i !== 0 ? 'img-fluid slider-item-height border-radius-unset' : 'img-fluid border-radius-unset'}
                                                    alt=''
                                                />
                                            </Link>
                                            </div>
                                            <div className='single-category__content single-category__content--two'>
                                                <div className='title'>
                                                    <Link
                                                        href={`/inspiration/[slug]?slug=${single.id}`}
                                                        as={
                                                            process.env.PUBLIC_URL +
                                                            '/inspiration/' +
                                                            single.id
                                                        }
                                                    >
                                                        {single.product_name}
                                                    </Link>
                                                </div>
                                                {showCount && (
                                                    <p className='product-count'>
                                                        {single.count}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </Swiper>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CategorySlider;
