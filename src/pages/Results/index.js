import React from 'react'
import { Container } from '@material-ui/core'
import queryString from 'query-string'

export default ({location}) => {
  console.log(location)
  // to parse vars
  console.log(queryString.parse(location.search))
  return (
    <Container>
      results
    </Container>
  )
}