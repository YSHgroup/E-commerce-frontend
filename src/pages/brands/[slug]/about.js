import { Fragment } from 'react';
import Head from 'next/head';

import { LayoutTwo } from '../../../components/Layout';
import { BrandSingleSlider } from '../../../components/HeroSlider';

import api from '../../../lib/api';
import { Container } from 'react-bootstrap';
import { HeaderOne } from '../../../components/Header';
import { prerender, isbot } from '../../../lib/prerendering';
import { metaTag, ogData, jsonldFullData } from '../../../lib/seo';

import bannedIPs from '../../../data/bannedIPs';

const Brand = ({ brand }) => {
  return (
    <Fragment>
      <Head>
        <title>{brand.name} | About | Brand | 3d Infinite</title>
        { metaTag('description', `More details about the ${brand.name} brand`) }
        { ogData({
          title: `${brand.name} | About | Brand | 3d Infinite`,
          description: `More details about the ${brand.name} brand`,
          brand: brand.name
        }) }
        { jsonldFullData({
          type: 'article',
          breadcrumbs: [{
              id: 'https://3dinfinite.com',
              name: 'Home',
            },{
              id: 'https://3dinfinite.com/brands',
              name: 'Brands',
            },{
              id: `https://3dinfinite.com/brands/${brand.slug}`,
              name: brand.name,
          },{
              id: `https://3dinfinite.com/brands/${brand.slug}/about`,
              name: 'About',
          }],
          ...brand,
          image: [brand.image_main],
          title: `${brand.name} | About | Brand | 3d Infinite`
        }) }
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
        <Container className='space-mb--50 space-mt--50 wide trix-brand-about'>
          <div
            dangerouslySetInnerHTML={{
              __html: brand.description
            }}></div>
        </Container>
      </LayoutTwo>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  if (bannedIPs.includes(context.req.connection.remoteAddress)
      || bannedIPs.includes(context.req.headers['x-forwarded-for'])) {
    context.res.writeHead(403).end();
  }
  let brand = {};
  await api().get('/sanctum/csrf-cookie');
  try {
    let brandRawData = await api().get('/api/v1/brands/' + context.query.slug);
    brand = brandRawData.data.data;
  } catch (e) {
    return context.res.writeHead(301, {Location: '/404'}).end();
  }

  if (isbot(context)) {
    return {
      props: { renderedHtml: await prerender(context) }
    };
  }

  prerender(context);  

  return {
    props: {
      brand
    }
  };
}

export default Brand;
