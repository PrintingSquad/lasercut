export async function POST() {
  return new Response(JSON.stringify({ success: true, message: "Bypassed" }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}