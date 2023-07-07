import { useEffect, useState } from "react";
import "./App.css";
import Produits from "./components/Products";
import axios from "axios";
import NewProduct from "./components/NewProduct";

// http://localhost:4000/phones/
// const basURL = "http://localhost:4000/phones";

const client = axios.create({
  baseURL: "http://localhost:4000/phones",
});

function App() {
  const [phones, setPhones] = useState(null);

  // récuperer des données après api
  // const fetchPosts = async () => {
  //   const responsePosts = await axios.get("http://localhost:4000/phones/");
  //   // il faut parcourire tout les objet pour comparer id avec uid
  //   setPosts(responsePosts.data);
  // };

  useEffect(() => {
    client.get("/").then((response) => {
      setPhones(response.data);
    });
  }, []);

  // function createPost() {
  //   client
  //     .post("/", {
  //       name: "AC19 Phone5",
  //       type: "phone",
  //       price: 200.05,
  //       rating: 3.8,
  //       warranty_years: 2,
  //       available: true,
  //       body: "This is a new post.",
  //     })
  //     .then((response) => {
  //       setPhones(response.data);
  //     });
  // }

  function updatePost() {
    client
      .patch(`/64a7e485014b6cd8567e00c6`, {
        name: "AC20.2 Phone2",
        price: 300,
        body: "This is an updated post.",
      })
      .then((response) => {
        setPhones(response.data);
      });
  }

  if (!phones) return "No post!";

  console.log(phones);

  return (
    <div className="App">
      <div>
        <h1>Catalogue des smartphones</h1>
      </div>
      {/* <button onClick={createPost}>Create Post</button> */}
      <button onClick={updatePost}>Update Post</button>

      <NewProduct />

      {phones.map((phone, index) => (
        <Produits
          key={index}
          id={phone._id}
          name={phone.name}
          type={phone.type}
          price={phone.price}
          rating={phone.rating}
          warranty_years={phone.warranty_years}
          available={phone.available}
        />
      ))}
    </div>
  );
}

export default App;
