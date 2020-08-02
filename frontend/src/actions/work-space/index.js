import {ASYNC as AsyncEventTypes} from '../../constants/index'

export const fetchWorkOnItem = (page,pageSize) => ({type: AsyncEventTypes.LOAD_MORE.WORK_ON , payload : {page, pageSize}})
export const fullFilledWorkOnItem = (items) => ({type : AsyncEventTypes.FULL_FILLED.WORK_ON , payload: {data : items}})

export const fetchViewedItem = (page,pageSize) => ({type: AsyncEventTypes.LOAD_MORE.MORE_VIEWED , payload : {page, pageSize}})
export const fullFilledViewedItem = (items) => ({type : AsyncEventTypes.FULL_FILLED.MORE_VIEWED , payload: {data : items}})

export const fetchAssignedItem = (page,pageSize) => ({type: AsyncEventTypes.LOAD_MORE.ASSIGNED_TO_ME , payload : {page, pageSize}})
export const fullFilledAssignedItem = (items) => ({type : AsyncEventTypes.FULL_FILLED.ASSIGNED_TO_ME , payload: {data : items}})

export const fetchStarredItem = (page,pageSize) => ({type: AsyncEventTypes.LOAD_MORE.STARRED , payload : {page, pageSize}})
export const fullFilledStarredItem = (items) => ({type : AsyncEventTypes.FULL_FILLED.STARRED , payload: {data : items}})

export const fetchTotalAssignToMe = () => ({type : AsyncEventTypes.LOAD_MORE.TOTAL_ASSIGN_TO_ME})
export const fullFilledTotalAssignToMe = (total) => ({type : AsyncEventTypes.FULL_FILLED.TOTAL_ASSIGN_TO_ME , payload: {data : total}})

export const fetchAllGroup = () => ({type: AsyncEventTypes.LOAD_MORE.ALL_GROUP})
export const fullFilledAllGroup = (listGroup) => ({type: AsyncEventTypes.FULL_FILLED.ALL_GROUP, payload: {data: listGroup}})
