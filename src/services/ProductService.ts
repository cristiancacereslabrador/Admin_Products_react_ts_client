import { number, parse, safeParse } from "valibot";
// import { DraftProductSchema } from "../types";
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    // console.log("desde ProductService", data);
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      //   const { data } = await axios.post(url, {
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Invalid data");
    }

    // console.log("result: ", result);
  } catch (error) {
    console.log("error", error);
  }
}

export const getProducts = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    const result = safeParse(ProductsSchema, data.data);
    // console.log("result", result);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("There was a mistake...");
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getProductById = async (id: Product["id"]) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);
    const result = safeParse(ProductSchema, data.data);
    // console.log("result", result);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("There was a mistake...");
    }
  } catch (error) {
    console.log("error", error);
  }
};

export async function updateProduct(data: ProductData, id: Product["id"]) {
  //   console.log("data", data);
  //   console.log("id", id);
  try {
    // const NumberSchema = coerce(number(), Number);
    const priceAsNumber = parse(number(), Number(data.price));
    // console.log("priceAsNumber", priceAsNumber);
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      //   price: parseh(NumberScema, data.price),
      price: priceAsNumber,
      availability: toBoolean(data.availability.toString()),
    });
    // console.log("typeof priceAsNumber", typeof priceAsNumber);
    // console.log("result", result);
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    }
  } catch (error) {
    console.log("error", error);
  }
}

export async function deleteProduct(id: Product["id"]) {
  //   console.log("id", id);
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log("error", error);
  }
}

export async function updateProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log("error", error);
  }
}
