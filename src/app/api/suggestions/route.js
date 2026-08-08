export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q || !q.trim()) {
    return Response.json([]);
  }

  try {
    const googleUrl = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(q.trim())}`;
    const res = await fetch(googleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      next: { revalidate: 300 }
    });

    if (!res.ok) {
      return Response.json([]);
    }

    const data = await res.json();
    // Google format: ["search term", ["suggestion 1", "suggestion 2", ...]]
    const suggestions = Array.isArray(data) && Array.isArray(data[1])
      ? data[1].slice(0, 10)
      : [];

    return Response.json(suggestions);
  } catch (error) {
    return Response.json([]);
  }
}
