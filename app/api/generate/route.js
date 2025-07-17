import clientPromise from "@/libs/mongodb";

export async function POST(req) {
    try {
        const body = await req.json();

        const client = await clientPromise;
        const db = client.db("linktree");
        const collection = db.collection("links");

        const doc = await collection.findOne({ handle: body.handle })
        if (doc) {
            return new Response(JSON.stringify({success: false,error: true,message: "The handle already exists. Try a new one!",}),{ status: 400, headers: { "Content-Type": "application/json" },});
        }

        const result = await collection.insertOne(body);

        return new Response(JSON.stringify({ success: true, error: false, message: "Added", result }),{ status: 200, headers: { "Content-Type": "application/json" },}
        );
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: true, message: error.message, result: null }),{ status: 404, headers: { "Content-Type": "application/json" },}
        );
    }
}
