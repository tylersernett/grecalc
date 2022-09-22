import Calculator from './calculator';
import numberClickHandler from './calculator';
import operandClickHandler from './calculator';
import equalsClickHandler from './calculator';
import { render, screen, cleanup } from '@testing-library/react';
import "@testing-library/react/dont-cleanup-after-each";
import userEvent from '@testing-library/user-event';

// import { renderHook } from '../node_modules/@testing-library/react-hooks';

function TestCalc() {
    return (
        <Calculator />
    );
}

describe("TestCalc", () => {
    render(<TestCalc />);
    let display = screen.getByText(/0./i)
    const one = screen.getByText(/1/i);
    const two = screen.getByText(/2/i);
    const three = screen.getByText(/3/i);
    const four = screen.getByText(/4/i);
    const five = screen.getByText(/5/i);
    const six = screen.getByText(/6/i);
    const seven = screen.getByText(/7/i);
    const eight = screen.getByText(/8/i);
    const nine = screen.getByText(/9/i);
    const zero = screen.getByText(/^0$/i);
    const point = screen.getByText(/^\.$/);

    const memrecall = screen.getByText(/MR/i);
    const memclear = screen.getByText(/MC/i);
    const memadd = screen.getByText(/M\+/i);
    const parenleft = screen.getByText(/\(/);
    const parenright = screen.getByText(/\)/);

    const plus = screen.getByText(/^\+$/);
    const minus = screen.getByText(/–/i);
    const times = screen.getByText(/×/i);
    const divide = screen.getByText(/÷/i);
    const root = screen.getByText(/√/i);
    const plusminus = screen.getByText(/±/i);
    const equals = screen.getByText(/=/i);

    const clear = screen.getByText(/^C$/i);
    const clearEntry = screen.getByText(/^CE$/i);

    it("math", () => {

        //simple addition
        userEvent.click(clear);
        userEvent.click(one);
        userEvent.click(plus);
        userEvent.click(two);
        userEvent.click(equals);
        expect(display).toHaveTextContent(`3`);
        userEvent.click(clear);

        //PEMDAS
        userEvent.click(clear);
        userEvent.click(one);
        userEvent.click(plus);
        userEvent.click(two);
        userEvent.click(times);
        userEvent.click(three);
        userEvent.click(equals);
        expect(display).toHaveTextContent(`7`);
        userEvent.click(clear);

        //div by 0
        userEvent.click(clear);
        userEvent.click(one);
        userEvent.click(divide);
        userEvent.click(zero);
        userEvent.click(equals);
        expect(display).toHaveTextContent(`ERROR`);
        userEvent.click(clear);

        //negative root
        userEvent.click(clear);
        userEvent.click(five);
        userEvent.click(plusminus);
        userEvent.click(root);
        expect(display).toHaveTextContent(`ERROR`);
        userEvent.click(clear);

        //memory tests
        userEvent.click(nine);
        userEvent.click(memadd);
        userEvent.click(clear);
        userEvent.click(memrecall);
        expect(display).toHaveTextContent(`9`);
        userEvent.click(memadd);
        userEvent.click(memadd);
        userEvent.click(memrecall);
        expect(display).toHaveTextContent(`27`);
    });
});

// beforeAll(() => {
//     render(<Calculator />);
//     const display = screen.getByText(/0./i)
//     const one = screen.getByText(/1/i);
//     const two = screen.getByText(/2/i);
//     const three = screen.getByText(/3/i);
//     const four = screen.getByText(/4/i);
//     const five = screen.getByText(/5/i);
//     const six = screen.getByText(/6/i);
//     const seven = screen.getByText(/7/i);
//     const eight = screen.getByText(/8/i);
//     const nine = screen.getByText(/9/i);
//     const zero = screen.getByText(/^0$/i);
//     const point = screen.getByText(/^\.$/);

//     const memrecall = screen.getByText(/MR/i);
//     const memclear = screen.getByText(/MC/i);
//     const memadd = screen.getByText(/M\+/i);
//     const parenleft = screen.getByText(/\(/);
//     const parenright = screen.getByText(/\)/);

//     const plus = screen.getByText(/^\+$/i);
//     const minus = screen.getByText(/–/i);
//     const times = screen.getByText(/×/i);
//     const divide = screen.getByText(/÷/i);
//     const root = screen.getByText(/√/i);
//     const plusminus = screen.getByText(/±/i);
//     const equals = screen.getByText(/=/i);

//     const clear = screen.getByText(/^C$/i);
//     const clearEntry = screen.getByText(/^CE$/i);
// })

/*
test('PEMDAS', () => {
    
    // setup();

    

    userEvent.click(clear);
    userEvent.click(one);
    userEvent.click(divide);
    userEvent.click(zero);
    userEvent.click(equals);
    expect(display).toHaveTextContent(`ERROR`);
    userEvent.click(clear);


});

test('PEM', () => {
    // setup();
    userEvent.click(clear);
    userEvent.click(one);
    userEvent.click(plus);
    userEvent.click(two);
    userEvent.click(times);
    userEvent.click(three);
    userEvent.click(equals);
    expect(display).toHaveTextContent(`7`);
    userEvent.click(clear);
})

test('negative root', () => {
    // setup();
    userEvent.click(clear);
    userEvent.click(five);
    userEvent.click(plusminus);
    userEvent.click(root);
    expect(display).toHaveTextContent(`ERROR`);
    userEvent.click(clear);

});

*/