let notes = []

function redrawNotes() {
  let ul = document.createElement('ul')
  ul.setAttribute('class', 'notes')

  notes.forEach( (note) => {
    let li = document.createElement('li')

    ul.appendChild(li);
    li.appendChild(document.createTextNode(note.content))
  })

  let notesElement = document.getElementById("notes")
  if (notesElement.hasChildNodes()) {
    notesElement.removeChild(notesElement.childNodes[0]);
  }
  notesElement.appendChild(ul)
}

fetch('/exampleapp/data.json')
.then(response => response.json())
.then(data => {notes = data; redrawNotes()});

window.onload = (e) => {
  var form = document.getElementById("notes_form")
  form.onsubmit = (e) => {
    e.preventDefault()
    
    const formData = new FormData(form);
    formData.append('date', new Date());
    notes.push(Object.fromEntries(formData));
    e.target.elements[0].value = "";
    redrawNotes();

    fetch('/exampleapp/new_note_spa',
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
