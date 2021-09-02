import { takeEvery, call, put, fork } from 'redux-saga/effects'
import { TWITTER_TABLE_LIST_REQUEST, TWITTER_TABLE_LIST_REQUEST_ERROR, TWITTER_TABLE_LIST_REQUEST_SUCCESS } from '../actions/twitter';
import { getTwitterInit_API } from '../api/auth';

var popWindow

function* fetchTwitterData({ isClickEvent }) {
    try {
        const response = yield call(getTwitterInit_API);
        if (response.status) {
            if (response.data.location && isClickEvent) {
                popWindow = window.open(response.data.location, "popwindow", "width=600,height=600")
                popWindow.focus()
            }
            let tableColumns = []
            let tableData = []
            if (response.data.data && response.data.columnSchemas) {
                tableColumns = response.data.columnSchemas
                tableData = response.data.data
            }
            yield put({ type: TWITTER_TABLE_LIST_REQUEST_SUCCESS, payload: { tableData, tableColumns } })
            window.opener.location.href = "/App"
        }
    } catch (err) {
        yield put({ type: TWITTER_TABLE_LIST_REQUEST_ERROR, payload: { error: err.message } })

    }
}

function* watcherTwitterSagaRequest() {
    yield takeEvery(TWITTER_TABLE_LIST_REQUEST, fetchTwitterData);
}


const twitterSaga = [fork(watcherTwitterSagaRequest)];

export default twitterSaga;
