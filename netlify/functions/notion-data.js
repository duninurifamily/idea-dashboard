exports.handler = async function (event) {
  const NOTION_KEY = process.env.NOTION_KEY;
  const DB_ID = process.env.NOTION_DB_ID;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  if (!NOTION_KEY || !DB_ID) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "환경변수 NOTION_KEY 또는 NOTION_DB_ID가 설정되지 않았습니다." }),
    };
  }

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page_size: 100 }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { statusCode: res.status, headers, body: JSON.stringify({ error: err }) };
    }

    const data = await res.json();

    const ideas = data.results.map((page) => {
      const p = page.properties;
      return {
        name: p["아이디어명"]?.title?.[0]?.plain_text ?? "제목 없음",
        category: p["카테고리"]?.select?.name ?? "미분류",
        maturity: p["성숙도"]?.select?.name ?? "미설정",
        priority: p["우선순위"]?.select?.name ?? "미설정",
        source: p["출처"]?.select?.name ?? "미설정",
        tags: p["사업 연관성"]?.multi_select?.map((t) => t.name) ?? [],
        createdAt: page.created_time,
      };
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ideas, updatedAt: new Date().toISOString() }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
