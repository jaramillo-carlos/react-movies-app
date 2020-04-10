import React from 'react'
import {Card, Grid, Typography, Button } from '@material-ui/core'
import { withRouter } from 'react-router'
import style from './style'

// if we try use history here, has be undefined, 
// because this component not is children of a route. 
// in this cases use HoC withRouter
const MovieResult = ({Title, Year, Type, imdbID, Poster, history}) => {
  const classes = style();

  const handleSeeMovieClick = () => {
    history.push(`/movie/${imdbID}`)
  }

  return (
    <Card className={classes.cardContainer}>
      <Grid container>
        <Grid item>
          <img src={Poster} alt={Title} className={classes.poster}/>
        </Grid>
        <Grid item className={classes.titlesContainer}>
          <Typography>{Title}</Typography>
          <Typography>{Year}</Typography>
          <Typography>{Type}</Typography>
          <Button 
            color="primary" 
            variant="contained"
            onClick={handleSeeMovieClick}>
            Ver más
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default withRouter(MovieResult);
