import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { LayoutOne } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { ShopHeader, ShopSidebar, ShopProducts } from "../../components/Shop";
import api from "../../lib/api";
import { getProductsMajorColors } from "../../lib/product";
import { setCurrentRoom } from "../../redux/actions/miscActions";
import { prerender, isbot } from "../../lib/prerendering";
import { metaTag, ogData, jsonldFullData } from "../../lib/seo";
import axios from "axios";

import bannedIPs from "../../data/bannedIPs";

const useDebounce = (value, timeout) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setState(value), timeout);

    return () => clearTimeout(handler);
  }, [value, timeout]);

  return state;
};

let processedProductsRequest = true;
let productsFetchingCancelToken = false;

const CatalogSingle = ({ category, pageNumber }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const [layout, setLayout] = useState("grid four-column");
  const [dimension, setDimension] = useState({});
  const [materials, setMaterials] = useState([]);
  const [colors, setColors] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [filteredColors, setFilteredColors] = useState([]);
  const [filteredBrand, setFilteredBrand] = useState(null);
  const [filteredWishlist, setFilteredWishlist] = useState(false);
  const [filteredPurchased, setFilteredPurchased] = useState(false);
  const [productsSortOrder, setProductsSortOrder] = useState(false);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedDimension = useDebounce(dimension, 500);

  const dispatch = useDispatch();

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    if (sortType === "dimension") {
      setDimension(sortValue);
    }

    if (sortType === "materials") {
      setFilteredMaterials(sortValue);
    }

    if (sortType === "categories") {
      setFilteredCategory(sortValue);
    }

    if (sortType === "brands") {
      setFilteredBrand(sortValue);
    }

    if (sortType === "colors") {
      setFilteredColors(sortValue);
    }
  };

  const fetchProducts = async (page, options) => {
    setIsLoading(true);
    options = {
      ...options,
      filteredCategory,
      filteredBrand,
      filteredMaterials,
      filteredColors,
      filteredWishlist,
      filteredPurchased,
      productsSortOrder,
    };

    const cancelToken = axios.CancelToken;
    if (!productsFetchingCancelToken) {
      productsFetchingCancelToken = cancelToken.source();
    } else {
      productsFetchingCancelToken.cancel();
    }
    try {
      const response = await api().get(`/api/v1/products?page=${page}`, {
        params: options,
        cancelToken: productsFetchingCancelToken.token,
      });
      productsFetchingCancelToken = false;

      setProducts(response.data.data);
      setPagination(response.data.meta.pagination);
      setIsLoading(false);
      setTimeout(() => {
        processedProductsRequest = true;
      }, 500);
    } catch (e) {
      productsFetchingCancelToken = cancelToken.source();
    }
  };

  const fetchCategories = async () => {
    const response = await api().get(`/api/v1/categories`);
    setCategories(response.data);
  };

  const fetchBrands = async () => {
    const response = await api().get(`/api/v1/brands/featured?filter=true`);
    setBrands(response.data);
  };

  const fetchAllBrands = async () => {
    const response = await api().get(`/api/v1/brands?filter=true`);
    setAllBrands(response.data);
  };

  const fetchMaterials = async () => {
    const response = await api().get(`/api/v1/materials`);
    setMaterials(response.data);
  };

  const setCurrentPageWithDelay = (page) => {
    if (!processedProductsRequest) {
      return false;
    }
    processedProductsRequest = false;
    setCurrentPage(page);
  };

  useEffect(() => {
    setTimeout(() => {
      const items = document.querySelectorAll(".pro-pagination-style li");
      [...items].map((el) => {
        const pageNumber = el.innerText;
        if (parseInt(pageNumber) > 0) {
          const anchor = document.createElement("a");
          anchor.setAttribute(
            "href",
            `${process.env.PUBLIC_BASE_URL}/products/${category.value}?page=${pageNumber}`
          );
          anchor.innerText = pageNumber;
          anchor.classList.add("follow");
          el.prepend(anchor);
        }
      });
    }, 100);
  }, [products]);

  useEffect(() => {
    if (Object.keys(debouncedDimension).length) {
      setIsLoading(true);
      fetchProducts(currentPage, debouncedDimension);
    }
  }, [
    debouncedDimension,
    filteredCategory,
    filteredBrand,
    filteredMaterials,
    filteredColors,
    filteredWishlist,
    filteredPurchased,
    productsSortOrder,
    currentPage,
  ]);

  useEffect(() => {
    setFilteredCategory(category.selected);
    storeRoomCategory();
  }, [category]);

  useEffect(() => {
    fetchBrands();
    fetchAllBrands();
    fetchMaterials();
    fetchCategories();
    setColors(getProductsMajorColors());

    pageNumber && setCurrentPageWithDelay(pageNumber * 1);
  }, []);

  const storeRoomCategory = () => {
    if (
      category.breadCrumbs &&
      category.breadCrumbs.length &&
      category.breadCrumbs[0]?.slug == "rooms" &&
      category.breadCrumbs[1]
    ) {
      dispatch(setCurrentRoom(category.breadCrumbs[1].id));
    }
  };

  const categoriesNames = category.breadCrumbs
    .map((item) => item.title)
    .join(", ");
  const fullTitle = `${category.label} | Products | 3d Infinite`;
  const fullDescription = `See the best 3d models in ${categoriesNames} for your needs. Learn more here.`;

  return (
    <LayoutOne>
      {/* Page Title */}
      <Head>
        <title>{fullTitle}</title>
        {metaTag("description", fullDescription)}
        {metaTag("keywords", "3dinfinite, need, general, best 3d models")}
        {ogData({
          title: fullTitle,
          description: fullDescription,
          type: "product.group",
          images: products.length ? products[0].image : false,
          category: category.breadCrumbs.map((el) => el.title).join(", "),
        })}
        {jsonldFullData({
          type: "productgroup",
          group: {
            prefix: "products",
            title: category.label,
            slug: category.value,
          },
          products,
          breadcrumbs: [
            {
              id: `${process.env.PUBLIC_BASE_URL}/products`,
              name: "Products",
            },
            ...category.breadCrumbs.map((el) => ({
              id: `${process.env.PUBLIC_BASE_URL}/products/${el.slug}`,
              name: el.title,
            })),
          ],
        })}
        <link
          rel="canonical"
          href={`${process.env.PUBLIC_BASE_URL}/products/${category.value}`}
        />
      </Head>

      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Products"
        layoutClass="wide"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-shop.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/products" as={process.env.PUBLIC_URL + "/products"}>
              Products
            </Link>
          </li>

          {category.breadCrumbs.map((item, key) => {
            return (
              <li key={key}>
                <Link
                  href={`/products/${item.slug}`}
                  as={process.env.PUBLIC_URL + "/products/" + item.slug}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </BreadcrumbOne>
      <div className="shop-page-content">
        {/* shop page header */}
        <ShopHeader
          getLayout={getLayout}
          layoutClass="wide"
          productCount={pagination.total}
          sortedProductCount={products.length}
          filteredWishlist={filteredWishlist}
          filteredPurchased={filteredPurchased}
          productsSortOrder={productsSortOrder}
          setFilteredWishlist={setFilteredWishlist}
          setFilteredPurchased={setFilteredPurchased}
          setProductsSortOrder={setProductsSortOrder}
        />

        {/* shop page body */}
        <div className="shop-page-content__body space-mt--r130 space-mb--r130">
          <Container className="wide">
            <Row>
              <Col
                lg={3}
                className="order-2 order-lg-1 space-mt-mobile-only--50"
              >
                {/* shop sidebar */}
                <ShopSidebar
                  brands={brands}
                  allBrands={allBrands}
                  showBrands={true}
                  materials={materials}
                  categories={categories}
                  colors={colors}
                  slectedCategory={category.selected}
                  getSortParams={getSortParams}
                />
              </Col>

              {isLoading ? (
                <Col lg={9} className="order-1 order-lg-2">
                  <div className="align-content-center d-flex justify-content-center">
                    <img src="/assets/images/loader.gif" />
                  </div>
                </Col>
              ) : products.length > 0 ? (
                <Col lg={9} className="order-1 order-lg-2">
                  {/* shop products */}
                  <ShopProducts layout={layout} products={products} />

                  {/* shop product pagination */}
                  <div className="pro-pagination-style">
                    <Paginator
                      totalRecords={pagination.total}
                      pageLimit={pagination.per_page}
                      pageNeighbours={2}
                      setOffset={setOffset}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPageWithDelay}
                      pageContainerClass="mb-0 mt-0"
                      pagePrevText="«"
                      pageNextText="»"
                    />
                  </div>
                </Col>
              ) : (
                <Col lg={9} className="order-1 order-lg-2">
                  <div className="align-content-center d-flex justify-content-center">
                    No Products Found.
                  </div>
                </Col>
              )}
            </Row>
          </Container>
        </div>
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
  let category = {};
  try {
    let categoryRawData = await api().get(
      `/api/v1/categories/${context.query.slug}`
    );
    category = categoryRawData.data;
  } catch (e) {
    return context.res.writeHead(301, { Location: "/404" }).end();
  }

  const duration = 1000 * 60 * 60 * 24; // one day
  if (isbot(context)) {
    return {
      props: { renderedHtml: await prerender(context, duration) },
    };
  }

  prerender(context, duration);

  return {
    props: {
      category,
      pageNumber: context.query?.page || false,
    },
  };
}

export default CatalogSingle;
