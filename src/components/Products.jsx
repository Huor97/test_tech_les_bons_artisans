import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const client = axios.create({
  baseURL: "http://localhost:4000/phones",
});

// On définit un "schéma" pour utiliser la librairie yup afin de récupérer les données du formulaire
const schema = yup.object().shape({
  // .required : le formulaire ne se valide pas si le champ n'est pas rempli
  name: yup.string().required(),
  type: yup.string().required(),
  price: yup.number().positive().integer().required(),
  rating: yup.number().positive().integer().required(),
  warranty_years: yup.number().positive().integer().required(),
  available: yup.boolean(),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(id);
  function deletePost(phoneId) {
    client.delete(`/${phoneId}`).then(() => {
      alert("Post deleted!");
    });
  }
  const onSubmitHandler = (data) => {
    console.log({ data });
    client
      .patch(`/${id}`, {
        name: data.name,
        type: data.type,
        price: data.price,
        rating: data.rating,
        warranty_years: data.warranty_years,
        available: data.available,
      })
      .then((res) => {
        console.log(res.data);
        alert("Post update!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input type="text" {...register("name")} defaultValue={name} />
        <input {...register("type")} defaultValue={type} />
        <input {...register("price")} defaultValue={price} />
        <input {...register("rating")} defaultValue={rating} />
        <input {...register("warranty_years")} defaultValue={warranty_years} />
        <input {...register("available")} defaultValue={available} />
        <button type="submit">V</button>
        <button onClick={() => deletePost(id)}>X</button>
      </form>
    </>
  );
}

export default Produits;
