import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Container } from '@material-ui/core'
import queryString from 'query-string'

import {searchMovie} from '../../redux/actions/search';


export default ({location}) => {
  const dispatch = useDispatch();

  // useEffect get a callback to be executed on lifeCycles
  useEffect(() =>{
    const { movieName } = queryString.parse(location.search)
    dispatch(searchMovie({movieName}))
  })

  // this is bad idea, because will go listen all time, only need on component didMount
  // console.log(queryString.parse(location.search));  // to parse vars

  return (
    <Container>
      results
    </Container>
  )
}