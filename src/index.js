import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Calculator from './calculator';
import reportWebVitals from './reportWebVitals';

function App() {
  return (
      <Calculator />
  )
}

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);

// module.exports = Calculator;

//redo equalsClickHandle switch statement for less redundancy
//how does GRE calc handle -? as negative, or always subtract?
//add memory functions
//sqrt: 9+, 9/, etc
//memory recall, then NUMBERBUTTON ==> append to string
//after recall -- reset string UNLESS its operand! +-*/
//should it just be... result = recall, string = ""???
//paren + memRecall + operand ==> ( paren removed??
//14 / memRecall ... not recalling?
//when closing Parens... something needs update
//5 + memclear + 9 should not be 59
//store 5
//recall 5
//clear 5, 9 ==> 59
//BUG: result or num holding UNROUNDED values for lonnnnng decimals
//FIXED!
//TEST: 1/7 * 7 = 0.9999997
//CHECK: behavior when ERROR is in display. must you hit C to move on?
//ERROR-LOCK  you MUST hit C to continue 
//CSS: everything gets darker on click, and gets BOX highlight on hover

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
