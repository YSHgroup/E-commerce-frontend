import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../../lib/api.js';
import { useToasts } from 'react-toast-notifications';

import { hideFavgroup } from '../../redux/actions/favouriteActions.js';
import { addToClientWishlist } from '../../redux/actions/wishlistActions';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Add to favourites
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
        </Modal>
    );
}

function createGroup(group, index, addToFavourite, saving) {
    return (
        <div className='col-md-4 mb-4' key={ index }>
            <div className='favourite-collection card'>
                <div className='add-to-collection'>
                    <button
                        className='btn btn-secondary btn-rounded d-flex'
                        onClick={() => addToFavourite(group)}>
                        <span className={saving ? 'pr-2' : ''}>
                            Add to Collection
                        </span>

                        {saving && (
                            <div
                                className='spinner-border text-white'
                                role='status'>
                                <span className='sr-only'>Loading...</span>
                            </div>
                        )}
                    </button>
                </div>
                <img src={group.thumbnails} className='card-img-left' />
                <div className='card-body'>
                    <h6 className='card-subtitle mb-2 text-muted'>{group.name}</h6>
                </div>
            </div>
        </div>
    );
}

const Favourites = ({ fav, hideFavgroup, addToClientWishlist }) => {
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [favouritable, setFavouritable] = useState(true);
    const [collectionName, setCollectionName] = useState('');
    const [favouriteGroup, setFavouriteGroupes] = useState([]);

    const { addToast } = useToasts();

    const getFavoritesGroupes = () => {
        // setFavouriteGroupes([]);
        // setLoading(true);
        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .get('/api/v1/favourites/groups')
                    .then((response) => {
                        setFavouriteGroupes(response.data);
                        setFavouritable(true);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(
                            'Error on fetching favourite collections',
                            error
                        );
                        setFavouritable(false);
                    });
            });
    };

    const addToFavourite = (group) => {
        if (saving) {
            return false;
        }

        if (group.target) {
            group.id = null;
        }

        setSaving(true);
        api()
            .get('/sanctum/csrf-cookie')
            .then(() => {
                api()
                    .post('/api/v1/favourites', {
                        group_id: group.id,
                        product_id: fav.item.id,
                        group_name: collectionName
                    })
                    .then((response) => {
                        if (response.data.success) {
                            addToast('Added To Favourites', {
                                appearance: 'success',
                                autoDismiss: true
                            });
                            addToClientWishlist(fav.item);

                            const customEvent = new CustomEvent('onAddedToWishlist');
                            document.dispatchEvent(customEvent);

                            hideFavgroup();
                            setCollectionName('');
                        } else if (response.data.errors) {
                            const errors = response.data.errors;
                            if (errors.name?.length) {
                                addToast(errors.name[0], {
                                    appearance: 'error',
                                    autoDismiss: true
                                });
                            } else if (errors.slug?.length) {
                                addToast(errors.slug[0], {
                                    appearance: 'error',
                                    autoDismiss: true
                                });
                            }
                        }
                        setSaving(false);
                    })
                    .catch((error) => {
                        console.log('Error on creating favourites', error);
                        setSaving(false);
                    });
            });
    };

    useEffect(() => {
        setModalShow(fav.show);

        if (fav.show) {
            getFavoritesGroupes();
        }
    }, [fav]);

    return (
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => hideFavgroup()}>
            {favouritable && (
                <div>
                    {loading && (
                        <div className='fav-loading'>
                            <div
                                className='spinner-border text-primary'
                                role='status'>
                                <span className='sr-only'>Loading...</span>
                            </div>
                        </div>
                    )}
                    {!loading && (
                        <div>
                            <div className='col-md-12'>
                                <div className='row mb-2'>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Collection Name...'
                                            value={collectionName}
                                            disabled={saving}
                                            onChange={(e) =>
                                                setCollectionName(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <button
                                            className='btn btn-secondary btn-block'
                                            onClick={addToFavourite}
                                            disabled={saving}>
                                            {saving && (
                                                <div>
                                                    <div
                                                        className='spinner-border text-white'
                                                        role='status'
                                                    >
                                                        <span className='sr-only'>&nbsp;</span>
                                                    </div>
                                                    <span style={{marginLeft: 11}}>Loading...</span>
                                                </div>
                                            )}

                                            {!saving && (
                                                <span>
                                                    Create New Collection
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12'>
                                {favouriteGroup && (
                                    <div className='nk-block'>
                                        <div className='row'>
                                            {favouriteGroup.map((group, index) => {
                                                return createGroup(
                                                    group,
                                                    index,
                                                    addToFavourite,
                                                    saving
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {favouriteGroup?.length === 0 && (
                                    <div className='no-collection m-4'>
                                        <h5>You have no collections</h5>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {!favouritable && (
                <div className='no-collection m-4'>
                    <h5>Please, login first to add to your collection</h5>
                </div>
            )}
        </MyVerticallyCenteredModal>
    );
};

const mapStateToProps = (state) => {
    return {
        fav: state.favouriteData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideFavgroup: (item, addToast) => {
            dispatch(hideFavgroup());
        },
        addToClientWishlist: (item, addToast) => {
            dispatch(addToClientWishlist(item, addToast));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
