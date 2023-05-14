# GRE Calculator Dashboard
An emulation of the GRE calculator & timer.

Problem: The GRE PowerPreps are buried deep in the ETS website, requiring login and multiple steps to open, creating a barrier to quick practice. Furthermore, the GRE calculator is quite particular -- practicing with a phone calculator or other advanced calculators do not properly reflect the limitations imposed by the GRE calculator (max display: 8 chars, only 1 active parentheses set allowed, other quirks)

Solution: The GRE Calculator Dashboard, which allows for access to the GRE calculator and timer applets in one convenient place.

## Notes: Number Formatting:

```javascript
    const formatter = new Intl.NumberFormat('en-US', {
        maximumSignificantDigits: 8,
        maximumFractionDigits: 7,
    })
    //above doesn't work because maximumFractionDigits overrides the maximumSignificantDigits -- so run it twice instead

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
        return num;
    }
```

## Notes: Using react portal for modal:
```javascript
import ReactDOM from 'react-dom'

    return ReactDOM.createPortal(
        <>
        </>,
        document.getElementById('portal')
    )
```
and add 
```HTML
<div id="portal"></div>
```
to HTML file

## Notes: State Management
Problem: calculator needs to access a piece of state from the timer. Right now, #s entered into the time input box are also updating the calculator display.
Solution: move the state up into the parent component (index.js or App.js), so both timer.js and calculator.js can access.
```javascript
function App() {
  const [timerInputIsOpen, setTimerInputIsOpen] = useState(false);
```

And now pass the relevant pieces of state to the components:
```javascript
  return (
    <div>
      <Timer timerInputIsOpen={timerInputIsOpen} setTimerInputIsOpen={setTimerInputIsOpen}/>
      <Calculator timerInputIsOpen={timerInputIsOpen} />
    </div>
  )
```

And update the component functions to accept these parameters:
(in timer.js)
```javascript
function Timer({timerInputIsOpen, setTimerInputIsOpen}) {
    ...
```

in calculator.js:
```javascript
function Calculator({timerInputIsOpen}) {
    ...
```

## Notes: Drag and Drop
Issue: client can drag calculator all the way off screen
Solution: clamp the values to the visible area

```Javascript
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
let appWidth = document.getElementsByClassName('app-container')[0].offsetWidth;
let appHeight = document.getElementsByClassName('white-body')[0].scrollHeight
let calcElem = document.getElementById('calc-body'); 
let calcWidth = calcElem.offsetWidth; 
let calcHeight = calcElem.offsetHeight; 

let minWidth = -appWidth + calcWidth + 10;
let maxWidth = appWidth - coords.x - calcWidth;

//account for calc body top margin:
let marginString = getComputedStyle(calcElem).marginTop
let marginInt = parseInt(marginString); //crop the 'px' from the string & convert to integer
let bannersElem = document.getElementById('banners');
let minHeight = -(bannersElem.offsetHeight + marginInt); //-134
let maxHeight = appHeight - calcHeight - marginInt;

let xSum = position.x + MouseEvent.movementX;
let ySum = position.y + MouseEvent.movementY;
position.x = clamp(xSum, minWidth, maxWidth );
position.y = clamp(ySum, minHeight, maxHeight);

if (element) {
  element.style.transform = `translate(${position.x}px, ${position.y}px)`;
}
setPosition(position);
```

## Notes: useRef Best Practices
useRef: when you don't need to update the render

## Notes: Input Limitations
Issue: timerInput can accept letters and non-digits, resulting in NaN display.
Solution: add attribute: {pattern="\d*"} to input tag.

## Notes: Styling
adjust vertical position:
    css: line-height

proper footer position:
https://stackoverflow.com/questions/90178/make-a-div-fill-the-height-of-the-remaining-screen-space
all the "top-level" tags must have height 100%
```css
html, body, #root { height: 100%}
```

Then set footer:
```css
footer {
  flex: 0 1 40px;
  text-align: center;
}
```
And content above footer should have: (you can use a spacer)
```css
.spacer{
  flex: 1 1 auto;
}
```

## Notes: Media query not working?
Make sure it's at the end of the css file!

## Notes: Overflow text not centering?
Use the following CSS:
```css
{
  display: flex;
  justify-content: center;
  align-items: center;
}
```