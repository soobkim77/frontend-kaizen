import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { completeTask } from  "../redux/actions/completeTask"
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteTask } from '../redux/actions/deleteTask'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    // opacity: {isDragging} ? 0 : 1
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Task = ({task, deleteTask, completeTask}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  let history = useHistory();

  const doTask = () => {
    let myTask = task
    myTask.status = "completed"
    completeTask(myTask)
  }

  const editTask = () => {
    history.push({
      pathname: `/tasks/${task.id}/edit`,
      state: task
    })
  }
  const delTask = () => {
    deleteTask(task)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Fragment>

      <Card className={classes.root} >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {task.title[0]}
            </Avatar>
          }
          title={task.title}
          subheader={`Due By: ${task.due_date}`}
        />
        <CardActions disableSpacing>
          <Button onClick={() => delTask()}>
            Delete
          </Button>
          <IconButton aria-label="edit task" onClick={() => editTask()}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={() => doTask()}>
            <DoneIcon />
          </IconButton>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description: </Typography>
            <Typography paragraph>
              {task.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      {console.log(task)}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    currentBoard: state.boards.currentBoard
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    completeTask: (task) => {
      dispatch(completeTask(task))
    },
    deleteTask: (task) => {
      dispatch(deleteTask(task))
    }
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Task)