import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
        <Button className={classes.margin} onClick={props.onClick}>
            {props.children}
        </Button>
      </div>
  );
}