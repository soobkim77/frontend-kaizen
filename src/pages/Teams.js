import { connect } from 'react-redux'
import { Fragment } from 'react'
import TeamList from '../components/TeamList'
import { makeStyles, Grid } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    big: {
        justifyContent: "space-evenly",
        margin: "auto",
        alignItems: "center",
        width: "80%"
    },
    tmTitle: {
        justify: "center"
    }
  }));

const Teams = (props) => {
    const classes = useStyles();

    return (
        <Fragment>
            <h2 className={classes.tmTitle}>My Teams:</h2>
            {props.teams !== 0 ? <Grid container className={classes.big}>
                {props.teams.map(team => {
                    return <TeamList key={team.attributes.id} team={team}/>
                })}
            </Grid> : null}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        teams: state.teams.teams
    }
}

export default connect(mapStateToProps)(Teams)