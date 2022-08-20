// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '../../../lib/db';

export default async function handler(req, res) {
  // DELETE
  if (req.method === 'DELETE') {
    try {
      const id = req.query.id;
      const result = await excuteQuery({
        query:
          'DELETE FROM `traitement_has_maladie` WHERE traitement_maladie = ?',
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
        query: `SELECT * FROM traitement_has_maladie
                INNER JOIN maladie ON traitement_has_maladie.maladie_traitement = maladie.id_maladie
                WHERE traitement_has_maladie.traitement_maladie =  ?
                `,
        values: id
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

// idea 1
// SELECT * FROM organe
// INNER JOIN maladie_has_organe ON organe.id_organe = maladie_has_organe.organe_maladie
// WHERE organe.id_organe = 1

// BONNE PISTE
// SELECT * FROM maladie_has_organe
// INNER JOIN organe ON maladie_has_organe.organe_maladie = organe.id_organe
// WHERE maladie_has_organe.maladie_organe = 2

// OK ?
// SELECT * FROM traitement_has_maladie
// INNER JOIN traitement ON traitement_has_maladie.maladie_traitement = traitement.id_traitement
// WHERE traitement_has_maladie.traitement_maladie = 2

// ok 2 ?
// SELECT * FROM traitement_has_maladie
// INNER JOIN traitement ON traitement_has_maladie.traitement_maladie = traitement.id_traitement
// WHERE traitement_has_maladie.maladie_traitement =  2
