const { Pool } = require('pg');

const cohortName = process.argv[2];
const limit = process.argv[3]|| 5;
const values = [`%${cohortName}%`, limit];
const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

const config = {
  host: 'localhost',
  database: 'bootcampx',
  user: 'labber', //labber
  password: 'labber', //labber
  port: 5432,//This is the default port for psql, everyone will have the same port
}

const pool = new Pool(config)
pool.connect(() => {
  console.log("Connected via callbacks")
})


pool.query(queryString,values)
.then(res => {
    res.rows.forEach(user => {
        console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    })
})
.catch(err => console.error(`query error`, err.stack));


