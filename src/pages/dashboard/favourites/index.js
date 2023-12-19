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

    function createGroup(group, key) {
        return (
            <div className='col-md-3 mb-4' key={ key }>
                <div className='favourite-collection card'>
                    <div className='add-to-collection'>
                        <Link
                            href={`/dashboard/favourites/${group.slug}`}
                            as={
                                process.env.PUBLIC_URL +
                                '/dashboard/favourites/' +
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
                            Favourites
                        </h4>
                    </div>
                </div>
            </div>

            <div className='nk-block'>
                <div className='card'>
                    <div className='card-inner'>
                        <div className='row'>
                            {favouriteGroup &&
                                favouriteGroup.map((group, index) => {
                                    return createGroup(group, index);
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
