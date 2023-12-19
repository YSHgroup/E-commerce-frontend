import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoIosPin, IoIosMail } from "react-icons/io";

import { BreadcrumbOne } from "../components/Breadcrumb";
import { SectionTitleOne, SectionTitleTwo } from "../components/SectionTitle";
import { LayoutOne } from "../components/Layout";

// import { prerender } from "../lib/prerendering";
import { metaTag, ogData, jsonldFullData } from "../lib/seo";
import api from "../lib/api";

// import bannedIPs from "../data/bannedIPs";

const Contact = () => {
  const cleanedErrors = {
    name: [],
    email: [],
    subject: [],
    message: [],
  };
  const [errors, setErrors] = useState(cleanedErrors);
  const [status, setStatus] = useState("initial");
  const [responseMessage, setResponseMessage] = useState("");

  const getRequiredFieldMessage = (field) => "Please enter your " + field;

  const validate = (name, email, subject, message) => {
    let isFormValid = true;
    let errors = Object.assign({}, cleanedErrors);

    if (!name) {
      errors.name.push(getRequiredFieldMessage("name"));
      isFormValid = false;
    }
    if (!email) {
      errors.email.push(getRequiredFieldMessage("email"));
      isFormValid = false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email.push("Invalid email");
      isFormValid = false;
    }
    if (!message) {
      errors.message.push(getRequiredFieldMessage("message"));
      isFormValid = false;
    }

    setErrors(errors);
    return isFormValid;
  };

  const submit = async (e) => {
    e.preventDefault();

    const name = document.getElementById("customerName").value;
    const email = document.getElementById("customerEmail").value;
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value;

    if (!validate(name, email, subject, message)) {
      return false;
    }
    setStatus("sending");

    try {
      await api().get("/sanctum/csrf-cookie");
      const { data: response } = await api().post("/api/v1/contact", {
        name,
        email,
        subject,
        message,
      });

      if (response.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setResponseMessage(response.message);
      }
    } catch (e) {
      setStatus("error");
      setResponseMessage("Unknown error. Please try again later.");
    }
  };

  return (
    <LayoutOne>
      {/* Page Title */}
      <Head>
        <title>Contact Us | 3d Infinite</title>
        {metaTag(
          "description",
          "Get in touch with us today to learn more about our products and services. Our dedicated team is here to answer any questions or provide assistance."
        )}
        {metaTag(
          "keywords",
          "3dinfinite, contact, for us"
        )}
        {ogData({
          title: `Contact Us | 3d Infinite`,
          description: "Get in touch with us today to learn more about our products and services. Our dedicated team is here to answer any questions or provide assistance.",
          url: `${process.env.PUBLIC_BASE_URL}/contact`,
          images: `${process.env.PUBLIC_BASE_URL}/assets/images/3d-infinite-logo.png`,
        })}
        {jsonldFullData({
          type: "article",
          breadcrumbs: [
            {
              id: process.env.PUBLIC_BASE_URL,
              name: "Home",
            },
            {
              id: `${process.env.PUBLIC_BASE_URL}/contact`,
              name: "Contact Us",
            },
          ],
          title: "Contact Us | 3d Infinite",
          url: `${process.env.PUBLIC_BASE_URL}/contact`,
          description: "Get in touch with us today to learn more about our products and services. Our dedicated team is here to answer any questions or provide assistance.",
          image: [`${process.env.PUBLIC_BASE_URL}/assets/images/3d-infinite-logo.png`],
        })}
      </Head>

      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Contact"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-shop.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_BASE_URL + "/"}>
              Home
            </Link>
          </li>

          <li>Contact</li>
        </ul>
      </BreadcrumbOne>
      <div className="contact-page-content-wrapper space-mt--r130 space-mb--r130">
        <div className="contact-page-top-info space-mb--r100">
          <Container>
            <Row>
              <Col lg={12}>
                <SectionTitleTwo
                  title="Contact detail"
                  subtitle="COME HAVE A LOOK"
                />
              </Col>
            </Row>
            <Row className="space-mb-mobile-only--m50">
              <Col md={6} className="space-mb-mobile-only--50">
                <div className="icon-box">
                  <div className="icon-box__icon">
                    <IoIosPin />
                  </div>
                  <div className="icon-box__content">
                    <h3 className="title">ADDRESS</h3>
                    <p className="content">
                      Sumperk, Pod Senovou 2245/40, 78701, the Czech Republic
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={6} className="space-mb-mobile-only--50">
                <div className="icon-box">
                  <div className="icon-box__icon">
                    <IoIosMail />
                  </div>
                  <div className="icon-box__content">
                    <h3 className="title">CONTACT</h3>
                    <p className="content"> Mail: info@3dinfinite.com </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="contact-page-map space-mb--r100">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="google-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2585577.7970060552!2d16.950058455190405!3d50.738891026019374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47121b02af17115d%3A0x7853c76bb6210fec!2sPod%20Senovou%202245%2C%20787%2001%20%C5%A0umperk%2C%20Czechia!5e0!3m2!1sen!2sbd!4v1671975966335!5m2!1sen!2sbd"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="contact-page-form">
          <Container>
            <Row>
              <Col lg={12}>
                <SectionTitleOne title="Get in touch" />
              </Col>
            </Row>
            <Row>
              <Col lg={8} className="ml-auto mr-auto">
                <div className="lezada-form contact-form">
                  <form onSubmit={submit}>
                    <Row>
                      <Col md={6} className="space-mb--40">
                        <input
                          type="text"
                          placeholder="Your Name *"
                          name="customerName"
                          id="customerName"
                        />
                        {errors.name.length ? (
                          <div
                            className="error"
                            dangerouslySetInnerHTML={{ __html: errors.name[0] }}
                          />
                        ) : (
                          ""
                        )}
                      </Col>
                      <Col md={6} className="space-mb--40">
                        <input
                          type="text"
                          placeholder="Your Email *"
                          name="customerEmail"
                          id="customerEmail"
                        />
                        {errors.email.length ? (
                          <div
                            className="error"
                            dangerouslySetInnerHTML={{
                              __html: errors.email[0],
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </Col>
                      <Col md={12} className="space-mb--40">
                        <input
                          type="text"
                          placeholder="Subject"
                          name="contactSubject"
                          id="contactSubject"
                        />
                        {errors.subject.length ? (
                          <div
                            className="error"
                            dangerouslySetInnerHTML={{
                              __html: errors.subject[0],
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </Col>
                      <Col md={12} className="space-mb--40">
                        <textarea
                          cols={30}
                          rows={10}
                          placeholder="Message *"
                          name="contactMessage"
                          id="contactMessage"
                          defaultValue={""}
                        />
                        {errors.message.length ? (
                          <div
                            className="error"
                            dangerouslySetInnerHTML={{
                              __html: errors.message[0],
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </Col>
                      <Col md={12} className="text-center">
                        {status == "initial" ? (
                          <button
                            type="submit"
                            value="submit"
                            id="submit"
                            className="lezada-button lezada-button--medium"
                          >
                            submit
                          </button>
                        ) : status == "sending" ? (
                          <p className="sending">sending...</p>
                        ) : status == "success" ? (
                          <p className="success">
                            Thank you for contacting us! We will reply ASAP.
                          </p>
                        ) : (
                          <p className="error">{responseMessage}</p>
                        )}
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </LayoutOne>
  );
};

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default Contact;
