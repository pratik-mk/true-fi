import React from 'react';
import { Link } from 'react-router-dom';
import { QUESTIONS } from '../../constants/routes';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: '#3f51b5',
    '&:active': {
      color: '#3f51b5',
    },
    '&:hover': {
      textDecoration: 'underline',
    }
  },
}));

function Dashboard() {
  const classes = useStyles();
  
  return (
    <div>
      <br />
      <Link to={QUESTIONS} className={classes.link}>
        {"Submit Assessment"}
      </Link>
    </div>
  );
}

export default Dashboard
