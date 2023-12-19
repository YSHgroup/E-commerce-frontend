import { useEffect, useState } from "react";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { LayoutOne } from "../../components/Layout";
import { getDiscountPrice } from "../../lib/product";
import {
  ImageGalleryBottomThumb,
  ProductDescription,
} from "../../components/ProductDetails";
import { addToCart } from "../../redux/actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../redux/actions/wishlistActions";
import {
  addToCompare,
  deleteFromCompare,
} from "../../redux/actions/compareActions";
import api from "../../lib/api";
import ProductBreadcrumb from "../../components/Breadcrumb/ProductBreadcrumb";
import { ProductSlider } from "../../components/Product";
import { useRouter } from "next/router";
import { prerender, isbot } from "../../lib/prerendering";
import { metaTag, ogData, jsonldFullData } from "../../lib/seo";

import bannedIPs from "../../data/bannedIPs";

const ProductBasic = ({
  cartItems,
  wishlistItems,
  compareItems,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare,
  product,
  user,
  misc,
}) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const { addToast } = useToasts();
  const { query } = useRouter();

  const fetchRelatedProducts = async () => {
    const {
      data: { data: relatedProductsData },
    } = await api().get(`/api/v1/products/${query.slug}/related-products`);

    setRelatedProducts(relatedProductsData);
  };

  const fetchSuggestedProducts = async () => {
    let url = `/api/v1/products/${query.slug}/suggested-products`;
    if (misc.currentRoom) {
      url = url + "?current-room=" + misc.currentRoom;
    }
    const {
      data: { data: suggestedProductsData },
    } = await api().get(url);

    setSuggestedProducts(suggestedProductsData);
  };

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    fetchRelatedProducts();
    fetchSuggestedProducts();
  }, [query]);

  const discountedPrice = getDiscountPrice(product.price, product.discount);

  const productPrice = product.price;

  const cartItem = cartItems.filter(
    (cartItem) => cartItem.id === product.id
  )[0];

  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.id === product.id
  )[0];

  const compareItem = compareItems.filter(
    (compareItem) => compareItem.id === product.id
  )[0];

  const fileFormats = product.fileFormats.map((item) => item.name).join(", ");

  let breadcrumbs = [
    {
      id: `${process.env.PUBLIC_BASE_URL}/products`,
      name: "Products",
    },
  ];
  if (product.brand) {
    breadcrumbs.push({
      id: `${process.env.PUBLIC_BASE_URL}/brands/${product.brand.slug}`,
      name: product.brand.name,
    });
  }
  breadcrumbs.push({
    id: `${process.env.PUBLIC_BASE_URL}/product/${product.slug}`,
    name: product.name,
  });

  const brandSuffix = product.brand ? ` by ${product.brand.name}` : "";
  const fullProductName = product.name + brandSuffix + " | 3d Infinite";
  const fullDescription = `Download perfect 3d model ${product.name}${brandSuffix} for your render: ${fileFormats}. Get more info here. ${product.fullDescription}`;
  return (
    <LayoutOne>
      {/* Page Title */}
      <Head>
        <title>{fullProductName}</title>
        {metaTag("description", fullDescription)}
        {metaTag(
          "keywords",
          "3dinfinite, Download, perfect 3d model, 3dinfinite"
        )}
        {ogData({
          title: fullProductName,
          description: fullDescription,
          type: "product.item",
          images: product.image,
          brand: product.brand ? product.brand.name : "",
          price: getDiscountPrice(product.price, product.discount),
          category: product.category.map((el) => el.name).join(", "),
        })}

        {jsonldFullData({
          type: "product",
          breadcrumbs,
          ...product,
        })}
      </Head>

      {/* product details */}
      <div className="product-details space-mt--80 space-mb--r100">
        <div className="breadcrumbs bg-color--beige space-mb--50">
          <Container>
            <Row>
              <Col lg={12}>
                <ProductBreadcrumb product={product} />
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row>
            <Col lg={6} className="space-mb-mobile-only--50">
              {/* image gallery bottom thumb */}
              <ImageGalleryBottomThumb
                product={product}
                wishlistItem={wishlistItem}
                addToast={addToast}
                addToWishlist={addToWishlist}
                deleteFromWishlist={deleteFromWishlist}
              />
            </Col>

            <Col lg={6}>
              {/* product description */}
              <ProductDescription
                product={product}
                productPrice={productPrice}
                discountedPrice={discountedPrice}
                cartItems={cartItems}
                cartItem={cartItem}
                wishlistItem={wishlistItem}
                compareItem={compareItem}
                addToast={addToast}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                deleteFromWishlist={deleteFromWishlist}
                addToCompare={addToCompare}
                deleteFromCompare={deleteFromCompare}
              />
            </Col>
          </Row>

          {relatedProducts.length > 0 && (
            <Row className="border-top--grey product-description-tab space-mt--r100 space-pt--r100">
              <Col>
                <ProductSlider
                  products={relatedProducts}
                  title="Related Products"
                />
              </Col>
            </Row>
          )}

          {suggestedProducts.length > 0 && (
            <Row className="border-top--grey product-description-tab space-mt--r100 space-pt--r100">
              <Col>
                <ProductSlider
                  products={suggestedProducts}
                  title="Products You May Like"
                />
              </Col>
            </Row>
          )}
        </Container>
      </div>
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
  await api().get("/sanctum/csrf-cookie");
  await api().post("/api/v1/log-ips", {
    ip: context.req?.connection.remoteAddress,
    forwarded_ip: context.req?.headers["x-forwarded-for"],
  });
  let product = {};
  try {
    let productRawData = await api().get(
      `/api/v1/products/${context.query.slug}`
    );
    product = productRawData.data.data;
  } catch (error) {
    context.res.writeHead(301, { Location: "/404" }).end();
  }

  if (isbot(context)) {
    return {
      props: { renderedHtml: await prerender(context) },
    };
  }

  prerender(context);

  return { props: { product } };
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
    user: state.userData,
    misc: state.miscData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize,
      platformId,
      renderId,
      platformRenderName
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize,
          platformId,
          renderId,
          platformRenderName
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
    deleteFromCompare: (item, addToast) => {
      dispatch(deleteFromCompare(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBasic);
