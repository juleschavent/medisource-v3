// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '../../../lib/db';

export default async function handler(req, res) {
  // SHOW ALL SYSTEME
  if (req.method === 'GET') {
    try {
      const result = await excuteQuery({
        query: 'SELECT * FROM `maladie`'
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }
  // CREATE A NEW SYSTEME
  else if (req.method === 'POST') {
    const { name, desc, image } = req.body.newData;
    try {
      const result = await excuteQuery({
        query:
          'INSERT INTO `maladie`(`name_maladie`, `desc_maladie`, `image_maladie`) VALUES (?, ?, ?)',
        values: [name, desc, image]
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(200).json(error);
    }
  }
}
