// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '../../../lib/db';

export default async function handler(req, res) {
  // SHOW SELECTED SYSTEME
  if (req.method === 'GET') {
    try {
      const id = req.query.id;
      const result = await excuteQuery({
        query: `SELECT * FROM traitement
                WHERE id_traitement = ?`,
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
        query: 'DELETE FROM `traitement` WHERE id_traitement = ?',
        values: id
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  // UPDATE SELECTED SYSTEME
  else if (req.method === 'PUT') {
    const { name, desc, image } = req.body.newData;
    const id = req.query.id;
    const query =
      'UPDATE `traitement` SET `id_traitement`= ?,`name_traitement`= ?,`desc_traitement`= ?,`image_traitement`= ? WHERE id_traitement = ?';
    try {
      const result = await excuteQuery({
        query,
        values: [id, name, desc, image, id]
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

// OLD READ
// SELECT * FROM maladie
// WHERE id_maladie = ?

//temp
// SELECT * FROM traitement
// INNER JOIN traitement_has_maladie
// INNER JOIN maladie ON maladie.id_maladie = traitement_has_maladie.traitement_maladie
// WHERE id_maladie = 1

//TEMP
// SELECT * FROM maladie
// INNER JOIN maladie_has_organe
// INNER JOIN organe ON organe.id_organe = maladie_has_organe.organe_maladie
// INNER JOIN traitement_has_maladie
// INNER JOIN traitement ON traitement.id_traitement = traitement_has_maladie.traitement_maladie
// WHERE id_maladie = 1
