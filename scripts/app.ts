'use strict';
interface Company {
  date: string;
  name: string;
  job: string;
  location: string;
  success: string;
}
type Properties = keyof Company;
let companies: Company[];
const properties: readonly Properties[] = ['date', 'name', 'job', 'location', 'success'];
const tableBody = document.getElementById('tablebody') as HTMLTableElement;

fetch('companies.json')
  .then(response => {return response.json()})
  .then(data => {companies = data.companies; printTableHead()});

function printTableHead() {
  (document.getElementById('caption') as Element).textContent = `${companies.length} applications`;

  const trHead = document.getElementById('trhead') as HTMLTableCellElement;
  properties.forEach((property) => {
    let th = document.createElement('th');
    th.textContent = property.replace(/^\w/, m => m.toUpperCase()); // \w means [a-zA-Z_0-9]
    // th.setAttribute('id', property);
    th.addEventListener('click', (event) => printTableBody(event, property), false); // bubbling phase is default (false)
    trHead.appendChild(th);
  });

  // document.getElementById('date').dispatchEvent(new MouseEvent('click'));
  printTableBody(new MouseEvent('click'), 'date');
}

function printTableBody(event: Event, column: Properties): void {
  // console.log(event?.type);
  companies.sort((column === 'date') ? (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() : (a, b) => a[column].localeCompare(b[column]));
  // erase table body
  while (tableBody.firstChild !== null) {
    tableBody.removeChild(tableBody.firstChild);
  }
  // generate table body
  companies.forEach((company) => {
    const tr = tableBody.insertRow();
    properties.forEach((property) => {
      tr.insertCell().textContent = (property === 'date') ? new Date(company.date).toLocaleDateString() : company[property];
      // debugger;
    })
  })
}

// document.addEventListener('DOMContentLoaded', init);