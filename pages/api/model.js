import axios from "axios";

export default async function handler(req, res) {
  const { artistName } = req.query;

  try {
    const response = await axios.get(`http://127.0.0.1:5000/recommend`, {
      headers: {
        Accept: "application/json",
      },
    });

    const recommendlist = response.data.recommendlist.map((recomendlist) => ({
      recommendations: recomendlist.sets.set
        .map((set) =>
          set.recommendation.map((recommendation) => recommendation.name),
        )
        .flat(),
    }));

    res.status(200).json({ recommendlist });
  } catch (error) {
    console.error("Error fetching setlists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
