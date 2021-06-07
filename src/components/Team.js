import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Grid, makeStyles } from '@material-ui/core'
import { showTeam } from '../redux/actions/showTeam'
import BoardPrev from './BoardPrev'


const useStyles = makeStyles((theme) => ({
    grid_main: {
        margin: "auto",
        width: "80%",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
  }));

const Team = (props) => {
    const classes = useStyles()

    useEffect(() => {
        props.showTeam(props.match.params.id)
    }, [])

    return(
        <>
        
        {props.currentTeam.attributes ?
        <>
            <h2>{props.currentTeam.attributes.name}</h2>
            <Grid container className={classes.grid_main}>
            {props.currentTeam.attributes.boards.map(b => {
                return <BoardPrev key={b.id} board={b} />
            })}
            </Grid>
        </>
        :
        null
        }
            
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentTeam: state.teams.currentTeam
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showTeam: (id) => {
            dispatch(showTeam(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Team)