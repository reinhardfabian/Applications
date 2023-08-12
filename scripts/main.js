'use strict';

document.getElementById('caption').textContent = `${companies.length} applications`;

const trHead = document.getElementById('trhead');
for (const property in companies[0]) {
  let th = document.createElement('th');
  th.textContent = property.replace(/^\w/, m => m.toUpperCase());
  th.setAttribute('id', property);
  th.addEventListener('click', () => printTableBody(property));
  trHead.appendChild(th);
}

const tableBody = document.getElementById('tablebody');

function printTableBody(column) {
  companies.sort((column == 'date') ? (a, b) => a.date - b.date : (a, b) => a[column].localeCompare(b[column]));
  // erase table body
  while (tableBody.firstChild !== null) {
    tableBody.removeChild(tableBody.firstChild);
  }
  // generate table body
  for (let i = 0; i < companies.length; i++) {
    const tr = tableBody.insertRow();
    for (const property in companies[0]) {
      tr.insertCell().textContent = (property == 'date') ? companies[i].date.toLocaleDateString() : companies[i][property];
      // debugger;
    }
    if (!(i % 2)) tr.setAttribute('class', 'even');  //pretty print
  }
}

document.addEventListener('DOMContentLoaded', printTableBody('date'));