export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { category = 'all' } = req.query;
  const key = process.env.GNEWS_API_KEY;
  if (!key) return res.status(500).json({ error: 'No API key' });
  const base = 'https://gnews.io/api/v4';
  let url;
  if (category === 'india') url = `${base}/top-headlines?country=in&lang=en&max=15&token=${key}`;
  else if (category === 'education') url = `${base}/search?q=education+school+university&lang=en&max=15&token=${key}`;
  else if (category === 'world' || category === 'all') url = `${base}/top-headlines?lang=en&max=15&token=${key}`;
  else url = `${base}/search?q=${encodeURIComponent(category)}&lang=en&max=15&token=${key}`;
  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: 'Failed' });
  }
}
