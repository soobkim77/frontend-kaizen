import { connect } from 'react-redux'
import { useEffect } from 'react'
import BoardPrev from '../components/BoardPrev'
import { fetchBoards } from '../redux/actions/fetchBoards'
import { addBoard } from '../redux/actions/addBoard'
import { makeStyles, Grid} from "@material-ui/core";
import { getTeams } from '../redux/actions/getTeams'
import { getUsers } from '../redux/actions/getUsers'

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    grid: {
        
        padding: "20px"
    },
    grid_main: {
        margin: "auto",
        width: "80%",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    bdTitle: {
        justify: "center",
    }
  }));
  

const Home = (props) => {
    const classes = useStyles();
    
    useEffect(() => {
        props.fetchBoards();
        props.getTeams();
        props.getUsers()
    }, [])


    return (
        <div>
            <h2 className={classes.bdTitle}> My Boards </h2>
            <Grid container xs={12} direction='space-between' className={classes.grid_main}>
                {props.boards.boards ?
                    props.boards.boards.map(board => 
                {
                    return(
                        <Grid item xs={3}>
                            <BoardPrev board={board} key={board.id} />
                        </Grid>
                    )
                    
                })
                    :
                    null}
            </Grid>
            {console.log(props)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        boards: state.boards.boards,
        currentBoard: { ...state.currentBoard },
        requesting: state.requesting,
        teams: state.teams.teams
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBoards: () => {
            dispatch(fetchBoards())
        },
        addBoard: (board) => {
            dispatch(addBoard(board))
        },
        getTeams: () => {
            dispatch(getTeams())
        },
        getUsers: () =>{
            dispatch(getUsers())
          },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)