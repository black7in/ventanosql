'use client';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

interface Proveedor {
    _id: string;
    name: string;
    descripcion: string;
    direccion: string;
    email: string;
    phone: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface DetalleItem {
    name: string;
    cantidad: number;
    costoUnitario: number;
    costoTotal: number;
}

interface DatosAPI {
    _id: string;
    proveedor: Proveedor;
    detalle: DetalleItem[];
    total: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


function DetallesCompra({ params }: { params: { compraId: string } }) {
    const { compraId } = params;

    const [datos, setDatos] = useState<DatosAPI>();

    useEffect(() => {
        const fetchClienteById = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/compras/${compraId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                );

                if (!res.ok) {
                    throw new Error('No se pudieron obtener los datos del cliente');
                }

                const data = await res.json();


                setDatos(data);
            } catch (error) {
                console.error(error);
                // Manejar el error, por ejemplo, mostrar una notificación
                toast.error('Error al obtener los datos del cliente');
            }
        };

        fetchClienteById();

    }, []);

    const handleTest = function () {
        console.log(datos)
    }

    return (
        <div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    {
                        label: 'Compras',
                        href: '/dashboard/compras',
                    },
                    {
                        label: 'Detalle',
                        href: '/dashboard/compras/show/' + compraId,
                        active: true
                    },
                ]}
            />
            <div className="container mx-auto p-8 bg-white shadow-lg rounded-md">
                <h2 className="text-3xl font-bold mb-6">Detalle de Compra</h2>

                <div className="mb-6">
                    <p className="text-gray-700 font-bold">Proveedor:</p>
                    <p className="text-xl">{datos?.proveedor.name}</p>
                    <p>{datos?.proveedor.email}</p>
                    <p>{datos?.proveedor.phone}</p>
                </div>
                <div className="mb-8">
                    <p className="text-gray-700 font-bold mb-3">Lista Productos:</p>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>Producot</TableColumn>
                            <TableColumn>Costo Unitario</TableColumn>
                            <TableColumn>Cantidad</TableColumn>
                            <TableColumn>Costo Total</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {datos!?.detalle.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        {item.costoUnitario}
                                    </TableCell>
                                    <TableCell>
                                        {item.cantidad}
                                    </TableCell>
                                    <TableCell>
                                        {item.costoTotal}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <p className="text-gray-700 font-bold">Costo Total:</p>
                    <p className="text-2xl text-green-600">Bs {datos?.total}</p>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default DetallesCompra