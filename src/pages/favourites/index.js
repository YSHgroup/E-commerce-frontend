import Head from 'next/head';

import { LayoutOne } from '../../components/Layout';
import WithAuth from '../../components/WithAuth';

import api from '../../lib/api';
import { fetchUser } from '../../redux/actions/userActions';

import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { useDispatch, connect } from 'react-redux';
import Link from 'next/link';

const Orders = ({ user }) => {
    const [busy, setBusy] = useState(false);
    const [isSidebarShown, setIsSidebarShown] = useState(false);
    const dispatch = useDispatch();
    const [favouriteGroup, setFavouriteGroupes] = useState([]);

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
                    .get(
                        '/api/v1/favourites/groups',
                        {
                            name: 'ola'
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                    .then((response) => {
                        setFavouriteGroupes(response.data);
                    })
                    .catch((error) => {
                        console.log('Error on fetching Favourites');
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

    function createGroup(group, index) {
        return (
            <div className='col-md-3 mb-4' key={index}>
                <div className='favourite-collection card'>
                    <div className='add-to-collection'>
                        <Link
                            href={`/favourites/${group.slug}`}
                            as={
                                process.env.PUBLIC_URL +
                                '/favourites/' +
                                group.slug
                            }
                            className='btn btn-primary'>
                            Open Collection
                        </Link>
                    </div>
                    <img src={group.thumbnails} className='card-img-top' />
                    <div className='card-body'>
                        <h6 className='card-subtitle mb-2 text-muted'>
                            {group.name}
                        </h6>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <LayoutOne
            busy={busy}
            setBusy={setBusy}
            user={user}
            isSidebarShown={isSidebarShown}
            setIsSidebarShown={setIsSidebarShown}>
            {/* Page Title */}
            <Head>
                <title>Favourites | 3d Infinite</title>
            </Head>

            {/* breadcrumb */}
            <BreadcrumbOne
                pageTitle='Favourites'
                backgroundImage='/assets/images/backgrounds/breadcrumb-bg-shop.png'>
                <ul className='breadcrumb__list'>
                    <li>
                        <Link href='/' as={process.env.PUBLIC_URL + '/'}>
                            Home
                        </Link>
                    </li>

                    <li>Favourites</li>
                </ul>
            </BreadcrumbOne>

            {/* favourites content */}
            <div className='wishlist-content space-mt--r130 space-mb--r130'>
                <Container>
                    <div className='nk-block'>
                        <div className='row'>
                            {favouriteGroup &&
                                favouriteGroup.map((group, key) => {
                                    return createGroup(group, key);
                                })}

                            {favouriteGroup.length === 0 && (
                                <div className='no-collection m-4'>
                                    <h5>
                                        You don't have any favourite products!
                                    </h5>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </LayoutOne>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userData,
        status
    };
};

export default connect(mapStateToProps)(WithAuth(Orders));
