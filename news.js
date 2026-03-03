export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { category = 'all', page = 1 } = req.query;
  const key = process.env.GNEWS_API_KEY;

  if (!key) {
    return res.status(500).json({ error: 'GNEWS_API_KEY not set in Vercel environment variables' });
  }

  try {
    let url;
    const max = 10;

    if (category === 'india') {
      url = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&max=${max}&page=${page}&token=${key}`;
    } else if (category === 'education') {
      url = `https://gnews.io/api/v4/search?q=education+school+university+students+learning&lang=en&max=${max}&page=${page}&token=${key}`;
    } else if (category === 'technology') {
      url = `https://gnews.io/api/v4/search?q=technology+AI+software+startup&lang=en&max=${max}&page=${page}&token=${key}`;
    } else if (category === 'health') {
      url = `https://gnews.io/api/v4/search?q=health+medicine+hospital+disease&lang=en&max=${max}&page=${page}&token=${key}`;
    } else if (category === 'business') {
      url = `https://gnews.io/api/v4/search?q=business+economy+market+finance&lang=en&max=${max}&page=${page}&token=${key}`;
    } else if (category === 'sports') {
      url = `https://gnews.io/api/v4/search?q=sports+cricket+football+IPL&lang=en&max=${max}&page=${page}&token=${key}`;
    } else if (category === 'science') {
      url = `https://gnews.io/api/v4/search?q=science+space+research+discovery&lang=en&max=${max}&page=${page}&token=${key}`;
    } else if (category === 'world') {
      url = `https://gnews.io/api/v4/top-headlines?topic=world&lang=en&max=${max}&page=${page}&token=${key}`;
    } else {
      url = `https://gnews.io/api/v4/top-headlines?lang=en&max=${max}&page=${page}&token=${key}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.errors || 'GNews API error' });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
