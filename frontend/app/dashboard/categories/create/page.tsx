'use client';
import React from 'react'
import { AtSymbolIcon, DocumentTextIcon, UserCircleIcon, } from '@heroicons/react/24/outline';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { useState } from 'react';
import { Button } from '@/app/ui/button';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function CrearCategoria() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                }),
            }
        );

        const responseAPI = await res.json();

        if (res.ok) {
            // Notificación de éxito
            toast.success('Categoria creada exitosamente');

            setName('');
            setDescription('');
        } else {
            // Notificación de error
            toast.error('Error al crear la categoria');
        }
    };

    return (
        <div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    {
                        label: 'Categorias',
                        href: '/dashboard/categories',
                    },
                    {
                        label: 'Crear',
                        href: '/dashboard/categories/create',
                        active: true
                    },
                ]}
            />
            <form onSubmit={handleSubmit}>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    {/* Customer Name */}
                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                            Nombre
                        </label>
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                step="0.01"
                                placeholder="Ingresar nombre de la categoria"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                            Descripcion
                        </label>
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                step="0.01"
                                placeholder="Ingrese la descripcion de la categoria"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Button type="submit">Crear Categoria</Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default CrearCategoria