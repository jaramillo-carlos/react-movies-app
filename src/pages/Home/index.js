import React, { useState } from 'react'
import { Container, Typography, Card, Grid, TextField, Button } from '@material-ui/core'
import styles from './styles';
import { MovieIcon } from '../../icons'

export default ({history}) => {
  const [searchText, setSearchText] = useState('');
  const classes = styles();
  // declare functions in this form dont have Hoisting
  // declarative function
  const handleSearchTextChange = event => {
    setSearchText(event.target.value)
  }

  const handleCleanTextClick = event => {
    setSearchText('')
  }

  const handleSearchTextClick = event => {
    history.push(`/results?movieName=${searchText}`)
  }

  return (
    <Container className={classes.container}>
      <Card container className={classes.cardContainer}>
        <Grid className={classes.titleGridContainer}>
          <Typography className={classes.title}>
            ¡Bienvenido!
          </Typography>
        </Grid>
        <Grid>
          <MovieIcon className={classes.movieIcon} />
        </Grid>

        <TextField
          value={searchText}
          placeholder="Buscar.."
          className={classes.textFieldSearch}
          onChange={handleSearchTextChange} />
        <Grid className={classes.buttonsContainer}>
          <Button
            variant="contained"
            onClick={handleCleanTextClick}>
            Limpiar
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.searchButton}
            onClick={handleSearchTextClick}>
            Buscar
          </Button>
        </Grid>
      </Card>
    </Container>
    )
}