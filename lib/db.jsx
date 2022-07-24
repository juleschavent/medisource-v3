import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    host: "localhost",
    database: "medisource-v3",
    user: "admin",
    password: "admin",
  }
});

export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}