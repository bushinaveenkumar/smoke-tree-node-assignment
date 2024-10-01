const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())
let db = null

const dbPath = path.join(__dirname, "smoketreedata.db")

const intiallizeDBAndrunserver = async () => {
    try {
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      })
      app.listen(3010, () => {
        console.log('running at 3010')
      })
    } catch (e) {
      console.log(e.message)
      process.exit(1)
    }
  }
  intiallizeDBAndrunserver()

  //register API

  app.post("/register/", async (request, response) => {
    const userDetails = request.body;
    const {
      id, Name, address
    } = userDetails;
    const addUserQuery = `
      INSERT INTO
        User (id, Name)
      VALUES
        (
            ${id},
          '${Name}'           
        );`;
  
    const dbResponse = await db.run(addUserQuery);
    const userId = dbResponse.lastID;
    response.send(`new user successfully added with cityId ${userId}`);
  });
  
