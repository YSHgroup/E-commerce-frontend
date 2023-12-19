import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Container } from 'react-bootstrap';
import Switch from "react-switch";
import Swiper from 'react-id-swiper';

import { useRouter } from 'next/router'
import Head from "next/head";

import { LayoutOne } from '../../components/Layout';
import { InspirationDetail } from '../../components/HeroSlider';
import { ProductGridFiveWrapper } from "../../components/ProductThumb";
import CategorySlider from '../../components/Inspiration/CategorySlider';
import { useWindowSize } from '../../components/Inspiration/useWindowSize';

import api from '../../lib/api';
import { metaTag, ogData } from "../../lib/seo";
import { addToCart } from "../../redux/actions/cartActions";

const ProductSlug = ({ addToCart }) => {
  const [checked, setChecked] = useState(true);
  const [inspirationAllData, setInspirationAllData] = useState([]);
  const [description, setDescription] = useState("");
  const [inspirationSlideData, setInspirationSlideData] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const router = useRouter();
  const [productsIdsPurchasedByUser, setProductsIdsPurchasedByUser] = useState([]);
  const handleChange = nextChecked => {
    setChecked(nextChecked);
    setActiveKey("");
  };
  const params = {
    loop: false,
    slidesPerView: 3,
    spaceBetween: 50,
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
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
  };
  const getProductsPurchasedByUser = async () => {
    await api().get('/sanctum/csrf-cookie');
    const { data: ids } = await api().get('api/v1/user/purchasedProducts');

    setProductsIdsPurchasedByUser(ids);
  }
  useEffect(() => {
    getProductsPurchasedByUser();
  }, []);
  useEffect(() => {
    api()
      .get(`/api/v1/inspiration/getItems?pid=${router.query.slug}`)
      .then((response) => {
        if (response) {
          if (response.data.inspirationAllData.length > 0) {
            response.data.inspirationAllData.map((item, index) => {
              if (item.id == router.query.slug) {
                setActiveKey(index)
              }
            })
            setInspirationAllData(response.data.inspirationAllData);
          }
          if (response.data.relatedProducts.length > 0) {
            let arr = [];
            response.data.relatedProducts.map((item, index) => {
              arr.push({ id: item.inspiration_products.id, img_name: item.inspiration_products.img_name });
            })
            setInspirationSlideData(arr);
          } else {
            setInspirationSlideData([]);
          }
          if (response.data.products.length > 0) {
            setProducts([...response.data.products]);
          }
          if (response.data.inspirationData.length > 0) {
            setDescription(response.data.inspirationData[0].description);
          }
        }
      })
      .catch(error => {
        console.log('Error on fetching of the product list:', error);
      });
  }, [router.query.slug])
  const winSize = useWindowSize();
  function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  }
  React.useEffect(() => {
    if (products) {
      let perView = 0;
      if (winSize.width > 320) {
        perView = 1
      }
      if (winSize.width > 640) {
        perView = 2
      }
      if (winSize.width > 768) {
        perView = 3
      }
      if (winSize.width > 992) {
        perView = 4
      }
      if (winSize.width > 1268) {
        perView = 5
      }
      if (winSize.width > 2048) {
        perView = 6
      }
      'justify-content-center'
      if (document.querySelector('#product-swiper-auto .swiper-wrapper')) {
        if (!hasClass(document.querySelector('#product-swiper-auto .swiper-wrapper').classList, 'justify-content-center')) {
          document.querySelector('#product-swiper-auto .swiper-wrapper').classList.add('justify-content-center')
        }
        document.querySelector('#product-swiper-auto .swiper-wrapper').classList.toggle('justify-content-normal', products.length >= perView)
      }
    }
  }, [winSize, products]);
  return (
    <LayoutOne aboutOverlay={false}>
      <Head>
        <title>Inspiration #{router.query.slug} | 3d Infinite</title>
        { metaTag('description', `See the inspiration #${router.query.slug} composed from the best 3d models`) }
        { ogData({
          title: 'Inspiration | 3d Infinite',
          description: 'See the best inspirations composed with 3d models',
          type: "product.group",
        }) }
        <link rel="canonical" href="https://3dinfinite.com/inspiration" />
      </Head>
      <InspirationDetail
        addToCart={addToCart}
        checked={checked}
        sliderData={inspirationAllData}
        activeKey={activeKey}
        spaceBottomClass='space-mb--150'
      />
      <div>
        <div className="text-center pt-5">
          <Switch
            onChange={handleChange}
            checked={checked}
            className="react-switch"
          />
        </div>
      </div>
      <div className="py-5">
        {inspirationSlideData.length > 0 ? (
          <div className="" style={{ backgroundColor: '#F7F3F0', marginTop: '5rem' }}>
            <CategorySlider categoryData={inspirationSlideData} showCount={false} style={{ position: 'relative', top: '-3.5rem' }} t='other' />
          </div>
        ) : (
          <p className="text-center pt-5" style={{ fontSize: 25 }}>No Related Images</p>
        )}
      </div>
      <p className="text-center py-5" style={{ fontSize: 25 }}>Product in this image</p>
      <div className="gallery-image">
        <Container className='wide' >
          <div className='hero-slider-five__wrapper' id='product-swiper-auto'>
            <Swiper {...params} rebuildOnUpdate={true} >
              <ProductGridFiveWrapper products={products} purchasedProductsIds={productsIdsPurchasedByUser} />
            </Swiper>
          </div>
        </Container>
      </div>
      <div className="py-5">
        <p className="text-center py-5" style={{ fontSize: 25 }}>Related Images</p>
        {inspirationSlideData.length > 0 ? (
          <div className=" mb-5" style={{ backgroundColor: '#F7F3F0', marginTop: '5rem' }}>
            <CategorySlider categoryData={inspirationSlideData} showCount={false} style={{ position: 'relative', top: '-3.5rem' }} />
          </div>
        ) : (
          <p className="text-center pt-5" style={{ fontSize: 25 }}>No Related Images</p>
        )}
      </div>
    </LayoutOne>
  )
}
const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSlug);
