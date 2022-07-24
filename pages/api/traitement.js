// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from "../../lib/db";

export default async function handler(req, res) {
  try {
    const result = await excuteQuery({
      query: "SELECT * FROM `traitement`",
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
}
