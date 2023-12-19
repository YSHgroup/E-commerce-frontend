import Head from 'next/head';

import { LayoutDashlite } from '../../../components/Layout';
import WithAuth from '../../../components/WithAuth';

import api from '../../../lib/api';
import { fetchUser } from '../../../redux/actions/userActions';

import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Paginator from 'react-hooks-paginator';
import { useDispatch, connect } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Orders = ({ user }) => {
    const router = useRouter();
    const { slug } = router.query;
    const [busy, setBusy] = useState(false);
    const [isSidebarShown, setIsSidebarShown] = useState(false);
    const dispatch = useDispatch();
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    useEffect(() => {
        getFavoritesGroupes();
    }, []);

    const getFavoritesGroupes = () => {
        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .get('/api/v1/favourites/groups/' + slug)
                    .then((response) => {
                        setFavourites(response.data.data);
                    })
                    .catch((error) => {
                        console.log(
                            'Error on fetching favourites details',
                            error
                        );
                    });
            });
    };

    useEffect(() => {
        if (isSidebarShown) {
            document.body.classList.add('nav-shown');
        } else {
            document.body.classList.remove('nav-shown');
        }
    }, [isSidebarShown]);

    function createGroup(product, index) {
        return (
            <div className='col-md-4 mb-4' key={ index }>
                <div className='favourite-collection card'>
                    <div className='add-to-collection'>
                        <Link
                            href={`/product/${product.slug}`}
                            as={process.env.PUBLIC_URL + '/product/' + product.slug}
                            className='btn btn-primary'>
                            Show Product
                        </Link>
                    </div>
                    <img src={product.thumbnail} className='card-img-top' />
                    <div className='card-body'>
                        <div className='product-grid__content'>
                            <div className='title'>
                                <h3>
                                    <Link
                                        href={`/product/${product.slug}`}
                                        as={process.env.PUBLIC_URL + '/product/' + product.slug}
                                    >
                                        <p>
                                            { product.brand_name
                                                ? <b>{ product.brand_name }</b>
                                                : <span>&nbsp;</span> }
                                        </p>
                                        {product.name}
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <LayoutDashlite
            busy={busy}
            setBusy={setBusy}
            user={user}
            isSidebarShown={isSidebarShown}
            setIsSidebarShown={setIsSidebarShown}>
            {/* Page Title */}
            <Head>
                <title>Favourites | My Account | 3d Infinite</title>
            </Head>

            <div className='nk-block-head nk-block-head-sm pb-4'>
                <div className='nk-block-between row'>
                    <div className='nk-block-head-content col-md-7'>
                        <h4 className='nk-block-title page-title'>
                            Favourites Group: {favourites.name}
                        </h4>
                    </div>
                </div>
            </div>

            <div className='nk-block'>
                <div className='card'>
                    <div className='card-inner'>
                        <div className='row'>
                            {favourites?.products &&
                                favourites.products.data.map((group, index) => {
                                    return createGroup(group, index);
                                })}

                            {!favourites?.products?.data && (
                                <div className='fav-loading'>
                                    <div
                                        className='spinner-border text-primary'
                                        role='status'>
                                        <span className='sr-only'>Loading...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDashlite>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userData,
        status
    };
};

export default connect(mapStateToProps)(WithAuth(Orders));
