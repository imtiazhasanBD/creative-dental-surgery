export async function GET(request) {
    return Response.json({ data: request.url });
}