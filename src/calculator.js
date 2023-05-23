import React, { useState, useEffect } from 'react';

function Calculator({ timerInputIsOpen, calcIsOpen, setCalcIsOpen }) {
  
    const [calc, setCalc] = useState({
        num: 0,
        operand: "",
        result: 0,
        string: "",
        parenStarted: false,
    });

    const [display, setDisplay] = useState({
        string: "0",
    });

    const [memory, setMemory] = useState({
        mem: 0,
        memset: false,
        justRecalled: false, //use to prevent #s from appending to the memory value
    })

    useEffect(() => {
        console.log(calc);
        console.log(memory);
        // console.log(display);
    }, [calc, memory])

    //FOR TESTING:
    // useEffect(() => {
    //     console.log(calc);
    // }, [calc])

    // useEffect(() => {
    //     console.log(memory);
    // }, [memory])

    //side effect: code only gets called when contents of CALC get changed
    useEffect(() => {
        //assign to num or result, then add a period if necessary
        let preString = calc.num ? calc.num.toString() : calc.result.toString();
        if (!(preString === "(" || preString === "ERROR")) {
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

        if (num === "-0") {
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
        if (string === "") {
            return string;
        }
        let lastEntry = string[string.length - 1];
        let stringPrefix = "";
        //only change the stringPrefix for operators. this prevents appending the memory value to a previous string of #s
        if (isOperand(lastEntry) || lastEntry === "(") {
            stringPrefix = string;
        }
        return stringPrefix;
    }

    const isOperand = (string) => {
        if (string === "+" || string === "-" || string === "*" || string === "/") {
            return true;
        }
        return false;
    }

    const validPreOperandDisplay = () => {
        if (display.string === "(" || display.string === "ERROR") {
            return false;
        }
        return true;
    }

    const parenLeftClickHandler = () => {
        if (!validPreOperandDisplay()) {
            return;
        }
        if (calc.parenStarted === false) {
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
        if (calc.parenStarted === true) {
            if (!(calc.num === 0 && calc.result === 0)) {
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
        if (display.string === "ERROR") {
            return;
        }
        const keyPressed = num.toString();

        //make sure there's less than 8 digits 
        let str = calc.num.toString();
        const regex = /[0-9]/g;
        const digitCount = (str.match(regex) || []).length;
        if (digitCount < 8) {

            if (!(calc.num === 0 && keyPressed === 0)) { //no leading 0s ???keyPressed SHOULD BE FALSE cause it's a string???
                setCalc({
                    ...calc,
                    num: (calc.num === 0 || calc.num === '(' || calc.num === '0') ? keyPressed : //use === for 0 checks, as 0. == 0
                        (keyPressed === "0") ? calc.num + '0' : //special exception: allow adding leading 0s after decimal
                            (calc.num) + keyPressed,
                    result: (!calc.operand) ? 0 : calc.result, //reset result to 0 when clicking a # after equalsHandling
                    string: (memory.justRecalled || calc.string === "0") ? keyPressed : calc.string + keyPressed, //if a # is hit right after recalling, reset the string to just the #. 
                });

                resetLastPressed();
            }
        }
    };

    const decimalClickHandler = () => {
        //prevent adding multiple decimals
        if (display.string === "ERROR") {
            return false;
        }
        if (!calc.num.toString().includes('.')) {
            setCalc({
                ...calc,
                num: (calc.num === 0 || calc.num === "(") ? "0." : calc.num + ".",//add leading 0 for proper decimals, else just add on "."
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

        //exit if final character is an operand
        if (isOperand( calc.string.slice(-1))) {
            return;
        }

        //only use '==' below to prevent negative appending to 0.0 or 0.000 etc. Negative appending requires nonzero value.
        if (!(calc.num == 0 && calc.result == 0)) {
            //match last # after operand...
            const regex = /([0-9.]+(?![*+/-]))$/;
            const operationString = calc.string;
            let lastNumber;
            let newop = "-";
            const matches = operationString.match(regex);
            if (matches !== null) {
                lastNumber = matches[0];
            } else {
                lastNumber = "";
                newop = "";
            }

            //slice from start to final operand
            let prefix = operationString.slice(0, calc.string.length - lastNumber.length);

            //correct for adjacent +,- (*- and /- is okay)
            const lastop = prefix[prefix.length - 1];
            if (lastop === "+") {
                prefix = prefix.slice(0, prefix.length - 1);
            } else if (lastop === "-") {
                prefix = prefix.slice(0, prefix.length - 1);
                newop = "+";
            }
            console.log("prefix: " + prefix + " | ln: " + lastNumber);
            if (calc.num === 0 && calc.result !== 0) {
                setCalc({
                    ...calc,
                    result: calc.result * -1,
                    string: prefix + newop + lastNumber,
                });
            } else {
                setCalc({
                    ...calc,
                    num: calc.num * -1,
                    string: prefix + newop + lastNumber,
                });
            };
        }
    }

    const operandClickHandler = (op) => {
        if (!validPreOperandDisplay()) {
            return;
        }
        if (calc.num || calc.result) {
            //if the last entry was an operator, this should be overridden by a new operand press
            let prefix = calc.string;
            const lastEntry = prefix[prefix.length - 1];
            if (isOperand(lastEntry)) {
                prefix = prefix.slice(0, prefix.length - 1)
            }
            setCalc({
                ...calc,
                operand: op,
                //if there's a result & no new number, re-use old result for equals-to-operand chain input
                result: (calc.result && !calc.num) ? calc.result.toString() : calc.num,
                string: (calc.result && !calc.num && !calc.parenStarted) ? calc.result.toString() + op : prefix + op,
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
            if (calc.parenStarted === true) {
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
        if (display.string === "ERROR") {
            return;
        }
        const valueOnScreen = parseFloat(removeCommas(display.string))

        setCalc({
            ...calc,
            num: 0,
            result: valueOnScreen,
            string: valueOnScreen.toString()+calc.operand,

        })
        setMemory({
            mem: 0,
            memset: false,
            justRecalled: false,
        })
    }

    const memRecallHandler = () => {
        if (display.string === "ERROR") {
            return;
        }
        let stringPrefix = prefixIfPriorIsOperand(calc.string);

        setMemory({
            ...memory,
            justRecalled: true
        })

        setCalc({
            ...calc,
            result: Math.abs(memory.mem) <= 99999999 ? (removeCommas(format(memory.mem.toString()))) : "ERROR",
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
        if (display.string === "ERROR") {
            return;
        }
        let lastEntry = calc.num;
        if (lastEntry[0] === '0' && lastEntry[1] === '.') {
            lastEntry = lastEntry.substring(1); //truncate the first 0 from the string, because calc.string doesn't store the first 0
        }
        if (!isOperand(lastEntry)) {
            setCalc({
                ...calc,
                num: 0,
                string: calc.string.substring(0, calc.string.length - lastEntry.length),
                parenStarted: (lastEntry === "(") ? false : calc.parenStarted,
                //remove the length of num from the END of the string
            });
        }
    }

    //listen for keyboard presses
    useEffect(() => {
        function handleKeydown(e) {
            console.log('check timerInput', timerInputIsOpen)
            if (!timerInputIsOpen) {
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
                    case '+': case '-': case '/': case '*':
                        operandClickHandler(key);
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
        }


        document.addEventListener("keydown", handleKeydown)
        //remove eventListener in the return, or you get weird repeating states for keyboard entry
        return () => document.removeEventListener("keydown", handleKeydown)
    }, [numberClickHandler]); //use dependency, or you only get 1 number in display at a time for keyboard entry

    const buttonMap = [
        {display: "MR", name: "memrecall",      function: memRecallHandler,                 label:"Memory Recall"}, 
        {display: "MC", name: "memclear",       function: memClearHandler,                  label:"Memory Clear"}, 
        {display: "M+", name: "memadd",         function: memAddHandler,                    label:"Memory Plus"},
        {display: "(",  name: !calc.parenStarted ? "parenleft" : "paren-inactive",      function: parenLeftClickHandler,    label:"Open Parenthesis"}, 
        {display: ")",  name: calc.parenStarted ? "parenright" : "paren-inactive",     function: parenRightClickHandler,    label:"Close Parenthesis"},

        {display: 7,    name: "seven",          function: () => numberClickHandler(7)}, 
        {display: 8,    name: "eight",          function: () => numberClickHandler(8)}, 
        {display: 9,    name: "nine",           function: () => numberClickHandler(9)}, 
        {display: "÷",  name: "/",              function: () => operandClickHandler("/"),   label:"Division Sign"}, 
        {display: "C",  name: "clear",          function: clearClickHandler,                label:"Clear All"},

        {display: 4,    name: "four",           function: () => numberClickHandler(4)}, 
        {display: 5,    name: "five",           function: () => numberClickHandler(5)}, 
        {display: 6,    name: "six",            function: () => numberClickHandler(6)}, 
        {display: "×",  name: "*",              function: () => operandClickHandler('*'),   label:"Multiplication Sign"}, 
        {display: "CE", name: "clear-entry",    function: clearEntryClickHandler,           label:"Clear Entry"},

        {display: 1,    name: "one",            function: () => numberClickHandler(1)}, 
        {display: 2,    name: "two",            function: () => numberClickHandler(2)}, 
        {display: 3,    name: "three",          function: () => numberClickHandler(3)}, 
        {display: "–",  name:  "-",             function: () => operandClickHandler('-'),   label:"Subtraction Sign"}, 
        {display: `√`,  name: "squareroot",     function: squarerootClickHandler,           label:"Square Root"},

        {display: "±",  name: "negative",       function: negativeClickHandler,             label:"Plus Minus Sign"}, 
        {display: 0,    name: "zero",           function: () => numberClickHandler(0)}, 
        {display: ".",  name:  "decimal",       function: decimalClickHandler,              label:"Decimal Point"}, 
        {display: "＋", name:  "+",             function: () => operandClickHandler('+'),   label:"Addition Sign"},
        {display: "=",  name: "equals",         function: equalsClickHandler,               label:"Equals Sign"}
    ];

    return (
        <>
        
        {calcIsOpen ? 
            <div className="calc-body mt-3" id='calc-body'>
                <div className='calc-top'>
                    <button className="close" aria-label="Close calculator" onClick={() => setCalcIsOpen(false)}>
                        <span aria-hidden="true">✕</span>
                    </button>
                </div>

                {/* what appears at the top: display num unless it's 0 -- else display result */}
                <div id="display" className='display-box m-1'>
                    <div id='displayL' className="">{memory.memset ? "M" : ""}</div>
                    <div id='displayR' className="px-1">{display.string}</div>
                </div>

                <div className="button-box m-1">
                    {buttonMap.map((item) => 
                        <button className="calc-btn" 
                        id={item.name} 
                        key={item.name}
                        aria-label={item.label}
                        onClick={item.function}>
                            {item.display}
                        </button>
                    )}
                </div>
            </div >
            : <></>}
        
        </>
    )
}

export default Calculator;
