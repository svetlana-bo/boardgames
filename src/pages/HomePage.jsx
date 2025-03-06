import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

export default function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const url = "https://baaa-spilcafeen-default-rtdb.europe-west1.firebasedatabase.app/posts.json";
            const response = await fetch(url);
            const data = await response.json();
            const postsArray = Object.keys(data).map(key => ({ id: key, ...data[key] })); // from object to array
            setPosts(postsArray);
        }
        getPosts();
    }, []);

    return (
        <section className="page">
            {posts.length > 0 ? (
                <section className="grid-container">
                    {posts.map(post => (
                        <PostCard post={post} key={post.id} />
                    ))}
                </section>
            )
                :
                (<p>Nothing to show</p>)
            }
        </section>
    );
}