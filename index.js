const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000
const MAX_NOTES = 100;
const PATH_PREFIX = '/exampleapp';

const app = express()

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

const notes = [
  {
    content: 'HTML is easy',
    date: new Date('2019-05-23T17:30:31.098Z'),
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date('2019-05-23T18:39:34.091Z'),
  },
  {
    content: 'Most important methods of HTTP-protocol are GET and POST',
    date: new Date('2019-05-23T19:20:14.298Z'),
  },
]

const companies = [
  {
    date: new Date('2023-07-20'),
    name: "BlaBla",
    job: "Full-Stack Softwareentwickler",
    location: "Hamburg",
    success: "❓"
  },
  {
    date: new Date('2023-07-16'),
    name: "BlubBlub",
    job: "Web Application Developer",
    location: "Wilhelmshaven",
    success: "✅"
  },
  {
    date: new Date('2023-07-20'),
    name: "fooBar",
    job: "Backend Entwickler",
    location: "Hamburg",
    success: "💩"
  },
]

function isValidNote(note) {
  return typeof note === 'object' && typeof note.content === 'string' && !isNaN(new Date(note.date).getTime())
}

function createNote(note) {
  notes.push(note);

  if (notes.length > MAX_NOTES) {
    notes.shift()
  }
}

function formatNote(note) {
  return {
    content: note.content.substring(0, 200),
    date: new Date(note.date),
  }
}

const app_spa = `
<!DOCTYPE html>
<html lang="de">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <link rel="stylesheet" type="text/css" href="${PATH_PREFIX}/style-app.css" />
  <title>Applications</title>
</head>

<body>
  <p>
  <table class="border">
    <caption id="caption"></caption>
    <thead>
      <tr id="trhead">
      </tr>
    </thead>
    <tbody id="tablebody">
    </tbody>
  </table>
  </p>
  <p>
  <form action="/my-handling-form-page" method="post">
    <ul>
      <li>
        <label for="date">Date:</label>
        <input type="date" id="date" name="job_date" />
      </li>
      <li>
        <label for="companyname">Name:</label>
        <input type="text" id="companyname" name="company_name" />
      </li>
      <li>
        <label for="job_date">Job:</label>
        <input type="text" id="jobname" name="job_name" />
      </li>
      <li>
        <label for="joblocation">Location:</label>
        <input type="text" id="joblocation" name="job_location" />
      </li>
      <li>
        <label for="success">Success:</label>
        <input type="text" id="success" name="job_success" value="💩 or ❓ or ✅"/>
      </li>
      <li class="button">
        <button type="submit">Send your application info</button>
      </li>
    </ul>
  </form>
  </p>
  <noscript>Please enable Javascript!</noscript>
  <script type="text/javascript" src="${PATH_PREFIX}/app-spa.js"></script>
</body>
</html>
`

const notes_spa = `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="${PATH_PREFIX}/main.css" />
  <script type="text/javascript" src="${PATH_PREFIX}/spa.js"></script>
</head>
<body>
  <div class='container'>
    <h1>Notes -- single page app</h1>
    <div id='notes'>
    </div>
    <form id='notes_form'>
      <input type="text" name="content"><br>
      <input type="submit" value="Save">
    </form>
  </div>
</body>
</html>
`

function getFrontPageHtml(noteCount) {
  return (`
<!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <div class='container'>
          <h1>Full stack example app</h1>
          <p>number of notes created ${noteCount}</p>
          <a href='${PATH_PREFIX}/spa'>notes</a>
        </div>
      </body>
    </html>
`)
}

const router = express.Router();

router.use(express.static(path.join(__dirname, 'public')))

router.get('/', (req, res) => {
  const page = getFrontPageHtml(notes.length)
  res.send(page)
})

router.get('/reset', (req, res) => {
  notes.splice(0, notes.length)
  res.status(201).send({ message: 'notes reset' })
})

router.get('/spa', (req, res) => {
  res.send(notes_spa)
})

router.get('/app', (req, res) => {
  res.send(app_spa)
})

router.get('/data.json', (req, res) => {
  res.json(notes)
})

router.get('/app.json', (req, res) => {
  res.json(companies)
})

router.post('/new_note_spa', (req, res) => {
  if (!isValidNote(req.body)) {
    return res.send('invalid note').status(400)
  }

  createNote(formatNote(req.body))

  res.status(201).send({ message: 'note created' })
})

app.use(PATH_PREFIX, router)

app.listen(PORT, () => console.log(`Listening on ${PORT}`))