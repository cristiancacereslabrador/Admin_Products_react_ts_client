import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  //   console.log("accion desde form:", data);
  let error = "";
  if (Object.values(data).includes("")) {
    error = "All fields are required";
  }
  if (error.length) {
    return error;
  }
  //   console.log("error:", error);
  await addProduct(data);

  return redirect("/");
}

export default function NewProducts() {
  const error = useActionData() as string;
  //   console.log("error:", error);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Register Product</h2>
        <Link
          to="/"
          className="flex rounded-md bg-sky-600 p-3 text-sm font-bold text-white shadow-md hover:bg-sky-400 text-center items-center active:transform active:scale-95"
        >
          Return to Products
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST" action="">
        {/* <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Product Name:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50 rounded-md shadow-md"
            placeholder="Product name"
            name="name"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Price:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50 rounded-md shadow-md"
            placeholder="Price of the product. Ex.: 200, 300"
            name="price"
          />
        </div> */}
        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full bg-sky-600 hover:bg-sky-400 p-2 text-white font-bold text-lg cursor-pointer rounded-md shadow-md active:transform active:scale-95"
          value="Register product"
        />
      </Form>
    </>
  );
}
