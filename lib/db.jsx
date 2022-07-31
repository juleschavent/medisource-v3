import mysql from 'serverless-mysql';
const db = mysql({
  // config: {
  //   host: 'localhost',
  //   database: 'medisource',
  //   user: 'admin',
  //   password: 'admin',
  //   port: 8889
  // }
  // config: {
  //   host: process.env.DB_HOST,
  //   database: process.env.DB_DATABASE,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASS
  // }
  config: {
    host: 'localhost',
    database: 'bofv3727_medisource',
    user: 'bofv3727_medisource-admin',
    password: 'oM0BX4QDeM8L'
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
