import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    box: {
        fontSize: "60px",
        width: "100%",
        margin: "0 auto",
    },
  }));

export default function Display(props) {
  const classes = useStyles();

  return (
      <div>
       <Box className={classes.box}>
            {props.children}
       </Box>
      </div>
  );
}