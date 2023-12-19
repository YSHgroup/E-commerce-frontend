import * as React from 'react';
import { connect } from "react-redux";
import Link from 'next/link';
import ImageListItem from '@material-ui/core/ImageListItem';
import { IoIosHeartEmpty, IoMdExpand } from 'react-icons/io';
import { LightgalleryProvider, LightgalleryItem, withLightgallery } from 'react-lightgallery';
import { Tooltip } from 'react-tippy';
import Masonry from "react-responsive-masonry"
import { useRouter } from 'next/router';
import {
  addToWishlist,
  deleteFromWishlist
} from '../../redux/actions/wishlistActions';
const mapStateToProps = (state) => {
  return {
    wishlistItems: state.wishlistData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    },
  };
};

const OpenButtonWithHoc = withLightgallery(
  ({ openGallery, className, ...rest }) => {
      return (
        <button className='enlarge-icon' onClick={e => {
          e.stopPropagation();
          openGallery('any')
        }} >
          <IoMdExpand />
        </button>
      );
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(
  function ImageLists({ data, addToWishlist, deleteFromWishlist, wishlistItems }) {
    const [filteredData, setFilteredData] = React.useState([...data]);
    const router = useRouter();
    React.useEffect(() => {
      if (router.query && router.query.c) {
        setFilteredData(data.filter((d) => d.category_id === Number(router.query.c)));
      } else {
        setFilteredData([...data]);
      }
    }, [data, router.query]);
    return (
      <div className="wide container">
        <Masonry columnsCount={4} gutter="2px">
          {filteredData && filteredData.map((item, index) => {
            return (
              <Link
                href={`/inspiration/[slug]?slug=${item.id}`}
                as={
                  process.env.PUBLIC_URL +
                  '/inspiration/' +
                  item.id
                }
                key={index}
                legacyBehavior>
                <ImageListItem className="inspiration-list">
                  <img
                    src={`${item.img_name}?w=auto&fit=crop&auto=format`}
                    srcSet={`${item.img_name}?w=auto&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                    className="cursor product-grid"
                    style={{ borderWidth: 1, borderColor: 'black' }}
                  />
                  <div className='product-grid__floating-icons'>
                    {/* add to wishlist */}
                    <Tooltip
                      title={"Add to favourites"}
                      position='left'
                      trigger='mouseenter'
                      animation='shift'
                      arrow={true}
                      duration={200}>
                      <button
                        className="button-icon"
                      // onClick={
                      //   wishlistItem !== undefined
                      //     ? (e) =>{
                      //       console.log(e);
                      //       deleteFromWishlist(
                      //         product,
                      //         addToast
                      //       )
                      //     }
                      //     : () =>
                      //       addToWishlist(
                      //         product,
                      //         addToast
                      //       )
                      // }
                      >
                        <IoIosHeartEmpty />
                      </button>
                    </Tooltip>
                    <LightgalleryProvider>
                      <LightgalleryItem
                        group='any'
                        src={process.env.PUBLIC_URL + item.img_name}
                      >
                        <Tooltip
                          title='Click to enlarge'
                          position='left'
                          trigger='mouseenter'
                          animation='shift'
                          arrow={true}
                          duration={200}
                        >
                          <OpenButtonWithHoc />
                        </Tooltip>
                      </LightgalleryItem>
                    </LightgalleryProvider>
                  </div>
                </ImageListItem>
              </Link>
            );
          }
          )}
        </Masonry>
      </div>
    );
  }
);

