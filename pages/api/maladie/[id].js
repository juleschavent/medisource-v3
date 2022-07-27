// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '../../../lib/db';

export default async function handler(req, res) {
  // SHOW SELECTED SYSTEME
  if (req.method === 'GET') {
    try {
      const id = req.query.id;
      const result = await excuteQuery({
        query: `SELECT * FROM maladie
                WHERE id_maladie = ?`,
        values: id
      });
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
        query: 'DELETE FROM `maladie` WHERE id_maladie = ?',
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
          'UPDATE `maladie` SET `id_maladie`= ?,`name_maladie`= ?,`desc_maladie`= ?,`image_maladie`= ?, systeme_maladie = ? WHERE id_maladie = ?',
        values: [id, name, desc, image, systeme, id]
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}
