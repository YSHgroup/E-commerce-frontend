export const FETCH_BRANDS_SUCCESS = 'FETCH_BRANDS_SUCCESS';

const fetchBrandsSuccess = (brands) => ({
    type: FETCH_BRANDS_SUCCESS,
    payload: brands,
});

// fetch all brands
export const fetchBrands = (brands) => {
    return (dispatch) => {
        dispatch(fetchBrandsSuccess(brands));
    };
};
