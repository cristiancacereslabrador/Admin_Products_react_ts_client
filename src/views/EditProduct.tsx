import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import {
  addProduct,
  getProductById,
  updateProduct,
} from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  //   console.log("desde Loader:", params.id);
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    // console.log("product", product);
    if (!product) {
      //   throw new Response("", { status: 404, statusText: "Not Found" });
      return redirect("/");
    }
    return product;
  }
}
export async function action({ request, params }: ActionFunctionArgs) {
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
  //   await addProduct(data);
  if (params.id !== undefined) {
    await updateProduct(data, +params.id); //ORIGINAL
    // await updateProduct(data, params.id); //OJO ACA
    return redirect("/");
  }
}

const availabilityOptions = [
  { name: "Available", value: true },
  { name: "Not Available", value: false },
];

export default function EditProduct() {
  const error = useActionData() as string;
  const product = useLoaderData() as Product;
  //   console.log("error:", error);
  //   const { state } = useLocation();
  //   console.log("state", state);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Edit Product</h2>
        <Link
          to="/"
          className="flex rounded-md bg-sky-600 p-3 text-sm font-bold text-white shadow-md hover:bg-sky-400 text-center items-center active:transform active:scale-95"
        >
          Return to Products
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST" action="">
        <ProductForm product={product} />

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Availability:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50 rounded-md shadow-md"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-sky-600 hover:bg-sky-400 p-2 text-white font-bold text-lg cursor-pointer rounded-md shadow-md active:transform active:scale-95"
          value="Save Changes"
        />
      </Form>
    </>
  );
}
