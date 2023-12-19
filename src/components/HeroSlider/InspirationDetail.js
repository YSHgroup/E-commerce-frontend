import Link from 'next/link';
import { connect } from 'react-redux';
import {
  addToWishlist,
  deleteFromWishlist
} from '../../redux/actions/wishlistActions';
import Swiper from 'react-id-swiper';
import { Container, Row, Col, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { IoIosHeartEmpty, IoIosShuffle, IoIosSearch, IoIosHeart } from 'react-icons/io';
import React from 'react';
import { useToasts } from "react-toast-notifications";

const InspirationDetail = ({
  sliderData,
  spaceBottomClass,
  checked,
  activeKey,
  addToCart,
  wishlistItems,
  addToWishlist,
  deleteFromWishlist
}) => {
  const { addToast } = useToasts();
  const params = {
    autoHeight: true,
    calculateHeight: true,
    loop: false,
    effect: 'fade',
    watchSlidesVisibility: true,
    mousewheel: false,
    allowTouchMove: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
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
      <div className='wide inspiration-detail'>
        <div className='hero-slider-five__wrapper detail-pop-carousel'>
          {sliderData.length > 0 && (
            <Swiper
              {...params}
              activeSlideKey={`${activeKey}`}
            >
              {sliderData.length > 0 &&
                sliderData.map((single, i) => {
                  return (
                    <div
                      className='hero-slider-five__slide bg-img'
                      style={{ position: 'relative' }}
                      key={i}
                    >
                      <img src={`${single.img_name}`} alt={single.img_name} width="100%" height="auto" />
                      {single.pop_up.length > 0 && single.pop_up.map((placement, index) => {
                        let locationPop = placement.location_pop;
                        if (placement.location_pop === "left_top") {
                          locationPop = "left-end";
                        }
                        if (placement.location_pop === "right_top") {
                          locationPop = "right-end";
                        }
                        if (placement.location_pop === "left_bottom") {
                          locationPop = "left-start";
                        }
                        if (placement.location_pop === "right_bottom") {
                          locationPop = "right-start";
                        }
                        const wishlistItem = wishlistItems.filter(
                          (w) => w.id === placement.product.id
                        )[0];
                        return checked && <OverlayTrigger
                          rootClose={true}
                          trigger="click"
                          key={index}
                          placement={locationPop}
                          overlay={
                            <Popover id={`position-relative popover-positioned-${locationPop}`}>
                              <Popover.Content>
                                <div className="d-flex justify-content-sapce-between">
                                  <button
                                    onClick={
                                      wishlistItem !== undefined
                                        ? () =>
                                          deleteFromWishlist(
                                            placement.product,
                                            addToast
                                          )
                                        : () =>
                                          addToWishlist(
                                            placement.product,
                                            addToast
                                          )
                                    }
                                    className='top-icon'>
                                    {
                                      wishlistItem !== undefined ?
                                        <IoIosHeart />
                                        :
                                        <IoIosHeartEmpty />
                                    }
                                  </button>
                                  <div>
                                    <img src={`${placement.product.image_main}`} width="100px" height="100px" />
                                  </div>
                                  <div>
                                    <p className="brand-name mb-0">{placement.product.brand.name}</p>
                                    <Link
                                      href={`/product/${placement.product.slug}`}
                                      className=""
                                      as={process.env.PUBLIC_URL + '/product/' + placement.product.slug}
                                      legacyBehavior>
                                      <p className="brand-detail-page mb-0">{placement.product.name}</p>
                                    </Link>
                                    <p className="brand-detail mb-0">${" "}{placement.product.regular_price}</p>
                                    <div className="add-cart mx-2 py-1 px-2 mt-3" onClick={() => addToCart(placement.product, addToast)}>
                                      <p className="mb-0 text-center">Add to cart</p>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Content>
                            </Popover>
                          }
                        >
                          <Button size="sm" className="popover" key={index} style={{ top: `${placement.top}%`, left: `${placement.left}%`, padding: '0.05rem 0.4rem', }} variant="light">+</Button>
                        </OverlayTrigger>;
                      })}
                    </div>
                  );
                })}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    wishlistItems: state.wishlistData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InspirationDetail);
