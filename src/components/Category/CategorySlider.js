import Swiper from 'react-id-swiper';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const CategorySlider = ({
  categoryData,
  spaceBottomClass,
  showCount = true,
  className = 'wide'
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
    breakpoints: {
      1024: {
        slidesPerView: 3
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
      className={`product-category-slider-container ${spaceBottomClass ? spaceBottomClass : ''}`}>
      <Container className={className}>
        <Row>
          <Col lg={12}>
            <Swiper {...params}>
              {categoryData &&
                categoryData.map((single, i) => {
                  return (
                    <div
                      className='single-category single-category--two'
                      key={i}>
                      <div className='single-category__image single-category__image--two'>
                        <img
                          src={single.image}
                          className='img-fluid'
                          alt=''
                        />
                      </div>
                      <div className='single-category__content single-category__content--two space-mt--25'>
                        <div className='title'>
                          <Link
                            href={single.url}
                            as={
                              process.env
                                .PUBLIC_URL +
                              single.url
                            }>
                            { single.name ? single.name : single.title }
                          </Link>
                        </div>
                        {showCount && (
                          <p className='product-count'>
                            {single.count}
                          </p>
                        )}
                      </div>
                      <Link
                        href='/shop/left-sidebar'
                        as={
                          process.env.PUBLIC_URL +
                          single.url
                        }
                        className='banner-link'>
                      </Link>
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
