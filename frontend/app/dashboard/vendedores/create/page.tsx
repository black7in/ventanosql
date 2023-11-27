'use client';
import React, { use } from 'react'
import {
    AtSymbolIcon,
    PhoneIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { useState } from 'react';
import { Button } from '@/app/ui/button';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { animate } from 'framer-motion';

function CrearClientes() {
    const { status } = useSession();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(name)
        console.log(email)
        console.log(password)
        console.log(role);

        
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    role: role
                }),
            }
        );

        const responseAPI = await res.json();
        console.log(responseAPI)

        if (res.ok) {
            // Notificación de éxito
            toast.success('Vendedor creado exitosamente');

            setName('');
            setEmail('');
            setPassword('');
            setRole('');
        } else {
            // Notificación de error
            toast.error('Error al crear el Vendedor');
        }
    };

    const handleRoleChange = (e: any) => {
        setRole(e.target.value);
    };

    if (status === "loading") {
        return <Spinner>Cargando..</Spinner>;
    }

    return (
        <div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    {
                        label: 'Vendedores',
                        href: '/dashboard/vendedores',
                    },
                    {
                        label: 'Crear',
                        href: '/dashboard/vendedores/create',
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
                                placeholder="Ingresar nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                            Email
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    step="0.01"
                                    placeholder="Correo electronico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                            Password
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    step="0.01"
                                    placeholder="Ingresa la contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="mb-2 block text-sm font-medium">
                            Rol
                        </label>
                        <div className="relative">
                            <select
                                id="role"
                                name="role"
                                value={role}
                                onChange={handleRoleChange}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            >
                                <option value="" disabled>
                                    Seleccionar Rol
                                </option>
                                <option value="admin">Administrador</option>
                                <option value="seller">Vendedor</option>
                                {/* Agrega más opciones según sea necesario */}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Button type="submit">Crear Cliente</Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
export default CrearClientes