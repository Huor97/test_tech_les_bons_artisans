import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

function NewProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Recevoir les infos du formulaire
  const onSubmitHandler = (data) => {
    console.log({ data });
    reset(); //efface le formulaire

    client
      .post("/", {
        name: data.name,
        type: data.type,
        price: data.price,
        rating: data.rating,
        warranty_years: data.warranty_years,
        available: data.available,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input placeholder="nom" {...register("name")} />
        <input placeholder="type" {...register("type")} />
        <input placeholder="prix" {...register("price")} />
        <input placeholder="note" {...register("rating")} />
        <input placeholder="garantie" {...register("warranty_years")} />
        <input placeholder="en stock" {...register("available")} />
        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default NewProduct;
