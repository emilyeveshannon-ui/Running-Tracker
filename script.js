const goal = 25;

let entries = [];
const entriesWrapper = document.querySelector("#entries");
document.querySelector("#target").innerText = goal;

function addNewEntry(newEntry) {
  if (entriesWrapper.children.length >= 7) {
    entriesWrapper.removeChild(entriesWrapper.firstElementChild);
  }
  const listItem = document.createElement("li");
  const listValue = document.createTextNode(newEntry.toFixed(1));
  listItem.appendChild(listValue);
  entriesWrapper.appendChild(listItem);
}

function reducer(total, currentValue) {
  return total + currentValue;
}

function calcTotal(entries) {
  const totalValue = entries.reduce(reducer, 0).toFixed(1);
  document.getElementById("total").innerText = totalValue;
  document.getElementById("progressTotal").innerText = totalValue;
}

function calcAverage() {
  if (entries.length === 0) return;
  const average = (entries.reduce(reducer, 0) / entries.length).toFixed(1);
  document.getElementById("average").innerText = average;
}

function weeklyHigh() {
     const high = Math.max(...entries);
     document.getElementById('high').innerText = high;

}

function calcGoal() {
  const totalValue = entries.reduce(reducer, 0).toFixed(1);
  let completedPercent = (totalValue / goal) * 100;

  if (completedPercent > 100) completedPercent = 100;

  const progressCircle = document.querySelector("#progressCircle");
  progressCircle.style.background = `conic-gradient(
    #70db70 ${completedPercent}%,
    #2d3740 ${completedPercent}% 100%
  )`;
}

function handleSubmit(event) {
  event.preventDefault();
  const entry = Number(document.querySelector("#entry").value);
  if (!entry) return;
  document.querySelector("form").reset();
  entries.push(entry);
  addNewEntry(entry);
  calcTotal(entries);
  calcAverage();
  weeklyHigh();
  calcGoal();
}

document.querySelector("form").addEventListener("submit", handleSubmit);
