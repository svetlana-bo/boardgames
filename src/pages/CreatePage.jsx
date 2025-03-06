import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

export default function CreatePage() {
  const navigate = useNavigate();

  async function createPost(newPost) {
    const url =
      "https://baaa-spilcafeen-default-rtdb.europe-west1.firebasedatabase.app/posts.json";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newPost),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("New post created: ", data);
      navigate("/imageupload2/");
    } else {
      console.log("Sorry, something went wrong");
    }
  }

  return (
    <section className="page">
      <h1>Create New Entry</h1>
      <PostForm savePost={createPost} />
    </section>
  );
}
