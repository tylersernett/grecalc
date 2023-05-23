import Calculator from './calculator';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function TestCalc() {
    return (
        <Calculator timerInputIsOpen={false} calcIsOpen={true} setCalcIsOpen={null} />
    );

}

describe("TestCalc", () => {

    let display;
    let one, two, three, four, five, six, seven, eight, nine, zero, point;
    let memrecall, memclear, memadd, parenleft, parenright;
    let plus, minus, times, divide, root, plusminus, equals, clear, clearEntry;

    const setup = () => {
        render(<TestCalc />);
        display = screen.getByText(/0./i);

        one = screen.getByText(/1/i);
        two = screen.getByText(/2/i);
        three = screen.getByText(/3/i);
        four = screen.getByText(/4/i);
        five = screen.getByText(/5/i);
        six = screen.getByText(/6/i);
        seven = screen.getByText(/7/i);
        eight = screen.getByText(/8/i);
        nine = screen.getByText(/9/i);
        zero = screen.getByText(/^0$/i);
        point = screen.getByText(/^\.$/);

        memrecall = screen.getByText(/MR/i);
        memclear = screen.getByText(/MC/i);
        memadd = screen.getByText(/M\+/i);
        parenleft = screen.getByText(/\(/);
        parenright = screen.getByText(/\)/);

        plus = screen.getByText(/＋/i);
        minus = screen.getByText(/–/i);
        times = screen.getByText(/×/i);
        divide = screen.getByText(/÷/i);
        root = screen.getByText(/√/i);
        plusminus = screen.getByText(/±/i);
        equals = screen.getByText(/=/i);
        clear = screen.getByText(/^C$/i);
        clearEntry = screen.getByText(/^CE$/i);
    };

    describe("click inputs", () => {
        
        it("should handle in-line PEMDAS", () => {
            setup();
            userEvent.click(clear);
            userEvent.click(one);
            userEvent.click(plus);
            userEvent.click(two);
            userEvent.click(times);
            userEvent.click(three);
            userEvent.click(equals);
            expect(display).toHaveTextContent(`7`);
            userEvent.click(clear);
        });

        it("should handle parentheses PEMDAS", () => {
            setup();
            userEvent.click(clear);
            userEvent.click(parenleft);
            userEvent.click(one);
            userEvent.click(plus);
            userEvent.click(two);
            parenright = screen.getByText(/\)/); //call this again here because the original parenright is disabled
            userEvent.click(parenright);
            userEvent.click(times);
            userEvent.click(three);
            userEvent.click(equals);
            expect(display).toHaveTextContent(`9`);
            userEvent.click(clear);
        });

        it("should produce div by 0 errors", () => {
            setup();
            userEvent.click(clear);
            userEvent.click(one);
            userEvent.click(divide);
            userEvent.click(zero);
            userEvent.click(equals);
            expect(display).toHaveTextContent(`ERROR`);
            userEvent.click(clear);
        });

        it("should handle all memory buttons", () => {
            setup();
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
        });

        it("should handle clear entry", () => {
            setup();
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
        });

        it("should handle positive sq roots", () => {
            setup();
            userEvent.click(clear);
            userEvent.click(nine);
            userEvent.click(root);
            expect(display).toHaveTextContent(`3.`);
            userEvent.click(clear);
        });

        it("should error negative sq roots", () => {
            setup();
            userEvent.click(clear);
            userEvent.click(five);
            userEvent.click(plusminus);
            userEvent.click(root);
            expect(display).toHaveTextContent(`ERROR`);
            userEvent.click(clear);
        });

        it("should handle plus/minus changes", () => {
            setup();
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

        it("should properly handle plusminus on memory", () => {
            setup();
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
    });

    it("should handle expressions, rather than one-step calculation", () => {
        setup();
        userEvent.keyboard("1+2*3=");
        expect(display).toHaveTextContent(`7`);
    });

    it("should handle parentheses", () => {
        setup();
        userEvent.keyboard("(1+2)*3=");
        expect(display).toHaveTextContent(`9`);
    });

    it("should not accept operands after parentheses", () => {
        setup();
        userEvent.keyboard("(*+/-");
        expect(display).toHaveTextContent(`(`);
    });

    it("should return 0 after Clear is input", () => {
        setup();
        userEvent.keyboard("(1+2)*3=c");
        expect(display).toHaveTextContent(`0.`);
    });

    it("should display NOT display leading 0s for integers", () => {
        setup();
        userEvent.keyboard("00012");
        expect(display).toHaveTextContent(/^12.$/);
    });

    it("should display leading 0s after decimals", () => {
        setup();
        userEvent.keyboard("0.00");
        expect(display).toHaveTextContent(`0.00`);
    });

    it("should have an 8 digit display cap: leading 0 decimal", () => {
        setup();
        userEvent.keyboard("0.0000007123");
        expect(display).toHaveTextContent(/^0.0000007$/);
    });

    it("should have an 8 digit display cap: integer input", () => {
        setup();
        userEvent.keyboard("1234567890");
        expect(display).toHaveTextContent(/^12,345,678.$/);
    });

    it("should have an 8 digit display cap: mixed", () => {
        setup();
        userEvent.keyboard("12345.67890");
        expect(display).toHaveTextContent(/^12,345.678$/);
    });

    it("should have an 8 digit display cap: exceeded via operation (positive)", () => {
        setup();
        userEvent.keyboard("88888888*2=");
        expect(display).toHaveTextContent(/^ERROR$/);
    });

    it("should have an 8 digit display cap: exceeded via operation (negative)", () => {
        setup();
        userEvent.keyboard("0-88888888=-22222222=");
        expect(display).toHaveTextContent(/^ERROR$/);
    });

    it("should have an 8 digit display cap: ensure decimals are lossy", () => {
        setup();
        userEvent.keyboard("1/7=*7=");
        expect(display).toHaveTextContent(/^0.9999997$/);
    });

    it("should have an 8 digit display cap: lose decimal when non-decimal figure added", () => {
        setup();
        userEvent.keyboard("9.0000001+3=");
        expect(display).toHaveTextContent(/^12.$/);
    });

    it("should accept 0 as an initial entry", () => {
        setup();
        userEvent.keyboard("0-5=");
        expect(display).toHaveTextContent(/^-5.$/);
    });

    it("should return ERROR after division by 0 (typed)", () => {
        setup();
        userEvent.keyboard("7/0=");
        expect(display).toHaveTextContent("ERROR");
    });

    it("should require a CLEAR after ERROR", () => {
        setup();
        userEvent.keyboard("7/0=");
        expect(display).toHaveTextContent("ERROR");
        userEvent.keyboard("(1+2*3-4)/567890");
        expect(display).toHaveTextContent("ERROR");
        userEvent.keyboard("c");
        expect(display).toHaveTextContent("0.");
    });

    it("should only apply the most recent operand", () => {
        setup();
        userEvent.keyboard("7/-*+3=");
        expect(display).toHaveTextContent("10");
    });

    it("should use the previous result when starting a sequential operation", () => {
        setup();
        userEvent.keyboard("2+3=*4=");
        expect(display).toHaveTextContent("20");
    });

    it("should CLEAR ENTRY for the most recent parentheses, but not allow operand change", () => {
        setup();
        userEvent.keyboard("9*(");
        expect(display).toHaveTextContent("(");
        userEvent.click(clearEntry);
        expect(display).toHaveTextContent("0");
        userEvent.keyboard("+3=");
        expect(display).toHaveTextContent("27.");
    });

    it("should not allow negative 0", () => {
        setup();
        userEvent.keyboard("0.00");
        userEvent.click(plusminus);
        expect(display).toHaveTextContent(/0.00/);
    });

    it("should not allow negative after operand [A]", () => {
        setup();
        userEvent.keyboard("5+");
        userEvent.click(plusminus);
        userEvent.keyboard("3=");
        expect(display).toHaveTextContent(/8./);
    });

    it("should not allow negative after operand [B]", () => {
        setup();
        userEvent.keyboard("5");
        userEvent.click(plusminus);
        userEvent.keyboard("*");
        userEvent.click(plusminus);
        userEvent.keyboard("3=");
        expect(display).toHaveTextContent(/-15./);
    });

});