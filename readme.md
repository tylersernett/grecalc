
Number Formatting:

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

Using react portal for modal:
```javascript
import ReactDOM from 'react-dom'

    return ReactDOM.createPortal(
        <>
        </>,
        document.getElementById('portal')
    )
```
and add 
<div id="portal"></div>
to HTML file