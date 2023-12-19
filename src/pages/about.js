import Link from "next/link";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";

// import bannedIPs from "../data/bannedIPs";

import { LayoutOne } from "../components/Layout";
// import { prerender } from "../lib/prerendering";
import { metaTag, ogData, jsonldFullData } from "../lib/seo";

const About = () => {
  return (
    <LayoutOne>
      {/* Page Title */}
      <Head>
        <title>About Us | 3d Infinite</title>
        {metaTag(
          "description",
          "3D Infinite. Making all your 3D interior modeling dreams a reality. 3D Infinite---Giving you the dynamic ability to create and build virtual environments with our industry-leading 3D Modeling solutions."
        )}
        {metaTag(
          "keywords",
          "3dinfinite, about, about us, quesions"
        )}
        {ogData({
          title: `About Us | 3d Infinite`,
          description: "3D Infinite. Making all your 3D interior modeling dreams a reality. 3D Infinite---Giving you the dynamic ability to create and build virtual environments with our industry-leading 3D Modeling solutions.",
          url: `${process.env.PUBLIC_BASE_URL}/about`,
          type: 'article',
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
              id: `${process.env.PUBLIC_BASE_URL}/about`,
              name: "About Us",
            },
          ],
          title: "About Us | 3d Infinite",
          url: `${process.env.PUBLIC_BASE_URL}/about`,
          description: "3D Infinite. Making all your 3D interior modeling dreams a reality. 3D Infinite---Giving you the dynamic ability to create and build virtual environments with our industry-leading 3D Modeling solutions.",
          image: [`${process.env.PUBLIC_BASE_URL}/assets/images/3d-infinite-logo.png`],
        })}
      </Head>

      {/* about content */}
      <div className="about-content space-mt--r130 space-mb--r130">
        <div className="section-title-container space-mb--40">
          <Container>
            <Row>
              <Col lg={12} className="ml-auto mr-auto">
                {/* section title */}
                <div className="about-title-container text-center">
                  <p className="dark-title space-mb--35">ABOUT US</p>
                  <h2 className="title space-mb--15">
                    Transforming all your design needs... At 3D Infinite.
                  </h2>
                  <p className="title-text">
                    When it comes to 3D modeling, you deserve the best.
                    <br />
                    <br />
                    At 3D Infinite, we sit at the cutting edge of the design
                    world. Informing and transforming processes for clients,
                    architects, designers and manufacturers who want the best
                    from their 3D modeling solutions. Our Global Design Center
                    hosts a hand-picked selection of the industry's leading
                    furniture and lighting designers. Featuring a carefully
                    curated collection of the finest furniture, lighting and
                    decorations. <br />
                    For all your design needs and more. <br />
                    <br />
                    As a designer or artist---we're now giving you the unique
                    ability to purchase 3D models for your own use, instantly.
                    At a fraction of the cost it would take to build your own.
                    And a fraction of the time. Our passionate team has decades'
                    of experience in the interior design industry. Always ahead
                    of the curve with new innovations and expertly-sourced
                    design ideas for the premium interiors market. <br />
                    <br />
                    You'll get everything you need to make your next project a
                    success when you buy one of our 3D models. Including instant
                    access to all the specifications and resource information
                    you need.
                  </p>
                  <br />
                  <br />
                  <p className="title-text">
                    <strong>
                      3D Infinite---Giving you the dynamic ability to create and
                      build virtual environments with our industry-leading 3D
                      Modeling solutions.
                    </strong>
                    <p>
                      Take your client through a highly-realistic presentation
                      process with the exact size, form and texture in 3D
                      models.
                    </p>
                    <p>
                      3D Infinite's world-class Design Center is uniquely
                      positioned to not only give you access to high-res
                      models---but also access to an international network of
                      users and design experts. We can also provide full
                      rendering services to designers who're new to 3D modeling
                      and want to launch their ideas to a bigger audience.
                    </p>
                    <br />
                    <br />
                    <p>
                      <strong>
                        3D Infinite. Making all your 3D interior modeling dreams
                        a reality.
                      </strong>
                    </p>
                  </p>
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

export default About;
