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
import { red, green, yellow, blue } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { Button, Grid } from '@material-ui/core'
import { deleteTask } from '../redux/actions/deleteTask'
import statuses from '../status'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    paddingBottom: 10
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
  avatarC: {
    backgroundColor: green[500],
    width: 40,
    height: 10,
    borderRadius: 5
  },
  avatarO: {
    backgroundColor: red[500],
    width: 40,
    height: 10,
    borderRadius: 5
  },
  avatarI: {
    backgroundColor: yellow[500],
    width: 40,
    height: 10,
    borderRadius: 5
  },
  avatarR: {
    backgroundColor: blue[500],
    width: 40,
    height: 10,
    borderRadius: 5
  },
  btn_grp: {
    marginLeft: 30
  }
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

  const backTask = () => {
    let myTask = task
    let index = statuses.findIndex( s => s === task.status)
    if (index === 0) {
      myTask.status = "open"
    } else {
      myTask.status = statuses[index - 1]
    }
    completeTask(myTask)
  }

  const forwardTask = () => {
    let myTask = task
    let index = statuses.findIndex( s => s === task.status)
    if (index === 3) {
      myTask.status = "completed"
    } else {
      myTask.status = statuses[index + 1]
    }
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

  const statusColor = () => {
    switch(task.status){
      case("open"): 
        return classes.avatarO
      case("in-progress"): 
        return classes.avatarI
      case("review"): 
        return classes.avatarR
      case("completed"):
        return classes.avatarC 
    }
  }

  return (
    <Fragment>
      <Card className={classes.root} >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" size="small" className={statusColor()} />
          }
          title={task.title}
          subheader={`Due By: ${task.due_date}`}
        />
        <CardActions disableSpacing>
          <IconButton aria-label="edit task" onClick={() => delTask()}>
            <RemoveCircleOutlineIcon fontSize="small"/>
          </IconButton>
          <IconButton aria-label="edit task" onClick={() => editTask()}>
            <EditIcon fontSize="small"/>
          </IconButton>
          <Grid container className={classes.btn_grp}>
            <IconButton aria-label="share" >
              <ArrowBackIcon fontSize="small" id="back" onClick={(e) => backTask()} />
            </IconButton>
            <IconButton aria-label="share" >
              <DoneIcon fontSize="small" id="complete" onClick={(e) => doTask()} />
            </IconButton>
            <IconButton aria-label="share" >
              <ArrowForwardIcon fontSize="small" id="forward" onClick={(e) => forwardTask()} />
            </IconButton>
          </Grid>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon fontSize="small"/>
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