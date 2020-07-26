import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import AccountTreeIcon from '@material-ui/icons/AccountTree';
function RoadMap(props) {
    let {projectId} = props.data 
    return (
        <Link to={`/project/${projectId}/roadmap`} className={props.className} style={{ display: "block", textDecoration: "none" }}>
            <div style={{ display: "flex", textDecoration: "none", alignItems: "center" }}>
                <AccountTreeIcon /> <span className="ml-2">Road map</span>
            </div>
        </Link>
    )
}

RoadMap.propTypes = {
    changeContext: PropTypes.func.isRequired
}

export default RoadMap;