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

function fillTable() {
  const table = document.getElementById('company-table');
  document.getElementById('caption').textContent = `${companies.length} applications`;
  const tableBody = table.createTBody();

  //fill table head
  const tableHead = table.createTHead();
  let tr = tableHead.insertRow(0);
  for (const property in companies[0]) {
    let th = document.createElement('th');
    th.textContent = property.replace(/^\w/, m => m.toUpperCase());
    th.setAttribute('id', property);
    th.addEventListener('click', () => fillTableBody(property));
    tr.appendChild(th);
  }

  //function to fill table body via sort criteria (column)
  function fillTableBody(column) { //local function
    // sort list
    if (column == 'date') {
      companies.sort( (a,b) => a.date - b.date );
    } else {
      companies.sort( (a,b) => a[column].localeCompare(b[column]) );
    }
    // erase table body
    while (tableBody.firstChild !== null) {
      tableBody.removeChild(tableBody.firstChild);
    }
    // generate table body
    let i = 0; // i is table row‚
    for (const item of companies) {
      let j = 0; // j is table column
      tr = tableBody.insertRow(i++);
      for ( const property in companies[0] ) {
        if (property == 'date'){
          tr.insertCell(j++).textContent = item.date.toLocaleDateString();
        } else {
          tr.insertCell(j++).textContent = item[property];
        }
        // debugger;
      }
      if (i % 2) tr.setAttribute('class', 'row even');  //pretty print
    }
  }

  fillTableBody('date'); // fill table - date is initial sort
}

document.addEventListener('DOMContentLoaded', fillTable);