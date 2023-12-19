import { useState, useEffect } from "react";
import { CategorySlider } from "../components/Category";
import { LayoutOne } from "../components/Layout";
import { HeroSliderFive } from "../components/HeroSlider";
import { ProductTab } from "../components/ProductTab";

import Head from "next/head";
import Link from "next/link";

import api from "../lib/api";
import { prerender, isbot } from "../lib/prerendering";
import { metaTag, ogData, jsonldFullData } from "../lib/seo";

import bannedIPs from "../data/bannedIPs";

const Home = ({
  featuredBrands,
  featuredCategories,
  featuredCategoriesBottom,
  newProducts,
  featuredProducts,
  saleProducts,
}) => {
  const [productsIdsPurchasedByUser, setProductsIdsPurchasedByUser] = useState(
    []
  );

  const getProductsPurchasedByUser = async () => {
    await api().get("/sanctum/csrf-cookie");
    const { data: ids } = await api().get("api/v1/user/purchasedProducts");

    setProductsIdsPurchasedByUser(ids);
  };

  useEffect(() => {
    getProductsPurchasedByUser();
    document.querySelectorAll(".dropdown-button").forEach((el) => {
      el.classList.remove("btn");
      el.classList.remove("btn-secondary");
    });

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 500);
  }, []);

  return (
    <LayoutOne aboutOverlay={false}>
      <Head>
        <title>3D Infinite. Get the best 3D models instantly.</title>
        {metaTag(
          "description",
          "At 3D Infinite we create high-quality 3D models of furniture, lighting, accessories, and plumbing fixtures by top international brands. All our 3D models, are generated for use by design professionals and manufacturers in the production of beautiful, photo-like renderings."
        )}
        {metaTag(
          "keywords",
          "3dinfinite, home, 3d models, 3d infinite"
        )}
        {metaTag(
          "image",
          `${process.env.PUBLIC_BASE_URL}/assets/images/homepage-product.png`
        )}
        {ogData({
          title: "3D Infinite. Get the best 3D models instantly.",
          url: `${process.env.PUBLIC_BASE_URL}`,
          description:
            "At 3D Infinite we create high-quality 3D models of furniture, lighting, accessories, and plumbing fixtures by top international brands. All our 3D models, are generated for use by design professionals and manufacturers in the production of beautiful, photo-like renderings.",
          images: `${process.env.PUBLIC_BASE_URL}/assets/images/homepage-product.png`,
        })}
        {jsonldFullData({
          type: "article",
          breadcrumbs: [
            {
              id: process.env.PUBLIC_BASE_URL,
              name: "Home",
            },
          ],
          url: `${process.env.PUBLIC_BASE_URL}`,
          title: "3D Infinite. Get the best 3D models instantly.",
          description:
            "At 3D Infinite we create high-quality 3D models of furniture, lighting, accessories, and plumbing fixtures by top international brands. All our 3D models, are generated for use by design professionals and manufacturers in the production of beautiful, photo-like renderings.",
          image: [
            `${process.env.PUBLIC_BASE_URL}/assets/images/homepage-product.png`,
          ],
        })}
      </Head>
      {/* hero slider */}
      <HeroSliderFive
        sliderData={featuredBrands}
        spaceBottomClass="space-mb--50"
      />

      {/* welcome text */}
      <div
        className="row align-items-center justify-center space-mt--r100 space-mb--r100"
        style={{ "--bs-gutter-x": 0 }}
      >
        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-4">
          <p className="product-content__price">
            <span className="main-price">WELCOME AT 3D INFINITE</span>
          </p>
          <h2 className="product-content__title">
            Build beautiful interiors with our high-quality 3D models
          </h2>
          <p className="product-content__description my-4">
            At 3D Infinite we create high-quality 3D models of furniture,
            lighting, accessories, and plumbing fixtures by top international
            brands. All our 3D models, are generated for use by design
            professionals and manufacturers in the production of beautiful,
            photo-like renderings.
          </p>
          <Link
            href={process.env.PUBLIC_BASE_URL + "/about"}
            as={process.env.PUBLIC_BASE_URL + "/about"}
            legacyBehavior
          >
            <button
              className="lezada-button lezada-button--medium"
              style={{ padding: "15px 30px" }}
            >
              More about us
            </button>
          </Link>
        </div>
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 col-xxl-5 mt-5 mt-lg-0">
          <img
            src={process.env.PUBLIC_BASE_URL + "/assets/images/homepage-product.png"}
            alt="homepage product"
            className="img-fluid"
          />
        </div>
      </div>

      {/* category slider */}
      <CategorySlider
        categoryData={featuredCategories}
        spaceBottomClass="space-mb--r100"
      />

      {/* product tab */}
      <ProductTab
        newProducts={newProducts}
        featuredProducts={featuredProducts}
        saleProducts={saleProducts}
        purchasedProductsIds={productsIdsPurchasedByUser}
      />
      {/* category slider bottom */}
      <CategorySlider
        categoryData={featuredCategoriesBottom}
        spaceBottomClass="space-mb--r100"
      />
    </LayoutOne>
  );
};

export async function getServerSideProps(context) {
  if (
    bannedIPs.includes(context.req.connection.remoteAddress) ||
    bannedIPs.includes(context.req.headers["x-forwarded-for"])
  ) {
    context.res.writeHead(403).end();
  }
  await api().post("/api/v1/log-ips", {
    ip: context.req?.connection?.remoteAddress,
    forwarded_ip: context.req?.headers["x-forwarded-for"],
  });

  const duration = 1000 * 60 * 60 * 24; // one day
  if (isbot(context)) {
    return {
      props: {
        renderedHtml: await prerender(context, duration),
      },
    };
  }

  await api().get("/sanctum/csrf-cookie");
  const {
    data: [
      featuredBrands,
      featuredCategories,
      featuredCategoriesBottom,
      {
        original: { data: newProducts },
      },
      {
        original: { data: featuredProducts },
      },
      {
        original: { data: saleProducts },
      },
    ],
  } = await api().get("/api/v1/frontpage-info");

  prerender(context, duration);

  return {
    props: {
      featuredBrands,
      featuredCategories,
      featuredCategoriesBottom,
      newProducts,
      featuredProducts,
      saleProducts,
    },
  };
}

export default Home;
