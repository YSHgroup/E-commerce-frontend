import productReducer from './productReducer';
import cartReducer from './cartReducer';
import wishlistReducer from './wishlistReducer';
import compareReducer from './compareReducer';
import userReducer from './userReducer';
import miscReducer from './miscReducer';
import brandReducer from './brandReducer';
import menuReducer from './menuReducer';
import favouriteReducer from './favouriteReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    userData: userReducer,
    miscData: miscReducer,
    brandData: brandReducer,
    productData: productReducer,
    cartData: cartReducer,
    wishlistData: wishlistReducer,
    compareData: compareReducer,
    menuData: menuReducer,
    favouriteData: favouriteReducer
});

export default rootReducer;
