import { connect } from 'react-redux'
import { useState, Fragment } from 'react'
import TeamList from '../components/TeamList'
import { Button, makeStyles, Grid } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    grid: {
        justifyContent: "space-evenly",
        padding: "20px"
    }
  }));

const Teams = (props) => {
    const classes = useStyles();

    return (
        <Fragment>
            <h2>My Teams:</h2>
            {props.teams !== 0 ? <Grid container>
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