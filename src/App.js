import { useEffect, useState } from "react";
import "./App.css";
import Produis from "./components/Produis";
import axios from "axios";

// http://localhost:4000/phones/
// const basURL = "http://localhost:4000/phones";

const client = axios.create({
  baseURL: "http://localhost:4000/phones",
});

function App() {
  const [post, setPost] = useState(null);

  // récuperer des données après api
  // const fetchPosts = async () => {
  //   const responsePosts = await axios.get("http://localhost:4000/phones/");
  //   // il faut parcourire tout les objet pour comparer id avec uid
  //   setPosts(responsePosts.data);
  // };

  useEffect(() => {
    client.get("/").then((response) => {
      setPost(response.data);
    });
  }, []);

  function createPost() {
    client
      .post("/", {
        name: "AC19 Phone5",
        type: "phone",
        price: 200.05,
        rating: 3.8,
        warranty_years: 2,
        available: true,
        body: "This is a new post.",
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  function updatePost() {
    client
      .patch(`/64a7e485014b6cd8567e00c6`, {
        name: "AC20.2 Phone2",
        price: 300,
        body: "This is an updated post.",
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  function deletePost() {
    client.delete(`/64a7eadd2c5cfb34e8160f53`).then(() => {
      alert("Post deleted!");
      setPost(null);
    });
  }

  if (!post) return "No post!";

  console.log(post);

  return (
    <div className="App">
      <h1>{post[1].name}</h1>
      <p>{post[1].type}</p>
      <button onClick={createPost}>Create Post</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
      <Produis />
    </div>
  );
}

export default App;
