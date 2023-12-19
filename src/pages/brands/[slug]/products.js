import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import Paginator from 'react-hooks-paginator';
import { Fragment } from 'react';
import { LayoutTwo } from '../../../components/Layout';
import { BrandSingleSlider } from '../../../components/HeroSlider';
import { ShopSidebar, ShopProducts } from '../../../components/Shop';
import { useRouter } from 'next/router';
import api from '../../../lib/api';
import Preloader from '../../../components/Preloader';
import { HeaderOne } from '../../../components/Header';
import { prerender } from '../../../lib/prerendering';

import bannedIPs from '../../../data/bannedIPs';

const useDebounce = (value, timeout) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setState(value), timeout);

    return () => clearTimeout(handler);
  }, [value, timeout]);

  return state;
};

const BrandProducts = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [brand, setBrand] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0
  });
  const [isBusy, setIsBusy] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [layout, setLayout] = useState('grid four-column');
  const [dimension, setDimension] = useState({});
  const [materials, setMaterials] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [filteredBrand, setFilteredBrand] = useState([]);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedDimension = useDebounce(dimension, 500);

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    if (sortType === 'dimension') {
      setDimension(sortValue);
    }

    if (sortType === 'materials') {
      setFilteredMaterials(sortValue);
    }

    if (sortType === 'categories') {
      setFilteredCategory(sortValue);
    }
  };

  const fetchProducts = async (page, options) => {
    options = {
      ...options,
      filteredCategory,
      filteredBrand,
      filteredMaterials
    };
    await api().get('/sanctum/csrf-cookie');
    const response = await api().get(`/api/v1/products?page=${page}`, {
      params: options
    });

    setProducts(response.data.data);
    setPagination(response.data.meta.pagination);
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    await api().get('/sanctum/csrf-cookie');
    const response = await api().get(`/api/v1/categories`);
    setCategories(response.data);
  };

  const fetchBrands = async () => {
    await api().get('/sanctum/csrf-cookie');
    const response = await api().get(`/api/v1/brands/featured?filter=true`);
    setBrands(response.data);
  };

  const fetchAllBrands = async () => {
    await api().get('/sanctum/csrf-cookie');
    const response = await api().get(`/api/v1/brands?filter=ture`);
    setAllBrands(response.data);
  };

  const fetchBrand = async (slug) => {
    await api().get('/sanctum/csrf-cookie');
    const response = await api().get(`/api/v1/brands/${slug}`);
    setBrand(response.data.data);
    setFilteredBrand([response.data.data.id]);
    setIsBusy(false);
  };

  const fetchMaterials = async () => {
    await api().get('/sanctum/csrf-cookie');
    const response = await api().get(`/api/v1/materials`);
    setMaterials(response.data);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchProducts(currentPage, dimension);
  }, [
    debouncedDimension,
    filteredCategory,
    filteredBrand,
    filteredMaterials
  ]);

  useEffect(() => {
    fetchProducts(currentPage, dimension);
  }, [currentPage]);

  useEffect(() => {
    setIsBusy(true);
    fetchBrands();

    fetchMaterials();
    fetchCategories();
    fetchBrand(slug);
    fetchAllBrands();
  }, []);

  if (!brand) {
    return <Preloader></Preloader>;
  }

  return (
    <Fragment>
      <Head>
        <title>{brand.name} | Brand | 3d Infinite</title>
      </Head>

      <HeaderOne aboutOverlay={false} />

      {/* hero slider */}
      <BrandSingleSlider
        sliderData={[
          {
            id: brand.id,
            image: brand.image_main,
            title: brand.name,
            excerpt: brand.excerpt,
            url: brand.url
          }
        ]}
        spaceBottomClass='space-mb--50'
      />

      <LayoutTwo brand={brand}>
        <div className='shop-page-content'>
          {/* shop page body */}
          <div className='shop-page-content__body space-mt--r130 space-mb--r130'>
            <Container className='wide'>
              <Row>
                <Col
                  lg={3}
                  className='order-2 order-lg-1 space-mt-mobile-only--50'>
                  {/* shop sidebar */}
                  <ShopSidebar
                    brands={brands}
                    allBrands={allBrands}
                    showBrands={false}
                    materials={materials}
                    categories={categories}
                    getSortParams={getSortParams}
                  />
                </Col>

                {isLoading ? (
                  <Col lg={9} className='order-1 order-lg-2'>
                    <div className='align-content-center d-flex justify-content-center'>
                      <img src='/assets/images/loader.gif' />
                    </div>
                  </Col>
                ) : products.length > 0 ? (
                  <Col lg={9} className='order-1 order-lg-2'>
                    {/* shop products */}
                    <ShopProducts
                      layout={layout}
                      products={products}
                    />

                    {/* shop product pagination */}
                    <div className='pro-pagination-style'>
                      <Paginator
                        totalRecords={pagination.total}
                        pageLimit={pagination.per_page}
                        pageNeighbours={2}
                        setOffset={setOffset}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageContainerClass='mb-0 mt-0'
                        pagePrevText='«'
                        pageNextText='»'
                      />
                    </div>
                  </Col>
                ) : (
                  <Col lg={9} className='order-1 order-lg-2'>
                    <div className='align-content-center d-flex justify-content-center'>
                      No Products Found.
                    </div>
                  </Col>
                )}
              </Row>
            </Container>
          </div>
        </div>
      </LayoutTwo>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  if (bannedIPs.includes(context.req.connection.remoteAddress)
      || bannedIPs.includes(context.req.headers['x-forwarded-for'])) {
    context.res.writeHead(403).end();
  }

  const duration = 1000 * 60 * 60 * 24 * 3; // 3 days
  return {
    props: {
      renderedHtml: await prerender(context, duration)
    }
  };
}

export default BrandProducts;
