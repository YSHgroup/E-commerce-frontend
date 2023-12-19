import React from 'react';
import Swiper from 'react-id-swiper';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { useWindowSize } from './useWindowSize';
const ProductSlider = ({ data, type, style }) => {
  const params = type === 'product' ? {
    slidesPerView: 1,
    spaceBetween: 50,
    // loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      2048: {
        slidesPerView: 6,
        spaceBetween: 40
      },
      1268: {
        slidesPerView: 5,
        spaceBetween: 40
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  } : type === 'inspiration' ? {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 50,
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    renderPrevButton: () => (
      <button className='swiper-button-prev other-image-button'>
        <IoIosArrowRoundBack />
      </button>
    ),
    renderNextButton: () => (
      <button className='swiper-button-next other-image-button'>
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
  } : {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 50,
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    renderPrevButton: () => (
      <button className='swiper-button-prev other-image-button'>
        <IoIosArrowRoundBack />
      </button>
    ),
    renderNextButton: () => (
      <button className='swiper-button-next other-image-button'>
        <IoIosArrowRoundForward />
      </button>
    ),
    breakpoints: {
      2048: {
        slidesPerView: 5,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20
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
    }
  };
  /**2048: {
        slidesPerView: 6,
        spaceBetween: 40
      },
      1268: {
        slidesPerView: 5,
        spaceBetween: 40
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      } */
  const winSize = useWindowSize();
  React.useEffect(() => {
    if(data) {
      let perView = 0;
      if(winSize.width > 320) {
        perView = 1
      }
      if(winSize.width > 640) {
        perView = 2
      }
      if(winSize.width > 768) {
        perView = 3
      }
      if(winSize.width > 992) {
        perView = 4
      }
      if(winSize.width > 1268) {
        perView = 5
      }
      if(winSize.width > 2048) {
        perView = 6
      }
      if(document.querySelector('#product-swiper-auto .swiper-wrapper')) {
        document.querySelector('#product-swiper-auto .swiper-wrapper').classList.toggle('justify-content-normal', data.length >= perView)
      }
    }
  },[winSize, data]);
  return (
    <Container className='wide' style={style}>
      <div className='hero-slider-five__wrapper' id='product-swiper-auto'>
        {data.length > 0 && (
          <Swiper {...params} initialSlide={0} rebuildOnUpdate={true} className='justify-content-center'>
            {data.map((item, index) => {
              return (
                <div key={index} className="">
                  {
                    type !== 'product' &&
                    <Link
                      href={`/inspiration/[slug]?slug=${item.id}`}
                      as={
                        process.env.PUBLIC_URL +
                        '/inspiration/' +
                        item.id
                      }
                    >
                      <div className="text-center image_slide_layout" style={{ overflow: 'hidden', height: '100%', borderRadius: 0 }} >
                        <img src={`${item.img_name}`} alt={item.img_name} style={{ borderRadius: 0 }} width='100%' className={index !== 0 ? 'slider-item-height' : ''} />
                      </div>
                    </Link>
                  }
                  {
                    type === 'product' &&
                    <React.Fragment>
                      <div className="text-center image_slide_layout product-slider-tile" id='product-slider-tile' style={{ margin: 'auto' }}>
                        <img src={`${item.img_name}`} alt={item.img_name} />
                      </div>
                      <div className="product-layout" style={{ margin: '25px auto 0 auto' }}>
                        <p className="brand-name">{item.brand_name}</p>
                        <p className="product-name">{item.product_name}</p>
                        <p className="product-name">{item.price}</p>
                      </div>
                    </React.Fragment>
                  }
                </div>
              );
            })}
          </Swiper>
        )}
      </div>
    </Container>
  );
};
export default ProductSlider;