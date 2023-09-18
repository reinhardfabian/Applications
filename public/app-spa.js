"use strict";
let companies = [];

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
    companies = await response.json();
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

window.onload = (e) => {
    var form = document.getElementById("app_form")
    form.onsubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(form);
        formData.append('date', new Date());
        companies.push(Object.fromEntries(formData));

        e.target.elements[0].value = "";
        e.target.elements[1].value = "";
        e.target.elements[2].value = "";
        e.target.elements[3].value = "";
        document.getElementById('date').dispatchEvent(new MouseEvent('click'));

        fetch('/exampleapp/new_app_spa',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData))
            })
            .then(function (res) { console.log(res) })
    }
}