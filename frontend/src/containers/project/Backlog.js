import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import BacklogComponent from '../../components/project/BacklogComponent'
import { pageContextualNavigation } from '../../actions/global'
import {
    fetchBacklogPage, requestDeleteSprint,
    requestTopOfBacklog, requestBottomOfBacklog,
    requestMoveUpSprint, requestMoveDownSprint,
    requestCreateSprint, requestEditSprint,
    requestStartSprint, requestDeleteIssue,
    requestMoveIssueToSprint,
}
    from '../../actions/project'
const Backlog = function (props) {
    console.log(props)
    const { projectId } = props.match.params
    useEffect(() => {
        props.getNavigation('BACKLOG', props.match.params)
    }, [])
    useEffect(() => {
        if (!props.isLoadBacklogPage) {
            props.fetchBacklogPage(projectId)
        }
    }, [props.isLoadBacklogPage])


    return (
        <BacklogComponent
            projectId={projectId}
            backlogItems={props.backlogItems}
            workingSprints={props.workingSprints}
            topOfBacklog={props.topOfBacklog}
            bottomOfBacklog={props.bottomOfBacklog}
            deleteSprint={props.deleteSprint}
            moveUpSprint={props.moveUpSprint}
            moveDownSprint={props.moveDownSprint}
            createSprint={props.createSprint}
            editSprint={props.editSprint}
            startSprint={props.startSprint}
            deleteIssue={props.deleteIssue}
            moveIssueToSprint={props.moveIssueToSprint}
        >
        </BacklogComponent>
    )
}
const mapStateToProps = state => {
    return {
        backlogItems: state.Project_Backlog.backlogItems,
        workingSprints: state.Project_Backlog.workingSprints,
        isLoadBacklogPage: state.Project_Backlog.isLoadBacklogPage
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getNavigation: (pageName, data) => dispatch(pageContextualNavigation(pageName, data)),
        fetchBacklogPage: (projectId) => dispatch(fetchBacklogPage(projectId)),
        topOfBacklog: (issueId, backlogId) => dispatch(requestTopOfBacklog(issueId, backlogId)),
        bottomOfBacklog: (issueId, backlogId) => dispatch(requestBottomOfBacklog(issueId, backlogId)),
        deleteSprint: (sprintId) => dispatch(requestDeleteSprint(sprintId)),
        moveUpSprint: (sprintId) => dispatch(requestMoveUpSprint(sprintId)),
        moveDownSprint: (sprintId) => dispatch(requestMoveDownSprint(sprintId)),
        createSprint: (projectId) => dispatch(requestCreateSprint(projectId)),
        editSprint: (data) => dispatch(requestEditSprint(data)),
        startSprint: (data) => dispatch(requestStartSprint(data)),
        deleteIssue: (issueId, projectId) => dispatch(requestDeleteIssue(issueId, projectId)),

        moveIssueToSprint: (fromSprintId, toSprintId, issueId) =>
        {
            console.log(fromSprintId + " " + toSprintId + " " +  issueId);
            return dispatch(requestMoveIssueToSprint(fromSprintId, toSprintId, issueId))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Backlog)