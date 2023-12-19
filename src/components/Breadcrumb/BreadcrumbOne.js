import { Container, Row, Col } from 'react-bootstrap';
const BreadcrumbOne = ({
    children,
    backgroundImage,
    pageTitle,
    className,
    layoutClass
}) => {
    return (
        <div
            className={`breadcrumb-area space-pt--70 space-pb--70 ${
                className ? className : ''
            }`}
            style={{ backgroundColor: `#f6f2ef` }}>
            <Container className={layoutClass ? layoutClass : ''}>
                <Row>
                    <Col>{children}</Col>
                </Row>
            </Container>
        </div>
    );
};

export default BreadcrumbOne;
