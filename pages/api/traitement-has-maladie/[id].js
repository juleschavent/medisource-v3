// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '../../../lib/db';

export default async function handler(req, res) {
  // DELETE
  if (req.method === 'DELETE') {
    try {
      const id = req.query.id;
      const result = await excuteQuery({
        query:
          'DELETE FROM `traitement_has_maladie` WHERE maladie_traitement = ?',
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
      const { maladieId, traitementId } = req.body.joinData;
      const result = await excuteQuery({
        query:
          'INSERT INTO `traitement_has_maladie`(`traitement_maladie`, `maladie_traitement`) VALUES (?, ?)',
        values: [traitementId, maladieId]
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
        query: `SELECT * FROM maladie
        INNER JOIN traitement_has_maladie
        INNER JOIN traitement ON traitement.id_traitement = traitement_has_maladie.traitement_maladie
        WHERE id_maladie = ?`,
        values: [id]
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}
