import React, { useState } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4000/phones",
});
function Produits({
  name,
  type,
  price,
  rating,
  warranty_years,
  available,
  id,
}) {
  console.log(id);
  function deletePost(phoneId) {
    client.delete(`/${phoneId}`).then(() => {
      alert("Post deleted!");
    });
  }

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{type}</td>
        <td>{price}</td>
        <td>{rating}</td>
        <td>{warranty_years}</td>
        <td>{available}</td>
        <button onClick={() => deletePost(id)}>X</button>
      </tr>
    </>
  );
}

export default Produits;
