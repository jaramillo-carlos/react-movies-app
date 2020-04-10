import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, CircularProgress } from '@material-ui/core'
import queryString from 'query-string'

import {searchMovie} from '../../redux/actions/search'
import { movieResults, isSearchLoading } from '../../redux/selectors'
import MovieResult from '../../components/MovieResult'


export default ({location}) => {
  const dispatch = useDispatch();
  const movies = useSelector(state => movieResults(state));
  // state have all store, but use Selectors, to get only do i need.
  const isLoading = useSelector(isSearchLoading)

  // useEffect get a callback to be executed on lifeCycles
  useEffect(() =>{
    const { movieName } = queryString.parse(location.search)
    if (movieName && !movies) {
      dispatch(searchMovie({movieName}))
    }
  })

  // this is bad idea, because will go listen all time, only need on component didMount
  // console.log(queryString.parse(location.search));  // to parse vars

  const renderMovies = () => {
    if (movies) {
      return movies.map((value, index) => <MovieResult key={index} {...value} />)
    }
    if (isLoading) {
      return <CircularProgress size={100} color="primary"/>
    }
    return <div/>
  };

  return (
    <Container>
      {renderMovies()}
    </Container>
  )
}