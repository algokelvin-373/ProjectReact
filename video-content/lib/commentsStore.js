const KEY = "tiktok_comments_store_v1";

function load() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save(store) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    // ignore quota errors
  }
}

export function getComments(videoId) {
  const store = load();
  const list = store[videoId] || [];
  if (list.length > 0) return list;

  // Seed with a couple of local mock comments on first access
  const seeded = [
    {
      id: "c1",
      user: "Alex",
      text: "Love the vibes here ✨",
      createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    },
    {
      id: "c2",
      user: "Jamie",
      text: "Which camera are you using?",
      createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    },
  ];
  store[videoId] = seeded;
  save(store);
  return seeded;
}

export function addComment(videoId, comment) {
  const store = load();
  const list = store[videoId] || [];
  const updated = [...list, comment];
  store[videoId] = updated;
  save(store);
  return updated;
}
