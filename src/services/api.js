import {axiosInstance as axios} from './axiosInstance'

const CREATE_NEW_USER = () => `api/public/user/create`;
const AUTHENTICATE = () => `api/public/authenticate`;

const TEST_API = () => `api/public/test1`;

const GET_USER_BY_ID = (id) => `api/public/user/${id}`; 
const DELETE_USER_BY_ID = (id) => `api/public/user/delete/${id}`; 

const SEARCH_BY_LETTERS = () => 'api/public/item/searchItemsByLetter'
const GET_ALL_ITEMS = () => 'api/public/item/getAllItems'

const FAVORITE_LIST = (userId) => `api/public/user/getUserFavoriteList/${userId}`;
const ADD_ITEM_TO_FAVORITE_LIST = (itemId, userId) => `api/public/user/addItemToFavoriteList/${itemId}/${userId}`;
const REMOVE_ITEM_FROM_FAVORITE_LIST = (itemId, userId) => `api/public/user/removeItemFromFavoriteList/${itemId}/${userId}`;


const GET_TEMP_ORDERS =  (userId) => `api/public/user/getTempOrdersByUserId/${userId}`;
const GET_CLOSED_ORDERS =  (userId) => `api/public/user/getClosedOrdersByUserId/${userId}`;

const ADD_ITEM_TO_USER_ORDER = (itemId, userId) => `api/public/user/addItemToUserOrder/${itemId}/${userId}`;
const REMOVE_ITEM_FROM_USER_ORDER = (orderId,itemId, userId) => `api/public/user/removeItemFromUserOrder/${orderId}/${itemId}/${userId}`;

const SUBMIT_ORDER = (userId, orderId) => `api/public/order/submitOrder/${userId}/${orderId}`;

export const createNewUser = (userBody) => {
    return axios.post(CREATE_NEW_USER(), userBody);
}

export const authenticate = (userBody) => {
    return axios.post(AUTHENTICATE(), userBody);
}

export const testAuthenticatedApi = (params) => {
    return axios.get(TEST_API(), {params: params});
}

export const getUserById = (id) =>{
    return axios.get(GET_USER_BY_ID(id));
}

export const deleteUserById = (id) => {
    return axios.delete(DELETE_USER_BY_ID(id));
}

export const searchByLetter = (params) =>{
    return axios.get(SEARCH_BY_LETTERS(), {params: params});
}

export const getAllItems = () => {
    return axios.get(GET_ALL_ITEMS());
}

export const getUserFavoriteList = (userId) => {
    return axios.get(FAVORITE_LIST(userId));
}

export const addItemToFavoriteList = (itemId, userId) => {
    return axios.post(ADD_ITEM_TO_FAVORITE_LIST(itemId, userId));
}


export const removeItemFromFavoriteList = (itemId, userId) => {
    return axios.delete(REMOVE_ITEM_FROM_FAVORITE_LIST(itemId, userId));
}

export const addItemToUserOrder = (itemId, userId) => {
    return axios.post(ADD_ITEM_TO_USER_ORDER(itemId, userId));
}

export const removeItemFromUserOrder = (orderId, itemId, userId) => {
    return axios.delete(REMOVE_ITEM_FROM_USER_ORDER(orderId, itemId, userId));
}

export const submitOrder = (userId, orderId) => {
    return axios.post(SUBMIT_ORDER(userId, orderId));
}

export const getTempOrders = (userId) => {
    return axios.get(GET_TEMP_ORDERS(userId));
}
export const getClosedOrders = (userId) => {
    return axios.get(GET_CLOSED_ORDERS(userId));
}