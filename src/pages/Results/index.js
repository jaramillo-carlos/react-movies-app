import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import queryString from 'query-string'

import {searchMovie} from '../../redux/actions/search'
import { movieResults, isSearchLoading } from '../../redux/selectors'

export default ({location}) => {
  const dispatch = useDispatch();
  const movies = useSelector(movieResults);
  // state have all store, but use Selectors, to get only do i need.
  // const movies = useSelector(state => movieResults(state));
  
  // useEffect get a callback to be executed on lifeCycles
  useEffect(() =>{
    const { movieName } = queryString.parse(location.search)
    if (movieName && !movies) {
      dispatch(searchMovie({movieName}))
    }
  })

  // this is bad idea, because will go listen all time, only need on component didMount
  // console.log(queryString.parse(location.search));  // to parse vars

  return (
    <Container>
      results
    </Container>
  )
}