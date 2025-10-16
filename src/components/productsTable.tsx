import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Product } from "@/types/product";

export function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>titre</TableHeadCell>
            <TableHeadCell>description</TableHeadCell>

            <TableHeadCell>Prix</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Action</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {products.map((product) => (
            <TableRow
              key={product._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {product.title}
              </TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>

              <TableCell>
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Modifier
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 hover:underline dark:text-primary-500 p-2"
                >
                  Supprimer
                </a>
                <a
                  href="#"
                  className="font-medium text-green-600 hover:underline dark:text-primary-500"
                >
                  Voir
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
