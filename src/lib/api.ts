export async function apiPost(path, body) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Request failed");
  }
  return res.json().catch(() => ({}));
}