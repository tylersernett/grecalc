import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

function Calculator() {
  // {display, id}
  const btns = [
      ["MR", "memrecall"], ["MC", "memclear"], ["M+", "memadd"], ["(", "parenleft"], [")", "parenright"],
      [7, "seven"], [8, "eight"], [9, "nine"], ["÷", "/"], ["C", "clear"],
      [4, "four"], [5, "five"], [6, "six"], ["×", "*"], ["CE", "clear-entry"],
      [1, "one"], [2, "two"], [3, "three"], ["–", "-"], ["√", "squareroot"],
      ["±", "negative"], [0, "zero"], [".", "decimal"], ["+", "+"],
      ["=", "equals"]];

  const [calc, setCalc] = React.useState({
      num: 0,
      operand: "",
      result: 0,
      string: "",
      parenStarted: false,
  });

  const [display, setDisplay] = React.useState({
      string: "0",
  });

  const [memory, setMemory] = React.useState({
      mem: 0,
      memset: false,
      justRecalled: false, //use to prevent #s from appending to the memory value
  })

  React.useEffect(() => {
      console.log(calc);
      console.log(memory);
      // console.log(display);
  }, [calc, memory])

  // React.useEffect(() => {
  //     console.log(calc);
  // }, [calc])

  // React.useEffect(() => {
  //     console.log(memory);
  // }, [memory])

  //side effect: code only gets called when contents of CALC get changed
  React.useEffect(() => {
      //assign to num or result, then add a period if necessary
      let preString = calc.num ? calc.num.toString() : calc.result.toString();
      if (!(preString === "(" || preString == "ERROR")) {
          preString = format(preString);
          if (!preString.includes(".")) {
              preString += "."
          }
      }
      setDisplay({ string: preString });
  }, [calc])

  const resetLastPressed = () => {
      setMemory({
          ...memory,
          justRecalled: false,
      })
  }

  const format = (n) => {
      let num = new Intl.NumberFormat('en-US', {
          maximumSignificantDigits: 8
      }).format(n);

      num = new Intl.NumberFormat('en-US', {
          maximumFractionDigits: 7
      }).format(removeCommas(num));

      if (num == "-0") {
          return "0"
      }

      //include trailing 0s in decimals:\\\\\\\\\\\\\\\\\\\\\\\\\
      if (n.includes(".")) {
          if (!num.includes(".")) {
              num += ".";
          }
          let trailingZeros = 0;
          //start at string end & move inwards, break if not a 0
          for (let i = n.length - 1; i > 0; i--) {
              if (n[i] === "0") {
                  trailingZeros++;
              } else {
                  break;
              }
          }
          //append the # of trailing 0s
          for (let i = 0; i < trailingZeros; i++) {
              num += "0";
          }
      }

      return num;
  }

  const removeCommas = (string) => {
      return string.replace(/,/g, '');
  }

  const prefixIfPriorIsOperand = (string) => {
      if (string == "") {
          return string;
      }
      let lastEntry = string[string.length - 1];
      let stringPrefix = "";
      //only change the stringPrefix for operators. this prevents appending the memory value to a previous string of #s
      if (lastEntry == "+" || lastEntry == "-" || lastEntry == "*" || lastEntry == "/" || lastEntry == "(") {
          stringPrefix = string;
      }
      return stringPrefix;
  }

  const validPreOperandDisplay = () => {
      if (display.string == "(" || display.string == "ERROR") {
          return false;
      }
      return true;
  }

  const parenLeftClickHandler = () => {
      if (!validPreOperandDisplay()) {
          return;
      }
      if (calc.parenStarted == false) {
          let stringPrefix = prefixIfPriorIsOperand(calc.string);
          setCalc({
              ...calc,
              num: "(",
              result: 0,
              string: stringPrefix + "(",
              parenStarted: true,
          });
      }
      resetLastPressed();
  }

  const parenRightClickHandler = () => {
      if (calc.parenStarted == true) {
          if (!(calc.num == 0 && calc.result == 0)) {
              setCalc({
                  ...calc,
                  string: calc.string + ")",
                  parenStarted: false,
              });
          }
          equalsClickHandler();
      }
      resetLastPressed();
  }

  const numberClickHandler = (num) => {
      const keyPressed = num.toString();

      //make sure there's less than 8 digits 
      let str = calc.num.toString();
      const regex = /[0-9]/g;
      const digitCount = (str.match(regex) || []).length;
      if (digitCount < 8) {

          if (!(calc.num === "0" && keyPressed == '0')) { //no leading 0s
              setCalc({
                  ...calc,
                  num: (calc.num === 0 || calc.num === '(' || calc.num === '0') ? keyPressed : //needs ===, as 0. == 0
                      (keyPressed === "0") ? calc.num + '0' : //special exception for adding 0s after decimal
                          (calc.num) + keyPressed,
                  result: (!calc.operand) ? 0 : calc.result, //reset result to 0 when clicking a # after equalsHandling
                  string: (memory.justRecalled || calc.string == "0") ? keyPressed : calc.string + keyPressed, //if a # is hit right after recalling, reset the string to just the #. 
              });

              resetLastPressed();
          }
      }
  };

  const decimalClickHandler = () => {
      //prevent adding multiple decimals
      if (!calc.num.toString().includes('.')) {
          setCalc({
              ...calc,
              num: (calc.num == 0 || calc.num == "(") ? "0." : calc.num + ".",//add leading 0 for proper decimals, else just add on "."
              string: memory.justRecalled ? "0." : calc.string + '.',
          })
      }
      resetLastPressed();
  };

  const squarerootClickHandler = () => {
      if (!validPreOperandDisplay()) {
          return;
      }
      resetLastPressed();
      let root = 0;
      if (calc.result !== 0) {
          root = Math.sqrt(calc.result)
      } else {
          root = Math.sqrt(calc.num)
      }
      //NaN check (for negative roots):
      if (root !== root) {
          root = "ERROR";
      }
      setCalc({
          ...calc,
          num: 0,
          result: root,
          string: ""
      })
  };

  const negativeClickHandler = () => {
      if (!validPreOperandDisplay()) {
          return;
      }
      if (!(calc.num == 0 && calc.result == 0)) {
          if (calc.num === 0 && calc.result !== 0) {
              setCalc({
                  ...calc,
                  result: calc.result * -1,
                  string: calc.string + "*-1",
              });
          } else {
              setCalc({
                  ...calc,
                  num: calc.num * -1,
                  string: calc.string + "*-1",
              });
          };
      }
  }

  const operandClickHandler = (op) => {
      if (!validPreOperandDisplay()) {
          return;
      }
      if (calc.num || calc.result) {
          // if (calc.string[calc.string.length - 1] != "(") {
          setCalc({
              ...calc,
              operand: op,
              //if there's a result & no new number, re-use old result for equals-to-operand chain input
              result: (calc.result && !calc.num) ? calc.result.toString() : calc.num,
              string: (calc.result && !calc.num && !calc.parenStarted) ? calc.result.toString() + op : calc.string + op,
              num: 0,
          });
          resetLastPressed();
          // }
      }
  }

  const equalsClickHandler = (opr = "") => {
      if (!validPreOperandDisplay()) {
          return;
      }
      let evalString = calc.string;
      if (evalString !== "") {
          //add closing parentheses if it's currently missing
          if (calc.parenStarted == true) {
              evalString += (")")
          }
          const res = eval((evalString));//(eval(calc.string.replace(/,/g, '')))

          setCalc({
              ...calc,
              num: 0,
              result: Math.abs(res) <= 99999999 ? (removeCommas(format(res.toString()))) : "ERROR",
              operand: "",
              string: "",
              parenStarted: false,
          })
      }
  };

  //MEMORY
  const memAddHandler = () => {
      if (!validPreOperandDisplay()) {
          return;
      }
      const valueOnScreen = parseFloat(removeCommas(display.string))
      setMemory({
          ...memory,
          mem: memory.mem + valueOnScreen,
          memset: true,
          justRecalled: true,
      })

      setCalc({
          ...calc,
          num: 0,
          result: valueOnScreen,
      })

  }

  const memClearHandler = () => {
      if (!validPreOperandDisplay()) {
          return;
      }
      const valueOnScreen = parseFloat(removeCommas(display.string))

      setCalc({
          ...calc,
          num: valueOnScreen,
          result: 0,
          string: valueOnScreen.toString(),

      })
      setMemory({
          mem: 0,
          memset: false,
          justRecalled: false,
      })
  }

  const memRecallHandler = () => {
      if (!validPreOperandDisplay()) {
          return;
      }
      let stringPrefix = prefixIfPriorIsOperand(calc.string);

      setMemory({
          ...memory,
          justRecalled: true
      })

      setCalc({
          ...calc,
          result: memory.mem,
          num: 0,
          string: stringPrefix + memory.mem,
          //string: calc.parenStarted ? calc.string + memory.mem : "",//"",//stringPrefix + memory.mem
      })


  }

  //reset everything
  const clearClickHandler = () => {
      setCalc({
          num: 0,
          operand: "",
          result: 0,
          string: "",
          parenStarted: false,
      });
  }

  //only clear most recent entry
  const clearEntryClickHandler = () => {
      if (!validPreOperandDisplay()) {
          return;
      }
      let digits = calc.num;
      if (digits[0] == '0' && digits[1] == '.') {
          digits = digits.substring(1); //truncate the first 0 from the string, because calc.string doesn't store the first 0
      }
      setCalc({
          ...calc,
          num: 0,
          string: calc.string.substring(0, calc.string.length - digits.length),
          //remove the length of num from the END of the string
      });
  }

  //listen for keyboard presses
  React.useEffect(() => {
      function handleKeydown(e) {
          const key = e.key
          switch (key) {
              case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case '0':
                  numberClickHandler((key));
                  break;
              case 'Enter': case '=':
                  equalsClickHandler();
                  break;
              case '.':
                  decimalClickHandler();
                  break;
              case 'c':
                  clearClickHandler();
                  break;
              case '+':
                  operandClickHandler("+");
                  break;
              case '-':
                  operandClickHandler("-");
                  break;
              case '/':
                  operandClickHandler("/");
                  break;
              case '*':
                  operandClickHandler("*");
                  break;
              case '(':
                  parenLeftClickHandler();
                  break;
              case ')':
                  parenRightClickHandler();
                  break;
              default:
          }
      }

      document.addEventListener("keydown", handleKeydown)
      //remove eventListener in the return, or you get weird repeating states for keyboard entry
      return () => document.removeEventListener("keydown", handleKeydown)
  }, [numberClickHandler]); //use dependency, or you only get 1 number in display at a time for keyboard entry

  return (
      <div className="container">
          <div className="calc-body mt-3">
              {/* what appears at the top: display num unless it's 0 -- else display result */}
              <div id="display" className='display-box m-1'>
                  <div id='displayL' className="fs-3">{memory.memset ? "M" : ""}</div>
                  <div id='displayR' className="fs-3 px-1">{display.string}</div>
              </div>

              <div className="button-box m-1">

                  {btns.map((item) =>

                      (item[1] === "parenright") ? <div className="calc-btn text-center fs-2"
                          id={calc.parenStarted ? item[1] : "paren-inactive"}
                          key={item[1]}
                          onClick={parenRightClickHandler}>{item[0]}</div> :

                          (item[1] === "parenleft") ? <div className="calc-btn text-center fs-2"
                              id={!calc.parenStarted ? item[1] : "paren-inactive"}
                              key={item[1]}
                              onClick={parenLeftClickHandler}>{item[0]}</div> :

                              <div className="calc-btn text-center fs-2"
                                  id={item[1]}
                                  key={item[1]}
                                  onClick={(item[1] === "negative") ? negativeClickHandler :
                                      (item[1] === "decimal") ? decimalClickHandler :
                                          (item[1] === "clear") ? clearClickHandler :
                                              (item[1] === "clear-entry") ? clearEntryClickHandler :
                                                  (item[1] === "squareroot") ? squarerootClickHandler :
                                                      (item[1] === "memrecall") ? memRecallHandler :
                                                          (item[1] === "memclear") ? memClearHandler :
                                                              (item[1] === "memadd") ? memAddHandler :
                                                                  // (item[1] === "parenleft") ? parenLeftClickHandler :
                                                                  //     (item[1] === "parenright") ? parenRightClickHandler :
                                                                  (item[1] === "+" || item[1] === "-" || item[1] === "*" || item[1] === "/") ? () => operandClickHandler(item[1]) :
                                                                      (item[1] === "equals") ? () => equalsClickHandler() : () => numberClickHandler(item[0])}>
                                  {/* anonymous arrow function needed on equals Handler because it has a default parameter */}
                                  {item[0]}
                              </div>
                  )}
              </div>
          </div >
      </div>
  )
}

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
