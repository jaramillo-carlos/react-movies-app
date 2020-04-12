### Currently Flow
1. Initial Data - Realtime Updates - User Input
   - All go to:
2. Dispatcher
   - This go to:
3. Store
   - This go to:
4. View
   - This return to User Input.

Every time you will go this loop, in React you will destroy View and render again.

Declarative Components (Components)
No explicit data binding

### Virtual DOM

Copy of real DOM, to refresh only updated and childrens. to add Performance

- npm run eject (divide Create React App)

# Redux
is a state container, for javascript Applications.


View Dispatch action, this action will be catched by reducer (pure functions used to update store state)

action can call apis (with middlewares) to get info from other sites and call reducer for update that info in store
reducer update the state of store, with the information provided by action (can be come from apis, or view)

Component
- mapDispatchToProps (useDispatch) -> ActionCreator -> Action -> Reducer
- mapStateToProps (useSelector) ->

## Store
Save all info in object form

## State
Global state of store

## Actions
### Action
Is a play object with type and payload

```javascript
const ADD_ITEM = 'ADD_ITEM'; // Usually in actionTypesFile. For dont repeat actions, Because they can cause side-effects.

{
  type: ADD_ITEM,
  item: { id: 1, value: 'Example' } // usually called payload
}
```

### Action Creator
functions that create actions
```javascript
// action creator
function addTodo(text) { // text is the payload
  // action
  return {
    type: ADD_ITEM,
    text // is the same text: text in es6
}
```

### Action Flow
1. - UI (dispatch action through action creator) ->
2. - - Action Creators (sends to reducer) ->
3. - - - Reducer (updates store) ->
4. - - - - Store (New store contains in State) ->
5. - - - - - State (State affect UI and aupdate it according to stored in state data)

Loop (start UI again)


## Reducers
Pure functions they take as parameter the previous state, and action (with type and payload). And return the new state.

To be reducers can't be have side effects, like mutate the params (state and action), call apis, constructors, console.logs, Date.now(), Math.random(), here.

## Middlewares
Used between actions and reducers. To log events, errors, or call ASYNC API's, routing, and more.
More useds:

## Redux Thunk
It is used for action creators to return a function instead of an action.

```javascript
const START_GET_POKEMONS = 'START_GET_POKEMONS'
const SUCCESS_GET_POKEMONS = 'SUCCESS_GET_POKEMONS'

const startGetPokemons = payload => ({
  type: START_GET_POKEMONS,
  ...payload
})

const successGetPokemons = payload => ({
  type: SUCCESS_GET_POKEMONS,
  ...payload
})

// js clousure function return other function
export const fetchPokemons = payload => {
  return dispatch => {
    dispatch(startGetPokemons())
    window.fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => response.json())
    .then(result => dispatch(successGetPokemons(result)))
  }
}

// in component call fetchPokemons(), and Thunk will execute function inside function fetchPokemons()()
```

## Redux Saga
Focused on controlling Side Effects of. Make the asynchronous code look like synchronous code with (ES6 GENERATORS)

```javascript
const START_GET_POKEMONS = 'START_GET_POKEMONS'
const SUCCESS_GET_POKEMONS = 'SUCCESS_GET_POKEMONS'
const ERROR_GET_POKEMONS = 'ERROR_GET_POKEMONS'

export const startGetPokemons = payload => ({
  type: START_GET_POKEMONS,
  ...payload
})

const successGetPokemons = payload => ({
  type: SUCCESS_GET_POKEMONS,
  ...payload
})

// in component call startGetPokemons(), and Saga will catch that

// saga pokemons.js
import { put, call, takeLatest } from 'redux-saga/effects'
import { SUCCESS_GET_POKEMONS, START_GET_POKEMONS } from '../actions/pokemons'

function* getPokemons({ payload }) {
  try {
    const results = yield call(apiCall, 'https://pokeapi.co/api/v2/pokemon', null, null, 'GET')
    yield put({ type: SUCCESS_GET_POKEMONS, results })
  } catch (error) {
    // yield put({ type: ERROR_GET_POKEMONS, error })
  }
}

// export to put in watcher
// and be sagas stay listen to be called
export default function* pokemons() { // whatchers
  // to listen START_GET_POKEMONS action
  // and when called, call getPokemons Function
  yield takeLatest(START_GET_POKEMONS, getPokemons);
}

// saga index.js
import { all } from 'redux-saga/effects'
import pokemons from './pokemons'

export default function* rootSaga() {
  // when be executed all watchers
  yield all([ // array of watchers
    pokemons()
  ])
}
// and append rootSaga in middlewareConfig
```

## React.Memo() ( React.PureComponent in classComponents)
This have inside a shouldComponentUpdate
```javascript
import React from 'react';

const functionalComponent = ({title, description}) => {
  console.log(title, description);
  return (
    <div>
      <p>
        {title}
        {description}
      </p>
    </div>
  )
}
// React.memo() will validate if they should re-render or not. Only if change current props.
// So the parent will re-render, this would not
export default React.memo(FunctionalComponent)
```


# Hooks (React16.8)
To add state to functional components, was maded to build a more reusable components, more easy to read, reuse business logic in custom hooks, and not in component life cycle, and evit confusion on this inside class components.

React-Redux (7.1.0): useSelector / useDispatch

## useState (this.state in ClassComponents)

State return array with two elements, first is value [0] of our state, and the decond [1] is da function to update the state

```javascript
const something = useState('');
// vs
this.state = { something: ''};

// lazy declaration
const messageState = useState(() => expensiveComputation());
```

```javascript
const something = useState('');
const somethingValue = something[0] // Contains ''
const setMessage = something[1] // function
// using destructuring
const [something, setSomething] = useState('');
```

## useEffect

Used to call secondary effects in functional components, like componentDidMount, componentDidUpdate or componentWillUnmount mergeds. When use this hook, component will do something after render.
Transmissions, request, listen changes, transmission events.
The first argument is a functión that will be executed when component didmount, dismount or didupdate.
the second argument is a array, when can specificy that properties should change, to react call again this functión.

That functión could return other function executed when component is dismounted
```javascript
// this code can't be compressed
componentDidMount() {
  document.title = `You clicked ${this.state.count} times`
}
componentDidUpdate() {
  document.title = `You clicked ${this.state.count} times`
}
// replaced with
// one of adventages of this is when you bundle for production
// this code can be compresed
useEffect(() => {
  document.title = `You clicked ${count} times`
})
```

## useCallback
Will get a function (function to listen) in first param and array (values to listen) on second. Is used for memoizing.
Because en react in each render or state update, will go recalcule or create again, each function.
```javascript
// Only will go re-created this function when counter change
const handleIncrementClick = useCallback(() => setCount(counter + 1), [counter])
```

Memoizing is good, but dont be used in each function because this use resources too. Only be used in functions with big use of resources.

# React-Redux
Is library for connect components from react with redux, in the past using the `HoC Connect` since 7.0.1 (June 2019) dont need use the `HoC Connect` to connect with store, was be remplaced with a hooks `useDispatch` and `useSelector`.


## useSelector
Used to get the state from redux store, is like mapStateToProps. He return global state from store.
- When action has ben dispatched by Dispatch `useDispatch`, useSelector compare previous value and next value, and when is differente force component to be render again.
- When you use memoizing, need be cautious, because `reselect` or `createselector` have a internal self-state.
- useSelector use `===` to compare if be render again or no.
```javascript
const data = useSelector( state => {
  console.log(state)
})
```

## useDispatch
Is like dispatch from redux store. Is used to dispatch actions from store. 
```javascript
const dispatch = useDispatch()
```

Usually dispatch actions to be listened by SAGA.
And later through reducer, will get the information.