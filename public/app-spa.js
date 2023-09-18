"use strict";
const properties = ['date', 'name', 'job', 'location', 'success'];
const trHead = document.getElementById('trhead');
for (const property of properties) {
    const th = document.createElement('th');
    th.textContent = property.replace(/^\w/, m => m.toUpperCase()); // \w means [a-zA-Z_0-9]
    th.setAttribute('id', property);
    th.onclick = printTableBody;
    trHead.appendChild(th);
}
document.getElementById('date').dispatchEvent(new MouseEvent('click'));
async function printTableBody(event) {
    const response = await fetch('/exampleapp/app.json');
    const companies = await response.json();
    const column = event.target.id;
    companies.sort((column === 'date') ? (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() : (a, b) => a[column].localeCompare(b[column]));
    // erase table body
    const tableBody = document.getElementById('tablebody');
    while (tableBody.firstChild !== null) {
        tableBody.removeChild(tableBody.firstChild);
    }
    // generate table body
    for (const company of companies) {
        const tr = tableBody.insertRow();
        for (const property of properties) {
            tr.insertCell().textContent = (property === 'date') ? new Date(company.date).toLocaleDateString() : company[property];
            // debugger;
        }
    }
    document.getElementById('caption').textContent = `${companies.length} applications`;
}
// document.addEventListener('DOMContentLoaded', init)
