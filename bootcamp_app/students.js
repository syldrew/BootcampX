const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  port: 5432,
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});



// ///Querying The Database
// pool.query(`
// SELECT id, name, cohort_id
// FROM students
// LIMIT 5;
// `)
// .then(res => {
// //   console.log(res); Update the query result to log the rows console.log(res.rows);
//      console.log(res.rows);
// })
// .catch(err => console.error('query error', err.stack));


// //add a join to this query to get the cohort name instead of cohort_id.
// pool.query(`
// SELECT students.id as student_id, students.name as name, cohorts.name as cohort
// FROM students
// JOIN cohorts ON cohorts.id = cohort_id
// LIMIT 5;
// `)
// .then(res => {
//   res.rows.forEach(user => {
//     console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
//   })
// });


// //Query Parameters Where FEB is the cohort name and 2 is the maximum number of results, and the results would be:
pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));


