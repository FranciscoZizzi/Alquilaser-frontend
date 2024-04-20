import {ADD_LISTING_PATH, BASE_URL, PORT, SEARCH_PATH} from "./constants";

export function getSearchURL() {
    return BASE_URL + ':' + PORT + SEARCH_PATH
}

export function getAddListingURL() {
    return BASE_URL + ':' + PORT + ADD_LISTING_PATH
}