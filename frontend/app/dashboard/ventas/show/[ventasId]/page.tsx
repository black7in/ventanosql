'use client';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

interface Vendedor {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Cliente {
    name: string;
    phone: number;
}

interface DetalleItem {
    name: string;
    precio: number;
    cantidad: number;
}

interface Venta {
    _id: string;
    vendedor: Vendedor;
    cliente: Cliente;
    total: number;
    detalle: DetalleItem[];
}



function DetalleVentas({ params }: { params: { ventasId: string } }) {
    const { ventasId } = params;
    const [venta, setVenta] = useState<Venta>()

    useEffect(() => {
        const fetchVentaById = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/ventas/${ventasId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                );
                if (!res.ok) {
                    throw new Error('No se pudieron obtener los datos de la venta');
                }

                const data = await res.json();
                setVenta(data);
            } catch (error) {
                console.error(error);
                // Manejar el error, por ejemplo, mostrar una notificación
                toast.error('Error al obtener los datos de la venta');
            }
        };
        fetchVentaById();
    }, []);

    const handleMostrarVenta = () => {
        console.log(venta);
    };


    return (
        <div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    {
                        label: 'Ventas',
                        href: '/dashboard/ventas',
                    },
                    {
                        label: 'Detalle',
                        href: '/dashboard/ventas/show/' + ventasId,
                        active: true
                    },
                ]}
            />

            <div className="container mx-auto p-8 bg-white shadow-lg rounded-md">
                <h2 className="text-3xl font-bold mb-6">Detalle de Venta</h2>

                <div className="mb-6">
                    <p className="text-gray-700 font-bold">Vendedor:</p>
                    <p className="text-xl">{venta?.vendedor?.name}</p>
                    <p>{venta?.vendedor.email}</p>
                </div>
                <div className="mb-6">
                    <p className="text-gray-700 font-bold">Cliente:</p>
                    <p className="text-xl">{venta?.cliente?.name}</p>
                    <p>{venta?.cliente.phone}</p>
                </div>
                <div className="mb-8">
                    <p className="text-gray-700 font-bold mb-3">Lista Productos:</p>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>Producto</TableColumn>
                            <TableColumn>Precio</TableColumn>
                            <TableColumn>Cantidad</TableColumn>
                            <TableColumn>Total</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {venta!?.detalle.map((detalleItem, index) => (
                                <TableRow key={index}>
                                    <TableCell>{detalleItem.name}</TableCell>
                                    <TableCell>{detalleItem.precio}</TableCell>
                                    <TableCell>{detalleItem.cantidad}</TableCell>
                                    <TableCell>{detalleItem.cantidad * detalleItem.precio}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
                <div>
                    <p className="text-gray-700 font-bold">Costo Total:</p>
                    <p className="text-2xl text-green-600">Bs {venta?.total}</p>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default DetalleVentas