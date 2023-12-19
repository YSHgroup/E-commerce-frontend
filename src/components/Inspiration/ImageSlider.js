import React, { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
const ImageSlider = ({ data }) => {
  const [sliderData, setSliderData] = useState([]);
  useEffect(() => {
    setSliderData(data)
  }, [data])
  const params = {
    slidesPerView: 7,
    spaceBetween: 50,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    centeredSlides: true,
    loop: true,
    breakpoints: {
      2048: {
        slidesPerView: 10,
        spaceBetween: 40
      },
      1024: {
        slidesPerView: 7,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 2,
        spaceBetween: 10
      }
    }
  }
  return (
    <Container className='wide'>
      <div className='hero-slider-five__wrapper'>
        {data.length > 1 && (
          <Swiper {...params}>
            {data.length > 1 && data.map((item, index) => {
              return (
                <div key={index} className="image_slide_layout">
                  <Link
                    href={{
                      query: {
                        c: item.id
                      }
                    }}
                    as={{
                      query: {
                        c: item.id
                      }
                    }
                      // process.env
                      //   .PUBLIC_URL +
                      // item.url
                    }>
                    <div>
                      <div className="text-center">
                        <img src={`${item.image}`} alt={item.image} width="100%" height="100px" />
                      </div>
                      <div style={{ height: 60 }}>
                        <p className="image_slide_font py-3 px-2 cursor">{item.name}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Swiper>
        )}
      </div>
    </Container>
  );
};
export default ImageSlider;