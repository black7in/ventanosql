'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserCircleIcon, AtSymbolIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Button } from '@/app/ui/button';

function EditarCliente({ params }: { params: { clientId: string } }) {
    const { clientId } = params;

    const [client, setClient] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const fetchClienteById = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/${clientId}`,
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
                setClient(data);
            } catch (error) {
                console.error(error);
                // Manejar el error, por ejemplo, mostrar una notificación
                toast.error('Error al obtener los datos del cliente');
            }
        };

        fetchClienteById();
    }, [clientId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const phoneAsNumber = parseInt(client.phone);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/${clientId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: client.name,
                        email: client.email,
                        phone: phoneAsNumber
                    }),
                }
            );

            if (res.ok) {
                // Notificación de éxito
                toast.success('Cliente editado exitosamente');
            } else {
                // Notificación de error
                toast.error('Error al editar el cliente');
            }

            const data = await res.json();
            setClient(data);
        } catch (error) {
            console.error(error);
            // Manejar el error, por ejemplo, mostrar una notificación
            toast.error('Error al enviar la solicitud de edición del cliente');
        }
    };

    return (
        <div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    {
                        label: 'Clientes',
                        href: '/dashboard/clients',
                    },
                    {
                        label: 'Crear',
                        href: '/dashboard/clients/create',
                        active: true
                    },
                ]}
            />
            <form onSubmit={handleSubmit}>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    {/* Customer Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">
                            Nombre
                        </label>
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Ingresar nombre"
                                value={client.name}
                                onChange={(e) => setClient((prevClient) => ({ ...prevClient, name: e.target.value }))}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                            Email
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Correo electronico"
                                    value={client.email}
                                    onChange={(e) => setClient((prevClient) => ({ ...prevClient, email: e.target.value }))}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                            Telefono
                        </label>
                        <div className="relative">
                            <input
                                id="phone"
                                name="phone"
                                type="number"
                                placeholder="Ingresar numero de telefono"
                                value={client.phone}
                                onChange={(e) => setClient((prevClient) => ({ ...prevClient, phone: e.target.value }))}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Button type="submit">Guardar Cambios</Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default EditarCliente;
