'use strict';
/*   // this should be the list.js file ....
const companies = [
  {
    date: new Date('07 16 2023'), //first column must be date
    name: 'Company Name A',
    job: 'Developer',
    location: 'Hamburg',
    success: '❓'       // or '✅' or '💩' for example
  },
  ...
];
*/
const table = document.getElementById('company-table');
document.getElementById('caption').textContent = `${companies.length} applications`;
const tableHead = table.createTHead();
const tableBody = table.createTBody();

let tr = tableHead.insertRow(0);
for (const property in companies[0]) {
  let th = document.createElement('th');
  th.textContent = property.replace(/^\w/, m => m.toUpperCase());
  th.setAttribute('id', property);
  th.addEventListener('click', () => sortTableBody(property));
  tr.appendChild(th);
}

//function to fill table body via sort criteria (column)
function sortTableBody(property) { //local function
  // sort list
  if (property == 'date') {
    companies.sort((a, b) => a.date - b.date);
  } else {
    companies.sort((a, b) => a[property].localeCompare(b[property]));
  }
  printTableBody(property)
}

function printTableBody() {
  // erase table body
  while (tableBody.firstChild !== null) {
    tableBody.removeChild(tableBody.firstChild);
  }
  // generate table body
  let i = 0; // i is table row‚
  for (const item of companies) {
    let j = 0; // j is table column
    tr = tableBody.insertRow(i++);
    for (const property in companies[0]) {
      if (property == 'date') {
        tr.insertCell(j++).textContent = item.date.toLocaleDateString();
      } else {
        tr.insertCell(j++).textContent = item[property];
      }
      // debugger;
    }
    if (i % 2) tr.setAttribute('class', 'even');  //pretty print
  }
}

document.addEventListener('DOMContentLoaded', printTableBody);