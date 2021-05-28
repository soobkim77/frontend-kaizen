import { statuses } from '../status'
import { Grid } from '@material-ui/core'
import Task from './Task'
import { connect } from 'react-redux'


const TaskCont = (props) => {
    return(
        <Grid continater xs={3}>
            {statuses.map(status => {
                return(
                    <Grid column>
                        {status}
                        <div>
                            {props.currentBoard.tasks.filter(task => task.status === status).map(task => {
                            return (
                                <Task task={task} key={task.id} />
                            )
                        }) }
                        </div>
                    </Grid>
                )
            })}
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        currentBoard: state.boards.currentBoard
    }
}

export default connect(mapStateToProps, null)(TaskCont)