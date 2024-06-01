import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  //   console.log("desde accion de productDetails", params.id);
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const isAvailable = product.availability;

  //?? TEST*/
  //?? TEST*/

  return (
    <tr className="border-b">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            // name="availability"
            name="id"
            value={product.availability.toString()}
            className={`${
              isAvailable ? "text-black" : "text-red-700"
            } p-2 rounded-lg text-xs uppercase font-bold w-full border border-black hover:cursor-pointer`}
          >
            {isAvailable ? "Available " : "Not Available"}
          </button>
          <input type="hidden" name="id" value={product.id} />
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          {/* <button>Edit</button> */}
          {/*
          BOTON EDITAR SOLO CON "Link"
          <Link
            className="rounded-md bg-sky-600 p-3 text-sm font-bold text-white shadow-md hover:bg-sky-400 active:transform active:scale-95"
            to={`/products/${product.id}/edit`}
          >
            Edit
        </Link> */}
          {/*  BOTON EDITAR SOLO CON "useNavigate" */}
          {/* <button
            onClick={() =>
              navigate(`/products/${product.id}/edit`, { state: { product } })
            }
            className="rounded-md bg-sky-600 p-3 text-sm font-bold text-white shadow-md hover:bg-sky-400 active:transform active:scale-95"
          > */}
          {/*  BOTON EDITAR  CON URL" */}
          <button
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className="w-full rounded-md bg-sky-600 p-3 text-sm font-bold text-white shadow-md hover:bg-sky-400 active:transform active:scale-95"
          >
            Edit
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`products/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm("Are you sure you want to delete?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="w-full rounded-md bg-red-600 p-3 text-sm font-bold text-white shadow-md hover:bg-red-400 active:transform active:scale-95"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
