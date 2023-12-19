import Link from "next/link";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { LayoutOne } from "../components/Layout";
// import { prerender } from "../lib/prerendering";
import { metaTag, ogData, jsonldFullData } from "../lib/seo";
// import bannedIPs from "../data/bannedIPs";
import faqJSON from "../data/faq.json";

const Faq = () => {
  return (
    <LayoutOne>
      {/* Page Title */}
      <Head>
        <title>FAQs | 3d Infinite</title>
        {metaTag(
          "description",
          "Find answers to frequently asked questions about 3D Infinite here."
        )}
        {metaTag(
          "keywords",
          "3dinfinite, faq, general, quesions"
        )}
        {ogData({
          title: `FAQs | 3d Infinite`,
          description: "Find answers to frequently asked questions about 3D Infinite here.",
          url: `${process.env.PUBLIC_BASE_URL}/faq`,
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
              id: `${process.env.PUBLIC_BASE_URL}/faq`,
              name: "FAQs",
            },
          ],
          title: "FAQs | 3d Infinite",
          url : `${process.env.PUBLIC_BASE_URL}/faq`,
          description: "Find answers to frequently asked questions about 3D Infinite here.",
          image: [`${process.env.PUBLIC_BASE_URL}/assets/images/3d-infinite-logo.png`],
        })}
      </Head>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="F.A.Q"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-shop.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_BASE_URL + "/"}>
              Home
            </Link>
          </li>
          <li>F.A.Q</li>
        </ul>
      </BreadcrumbOne>
      <div className="element-wrapper space-mt--r130 space-mb--r130">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="faq-wrapper">
                {faqJSON.map((group, number) => (
                  <div
                    className={
                      faqJSON.length - 1 === number
                        ? "single-faq"
                        : "single-faq space-mb--r100"
                    }
                    key={group.name}
                  >
                    <h2 className="faq-title space-mb--20">{group.name}</h2>
                    <Accordion>
                      {group.children.map((item) => (
                        <Card
                          className="single-my-account space-mb--20"
                          key={item.title}
                        >
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle
                              variant="link"
                              eventKey={item.title}
                            >
                              <h3 className="panel-title">{item.title}</h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey={item.title}>
                            <Card.Body>
                              <p>{item.desc}</p>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
};

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default Faq;
