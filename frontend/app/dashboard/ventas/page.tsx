'use client'
import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import Search from '@/app/ui/search'
import Link from 'next/link'
import { EyeIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, getKeyValue } from '@nextui-org/react'
import { useSession } from 'next-auth/react'

function Ventas() {

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 15;

  const { data: session, status } = useSession();
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    // Función para obtener los productos
    const getDatos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ventas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.user?.token}`,
          },
        });
        const data = await res.json();
        setVentas(data);
      } catch (error) {
        console.error('Error fetching proveedores:', error);
      }
    };

    // Llamar a la función para obtener los productos cuando el componente se monta
    getDatos();
  }, [session]); // El efecto se ejecutará cuando la sesión cambie



  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          {
            label: 'Ventas',
            href: '/dashboard/ventas',
            active: true,
          },
        ]}
      />

      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 mt">
          <Search placeholder="Buscar categorias..." />
          <Link
            href="/dashboard/ventas/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">Nueva Venta</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
          </Link>
        </div>


        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 mt-8">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Cliente
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Vendedor
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Detalles</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {ventas.map((venta: any) => (
                <tr
                  key={venta._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {venta.cliente.name}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {venta.vendedor.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {venta.createdAt}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {venta.total}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`ventas/show/${venta._id}`}
                        className="rounded-md border p-2 hover:bg-gray-100"
                      >
                        <EyeIcon className="w-5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Ventas