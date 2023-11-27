"use client";
import React from 'react'
import Search from '@/app/ui/search'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import { UpdateInvoice } from '@/app/ui/invoices/buttons'
import { DeleteInvoice } from '@/app/ui/invoices/buttons'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useEffect } from 'react';

function Category() {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Función para obtener los productos
    const getProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.user?.token}`,
          },
        });
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // Llamar a la función para obtener los productos cuando el componente se monta
    getProducts();
  }, [session]); // El efecto se ejecutará cuando la sesión cambie

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          {
            label: 'Categorias',
            href: '/dashboard/categories',
            active: true,
          },
        ]}
      />

      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Buscar categorias..." />
          <Link
            href="/dashboard/categories/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">Crear Categoria</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
          </Link>
        </div>
        <div className="mt-6 flow-root">

          <div className="inline-block min-w-full align-middle">

            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Nombre
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Decripcion
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {categories.map((product: any) => (
                    <tr
                      key={product._id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        {product.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {product.description}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateInvoice id="1" />
                          <DeleteInvoice id="2" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 flex w-full justify-center">
              {/* <Pagination totalPages={totalPages} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category