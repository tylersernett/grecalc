export const format = (n) => {
  //run .NumberFormat twice in succession to prevent
  //maximumFractionDigits (7) overriding the maximumSignificantDigits (8)
  let num = new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 8
  }).format(n);

  num = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 7
  }).format(removeCommas(num));

  if (num === "-0") {
    return "0"
  }

  num = fixTrailingZeros(n, num);
  return num;
}

const fixTrailingZeros = (n, num) => {
  //include trailing 0s in decimals:
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

export const removeCommas = (string) => {
  return string.replace(/,/g, '');
}

export const prefixIfPriorIsOperand = (string) => {
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

export const isOperand = (string) => {
  if (string === "+" || string === "-" || string === "*" || string === "/") {
    return true;
  }
  return false;
}