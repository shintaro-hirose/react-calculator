import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

export default function MyButton(props) {
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      backgroundColor: props.backgroundColor
    },
  }));
  const classes = useStyles();


  return (
      <div>
        <Fab color="inherit" className={classes.margin} onClick={props.onClick}>
            {props.children}
        </Fab>
      </div>
  );
}