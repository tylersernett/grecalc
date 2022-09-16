function App() {
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

    React.useEffect(() => {
        console.log(calc);
    })

    //add commas for every 3rd before .
    //return ERROR if > 8 places
    //add decimal

    const parenLeftClickHandler = () => {
        // const lp = /\(/g;
        // const rp = /\)/g;
        // if ((calc.string.match(lp) || []).length == (calc.string.match(rp) || []).length) {
        if (calc.parenStarted == false) {
            setCalc({
                ...calc,
                string: calc.string + "(",
                parenStarted: true,
            });
        }
    }

    const parenRightClickHandler = () => {
        // const lp = /\(/g;
        // const rp = /\)/g;
        // if ((calc.string.match(lp) || []).length -1 == (calc.string.match(rp) || []).length) {
        if (calc.parenStarted == true) {
            if (!(calc.num == 0 && calc.result == 0)) {
                setCalc({
                    ...calc,
                    string: calc.string + ")",
                    parenStarted: false,
                });
            }
        }
    }

    const numberClickHandler = (num) => {
        const stringValue = num;//.toString();
        if (!(calc.num === 0 && stringValue == 0)) { //no leading 0s
            //if (pemdasHolder[0] != 0 && pemdasHolder[1] != "") {
            setCalc({
                ...calc,
                num: (calc.num === 0) ? stringValue : calc.num + stringValue,//needs ===, as 0. == 0
                result: (!calc.operand) ? 0 : calc.result, //reset result to 0 when clicking a # after equalsHandling
                string: calc.string + stringValue
            });
            //}
        }
    };

    const decimalClickHandler = () => {
        //prevent adding multiple decimals
        if (!calc.num.toString().includes('.')) {
            setCalc({
                ...calc,
                num: (calc.num == 0) ? "0." : calc.num + ".",//add leading 0 for proper fractions
                string: calc.string + '.'
            })
        }
    };

    const squarerootClickHandler = () => {
        if (calc.num === 0 && calc.result !== 0) {
            setCalc({
                ...calc,
                result: Math.sqrt(calc.result),
                string: ""
            });
        } else {
            setCalc({
                ...calc,
                num: Math.sqrt(calc.num),
                string: ""
            });
        };
    };

    const negativeClickHandler = () => {
        if (!(calc.num === 0 && calc.result === 0)) {
            if (calc.num === 0 && calc.result !== 0) {
                setCalc({
                    ...calc,
                    result: (calc.result * -1),
                    string: calc.string + "*-1",
                });
            } else {
                setCalc({
                    ...calc,
                    num: (calc.num * -1),
                    string: calc.string + "*-1",
                });
            };
        }
    }



    //this determines when to execute the NEEDS*** --v
    // if its plus or minus, execut the needs if needs exists

    //this determines to INIT the NEEDS         --V
    //if you hit X or / and there's a + or / in queue, INIT needs
    //  [1]       [+]          [2]           [*]                [3]      [+]      [4]
    //    num=1   op=add      num=2          needs[res,opp]      num=3
    //           res=1                      [1,add]
    //           num=0                      op=mult
    //                                         res=2

    //4+5*6*4+5*6
    const operandClickHandler = (op) => {
        // if (calc.num && calc.result) { //ACTIVE
        // equalsClickHandler(op);//treat operand input as equals when it's a operand-to-operand (no equals) chain input
        // } else {
        setCalc({
            ...calc,
            operand: op,
            //if there's a result & no new number, re-use old result for equals-to-operand chain input
            //result: (calc.result && !calc.num) ? calc.result : calc.num,
            result: (calc.result && !calc.num) ? calc.result.toString() : calc.num,
            string: (calc.result && !calc.num) ? calc.result.toString() + op : calc.string + op,
            num: 0,
        });
        // }
    }

    const equalsClickHandler = (opr = "") => {
        if (calc.string !== "") {
            // switch (calc.operand) {
            //     case "+":
            //         setCalc({ ...calc, num: 0, operand: opr, result: (Number(calc.result) + Number(calc.num)).toString() })
            //         break;
            //     case "-":
            //         setCalc({ ...calc, num: 0, operand: opr, result: (Number(calc.result) - Number(calc.num)).toString() })
            //         break;
            //     case "*":
            //         setCalc({ ...calc, num: 0, operand: opr, result: (Number(calc.result) * Number(calc.num)).toString() })
            //         break;
            //     case "/":
            //         setCalc({ ...calc, num: 0, operand: opr, result: (calc.num == "0") ? "Cannot divide by 0" : (Number(calc.result) / Number(calc.num)).toString() })
            //         break;
            //     default:
            //         break;
            // }

            setCalc({
                ...calc,
                num: 0,
                result: eval(calc.string),
                string: "",
            })
        }
    };

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
        // let digits = calc.num;
        // if (digits[0] == '0' && digits[1] == '.') {
        //     digits = digits.substring(1);
        // }
        setCalc({
            ...calc,
            num: 0,
            // string: calc.string.substring(0, calc.string.length - digits.length),
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
        //remove eventListener, or you get weird repeating states for keyboard entry
        return () => document.removeEventListener("keydown", handleKeydown)
    }, [numberClickHandler]); //use dependency, or you only get 1 number in display at a time for keyboard entry

    return (
        <div className="container">
            <div className="calc-body mt-3" >
                {/* what appears at the top: display num unless it's 0 -- else display result */}
                <div id="display" className="text-end fs-3 mx-2 mt-2 px-1">{calc.num ? calc.num : calc.result}</div>

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
ReactDOM.render(<App />, document.getElementById('app'))

//redo equalsClickHandle switch statement for less redundancy
//how does GRE calc handle -? as negative, or always subtract?
//add character limit-- ROUNDS, not truncates
//add memory functions