import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import UpdateSharpIcon from "@mui/icons-material/UpdateSharp";
import {
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import swal from "sweetalert";

const client = axios.create({
  baseURL: "https://test-tech-les-bons-artisans-api.vercel.app/phones",
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
  const [valid, setValid] = useState(available);

  console.log(valid);
  const handleChange = (e) => {
    setValid((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(id);
  function deletePost(phoneId) {
    client.delete(`/${phoneId}`).then(() => {
      console.log("delete");
    });
  }
  const onSubmitHandler = (data) => {
    console.log({ data });
    swal({
      icon: "success",
      timer: 5000,
      button: false,
    });
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
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      window.location.reload(false);
    }, 6000);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TableContainer component={Paper} variant="outlined">
          <Table aria-label="demo table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    variant="outlined"
                    type="text"
                    {...register("name")}
                    defaultValue={name}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    {...register("type")}
                    defaultValue={type}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    variant="outlined"
                    type="number"
                    {...register("price")}
                    defaultValue={price}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">€</InputAdornment>
                      ),
                    }}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    variant="outlined"
                    type="number"
                    {...register("rating")}
                    defaultValue={rating}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    variant="outlined"
                    type="number"
                    {...register("warranty_years")}
                    defaultValue={warranty_years}
                  />
                </TableCell>

                <TableCell>
                  <Select
                    {...register("available")}
                    defaultValue={valid}
                    onChange={handleChange}
                  >
                    <MenuItem value={true}>oui</MenuItem>
                    <MenuItem value={false}>non</MenuItem>
                  </Select>
                </TableCell>

                <TableCell>
                  <Button variant="contained" type="submit">
                    <UpdateSharpIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={() => deletePost(id)}
                  >
                    <DeleteForeverSharpIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </>
  );
}

export default Produits;
