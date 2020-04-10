### Currently Flow
1. Initial Data - Realtime Updates - User Input
-- All go to:
2. Dispatcher
-- This go to:
3. Store
-- This go to:
4. View
-- This return to User Input.

Every time you will go this loop, in React you will destroy View and render again.

Declarative Components (Components)
No explicit data binding

### Virtual DOM

Copy of real DOM, to refresh only updated and childrens. to add Performance

- npm run eject (divide Create React App)


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

# React-Redux
Is library for connect components from react with redux, in the past using the `HoC Connect` since 7.0.1 (June 2019) dont need use the `HoC Connect` to connect with store, was be remplaced with a hooks `useDispatch` and `useSelector`.


## useSelector
Used to get the state from redux store, is like mapStateToProps.
- When action has ben dispatched by Dispatch `useDispatch`, useSelector compare previous value and next value, and when is differente force component to be render again.
- When you use memoizing, need be cautious, because `reselect` or `createselector` have a internal self-state.
- useSelector use `===` to compare if be render again or no.

## useDispatch
Is like dispatch from redux store. Is used to dispatch actions from store. 
```javascript
const dispatch = useDispatch()
```

Usually dispatch actions to be listened by SAGA.
And later through reducer, will get the information.