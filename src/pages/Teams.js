import { connect } from 'react-redux'
import { useState, Fragment } from 'react'
import TeamList from '../components/TeamList'
import { Button, makeStyles, Grid, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'


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
            {console.log(props)}
            <Grid container>
                {props.teams.map(team => {
                    return <TeamList key={team.id} team={team}/>
                })}
            </Grid>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        teams: state.teams.teams
    }
}

export default connect(mapStateToProps)(Teams)