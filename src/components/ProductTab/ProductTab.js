import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import { Container, Row } from 'react-bootstrap';
import { ProductGridWrapper } from '../ProductThumb';

const ProductTab = ({
  newProducts,
  featuredProducts,
  saleProducts,
  purchasedProductsIds
}) => {
  return (
    <div className='product-tab space-mb--r100'>
      <Container>
        <Tab.Container defaultActiveKey='popular'>
          <Nav
            variant='pills'
            className='product-tab__navigation text-center justify-content-center space-mb--r60'>
            <Nav.Item>
              <Nav.Link eventKey='new'>New</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='popular'>Featured</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='sale'>Sale</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey='new'>
              <Row className='space-mb--rm50'>
                <ProductGridWrapper
                  products={newProducts}
                  purchasedProductsIds={purchasedProductsIds}
                  bottomSpace='space-mb--r50'
                />
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey='popular'>
              <Row className='space-mb--rm50'>
                <ProductGridWrapper
                  products={featuredProducts}
                  purchasedProductsIds={purchasedProductsIds}
                  bottomSpace='space-mb--r50'
                />
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey='sale'>
              <Row className='space-mb--rm50'>
                <ProductGridWrapper
                  products={saleProducts}
                  purchasedProductsIds={purchasedProductsIds}
                  bottomSpace='space-mb--r50'
                />
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default ProductTab;
