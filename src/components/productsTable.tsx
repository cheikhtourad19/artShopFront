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
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100">
      <Table hoverable>
        <TableHead className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <TableRow>
            <TableHeadCell className="text-gray-700 font-bold text-sm uppercase tracking-wide">
              Titre
            </TableHeadCell>
            <TableHeadCell className="text-gray-700 font-bold text-sm uppercase tracking-wide">
              Description
            </TableHeadCell>
            <TableHeadCell className="text-gray-700 font-bold text-sm uppercase tracking-wide">
              Prix
            </TableHeadCell>
            <TableHeadCell className="text-right">
              <span className="text-gray-700 font-bold text-sm uppercase tracking-wide">
                Actions
              </span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y divide-gray-100">
          {products.map((product, index) => (
            <TableRow
              key={product._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-50/30 hover:via-transparent hover:to-purple-50/30 transition-all duration-300 group"
            >
              <TableCell className="whitespace-nowrap font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span>{product.title}</span>
                </div>
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-300 max-w-md">
                <span className="line-clamp-2">{product.description}</span>
              </TableCell>
              <TableCell className="font-semibold">
                <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-3 py-1.5 rounded-xl text-sm font-bold">
                  {parseFloat(product.price).toFixed(2)} TND
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-end space-x-2">
                  {/* Voir Button */}
                  <a
                    href={`/product/${product._id}`}
                    className="group/btn inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>Voir</span>
                  </a>

                  {/* Modifier Button */}
                  <a
                    href="#"
                    className="group/btn inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Modifier</span>
                  </a>

                  {/* Supprimer Button */}
                  <a
                    href="#"
                    className="group/btn inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Supprimer</span>
                  </a>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
