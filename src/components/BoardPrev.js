import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { showBoard } from '../redux/actions/showBoard'
import { useHistory } from "react-router-dom";
import { deleteBoard } from "../redux/actions/deleteBoard"


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 345,
    margin: 20
  },
  media: {
    height: 140,
  },
});

const BoardPrev = ({board, showBoard, deleteBoard}) => {
    const classes = useStyles();
    const history = useHistory();

    const getBoard = (board) => {
      showBoard(board);
    }

    const editBoard = () => {
      history.push({
        pathname: `/boards/${board.id}/edit`,
        state: board
      })
    }

    const deleteBor = () => {
      deleteBoard(board);
    }


    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image="https://picsum.photos/600/600"
                title={board.title}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {board.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                   {board.description}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => editBoard()} >
                Edit
                </Button>
                <Link to={`/boards/${board.id}`} onClick={() => getBoard(board)}>
                Learn More
                </Link>
                <Button onClick={() => deleteBor()} >
                  <DeleteIcon />
                </Button>
            </CardActions>
         </Card>
    )
}

const mapStateToProps = (state) => {
  return {
      currentBoard: state.boards.currentBoard
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      showBoard: (board) => {
          dispatch(showBoard(board.id))
      },
      deleteBoard: (board) => {
        dispatch(deleteBoard(board))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPrev);
