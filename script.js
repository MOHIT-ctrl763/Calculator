let buttons = document.querySelectorAll(".buttons");
let ans = document.querySelector(".ans");
let equal = document.querySelector(".equal");
let clear = document.querySelector(".clear");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        ans.value += button.innerText;
    });
});
function calculate(expression) {
    let output = expression.match(/(\d+(\.\d+)?|\+|\%|\-|\*|\/)/g);

    if (!output) return "Error";
     for (let i = 0; i < output.length; i++) {
        if (output[i] === "%") {
            let left = Number(output[i - 1]);
            let prevOp = output[i - 2]; // operator before number

            let result;

            if (prevOp === "+" || prevOp === "-") {
                // Example: 50 + 10% → 50 + (50*10/100)
                let base = Number(output[i - 3]);
                result = (base * left) / 100;
            } else {
                // Example: 200 * 10% → 200 * (10/100)
                result = left / 100;
            }

            output.splice(i - 1, 2, result.toString());
            i--;
        }
    }
    for (let i = 0; i < output.length; i++) {
        if (output[i] === "*" || output[i] === "/") {
            let left = Number(output[i - 1]);
            let right = Number(output[i + 1]);
            let result = output[i] === "*" ? left * right : left / right;
            output.splice(i - 1, 3, result.toString());
            i--;
        }
    }
  

    
    for (let i = 0; i < output.length; i++) {
        if (output[i] === "+" || output[i] === "-") {
            let left = Number(output[i - 1]);
            let right = Number(output[i + 1]);
            let result = output[i] === "+" ? left + right : left - right;
            output.splice(i - 1, 3, result.toString());
            i--;
        }
    }

    return Number(output[0]);
}

equal.addEventListener("click", () => {
    try {
        ans.value = calculate(ans.value);
    } catch {
        ans.value = "Error";
    }
});

clear.addEventListener("click", () => {
    ans.value = "";
});



