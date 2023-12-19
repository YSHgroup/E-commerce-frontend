import { Link } from 'react-scroll';

const BreadcrumbTwo = ({ breadCrumbs, className }) => {
    return (
        <div
            className={`breadcrumb-area space-pt--10 space-pb--10 space-mb--30 ${
                className ? className : ''
            }`}>
            <ul className='breadcrumb__list'>
                <li>
                    <Link
                        href='/products'
                        as={process.env.PUBLIC_URL + '/products'}>
                        <a>Products</a>
                    </Link>
                </li>
                {breadCrumbs.map((item) => {
                    return (
                        <li key={item.slug}>
                            <Link
                                href={`/products/${item.slug}`}
                                as={
                                    process.env.PUBLIC_URL +
                                    '/products/' +
                                    item.slug
                                }>
                                <a>{item.title}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default BreadcrumbTwo;
