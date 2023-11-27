"use client";
import React from 'react'
import Search from '@/app/ui/search'
import Link from 'next/link'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import { UpdateInvoice } from '@/app/ui/invoices/buttons'
import { DeleteInvoice } from '@/app/ui/invoices/buttons'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useEffect } from 'react';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Spinner } from "@nextui-org/react";

function Clients() {
  const { data: session, status } = useSession();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Función para obtener los productos
    const getData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clients`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.user?.token}`,
          },
        });
        const data = await res.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // Llamar a la función para obtener los productos cuando el componente se monta
    getData();
  }, [session]); // El efecto se ejecutará cuando la sesión cambie

  if (status === "loading") {
    return <Spinner>Cargando..</Spinner>;
  }

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          {
            label: 'Clientes',
            href: '/dashboard/clients',
            active: true,
          },
        ]}
      />

      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Buscar categorias..." />
          <Link
            href="/dashboard/clients/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">Crear Cliente</span>{' '}
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
                      Correo
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Telefono
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {clients.map((client: any) => (
                    <tr
                      key={client._id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        {client.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {client.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {client.phone}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <Link
                            href={`clients/edit/${client._id}`}
                            className="rounded-md border p-2 hover:bg-gray-100"
                          >
                            <PencilIcon className="w-5" />
                          </Link>
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

export default Clients