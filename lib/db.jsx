import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    // host: process.env.DB_HOST,
    // database: process.env.DB_DATABASE,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD
    host: "eu-cdbr-west-03.cleardb.net",
    database: "heroku_1b9ee3552ec27d3",
    user: "b101febdf1e7c0",
    password: "8b81cf40",
  }
});

export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
