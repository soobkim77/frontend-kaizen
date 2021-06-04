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
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { deleteBoard } from "../redux/actions/deleteBoard"
import MoreIcon from '@material-ui/icons/More';


const useStyles = makeStyles({
  root: {
    width: 345,
    maxHeight: 325,
    minHeight: 325,
    margin: 20
  },
  media: {
    height: 170,
  },
  btn_group: {
    display: "flex",
    justifyContent: "space-between",
  },
  area: {
    maxHeight: 260,
    minHeight: 260
  },

});

const BoardPrev = ({board, showBoard, deleteBoard}) => {
    const classes = useStyles();
    const history = useHistory();

    const getBoard = (board) => {
      showBoard(board);
      history.push(`/boards/${board.id}`)
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

    const desc = () => {
      let str = board.description
      if (str.length <= 30) return str;
      return str.substr(0, str.lastIndexOf(" ", 30)) + "..."
    }


    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.area}>
                <CardMedia
                className={classes.media}
                image={`https://picsum.photos/200/300/?${board.title[0]}`}
                title={board.title}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2" >
                    {board.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                   {desc()}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.btn_group}>
              <IconButton aria-label="edit task"  onClick={() => getBoard(board)}>
                <MoreIcon fontSize="medium"/>
              </IconButton>
              <IconButton aria-label="edit task" onClick={() => editBoard()}>
                <EditIcon fontSize="medium"/>
              </IconButton>
                <IconButton onClick={() => deleteBor()} >
                  <DeleteIcon fontSize="medium"/>
                </IconButton>
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
