import {get} from 'lodash' // or can use with RAMDA; Or vanilla ES6

// Both are the same, but lodash dont return undefined when not exist. lodash return null
// export const isSearchLoading = state => state.search.isLoading 
export const isSearchLoading = state => get(state, 'search.isLoading')
export const movieResults = state => get(state, 'search.movieResults.Search')