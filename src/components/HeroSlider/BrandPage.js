import Link from "next/link";
import Swiper from "react-id-swiper";
import { Container, Row, Col } from "react-bootstrap";

const BrandPage = ({ sliderData }) => {
  const params = {
    loop: true,
    speed: 1000,
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => <span></span>,
    renderNextButton: () => <span></span>,
  };
  return (
    <div className="hero-slider-nine">
      <div className="hero-slider-nine__wrapper">
        <Swiper {...params}>
          {sliderData &&
            sliderData.map((single, i) => {
              return (
                <div className="hero-slider-nine__slide" key={i}>
                  <Container className="h-100">
                    <Row className="align-items-center flex-column flex-lg-row justify-content-center justify-content-lg-start h-100">
                      <Col lg={7}>
                        <div className="hero-slider-nine__image">
                          <img
                            src={single.image}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </Col>
                      <Col lg={5} className="text-center">
                        <div className="hero-slider-nine__content">
                          <h1
                            className="title"
                            dangerouslySetInnerHTML={{
                              __html: single.title,
                            }}
                          />
                          <div className="slider-link">
                            <Link
                              href={single.url}
                              as={process.env.PUBLIC_URL + single.url}
                            >
                              {single.shopNowTxt}
                            </Link>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandPage;
