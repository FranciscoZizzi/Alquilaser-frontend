import {BASE_URL, PORT, SEARCH_PATH} from "./constants";

export function getSearchURL() {
    return BASE_URL + ':' + PORT + SEARCH_PATH
}