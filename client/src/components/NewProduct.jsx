import axios from "axios";
import swal from "sweetalert";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DataSaverOnSharpIcon from "@mui/icons-material/DataSaverOnSharp";

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

function NewProduct() {
  const [valid, setValid] = useState(true);

  console.log(valid);
  const handleChange = (e) => {
    setValid((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const {
    register,
    handleSubmit,

    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Recevoir les infos du formulaire
  const onSubmitHandler = (data) => {
    console.log({ data });
    swal({
      icon: "success",
      timer: 5000,
      button: false,
    });
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
    setTimeout(() => {
      window.location.reload(false);
    }, 6000);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TableContainer component={Paper} variant="outlined">
          <Table aria-label="demo table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TextField
                    variant="outlined"
                    label="nom"
                    {...register("name")}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    variant="outlined"
                    label="type"
                    {...register("type")}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    variant="outlined"
                    label="prix"
                    {...register("price")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">€</InputAdornment>
                      ),
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    variant="outlined"
                    label="note"
                    {...register("rating")}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    variant="outlined"
                    label="garantie"
                    {...register("warranty_years")}
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
                  <Button
                    sx={{ width: "160px" }}
                    variant="contained"
                    type="submit"
                    size="large"
                  >
                    <DataSaverOnSharpIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </form>
    </>
  );
}

export default NewProduct;
