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
import ImageLists from '../../../components/Inspiration/ImageList';
import { prerender } from '../../../lib/prerendering';
import { metaTag, ogData } from '../../../lib/seo';

import bannedIPs from '../../../data/bannedIPs';

const Inspiration = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [brand, setBrand] = useState(false);
  const [inspirationData, setInspirationData] = useState([])
  const fetchMaterials = async () => {
    await api().get('/sanctum/csrf-cookie');
    const response = await api().get(`/api/v1/inspiration/brands?brand_slug=${slug}`);
    setInspirationData(response.data.inspirationData);
  };
  const fetchBrand = async (slug) => {
    await api().get('/sanctum/csrf-cookie');
    try {
      const response = await api().get(`/api/v1/brands/${slug}`);
      setBrand(response.data.data);
    } catch (e) {
      return router.push('/404');
    }
  };

  useEffect(() => {
    fetchMaterials();
    fetchBrand(slug);
  }, []);

  if (!brand) {
    return <Preloader></Preloader>;
  }
  return (
    <Fragment>
      <Head>
        <title>{brand.name} | Inspiration | Brand | 3d Infinite</title>
        { metaTag('description', `See inspiration based on 3d models from the ${brand.name} brand`) }
        { ogData({
          title: `${brand.name} | Inspiration | Brand | 3d Infinite`,
          description: `See inspiration based on 3d models from the ${brand.name} brand`,
          type: "product.group",
          brand: brand.name
        }) }
      </Head>

      <HeaderOne aboutOverlay={false} />

      {/* hero slider */}
      {brand&&(
        <BrandSingleSlider
          sliderData={[
            {
              id: brand.id,
              image: `${brand.image_main}`,
              title: brand.name,
              excerpt: brand.excerpt,
              url: brand.url
            }
          ]}
          spaceBottomClass='space-mb--50'
        />
      )}

      <LayoutTwo brand={brand}>
        <div className='shop-page-content'>
          {/* shop page body */}
          <div className='shop-page-content__body space-mt--r130 space-mb--r130'>
            <Container className='wide'>
              <Row>
                {inspirationData.length > 0 ? (
                  <div className="py-4">
                    <ImageLists data={inspirationData} />
                  </div>
                ):(
                  <p className="empty-list">There is no list</p>
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
  await api().get('/sanctum/csrf-cookie');
  try {
    await api().get(`/api/v1/brands/${context.query.slug}`);
  } catch (e) {
    return context.res.writeHead(301, {Location: '/404'}).end();
  }
  
  return {
    props: {
      renderedHtml: await prerender(context)
    }
  };
}


export default Inspiration;
