export async function POST(request: Request) {
  console.log("received user updated webhook");
  const body = await request.json();
  console.log("received payload", JSON.stringify(body, null, 2));
  return new Response("OK", { status: 200 });
}
