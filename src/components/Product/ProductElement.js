import { downloadFile } from '../../lib/common';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const ProductElement = ({ element, index }) => {
  const [progressBar, setProgressBar] = useState(false);
  const [dropdownShow, setDropdownShow] = useState(false);
  
  const renderDownloadButton = () => {
    return (
      <Dropdown
        show={ dropdownShow && progressBar === false}
        onMouseLeave={ () => setDropdownShow(false) }
      >
        <Dropdown.Toggle
          variant='secondary'
          className='btn btn-white btn-download'
          onClick={ () => setDropdownShow(!dropdownShow) }
        >
          { progressBar === false 
            ? 'Download'
            : typeof progressBar === 'object'
              ? <span style={{color: "red"}}>Error: { progressBar.statusText }</span>
              : `Loading... ${ progressBar }%` }
        </Dropdown.Toggle>

        <Dropdown.Menu>
          { element.fileFormats.map((file, index) => (
            <Dropdown.Item
              key={ index }
              onClick={ (e) => {
                e.preventDefault();
                if (progressBar === false) {
                  setProgressBar(0);
                  downloadFile(file, setProgressBar);
                }
              }}
              href='#'
            >
              { file.name }
            </Dropdown.Item>
          )) }
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  return (
    <div 
      className="space-mb--r50 col-xxl-2 col-xl-3 col-lg-2 col-md-3 col-sm-4"
      key={ index }
    >
      <div className="product-grid">
        <div className="product-grid__image">
          <a
            className="image-wrap"
            href="#"
          >
            <img
              src={ element.image_main }
              className="img-fluid"
              alt={ element.name }
            />
          </a>
        </div>
        <div className="product-grid__content">
          <div className="title">
            <h3>
              <a href="#">
                <p>
                  { element.brand_name 
                    ? <b>{ element.brand_name }</b>
                    : <span>&nbsp;</span> }
                </p>
                { element.name }
              </a>
            </h3>
          </div>
          <div className="price">
            <span className="main-price">$ { element.regular_price }</span>
          </div>
        </div>
        <div className="product-shadow">
          { renderDownloadButton() }
        </div>
      </div>
    </div>
  );
};

export default ProductElement;
