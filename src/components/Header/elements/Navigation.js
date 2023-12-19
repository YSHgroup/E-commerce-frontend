import Link from 'next/link';
import ProductsAutoComplete from '../../ProductsAutoComplete';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { useEffect, useState } from 'react';
import router from 'next/router';
import { connect } from 'react-redux';

const Navigation = ({ menu }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const [selectedMenu, setSelectedMenu] = useState('');

  const onSelectMentu = (item) => {
    if (item === selectedMenu) return;

    setSelectedMenu(item);
  };

  const hasParentTheClass = (element, classname) => {
    // if (classname === '') return false;
    if (typeof element.className === 'object') return false;
    if (
      element.className &&
      element.className.split(' ').indexOf(classname) >= 0
    )
      return true;

    return (
      element.parentNode &&
      hasParentTheClass(element.parentNode, classname)
    );
  };

  useEffect(() => {
    document.onclick = (evt) => {
      if (evt.target.className === 'menu-trigger') return;

      if (!hasParentTheClass(evt.target, selectedMenu)) {
        setSelectedMenu('');
      }
    };
  }, [selectedMenu]);

  return (
    <nav className='header-content__navigation space-pr--15 space-pl--15 d-none d-lg-block'>
      <ul className='d-flex'>
        <li className='position-relative'>
          <a
            className='menu-trigger'
            onClick={() => {
              onSelectMentu('models');
            }}>
            Products
          </a>
          <IoIosArrowDown />
          <ul
            className={`models sub-menu sub-menu--one-column ${selectedMenu === 'models' ? 'show' : 'hide'
              }`}>
            {menu.models &&
              menu.models.map((model, idx) => {
                return (
                  <li key={idx}>
                    <Link
                      href={`/products/${model.slug}`}
                      as={process.env.PUBLIC_URL + '/products/' + model.slug}
                    >
                      {model.name}
                    </Link>

                    {model.children.length > 0 && (
                      <>
                        <IoIosArrowForward />
                        <ul className='sub-menu--one-column sub-menu--one-column--child-menu'>
                          {model.children.map(
                            (sub, idx) => {
                              return (
                                <li key={idx}>
                                  <Link
                                    href={`/products/${sub.slug}`}
                                    as={process.env.PUBLIC_URL + '/products/' + sub.slug}
                                  >
                                    {sub.name}
                                  </Link>
                                  {sub.children.length > 0 && (
                                      <>
                                        <IoIosArrowForward />

                                        <ul className='sub-menu--one-column sub-menu--one-column--child-menu'>
                                          {sub.children.map(
                                            (subSub, idx) => (
                                              <li key={idx}>
                                                <Link
                                                  href={`/products/${subSub.slug}`}
                                                  as={process.env.PUBLIC_URL + '/products/' + subSub.slug}
                                                >
                                                  {subSub.name}
                                                </Link>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </>
                                    )}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </>
                    )}
                  </li>
                );
              })}
          </ul>
        </li>
        <li className='position-relative'>
          <a
            className='menu-trigger'
            onClick={() => {
              onSelectMentu('rooms');
            }}>
            Rooms
          </a>
          <IoIosArrowDown />
          <ul
            className={`rooms sub-menu sub-menu--one-column ${selectedMenu === 'rooms' ? 'show' : 'hide'
              }`}>
            {menu.rooms &&
              menu.rooms.map((model, idx) => {
                return (
                  <li key={idx}>
                    <Link
                      href={`/products/${model.slug}`}
                      as={process.env.PUBLIC_URL + '/products/' + model.slug}
                    >
                      {model.name}
                    </Link>

                    {model.children.length > 0 && (
                      <>
                        <IoIosArrowForward />

                        <ul className='sub-menu--one-column sub-menu--one-column--child-menu'>
                          {model.children.map(
                            (sub, idx) => {
                              return (
                                <li key={idx}>
                                  <Link
                                    href={`/products/${sub.slug}`}
                                    as={process.env.PUBLIC_URL + '/products/' + sub.slug}
                                  >
                                    {sub.name}
                                  </Link>

                                  {sub.children.length > 0 && (
                                      <>
                                        <IoIosArrowForward />

                                        <ul className='sub-menu--one-column sub-menu--one-column--child-menu'>
                                          {sub.children.map(
                                            (subSub, idx) => (
                                              <li key={idx}>
                                                <Link
                                                  href={`/products/${subSub.slug}`}
                                                  as={process.env.PUBLIC_URL + '/products/' + subSub.slug}
                                                >
                                                  {subSub.name}
                                                </Link>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </>
                                    )}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </>
                    )}
                  </li>
                );
              })}
          </ul>
        </li>

        <li>
          <Link
            href='/brands'
            as={process.env.PUBLIC_URL + '/brands'}
          >
            Brands
          </Link>
        </li>
        <li>
          <Link
            href='/inspiration'
            as={process.env.PUBLIC_URL + '/inspiration'}
          >
            Inspiration
          </Link>
        </li>
        <li>
          {/* search widget */}
          <div className='search-widget top'>
            <ProductsAutoComplete />
          </div>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    menu: state.menuData
  };
};

export default connect(mapStateToProps)(Navigation);
