import React from 'react'
import { Route, Switch } from 'react-router-dom';
import YourWork from './workplace/YourWorkContainer'
import Project from './workplace/ProjectsContainer'
import People from './workplace/PeopleContainer'
import RoadMap from './project/RoadMap'
import Backlog from './project/Backlog'
import Board from './project/Board'
import Settings from './project/Settings'
let WorkplaceContainer = function (props) {

    return (
        <div className={props.className}>
            <Switch>
                <Route path="/your-work">
                    <YourWork />
                </Route>
                <Route path="/projects">
                    <Project />
                </Route>
                <Route path="/dashboard">
                    <div>dashboard</div>
                </Route>
                <Route path="/people">
                    <People />
                </Route>
                <Route path="/project/:projectId/roadmap" component={RoadMap} />
                <Route path="/project/:projectId/backlog" component={Backlog} />
                <Route path="/project/:projectId/boards" component={Board} />
                <Route path="/project/:projectId/settings/details" component={Settings} />
                <Route exact path="/">
                    <div>Welcome</div>
                </Route>

            </Switch>
        </div>
    )
}

export default WorkplaceContainer