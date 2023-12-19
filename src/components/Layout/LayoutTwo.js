import { Fragment } from 'react';
import { FooterFive } from '../Footer';
import Brand from '../Header/Brand';

const LayoutTwo = ({ children, footerBgClass, brand }) => {
    return (
        <Fragment>
            <Brand brand={brand} />
            {children}
            <FooterFive footerBgClass={footerBgClass} />
        </Fragment>
    );
};

export default LayoutTwo;
