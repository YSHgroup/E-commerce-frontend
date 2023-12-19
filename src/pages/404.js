import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

import { LayoutFullSize } from "../components/Layout";

import api from "../lib/api";
import { metaTag, ogData, jsonldFullData } from "../lib/seo";

const NotFound = () => {
  const [busy, setBusy] = useState(false);

  const [bgImage, setBgImage] = useState({});

  const getBgImage = () => {
    api()
      .get("/api/v1/loginPageBackground")
      .then((response) => setBgImage(response.data));
  };

  useEffect(() => {
    getBgImage();
  }, []);

  return (
    <LayoutFullSize
      busy={busy}
      bgImage={bgImage}
      showSignInAdv={false}
      additionalClass="not-found-page"
    >
      {/* Page Title */}
      <Head>
        <title>Page not found | 3d Infinite</title>
        {metaTag("description", "This page not found at 3d Infinite")}
        {metaTag("keywords", "3dinfinite, 404, Not found")}
        {ogData({
          title: `Page not found | 3d Infinite`,
          description: "This page not found at 3d Infinite",
          url: `${process.env.PUBLIC_BASE_URL}/404`,
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
              id: `${process.env.PUBLIC_BASE_URL}/404`,
              name: "Not found",
            },
          ],
          title: "Page not found | 3d Infinite",
          url: `${process.env.PUBLIC_BASE_URL}/404`,
          description: "This page not found at 3d Infinite",
          image: [`${process.env.PUBLIC_BASE_URL}/assets/images/3d-infinite-logo.png`],
        })}
      </Head>

      <div className="login-area">
        <Container fluid={"sm"}>
          <Row>
            <div className="nothing-found-content">
              <h1>Oops!</h1>
              <h1 className="space-mb--50">Page not found!</h1>
              <p className="direction-page">
                PLEASE GO BACK TO{" "}
                <Link href="/" as={process.env.PUBLIC_BASE_URL + "/"}>
                  homepage
                </Link>
              </p>
            </div>
          </Row>
        </Container>
      </div>
    </LayoutFullSize>
  );
};

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
export default NotFound;
