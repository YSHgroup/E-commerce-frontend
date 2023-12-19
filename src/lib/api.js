import axios from 'axios';
import { fetchProducts } from '../redux/actions/productActions';
import { fetchMenu } from '../redux/actions/menuActions';
import { setReturnUrl } from '../redux/actions/miscActions';
import getStore from './getStore';
import { logOut } from './auth';

export const fetchProductsFromServer = (store) => {
    axios.get(`${process.env.BASE_URL}/api/v1/products`).then((resp) => {
        store.dispatch(fetchProducts(resp.data.data));
    });
};

export const fetchMenusFromServer = (store) => {
    axios.get(`${process.env.BASE_URL}/api/v1/menu-items`)
        .then((resp) => {
            store.dispatch(fetchMenu(resp.data));
        })
        .catch(() => {
            setTimeout(() => fetchMenusFromServer(store), 100);
        });
};

export const fetchPrerenderedDataFromServer = async (params) => {
    return await axios.get(`${process.env.BASE_URL}/api/v1/ssr/get`, {
        params
    })
        .then(resp => resp.data)
        .catch((e) => {
            console.log('get cache exception', e);
            return { content: false, timeStamp: 0 };
        });
}

export const postCacheToServer = async (key, data) => {
    return await axios.post(`${process.env.BASE_URL}/api/v1/ssr/set`, {
        key, data
    })
        .then(resp => resp.data)
        .catch((e) => console.log('set cache exception', e));
}

export default function api() {
    const api = axios.create({
        baseURL: process.env.BASE_URL,
        withCredentials: true
    });

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log(error.message);
            console.log(error.response);
            if (error.response?.status === 401) {
                const url = window.location.href;
                logOut();
                const store = getStore();
                store.dispatch(setReturnUrl(url));

                return Promise.reject();
            }

            return Promise.reject(error);
        }
    );

    return api;
}
