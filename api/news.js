export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { category = 'trending' } = req.query;
  const key = process.env.GNEWS_API_KEY;

  if (!key) {
    return res.status(500).json({ error: 'GNEWS_API_KEY not set' });
  }

  const base = 'https://gnews.io/api/v4';
  let url;

  if (category === 'india')
    url = `${base}/top-headlines?country=in&lang=en&max=20&token=${key}`;
  else if (category === 'trending' || category === 'all')
    url = `${base}/top-headlines?lang=en&max=20&token=${key}`;
  else if (category === 'world')
    url = `${base}/top-headlines?topic=world&lang=en&max=20&token=${key}`;
  else if (category === 'technology')
    url = `${base}/top-headlines?topic=technology&lang=en&max=20&token=${key}`;
  else if (category === 'health')
    url = `${base}/top-headlines?topic=health&lang=en&max=20&token=${key}`;
  else if (category === 'business')
    url = `${base}/top-headlines?topic=business&lang=en&max=20&token=${key}`;
  else if (category === 'sports')
    url = `${base}/top-headlines?topic=sports&lang=en&max=20&token=${key}`;
  else if (category === 'science')
    url = `${base}/top-headlines?topic=science&lang=en&max=20&token=${key}`;
  else if (category === 'entertainment')
    url = `${base}/top-headlines?topic=entertainment&lang=en&max=20&token=${key}`;
  else
    url = `${base}/search?q=${encodeURIComponent(category)}&lang=en&max=20&token=${key}`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
