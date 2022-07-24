// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from "../../../lib/db";

export default async function handler(req, res) {
  // SHOW ALL SYSTEME
  if (req.method === "GET") {
    try {
      const result = await excuteQuery({
        query: "SELECT * FROM `systeme`",
      });
      console.log(result);

      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }
  // CREATE A NEW SYSTEME
  else if (req.method === "POST") {
    const { name_systeme, desc_systeme, image_systeme } = req.body.newSysteme;
    try {
      const result = await excuteQuery({
        query:
          'INSERT INTO `systeme`(`id_systeme`, `name_systeme`, `desc_systeme`, `image_systeme`) VALUES ("", ?, ?, ?)',
        values: [name_systeme, desc_systeme, image_systeme],
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(200).json(error);
    }
  }
}
