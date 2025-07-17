import Link from "next/link";
import clientPromise from "@/libs/mongodb";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }) {
    const handle = params.handle;

    const client = await clientPromise;
    const db = client.db("linktree");
    const collection = db.collection("links");

    const item = await collection.findOne({ handle });
    if (!item) return notFound();

    return (
        <div className="flex justify-center items-center min-h-screen bg-white dark:bg-neutral-900 transition-colors px-4">
            <div className="bg-gray-100 dark:bg-neutral-800 shadow-xl w-full max-w-xl rounded-2xl p-6 flex flex-col items-center gap-6">
                {/* Profile */}
                <div className="flex flex-col items-center gap-2 text-center">
                    <img
                        alt="profile"
                        src={item.profile || "/images/default-avatar.png"}
                        className="w-24 h-24 object-cover rounded-full border border-gray-300 dark:border-neutral-700"
                    />


                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {item.handle.charAt(0).toUpperCase() + item.handle.slice(1)}
                    </h2>

                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>

                {/* Links */}
                <ul className="w-full flex flex-col gap-3">
                    {item.links.map((link, index) => (
                        <Link href={link.url} key={index} target="_blank">
                            <li className="bg-emerald-600 hover:bg-emerald-700 transition text-white font-medium rounded-lg text-center py-3 px-4">
                                {link.text.charAt(0).toUpperCase() + link.text.slice(1)}
                                <span className="block text-xs text-emerald-200 truncate mt-1">{link.url}</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}
