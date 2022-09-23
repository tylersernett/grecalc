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

    it("click tests", () => {
        render(<TestCalc />);
        let display = screen.getByText(/0./i);

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

        // const plus = screen.getByText(/^\+$/);
        const plus = screen.getByRole('button', { name: /＋/i });
        const minus = screen.getByText(/–/i);
        const times = screen.getByText(/×/i);
        const divide = screen.getByText(/÷/i);
        const root = screen.getByText(/√/i);
        const plusminus = screen.getByText(/±/i);
        const equals = screen.getByText(/=/i);
        const clear = screen.getByText(/^C$/i);
        const clearEntry = screen.getByText(/^CE$/i);

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
        userEvent.click(clear);
        userEvent.click(four);
        userEvent.click(times);
        userEvent.click(memrecall);
        userEvent.click(equals);
        expect(display).toHaveTextContent(`108`);

        userEvent.click(memclear);
        
        //clear entry
        userEvent.click(clear);
        userEvent.click(one);
        userEvent.click(zero);
        userEvent.click(zero);
        userEvent.click(plus);
        userEvent.click(five);
        userEvent.click(five);
        userEvent.click(clearEntry);
        userEvent.click(eight);
        userEvent.click(eight);
        userEvent.click(equals);
        expect(display).toHaveTextContent(`188`);

        //positive root
        userEvent.click(clear);
        userEvent.click(nine);
        userEvent.click(root);
        expect(display).toHaveTextContent(`3.`);
        userEvent.click(clear);

        //negative root
        userEvent.click(clear);
        userEvent.click(five);
        userEvent.click(plusminus);
        userEvent.click(root);
        expect(display).toHaveTextContent(`ERROR`);
        userEvent.click(clear);
    });

    it("plusminus check", () => {
        render(<TestCalc />);
        const plusminus = screen.getByText(/±/i);
        const times = screen.getByText(/×/i);
        const minus = screen.getByText(/–/i);

        userEvent.click(clear);
        userEvent.click(five);
        userEvent.click(plusminus);
        expect(display).toHaveTextContent(/-5./);
        userEvent.click(times);
        userEvent.click(five);
        userEvent.click(equals);
        expect(display).toHaveTextContent(/-25./);
        userEvent.click(plusminus);
        expect(display).toHaveTextContent(/25./);
        userEvent.click(minus);
        userEvent.click(five);
        userEvent.click(plusminus);
        userEvent.click(equals);
        expect(display).toHaveTextContent(/30./);

        userEvent.click(clear);
    });

    it("plusminus memory check", () => {
        render(<TestCalc />);
        const plusminus = screen.getByText(/±/i);
        const times = screen.getByText(/×/i);
        const minus = screen.getByText(/–/i);
        const memrecall = screen.getByText(/MR/i);
        const memclear = screen.getByText(/MC/i);
        const memadd = screen.getByText(/M\+/i);

        userEvent.click(clear);
        userEvent.click(nine);
        userEvent.click(memadd);
        userEvent.click(clear);
        userEvent.keyboard("18*");
        userEvent.click(memrecall);
        userEvent.click(plusminus);
        userEvent.click(equals);
        expect(display).toHaveTextContent(/-162./);

    });

    it("PEMDAS check", () => {
        render(<TestCalc />);
        userEvent.keyboard("1+2*3=");
        expect(display).toHaveTextContent(`7`);
    });

    it("parentheses", () => {
        render(<TestCalc />);
        userEvent.keyboard("(1+2)*3=");
        expect(display).toHaveTextContent(`9`);
    });

    it("parentheses lock", () => {
        render(<TestCalc />);
        userEvent.keyboard("(*+/-");
        expect(display).toHaveTextContent(`(`);
    });

    it("clear to 0", () => {
        render(<TestCalc />);
        userEvent.keyboard("(1+2)*3=c");
        expect(display).toHaveTextContent(`0.`);
    });

    it("leading 0 decimal", () => {
        render(<TestCalc />);
        userEvent.keyboard("0.00");
        expect(display).toHaveTextContent(`0.00`);
    });

    it("8 digit display cap: leading 0 decimal ", () => {
        render(<TestCalc />);
        userEvent.keyboard("0.0000007123");
        expect(display).toHaveTextContent(/^0.0000007$/);
    });

    it("8 digit display cap: integer", () => {
        render(<TestCalc />);
        userEvent.keyboard("1234567890");
        expect(display).toHaveTextContent(/^12,345,678.$/);
    });

    it("8 digit display cap: mixed", () => {
        render(<TestCalc />);
        userEvent.keyboard("12345.67890");
        expect(display).toHaveTextContent(/^12,345.678$/);
    });

    it("8 digit display cap: exceeded via operation (positive)", () => {
        render(<TestCalc />);
        userEvent.keyboard("88888888*2=");
        expect(display).toHaveTextContent(/^ERROR$/);
    });

    it("8 digit display cap: exceeded via operation (negative)", () => {
        render(<TestCalc />);
        userEvent.keyboard("0-88888888=-22222222=");
        expect(display).toHaveTextContent(/^ERROR$/);
    });

    it("8 digit display cap: ensure decimals are lossy", () => {
        render(<TestCalc />);
        userEvent.keyboard("1/7=*7=");
        expect(display).toHaveTextContent(/^0.9999997$/);
    });

    it("8 digit display cap: lose decimal when non-decimal figure added", () => {
        render(<TestCalc />);
        userEvent.keyboard("9.0000001+3=");
        expect(display).toHaveTextContent(/^12.$/);
    });

    it("accept 0 as initial entry", () => {
        render(<TestCalc />);
        userEvent.keyboard("0-5=");
        expect(display).toHaveTextContent(/^-5.$/);
    });

    it("div by 0 (typed)", () => {
        render(<TestCalc />);
        userEvent.keyboard("7/0=")
        expect(display).toHaveTextContent("ERROR");
    });

    it("only use most recent operand", () => {
        render(<TestCalc />);
        userEvent.keyboard("7/-*+3=")
        expect(display).toHaveTextContent("10");
    });

});