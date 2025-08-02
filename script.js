let display = document.getElementById("display");

function append(char) {
  if (display.innerText === "0") display.innerText = "";
  display.innerText += char;
}

function clearDisplay() {
  display.innerText = "0";
}

function deleteLast() {
  display.innerText = display.innerText.slice(0, -1) || "0";
}

function calculate() {
  try {
    const expression = display.innerText;
    const result = eval(expression);
    display.innerText = result;

    fetch('http://localhost:3000/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ expression, result })
    });
  } catch {
    display.innerText = "Error";
  }
}
