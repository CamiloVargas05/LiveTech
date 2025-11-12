export async function apiPost(path, body) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;
  console.log("📡 API POST:", url);
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ API Error:", errorText);
    throw new Error(`Request failed: ${res.status}`);
  }
  
  return res.json().catch(() => ({}));
}