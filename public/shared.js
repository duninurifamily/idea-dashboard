async function fetchIdeas() {
  const res = await fetch('/.netlify/functions/notion-data');
  if (!res.ok) throw new Error(`API 오류 ${res.status}`);
  return res.json();
}
