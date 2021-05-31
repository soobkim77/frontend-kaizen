import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, IconButton } from '@material-ui/core'
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  inner: {
      border: true
  }
}));

const TeamList = (props) =>  {
  const classes = useStyles();
  const history = useHistory();

  const toTeam = () => {
    history.push(`/teams/${props.team.id}`)
  }

  return (
    <div className={classes.root}>
        <h2>My Teams:</h2>
      <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`team${props.team.id}-content`}
            id={`team${props.team.id}-header`}
            >
            <Typography className={classes.heading}>{props.team.name}</Typography>
            </AccordionSummary>
                <AccordionDetails>
                    <Grid container className={classes.inner}>
                        <Grid item xs={2}>
                            Member Names:
                            {props.team.members.map(member => {
                                return <h4>{member}</h4>
                        })}
                        </Grid>
                        <Grid item xs={9}>
                            Description:
                            <Typography>
                                {props.team.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={toTeam}>
                                <GroupWorkIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </AccordionDetails>
         
      </Accordion>
    </div>
  );
}

export default TeamList