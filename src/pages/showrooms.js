import Link from "next/link";
import Head from "next/head";

import { BreadcrumbOne } from "../components/Breadcrumb";
import { LayoutOne } from "../components/Layout";

// import { prerender } from "../lib/prerendering";
import { metaTag, ogData, jsonldFullData } from "../lib/seo";

// import bannedIPs from "../data/bannedIPs";

const Showroom = () => {
  const onClickHandler = (room) => {
    // open link in new tab
    const newWindow = window.open(
      "https://showroom.3dinfinite.com/" + room,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <LayoutOne>
      {/* Page Title */}
      <Head>
        <title>Showroom | 3d Infinite</title>
        {metaTag(
          "description",
          "Welcome to the Kravet Experience, designed to let you feel the quality and beauty of our collection, and reimagine with us the living spaces."
        )}
        {metaTag("keywords", "3dinfinite, showroom, best models, 3d Infinite")}
        {ogData({
          title: "Showroom | 3d Infinite",
          description: "Welcome to the Kravet Experience, designed to let you feel the quality and beauty of our collection, and reimagine with us the living spaces.",
          url: `${process.env.PUBLIC_BASE_URL}/showrooms`,
          images: `${process.env.PUBLIC_BASE_URL}/assets/images/3d-infinite-logo.png`,
        })}
        {jsonldFullData({
          type: "article",
          breadcrumbs: [
            {
              id: `${process.env.PUBLIC_BASE_URL}`,
              name: "Home",
            },
            {
              id: `${process.env.PUBLIC_BASE_URL}/showrooms`,
              name: "Showroom",
            },
          ],
          title: "Showroom | 3d Infinite",
          url: `${process.env.PUBLIC_BASE_URL}/showrooms`,
          description: "Welcome to the Kravet Experience, designed to let you feel the quality and beauty of our collection, and reimagine with us the living spaces.",
          image: [
            `${process.env.PUBLIC_BASE_URL}/assets/images/3d-infinite-logo.png`,
          ],
        })}
      </Head>

      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Showroom"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-shop.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_BASE_URL + "/"}>
              Home
            </Link>
          </li>

          <li>Showroom</li>
        </ul>
      </BreadcrumbOne>

      <div className="showroom-item-container space-mt--r130 space-mb--r130">
        <div className="showroom-item-wrapper">
          <div className="showroom-item row">
            <div className="col-12 col-lg-7 col-xl-6">
              <h1 className="mb-4">KRAVET 2022 COLLECTION</h1>
              <p className="description pt-2">
                Welcome to the Kravet Experience, designed to let you feel the
                quality and beauty of our collection, and reimagine with us the
                living spaces.
              </p>
            </div>
            <div className="col-12 col-lg-4 col-xl-3 text-right mt-3 mt-lg-0">
              <div
                className="mt-12 entry-link"
                onClick={() => onClickHandler("room1")}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="d-none d-lg-inline-block arrow text-white"
                >
                  <path
                    d="M19.404 8l4.103 4.104-4.103 4.103-.708-.707 2.897-2.897H.3v-1h21.293l-2.897-2.896.708-.707z"
                    fill="#ffffff"
                    fill-rule="evenodd"
                  ></path>
                </svg>

                <h6 className="call-to-action d-inline-block ml-0 mr-3 ml-lg-3 mr-lg-0">
                  Start the journey
                </h6>

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="d-inline-block d-lg-none arrow text-white"
                >
                  <path
                    d="M19.404 8l4.103 4.104-4.103 4.103-.708-.707 2.897-2.897H.3v-1h21.293l-2.897-2.896.708-.707z"
                    fill="#ffffff"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="showroom-item-container space-mt--r130 space-mb--r130"
        style={{ backgroundImage: "url(/assets/images/showroom/room2.jpg)" }}
      >
        <div className="showroom-item-wrapper">
          <div className="showroom-item row">
            <div className="col-12 col-lg-7 col-xl-6">
              <h1 className="mb-4">KRAVET 2022 COLLECTION</h1>
              <p className="description pt-2">
                Welcome to the Kravet Experience, designed to let you feel the
                quality and beauty of our collection, and reimagine with us the
                living spaces.
              </p>
            </div>
            <div className="col-12 col-lg-4 col-xl-3 text-right mt-3 mt-lg-0">
              <div
                className="mt-12 entry-link"
                onClick={() => onClickHandler("room2")}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="d-none d-lg-inline-block arrow text-white"
                >
                  <path
                    d="M19.404 8l4.103 4.104-4.103 4.103-.708-.707 2.897-2.897H.3v-1h21.293l-2.897-2.896.708-.707z"
                    fill="#ffffff"
                    fill-rule="evenodd"
                  ></path>
                </svg>

                <h6 className="call-to-action d-inline-block ml-0 mr-3 ml-lg-3 mr-lg-0">
                  Start the journey
                </h6>

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="d-inline-block d-lg-none arrow text-white"
                >
                  <path
                    d="M19.404 8l4.103 4.104-4.103 4.103-.708-.707 2.897-2.897H.3v-1h21.293l-2.897-2.896.708-.707z"
                    fill="#ffffff"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
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

export default Showroom;
