var debug = true;
export var APP_URL = "https://mtumrah.com"; 


export var BACKEND_BASE_URL = "http://98.82.201.1:8000";
export var API_BASE_URL = BACKEND_BASE_URL + "/api";
if (debug) {
}

export const  FILE_BASE_URL  = API_BASE_URL+"/files?path="; 

//panel
export const GET_CATEGORIES = API_BASE_URL+'/panel/categories';
export const GET_HOTELS = API_BASE_URL+'/panel/hotels';

export const POST_CREATE_CATEGORY = API_BASE_URL+'/categories/create';
export const UPDATE_CATEGORY = API_BASE_URL +'/panel/category/update';
export const UPDATE_HOTEL = API_BASE_URL +'/panel/hotel/update';

export const GET_DELETE_PACKAGE = API_BASE_URL +'/packages/delete/';
export const GET_DELETE_REVIEW = API_BASE_URL +'/reviews/delete/';
export const GET_DELETE_BLOG = API_BASE_URL +'/blogs/delete/';

export const URL_CREATE_HOTEL = API_BASE_URL +'/packages/create';
export const URL_CREATE_BLOG = API_BASE_URL +'/blogs/create';
export const URL_UPDATE_BLOG = API_BASE_URL +'/blogs/';
export const URL_POST_CREATE_REVIEW = API_BASE_URL +'/reviews/create';

export const POST_CREATE_PACKAGE = API_BASE_URL +'/packages/create';
export const POST_CREATE_CUSTOM_PACKAGE = API_BASE_URL +'/custom-packages/create';
export const POST_UPDATE_PACKAGE = API_BASE_URL +'/packages/update';
export const POST_UPDATE_HOTEL = API_BASE_URL +'/hotels/update';

export const GET_INQUIRIES = API_BASE_URL + '/inquiries';
export const GET_DELETE_INQUIRY = API_BASE_URL +'/inquiry/delete/';


export const GET_PACKAGES = API_BASE_URL + "/web/packs";
export const POST_SUBMIT_INQUIRY = API_BASE_URL + "/web/inquiry/submit";
export const GET_BLOGS = API_BASE_URL+'/web/blogs';
export const GET_CUSTOM_PACKAGES = API_BASE_URL+'/custom-packages';
export const GET_REVIEWS = API_BASE_URL+'/reviews';

export const GET_DELETE_CUSTOM_PACKAGES = API_BASE_URL+'/custom-packages/delete/';



