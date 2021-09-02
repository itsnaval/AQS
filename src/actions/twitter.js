export const TWITTER_TABLE_LIST_REQUEST = "TWITTER_TABLE_LIST_REQUEST"
export const TWITTER_TABLE_LIST_REQUEST_SUCCESS = "TWITTER_TABLE_LIST_REQUEST_SUCCESS"
export const TWITTER_TABLE_LIST_REQUEST_ERROR = "TWITTER_AUTH_REQUEST_ERROR"


export function getTwitterData(isClickEvent = false) {
    console.info('---------------------------------')
    console.info('action call =>')
    console.info('---------------------------------')
    return {
        type: TWITTER_TABLE_LIST_REQUEST,
        isClickEvent
    }
}
