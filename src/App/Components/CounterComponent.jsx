import React from 'react'
import { useDispatch, useSelector } from 'react-redux'



const CounterComponent = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    console.log(state);
    console.log(dispatch);
    
    
  return (
    <>
       Counter Component count : {state.counter}

       <button onClick={() => dispatch({type : "INC"})}>Inc</button>
       <button onClick={() => dispatch({type : "DEC"})}>Dec</button>
       <button onClick={() => dispatch({type : "INC_BY" , payload : 5})}>Inc By 5</button>
       <button onClick={() => dispatch({type : 'DEC_BY' , payload : 5})}>Dec By 5</button>

       
    </>
  )
}

export default CounterComponent
