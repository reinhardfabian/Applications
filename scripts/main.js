'use strict';

const table = document.getElementById('company-table');
document.getElementById('caption').textContent = `${companies.length} applications`;

let tr = table.createTHead().insertRow();
for (const property in companies[0]) {
  let th = document.createElement('th');
  th.textContent = property.replace(/^\w/, m => m.toUpperCase());
  th.setAttribute('id', property);
  th.addEventListener('click', () => printTableBody(property));
  tr.appendChild(th);
}

const tableBody = table.createTBody();

function printTableBody(column) {
 companies.sort( (column == 'date') ? (a, b) => a.date - b.date : (a, b) => a[column].localeCompare(b[column]) );
  // erase table body
  while (tableBody.firstChild !== null) {
    tableBody.removeChild(tableBody.firstChild);
  }
  // generate table body
  for (let i=0; i<companies.length; i++) {
    tr = tableBody.insertRow();
    for (const property in companies[0]) {
      tr.insertCell().textContent = (property == 'date') ? companies[i].date.toLocaleDateString() : companies[i][property] ;
      // debugger;
    }
    if (!(i%2)) tr.setAttribute('class', 'even');  //pretty print
  }
}

document.addEventListener('DOMContentLoaded', printTableBody('date'));