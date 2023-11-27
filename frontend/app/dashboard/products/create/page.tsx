'use client';
import React, { useEffect } from 'react'
import Link from 'next/link';
import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon, CurrencyEuroIcon, ChartBarIcon, ChartPieIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { useSession } from 'next-auth/react';

function ProductCreate() {
    const { data: session, status } = useSession();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        // Función para obtener los productos
        const getData = async () => {
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
        getData();
    }, [session]); // El efecto se ejecutará cuando la sesión cambie

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const priceNumber = parseInt(price);
        const stockNumber = parseInt(stock);
        
        /*console.log(name)
        console.log(description)
        console.log(brand)
        console.log(stockNumber)
        console.log(priceNumber)
        console.log(category)*/

     
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                    brand,
                    stock: stockNumber,
                    price: priceNumber,
                    category
                }),
            }
        );
        const responseAPI = await res.json();

        if (res.ok) {
            // Notificación de éxito
            toast.success('Producto creado exitosamente');

            setName('');
            setDescription('');
            setBrand('');
            setStock('');
            setPrice('');
            setCategory('');

        } else {
            // Notificación de error
            toast.error('Error al crear el prodcuto');
        }
    }

    const handleChange = (event: any) => {
        setCategory(event.target.value);
    };

    return (
        <div>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    {
                        label: 'Productos',
                        href: '/dashboard/products',
                    },
                    {
                        label: 'Crear',
                        href: '/dashboard/products/create',
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
                                id='name'
                                type="text"
                                step="0.01"
                                placeholder="Ingresar nombre de producto"
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
                                id='description'
                                type="text"
                                step="0.01"
                                placeholder="Ingresar la descripcion del producto"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                            Marca
                        </label>
                        <div className="relative">
                            <input
                                id='brand'
                                type="text"
                                step="0.01"
                                placeholder="Ingresar nombre de producto"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <ExclamationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                            Seleccionar Categoria
                        </label>
                        <div className="relative">
                            <select
                                value={category}
                                onChange={handleChange}
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            >
                                <option value="" disabled>
                                    Selecciona una categoría
                                </option>
                                {categories.map((cat: any) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <ChartPieIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                            Precio
                        </label>
                        <div className="relative">
                            <input
                                id='price'
                                type="number"
                                step="0.01"
                                placeholder="Ingresar numero de telefono"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <CurrencyEuroIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                            Stock Inicial
                        </label>
                        <div className="relative">
                            <input
                                id='stock'
                                type="number"
                                step="0.01"
                                placeholder="Ingresar numero de telefono"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>


                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Button type="submit">Crear Cliente</Button>
                </div>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default ProductCreate