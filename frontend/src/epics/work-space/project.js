import { of as rxjsOf } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, delay, map, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../constants/index'
import { BACKEND_API } from '../../config/api'
import { madeRequestFail } from '../../actions/global'
import {
    fullFilledDeleteProject,
    fullFilledProjectGrid,
    createProjectSuccess,
    createProjectFailed
} from '../../actions/project'
import { getToken } from '../../common/localStorage'

let remoteData = [{
    "id": 1,
    "name": "name 1",
    "key": "ABCDF",
    "lead": "That dep chai",
    "projectIconUrl": "https://realng.atlassian.net/secure/projectavatar?pid=10009&avatarId=10404",
    "ProductID": 1,
    "ProductName": "Chai",
    "SupplierID": 1,
    "CategoryID": 1,
    "QuantityPerUnit": "10 boxes x 20 bags",
    "UnitPrice": 18.0000,
    "UnitsInStock": 39,
    "UnitsOnOrder": 0,
    "ReorderLevel": 10,
    "Discontinued": false,
    "Category": {
        "CategoryID": 1,
        "CategoryName": "Beverages",
        "Description": "Soft drinks, coffees, teas, beers, and ales"
    }
}, {
    "id": 2,
    "name": "name 2",
    "key": "DASDX",
    "lead": "OMG HEas",
    "projectIconUrl": "https://realng.atlassian.net/secure/projectavatar?pid=10015&avatarId=10415",
    "ProductID": 2,
    "ProductName": "Chang",
    "SupplierID": 1,
    "CategoryID": 1,
    "QuantityPerUnit": "24 - 12 oz bottles",
    "UnitPrice": 19.0000,
    "UnitsInStock": 17,
    "UnitsOnOrder": 40,
    "ReorderLevel": 25,
    "Discontinued": false,
    "Category": {
        "CategoryID": 1,
        "CategoryName": "Beverages",
        "Description": "Soft drinks, coffees, teas, beers, and ales"
    }
}]
const projectGridFakeAjax = () =>
    rxjsOf({
        data: remoteData
    }).pipe(delay(1000))
const delelteProjectFakeAjax = (id) =>
    rxjsOf({
        data: id
    }).pipe(delay(1000))

export const fetchProjects = action$ =>
    action$.pipe(
        ofType(AsyncTypes.LOAD_MORE.PROJECT_GRID),
        mergeMap(action => projectGridFakeAjax()),
        map(response => fullFilledProjectGrid(response.data))
    );
export const deleteProject = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.DELETE_PROJECT),
        mergeMap(action => delelteProjectFakeAjax(action.payload)),
        map(response => fullFilledDeleteProject(response.data))
    );


export const createProject = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.CREATE_PROJECT),
        switchMap(action => {
            console.log(action)
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.CREATE_PROJECT)
            const requestSettings = {
                url: fullyUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    name: action.payload.projectName,
                    key: action.payload.projectKey,
                    description: action.payload.shortDescription,
                }
            }
            return ajax(requestSettings)
        }),
        map(ajax => {
            // always ajax.status < 400
            const response = ajax.response
            if (response == null)
                return madeRequestFail('No response from server!')
            if (response.status < 400) {
                return createProjectSuccess(response.data)
            }
            else {
                return madeRequestFail(response.message)
            }

        }),
        catchError(ajax => madeRequestFail('Connection error!'))
    )