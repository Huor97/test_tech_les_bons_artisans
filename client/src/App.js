import { useEffect, useState } from "react";
import Produits from "./components/Products";
import axios from "axios";
import NewProduct from "./components/NewProduct";

const client = axios.create({
  baseURL: "https://test-tech-les-bons-artisans-api.vercel.app/phones",
});

function App() {
  const [phones, setPhones] = useState(null);

  useEffect(() => {
    client.get("/").then((response) => {
      setPhones(response.data);
    });
  }, []);

  if (!phones) return "No post!";

  console.log(phones);

  return (
    <div className="App">
      <div>
        <h1>Catalogue des smartphones</h1>
      </div>

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
