const companies = require('./companies.json')
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

function isValidCompany(company) {
  return typeof company === 'object' && !isNaN(new Date(company.date).getTime())
}

function createCompany(company) {
  companies.push(company);

  if (companies.length > MAX_NOTES) {
    companies.shift()
  }
}

function formatCompany(company) {
  return {
    date: new Date(company.date),
    name: company.name.substring(0, 200),
    job: company.job.substring(0, 200),
    location: company.location.substring(0, 200),
    success: company.success.substring(0, 200),
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
  <form id="app_form" name="appnameform">
    <ul>
      <li>
        <label for="companyname">Name:</label>
        <input type="text" id="companyname" name="name" autocomplete="off" required />
      </li>
      <li>
        <label for="jobname">Job:</label>
        <input type="text" id="jobname" name="job" autocomplete="off" required />
      </li>
      <li>
        <label for="joblocation">Location:</label>
        <input type="text" id="joblocation" name="location" autocomplete="off" required />
      </li>
      <li>
        <label for="jobsuccess">Success:</label>
        <input type="text" id="jobsuccess" name="success" value="💩 or ❓ or ✅" autocomplete="off" required />
      </li>
      <li class="button">
        <input type="submit" value="Send your application info" />
      </li>
    </ul>
  </form>
  </p>
  <noscript>Please enable Javascript!</noscript>
  <script type="text/javascript" src="${PATH_PREFIX}/app-spa.js"></script>
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
          <p>number of jobs applied: ${noteCount}</p>
          <a href='${PATH_PREFIX}/app'>Jobs</a>
        </div>
      </body>
    </html>
`)
}

const router = express.Router();

router.use(express.static(path.join(__dirname, 'public')))

router.get('/', (req, res) => {
  const page = getFrontPageHtml(companies.length)
  res.send(page)
})

router.get('/reset', (req, res) => {
  companies.splice(0, companies.length)
  res.status(201).send({ message: 'companies reset' })
})

router.get('/app', (req, res) => {
  res.send(app_spa)
})

router.get('/app.json', (req, res) => {
  res.json(companies)
})

router.post('/new_app_spa', (req, res) => {
  if (!isValidCompany(req.body)) {
    return res.send('invalid company').status(400)
  }

  createCompany(formatCompany(req.body))

  res.status(201).send({ message: 'company created' })
})

app.use(PATH_PREFIX, router)

app.listen(PORT, () => console.log(`Listening on ${PORT}`))