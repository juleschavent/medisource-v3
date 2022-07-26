// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '../../../lib/db';

export default async function handler(req, res) {
  // SHOW ALL SYSTEME
  if (req.method === 'GET') {
    try {
      const result = await excuteQuery({
        query: 'SELECT * FROM `organe`'
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }
  // CREATE A NEW SYSTEME
  else if (req.method === 'POST') {
    const {
      name,
      desc,
      image,
      systeme,
    } = req.body.newData;
    try {
      const result = await excuteQuery({
        query:
          'INSERT INTO `organe`(`name_organe`, `desc_organe`, `image_organe`, `systeme_organe`) VALUES (?, ?, ?, ?)',
        values: [name, desc, image, systeme]
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(200).json(error);
    }
  }
}
