// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '../../../lib/db';

export default async function handler(req, res) {
  // SHOW ALL SYSTEME
  if (req.method === 'GET') {
    try {
      const result = await excuteQuery({
        query: 'SELECT * FROM `systeme`'
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  }
  // CREATE A NEW SYSTEME
  else if (req.method === 'POST') {
    const { name, desc, image } = req.body.newData;
    try {
      const result = await excuteQuery({
        query:
          'INSERT INTO `systeme`(`name_systeme`, `desc_systeme`, `image_systeme`) VALUES (?, ?, ?)',
        values: [name, desc, image]
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(200).json(error);
    }
  }
}
