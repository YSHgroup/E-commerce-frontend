import Swiper from 'react-id-swiper';
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductsAutoComplete from '../../components/ProductsAutoComplete';

const HeroSliderFive = ({ sliderData, spaceBottomClass }) => {
  const [offCanvasSearchActive, setOffCanvasSearchActive] = useState(true);
  const params = {
    loop: true,
    effect: 'fade',
    watchSlidesVisibility: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    renderPrevButton: () => (
      <button className='swiper-button-prev ht-swiper-button-nav'></button>
    ),
    renderNextButton: () => (
      <button className='swiper-button-next ht-swiper-button-nav'></button>
    )
  };
  return (
    <div
      className={`hero-slider-five ${spaceBottomClass ? spaceBottomClass : ''
        }`}>
      <Container className='wide'>
        <div className='hero-slider-five__wrapper inspiration-slider'>
          {sliderData.length > 0 && (
            <Swiper {...params}>
              {sliderData &&
                sliderData.map((single, i) => {
                  return (
                    <div
                      className='hero-slider-five__slide bg-img'
                      style={{
                        backgroundImage: `url(${single.name})`
                      }}
                      key={i}>
                      <div className='shadow'></div>
                      <Container className='h-100'>
                        <Row className='align-items-center flex-column flex-lg-row h-100 justify-content-center justify-content-end row'>
                          <Col
                            lg={6}
                            className='order-2 order-lg-1'>
                            <h2 className="text-center font-weight-bold text-white inspiration-title">Get inspired</h2>
                            <div className='search-widget top inspiration-search'>
                              <ProductsAutoComplete />
                            </div>
                            <div className='align-items-center d-flex flex-column hero-slider-five__content mb-5 pb-4 text-white'>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  );
                })}
            </Swiper>
          )}
        </div>
      </Container>
    </div>
  );
};

export default HeroSliderFive;
