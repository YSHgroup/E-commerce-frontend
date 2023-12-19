import Link from 'next/link';

const ProductBreadcrumb = ({ product, className }) => {
    return (
        <div
            className={`breadcrumbs space-pt--70 space-pb--70 ${
                className ? className : ''
            }`}>
            <ul className='breadcrumb__list'>
                <li>
                    <Link
                        href='/products'
                        as={process.env.PUBLIC_URL + '/products'}
                    >
                        Products
                    </Link>
                </li>
                { product.brand
                    ? <li>
                        <Link
                            href={`/brands/${product.brand.slug}`}
                            as={process.env.PUBLIC_URL + '/brands/' + product.brand.slug}
                        >
                            { product.brand.name }
                        </Link>
                    </li> : ''
                }
                <li>
                    <Link
                        href={`/product/${product.slug}`}
                        as={process.env.PUBLIC_URL + '/product/' + product.slug}
                    >
                        { product.name }
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default ProductBreadcrumb;
