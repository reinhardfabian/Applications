'use strict';

async function init() {
  try {
    const response = await fetch('companies.json');
    console.log(response.status);     // 200
    console.log(response.statusText); // "OK"
    console.log(response.type);       // "basic"
    console.log(response.bodyUsed);   // false
    console.log(response.headers);    // []
    console.log(response.ok);         // true
    console.log(response.redirected); // false
    console.log(response.url);        // "http://localhost:8080/companies.json"
    
    const result = await response.json();
    const companies = result.companies;
    
    const properties = ['date', 'name', 'job', 'location', 'success'];
    document.getElementById('caption').textContent = `${companies.length} applications`;

    const trHead = document.getElementById('trhead');
    for (const property of properties) {
      let th = document.createElement('th');
      th.textContent = property.replace(/^\w/, m => m.toUpperCase()); // \w means [a-zA-Z_0-9]
      th.setAttribute('id', property);
      th.addEventListener('click', (event) => printTableBody(event, property), false); // bubbling phase is default (false)
      trHead.appendChild(th);
    }

    const tableBody = document.getElementById('tablebody');

    function printTableBody(event, column) {
      // console.log(event?.type);
      companies.sort((column == 'date') ? (a, b) => new Date(a.date) - new Date(b.date) : (a, b) => a[column].localeCompare(b[column]));
      // erase table body
      while (tableBody.firstChild !== null) {
        tableBody.removeChild(tableBody.firstChild);
      }
      // generate table body
      for (let company of companies) {
        const tr = tableBody.insertRow();
        for (const property of properties) {
          tr.insertCell().textContent = (property == 'date') ? new Date(company.date).toLocaleDateString() : company[property];
          // debugger;
        }
      }
    }
    document.getElementById('date').dispatchEvent(new MouseEvent('click'));
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', init);