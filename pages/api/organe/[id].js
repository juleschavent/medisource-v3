// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '../../../lib/db';

export default async function handler(req, res) {
  // SHOW SELECTED SYSTEME
  if (req.method === 'GET') {
    try {
      const id = req.query.id;
      const result = await excuteQuery({
        query: `SELECT * FROM organe
                WHERE id_organe = ?`,
        values: id
      });
      // const result = await excuteQuery({
      //   query: `SELECT * FROM organe
      //           INNER JOIN systeme ON systeme.id_systeme = organe.systeme_organe
      //           WHERE id_organe = ?`,
      //   values: id
      // });
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  // DELETE SELECTED SYSTEME
  else if (req.method === 'POST') {
    try {
      const id = req.query.id;
      const result = await excuteQuery({
        query: 'DELETE FROM `organe` WHERE id_organe = ?',
        values: id
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  // UPDATE SELECTED SYSTEME
  else if (req.method === 'PUT') {
    const { name, desc, image, systeme } = req.body.newData;
    const id = req.query.id;
    try {
      const result = await excuteQuery({
        query:
          'UPDATE `organe` SET `id_organe`= ?,`name_organe`= ?,`desc_organe`= ?,`image_organe`= ?, systeme_organe = ? WHERE id_organe = ?',
        values: [id, name, desc, image, parseInt(systeme), id]
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

// OLD READ
// SELECT * FROM organe
// INNER JOIN systeme ON systeme.id_systeme = organe.systeme_organe
// WHERE id_organe = ?
