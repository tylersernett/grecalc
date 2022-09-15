function App() {
    // {display, id}
    const btns = [[7, "seven"], [8, "eight"], [9, "nine"], ["÷", "divide"],
    [4, "four"], [5, "five"], [6, "six"], ["×", "multiply"],
    [1, "one"], [2, "two"], [3, "three"], ["–", "subtract"],
    ["±", "negative"], [0, "zero"], [".", "decimal"], ["+", "add"],
    ["C", "clear"], ["CE", "clear-entry"], ["=", "equals"]];

    const [calc, setCalc] = React.useState({
        num: 0,
        operand: "",
        result: 0
    });

    React.useEffect(() => {
        console.log(calc);
    })

    const numberClickHandler = (num) => {
        const value = num.toString();
        if (!(calc.num === 0 && value == 0)) { //no leading 0s
            setCalc({
                ...calc,
                num: (calc.num === 0) ? value : calc.num + value,//needs ===, as 0. == 0
                result: (!calc.operand) ? 0 : calc.result //reset result to 0 when clicking a # after equalsHandling
            });
        }
    };

    const equalsClickHandler = (opr = "") => {
        switch (calc.operand) {
            case "add":
                setCalc({ ...calc, num: 0, operand: opr, result: (Number(calc.result) + Number(calc.num)).toString() })
                break;
            case "subtract":
                setCalc({ ...calc, num: 0, operand: opr, result: (Number(calc.result) - Number(calc.num)).toString() })
                break;
            case "multiply":
                setCalc({ ...calc, num: 0, operand: opr, result: (Number(calc.result) * Number(calc.num)).toString() })
                break;
            case "divide":
                setCalc({ ...calc, num: 0, operand: opr, result: (calc.num == "0") ? "Cannot divide by 0" : (Number(calc.result) / Number(calc.num)).toString() })
                break;
            default:
                break;
        }
    };

    const decimalClickHandler = () => {
        //prevent adding multiple decimals
        if (!calc.num.toString().includes('.')) {
            setCalc({
                ...calc,
                num: (calc.num == 0) ? "0." : calc.num + "."//add leading 0 for proper fractions
            })
        }
    };

    const negativeClickHandler = () => {
        if (calc.num === 0 && calc.result !== 0) {
            setCalc({
                ...calc,
                result: (calc.result * -1)
            });
        } else {
            setCalc({
                ...calc,
                num: (calc.num * -1)
            });
        };
    }

    const operandClickHandler = (op) => {
        if (calc.num && calc.result) {
            equalsClickHandler(op);//treat operand input as equals when it's a operand-to-operand (no equals) chain input
        } else {
            setCalc({
                ...calc,
                operand: op,
                //if there's a result & no new number, re-use old result for equals-to-operand chain input
                result: (calc.result && !calc.num) ? calc.result : calc.num,
                num: 0
            });
        }
    }

    const clearClickHandler = () => {
        setCalc({
            num: 0,
            operand: "",
            result: 0
        });
    }

    //only clear most recent entry
    const clearEntryClickHandler = () => {
        setCalc({
            ...calc,
            num: 0,
        });
    }

    React.useEffect(() => {
        function handleKeydown(e) {
            const key = e.key
            switch (key) {
                case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case '0':
                    numberClickHandler(key);
                    break;
                case 'Enter':
                    equalsClickHandler();
                    break;
                case '.':
                    decimalClickHandler();
                    break;
                case '+':
                    operandClickHandler("add");
                    break;
                case '-':
                    operandClickHandler("subtract");
                    break;
                case '/':
                    operandClickHandler("divide");
                    break;
                case '*':
                    operandClickHandler("multiply");
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
                <div id="display" className="text-end fs-3 mx-2 mt-2 px-1">{calc.num ? calc.num : calc.result}</div>
                <div className="button-box m-1">
                    {btns.map((item) =>
                        <div className="calc-btn btn-primary text-center fs-2 border-0 m-1"
                            id={item[1]}
                            key={item[1]}
                            onClick={(item[1] === "negative") ? negativeClickHandler :
                                (item[1] === "decimal") ? decimalClickHandler :
                                    (item[1] === "clear") ? clearClickHandler :
                                        (item[1] === "clear-entry") ? clearEntryClickHandler :
                                            (item[1] === "add" || item[1] === "subtract" || item[1] === "multiply" || item[1] === "divide") ? () => operandClickHandler(item[1]) :
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

//add sqrt button
//redo equalsClickHandle switch statement for less redundancy
//add keypress listener
//how does GRE calc handle -? as negative, or always subtract?
//and backspace delete for clear/ CE??