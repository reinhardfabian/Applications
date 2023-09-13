interface Company {
  date: string
  name: string
  job: string
  location: string
  success: string
}
type Property = keyof Company
const properties = ['date', 'name', 'job', 'location', 'success'] as Property[]
const trHead = document.getElementById('trhead') as HTMLTableCellElement

for (const property of properties) {
  const th = document.createElement('th')
  th.textContent = property.replace(/^\w/, m => m.toUpperCase()) // \w means [a-zA-Z_0-9]
  th.setAttribute('id', property)
  th.onclick = printTableBody
  trHead.appendChild(th)
}

(document.getElementById('date') as Element).dispatchEvent(new MouseEvent('click'))

async function printTableBody (event: Event): Promise<void> {
  const response = await fetch('http://localhost:8080/companies.json')
  const data = await response.json()
  const companies: Company[] = data.companies;

  (document.getElementById('caption') as HTMLElement).textContent = `${companies.length} applications`
  const column = (event.target as Element).id as Property
  companies.sort((column === 'date') ? (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() : (a, b) => a[column].localeCompare(b[column]))
  // erase table body
  const tableBody = document.getElementById('tablebody') as HTMLTableElement
  while (tableBody.firstChild !== null) {
    tableBody.removeChild(tableBody.firstChild)
  }
  // generate table body
  for (const company of companies) {
    const tr = tableBody.insertRow()
    for (const property of properties) {
      tr.insertCell().textContent = (property === 'date') ? new Date(company.date).toLocaleDateString() : company[property]
      // debugger;
    }
  }
}
// document.addEventListener('DOMContentLoaded', init)
