'use strict';
const properties = ['date', 'name', 'job', 'location', 'success'];  // companylist (companies array) in list.js
document.getElementById('caption').textContent = `${companies.length} applications`;

const trHead = document.getElementById('trhead');
for (const property of properties) {
  let th = document.createElement('th');
  th.textContent = property.replace(/^\w/, m => m.toUpperCase());
  th.setAttribute('id', property);
  th.addEventListener('click', (event) => printTableBody(event, property));
  trHead.appendChild(th);
}

const tableBody = document.getElementById('tablebody');

function printTableBody(event, column) {
  // console.log(event?.type);
  companies.sort((column == 'date') ? (a, b) => a.date - b.date : (a, b) => a[column].localeCompare(b[column]));
  // erase table body
  while (tableBody.firstChild !== null) {
    tableBody.removeChild(tableBody.firstChild);
  }
  // generate table body
  for (let company of companies) {
    const tr = tableBody.insertRow();
    for (const property of properties) {
      tr.insertCell().textContent = (property == 'date') ? company.date.toLocaleDateString() : company[property];
      // debugger;
    }
  }
}

document.getElementById('date').dispatchEvent(new MouseEvent('click'));
// document.addEventListener('DOMContentLoaded', () => printTableBody(ev, 'date'));