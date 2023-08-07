'use strict';

const table = document.getElementById('company-table');
document.getElementById('caption').textContent = `${companies.length} applications`;

let tr = table.createTHead().insertRow();
for (const property in companies[0]) {
  let th = document.createElement('th');
  th.textContent = property.replace(/^\w/, m => m.toUpperCase());
  th.setAttribute('id', property);
  th.addEventListener('click', () => sortTableBody(property));
  tr.appendChild(th);
}

const tableBody = table.createTBody();

function printTableBody() {
  // erase table body
  while (tableBody.firstChild !== null) {
    tableBody.removeChild(tableBody.firstChild);
  }
  // generate table body
  for (let i=0; i<companies.length; i++) {
    tr = tableBody.insertRow();
    for (const property in companies[0]) {
      if (property == 'date') {
        tr.insertCell().textContent = companies[i].date.toLocaleDateString();
      } else {
        tr.insertCell().textContent = companies[i][property];
      }
      // debugger;
    }
    if (!(i%2)) tr.setAttribute('class', 'even');  //pretty print
  }
}

function sortTableBody(property) { //local function
  // sort list
  if (property == 'date') {
    companies.sort((a, b) => a.date - b.date);
  } else {
    companies.sort((a, b) => a[property].localeCompare(b[property]));
  }
  printTableBody(property)
}

document.addEventListener('DOMContentLoaded', printTableBody);