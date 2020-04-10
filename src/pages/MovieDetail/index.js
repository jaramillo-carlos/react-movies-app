import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, CircularProgress, Typography } from '@material-ui/core'

import { searchMovieById } from '../../redux/actions/search'
import { movieResult as MovieResultSelector } from '../../redux/selectors'

export default ({ match }) => {
  const dispatch = useDispatch();
  const movieResult = useSelector(MovieResultSelector)

  useEffect(() => {
    // const movieId = match.params.id;
    // const { id: movieId } = match.params;
    const { params: { id: movieId } } = match;
    if (!movieResult || movieResult && movieResult.imdbID !== movieId) {
      dispatch(searchMovieById({ movieId }))
    }
  })

  if (!movieResult) {
    return <CircularProgress size="50" color="primary" />
  }
  const {Title, Poster, Actors, Director, Country, Rated, Awards, Plot } = movieResult;
  return (
    <Container>
      <Typography variant="h3">{Title}</Typography>
      <img src={Poster} alt={Title} />
      <Typography><strong>Actores: </strong> {Actors}</Typography>
      <Typography><strong>Director: </strong> {Director}</Typography>
      <Typography><strong>Pais: </strong> {Country}</Typography>
      <Typography><strong>Clasificacion: </strong> {Rated}</Typography>
      <Typography><strong>Premios: </strong> {Awards}</Typography>
      <Typography><strong>Sinopsis: </strong> {Plot}</Typography>
    </Container>
  )
}