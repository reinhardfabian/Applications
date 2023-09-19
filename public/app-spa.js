"use strict";
let companies = [];

const columns = ['date', 'name', 'job', 'location', 'success'];
const trHeadElement = document.getElementById('trhead');
for (const property of columns) {
    const th = document.createElement('th');
    th.textContent = property.replace(/^\w/, m => m.toUpperCase()); // \w means [a-zA-Z_0-9]
    th.setAttribute('id', property);
    th.onclick = sortTableBody;
    trHeadElement.appendChild(th);
}
fetch('/exampleapp/app.json')
    .then(response => response.json())
    .then(data => { companies = data; redrawCompanies() });

function sortTableBody(event) {
    const column = event.target.id;
    companies.sort((column === 'date') ? (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() : (a, b) => a[column].localeCompare(b[column]));
    redrawCompanies();
}
redrawCompanies();

function redrawCompanies() {
    document.getElementById('caption').textContent = `${companies.length} applications`;
    // erase table body
    const tableBody = document.getElementById('tablebody');
    while (tableBody.firstChild !== null) {
        tableBody.removeChild(tableBody.firstChild);
    }
    // generate table body
    for (const company of companies) {
        const tr = tableBody.insertRow();
        for (const property of columns) {
            tr.insertCell().textContent = (property === 'date') ? new Date(company.date).toLocaleDateString() : company[property];
            // debugger;
        }
    }
}

window.onload = (e) => {
    let form = document.getElementById("app_form")
    form.onsubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(form);
        formData.append('date', new Date());
        companies.push(Object.fromEntries(formData));
    
        document.appnameform.reset();
        
        redrawCompanies();

        fetch('/exampleapp/new_app_spa',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData))
            })
            // .then(function (res) { console.log(res) })
    }
}