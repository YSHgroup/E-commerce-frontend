import { useState, useEffect, Fragment } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';

import { LayoutOne } from '../../components/Layout';
import { BreadcrumbOne } from '../../components/Breadcrumb';

import api from '../../lib/api';

import AtoZSort from '../../components/Brand/AtoZSort';
import { CategorySlider } from '../../components/Category';
import Preloader from '../../components/Preloader';
import { isbot, prerender } from '../../lib/prerendering';
import { metaTag, ogData, jsonldFullData } from '../../lib/seo';

import bannedIPs from '../../data/bannedIPs';

const Brand = ({ brands, featuredBrands }) => {
    const [filteredBrands, setfilteredBrands] = useState([]);

    useEffect(() => {
        setfilteredBrands(brands);
    }, [brands]);

    let total = brands.length;
    let max = Math.ceil(total / 4);

    const handleClick = (alpha) => {
        if (alpha === 'All') {
            setfilteredBrands(brands);
        } else {
            setfilteredBrands(
                brands.filter((brand) => {
                    return brand.name[0] === alpha;
                })
            );
        }
    };

    const renderColumn = (filteredBrands, from, to) => {
        return (
            <Fragment>
                {filteredBrands.map((brand, index) => 
                    index >= from && index < to 
                    ?   <Row className="brand-item">
                            <Col>
                                <Link
                                    key={index}
                                    href={`/brands/[slug]`}
                                    as={
                                        process.env.PUBLIC_URL +
                                        '/brands/' +
                                        brand.slug
                                    }
                                    className='brand-link'>
                                    {brand.name}
                                </Link>
                            </Col>
                        </Row>
                    : ''
                )}
            </Fragment>
        );
    }

    return (
        <LayoutOne>
            {/* Page Title */}
            <Head>
                <title>Brands | 3d Infinite</title>
                { metaTag('description', 'The best brands, 3d models producers in 3D Infinite') }
                { ogData({
                    title: 'Brands | 3d Infinite',
                    description: 'The best brands, 3d models producers in 3D Infinite',
                    type: 'product.group',
                }) }
                { jsonldFullData({
                    type: 'brands',
                    brands,
                    breadcrumbs: [{
                            id: 'https://3dinfinite.com',
                            name: 'Home',
                        },{
                            id: 'https://3dinfinite.com/brands',
                            name: 'Brands',
                    }],
                    image: ['https://3dinfinite.com/assets/images/3d-infinite-logo.png'],
                    title: 'Brands',
                }) }
            </Head>

            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle='Brands'
                backgroundImage='/assets/images/backgrounds/breadcrumb-bg-shop.png'>
                <ul className='breadcrumb__list'>
                    <li>
                        <Link href='/' as={process.env.PUBLIC_URL + '/'}>
                            Home
                        </Link>
                    </li>

                    <li>Brands</li>
                </ul>
            </BreadcrumbOne>

            <div className='brand-page-content mt-90 mb-90 mt-md-80 mt-sm-70'>
                <Container>
                    <Row>
                        <Col lg={12} className='ml-auto mr-auto'>
                            <h1 className='title'>Our Brands</h1>
                        </Col>

                        <Col lg={12}>
                            <AtoZSort handleClick={handleClick}></AtoZSort>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6} sm={12} key="1">
                            <Row>
                                <Col lg={6} md={12} key="11">
                                    { renderColumn(filteredBrands, 0, max) }
                                </Col>
                                <Col lg={6} md={12} key="12">
                                    { renderColumn(filteredBrands, max, max * 2) }
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} sm={12} key="2">
                            <Row>
                                <Col lg={6} md={12} key="21">
                                    { renderColumn(filteredBrands, max * 2, max * 3) }
                                </Col>
                                <Col lg={6} md={12} key="22">
                                    { renderColumn(filteredBrands, max * 3, max * 4) }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} className='ml-auto mr-auto mt-90'>
                            <h1 className='title'>Featured Brands</h1>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='featured-brands'>
                <CategorySlider
                    categoryData={featuredBrands}
                    showCount={false}
                    className=''
                    spaceBottomClass='space-mb--r100'
                />
            </div>
        </LayoutOne>
    );
};

export async function getServerSideProps(context) {
    if (bannedIPs.includes(context.req.connection.remoteAddress)
           || bannedIPs.includes(context.req.headers['x-forwarded-for'])) {
        context.res.writeHead(403).end();
    }

    const duration = 1000 * 60 * 60 * 24 * 3; // three days
    if (isbot(context)) {
        return {
            props: { renderedHtml: await prerender(context, duration) }
        };
    }
    
    await api().get('/sanctum/csrf-cookie');

    const { data: brands } = await api().get('/api/v1/brands');
    const { data: featuredBrands } = await api().get(`/api/v1/brands/featured`);

    prerender(context, duration);

    return {
        props: {
            brands,
            featuredBrands
        }
    };
}

export default Brand;
