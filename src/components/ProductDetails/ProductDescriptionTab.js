import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

const ProductDescriptionTab = ({ product }) => {
    function createMarkup(content) {
        return { __html: content };
    }

    return (
        <div
            className={`product-description-tab space-pt--r100 space-mt--r100 ${
                product.fullDescription || product.additionalInformation
                    ? 'border-top--grey'
                    : ''
            }`}>
            <Tab.Container defaultActiveKey='description'>
                <Nav
                    variant='pills'
                    className='product-description-tab__navigation text-center justify-content-center space-mb--50'>
                    {product.fullDescription && (
                        <Nav.Item>
                            <Nav.Link eventKey='description'>
                                Description
                            </Nav.Link>
                        </Nav.Item>
                    )}

                    {product.additionalInformation && (
                        <Nav.Item>
                            <Nav.Link eventKey='additionalInfo'>
                                Additional Information
                            </Nav.Link>
                        </Nav.Item>
                    )}
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey='description'>
                        <div
                            className='product-description-tab__details'
                            dangerouslySetInnerHTML={createMarkup(
                                product.fullDescription
                            )}></div>
                    </Tab.Pane>
                    <Tab.Pane eventKey='additionalInfo'>
                        <div
                            className='product-description-tab__details'
                            dangerouslySetInnerHTML={createMarkup(
                                product.additionalInformation
                            )}></div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default ProductDescriptionTab;
