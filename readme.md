# GRE Calculator Dashboard
An emulation of the GRE calculator & timer.

## Things Learned
#### Number Formatting:

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

#### Using react portal for modal:
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

#### State Management
Problem: calculator needs to access a piece of state from the timer. Right now, #s entered into the time input box are also updating the calculator display.
Solution: move the state up into the parent component (index.js or App.js), so both timer.js and calculator.js can access.
```javascript
function App() {
  const [timerInputIsOpen, setTimerInputIsOpen] = useState(false);
```

```javascript
And now pass the relevant pieces of state to the components:
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
#### UseRef Best Practices
useRef: when you don't need to update the render

#### Input Limitations
Issue: timerInput can accept letters and non-digits, resulting in NaN display.
Solution: add attribute: {pattern="\d*"} to input tag.

#### Styling
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



#### Media query not working?
Make sure it's at the end of the css file!

#### Overflow text not centering?
```css
{
  display: flex;
  justify-content: center;
  align-items: center;
}
```