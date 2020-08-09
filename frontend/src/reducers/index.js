import { combineReducers } from 'redux'
import Common from './common'
import Login from './login'
import SignUp from './signUp'
import WorkSpace_YourWork_WorkOn from './work-space/your-work/work-on-reducer'
import WorkSpace_YourWork_Viewed from './work-space/your-work/viewed-reducer'
import WorkSpace_YourWork_AssignToMe from './work-space/your-work/assign-to-me-reducer'
import WorkSpace_Project from './work-space/project'
import People_Group from './work-space/people/group-reducer'
import WorkFlow_Reducer from './work-space/project/workflow-reducer'
import Project_Backlog from './project/backlog-reducer'
export default combineReducers({
    Common,
    Login,
    SignUp,
    WorkSpace_YourWork_WorkOn,
    WorkSpace_YourWork_Viewed,
    WorkSpace_YourWork_AssignToMe,
    WorkSpace_Project,
    People_Group,
    WorkFlow_Reducer,
    Project_Backlog,
})