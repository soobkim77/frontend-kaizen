import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
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

const  Task = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const doTask = () => {
    let myTask = props.task
    myTask.completed = true
    props.completeTask(myTask)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={props.task.title}
        subheader={`Due By: ${props.task.due_date}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {props.task.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
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
            {props.task.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
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
    }
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Task)