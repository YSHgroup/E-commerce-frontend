import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tippy';
import { IoIosHeartEmpty, IoIosSearch } from 'react-icons/io';
import Paginator from 'react-hooks-paginator';

import { LayoutOne } from '../../components/Layout';
import { InspirationSlider } from '../../components/HeroSlider';
import { InspirationCategorySlide } from '../../components/Category';
import ImageLists from '../../components/Inspiration/ImageList';

import Head from 'next/head';

import api from '../../lib/api';
import { prerender } from '../../lib/prerendering';
import { metaTag, ogData, jsonldFullData } from '../../lib/seo';

import bannedIPs from '../../data/bannedIPs';

const reactImageSize = (url, rejectTimeout) => new Promise((resolve, reject) => {
  let timer = null;

  const img = new Image();

  img.addEventListener('load', () => {
    if (timer) { clearTimeout(timer); }

    resolve(img);
  });

  img.addEventListener('error', (event) => {
    if (timer) { clearTimeout(timer); }

    reject(`${event.type}: ${event.message}`);
  });

  img.src = url;

  if (rejectTimeout) {
    timer = setTimeout(() => reject('Timeout exception'), rejectTimeout);
  }
});

const Inspiration = () => {
  const [imgs, setImgs] = useState([]);
  const [inspirationData, setInspirationData] = useState([]);
  const [categorySlideData, setCategorySlideData] = useState([]);
  const [slideData, setSlideData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [pageLimit, setPageLimit] = useState(100);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    fetchInspirationProducts(currentPage);
  }, [currentPage])
  const fetchInspirationProducts = (page) => {
    api()
      .get(`/api/v1/inspiration/getItem?page=${page}`)
      .then(async (response) => {
        setInspirationData(response.data.inspirationData.data);
        setTotalRecord(response.data.inspirationData.total)
        if (response) {
          const img = [];
          for (let j = 0; j < response.data.inspirationData.data.length; j++) {
            const i = response.data.inspirationData.data[j]
            const { width, height } = await reactImageSize(i.img_name);
            img.push({
              src: i.img_name,
              thumbnail: i.img_name,
              thumbnailWidth: width,
              thumbnailHeight: height,
              customOverlay: <div className='grid-gallery-custom-overflow'>
                <Tooltip
                  title={"Add to favourites"}
                  position='left'
                >
                  <button
                    className="button-icon"
                    onClick={
                      (e) => {
                        console.log(e);
                        e.stopPropagation()
                      }
                    }
                  >
                    <IoIosHeartEmpty />
                  </button>
                </Tooltip>
                <Tooltip
                  title='Quick view'
                  position='left'
                  trigger='mouseenter'
                  animation='shift'
                  arrow={true}
                  duration={200}>
                  <button
                    onClick={
                      (e) => e.stopPropagation()
                    }
                    className='d-lg-block button-icon'>
                    <IoIosSearch />
                  </button>
                </Tooltip>
              </div>
            });
          }
          setImgs(img);
        }
      })
      .catch(error => {
        console.log('Error on fetching of the product list:', error);
      });
  }
  const fetchSlideData = () => {
    api()
      .get('/api/v1/inspiration/getSlides')
      .then(async (response) => {
        if (response) {
          setSlideData(response.data.slide_list);
        }
      }).catch(error => {
        console.log('Error on fetching of the product list:', error);
      });
  }
  const categorySlide = () => {
    api()
      .get('/api/v1/inspiration/categorySlide')
      .then(async (response) => {
        if (response) {
          console.log(response.data.categories)
          setCategorySlideData(response.data?.categories)
        }
      }).catch(error => {
        console.log('Error on fetching of the product list:', error);
      });
  }

  useEffect(() => {
    fetchSlideData();
    categorySlide();
  }, [])
  return (
    <LayoutOne aboutOverlay={false}>
      <Head>
        <title>Inspiration | 3d Infinite</title>
        { metaTag('description', 'See the best inspirations composed with 3d models') }
        { ogData({
          title: 'Inspiration | 3d Infinite',
          description: 'See the best inspirations composed with 3d models',
          type: "product.group",
          category: 'All categories',
        })}
        { jsonldFullData({
          type: 'article',
          breadcrumbs: [{
              id: 'https://3dinfinite.com',
              name: 'Home',
            },{
              id: 'https://3dinfinite.com/inspiration',
              name: 'Inspiration',
          }],
          title: 'Inspiration | 3d Infinite',
          description: 'See the best inspirations composed with 3d models',
          image: ['https://3dinfinite.com/assets/images/3d-infinite-logo.png'],
        }) }
        <link rel="canonical" href="https://3dinfinite.com/inspiration" />
      </Head>
      <InspirationSlider
        sliderData={slideData}
        spaceBottomClass='space-mb--150'
      />
      {categorySlideData.length > 0 && (
        <div className="mt-5 py-4">
          <InspirationCategorySlide
            categoryData={categorySlideData}
            spaceBottomClass='mb-5'
          />
          {/* <ImageSlider data={featuredCategoriesBottom} /> */}
        </div>
      )}
      <ImageLists data={inspirationData} />
      <div className='pro-pagination-style py-5'>
        <Paginator
          totalRecords={totalRecord}
          pageLimit={pageLimit}
          pageNeighbours={2}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageContainerClass='mb-0 mt-0'
          pagePrevText='«'
          pageNextText='»'
        />
      </div>
    </LayoutOne>
  )
}

export async function getServerSideProps(context) {
  if (bannedIPs.includes(context.req.connection.remoteAddress)
      || bannedIPs.includes(context.req.headers['x-forwarded-for'])) {
    context.res.writeHead(403).end();
  }
  return {
    props: { renderedHtml: await prerender(context) }
  };
}

export default Inspiration;