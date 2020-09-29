let runningTotal = 0;  //for storing the  operand
let buffer = "0";      //for  storing the operand
let previousOperator;  //for operators 
const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
 handleSymbol(value);
 } 
  else
  {var x=new Audio("sound/number.mp3"); //audio specific for num buttons
x.play();
  handleNumber(value);
  }
  rerender(); //for screening the output on the screen 
}


function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } 
  else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

function flushOperation(intBuffer) {                      //function to perform calculation
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "*") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":var a=new Audio("sound/CandBack.mp3");//sound specific to  back and delete button
a.play();

      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
var z=new Audio("sound/equal.mp3");
z.play();

      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = +runningTotal;
      runningTotal = 0;
      break;
    case "<-":
    var a=new Audio("sound/CandBack.mp3");   //sound specific to  back and delete button
a.play();
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+": 
    case "-":
    case "*":
    case "/": var y=new Audio("sound/symbol.mp3");y.play();         //sound specific to operators
      handleMath(value);
      break;
  }
}

function rerender() {          //function to print output in screen
  screen.innerText = buffer;
}




var x=document.getElementsByClassName(".button_feature");
x.addEventListener("click",process(event));         //on clicking the button function process will be called


function process(event)
{buttonClick(event.target.innerText);       //the value corresponding button passed within the function 
}







