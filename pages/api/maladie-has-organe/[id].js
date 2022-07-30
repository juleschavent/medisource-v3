// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '../../../lib/db';

export default async function handler(req, res) {
  // DELETE
  if (req.method === 'DELETE') {
    try {
      const id = req.query.id;
      const result = await excuteQuery({
        query: 'DELETE FROM `maladie_has_organe` WHERE maladie_organe = ?',
        values: id
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }
  // CREATE
  else if (req.method === 'POST') {
    try {
      const { maladieId, organeId } = req.body.joinData;
      const result = await excuteQuery({
        query:
          'INSERT INTO `maladie_has_organe`(`maladie_organe`, `organe_maladie`) VALUES (?, ?)',
        values: [maladieId, organeId]
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }
  // READ
  else if (req.method === 'GET') {
    try {
      const id = req.query.id;
      const result = await excuteQuery({
        query: `SELECT * FROM organe
                INNER JOIN maladie_has_organe on maladie_has_organe.organe_maladie = organe.id_organe
                WHERE maladie_has_organe.maladie_organe = ?`,
        values: id
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

// maybe ?
// SELECT * FROM organe
// INNER JOIN maladie_has_organe on maladie_has_organe.organe_maladie = organe.id_organe
// WHERE maladie_has_organe.maladie_organe = 1
