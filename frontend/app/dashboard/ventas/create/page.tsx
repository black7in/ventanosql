'use client';
import React from 'react'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Select, SelectItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import { Spinner } from '@nextui-org/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

interface ProductSelected {
    _id: string
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
}

interface Client {
    _id: string
    name: string;
    email: string;
    phone: number;
}

function Create() {
    const { data: session, status } = useSession();
    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    //const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState<ProductSelected[]>([]);
    const [totalPricesSum, setTotalPricesSum] = useState(0);

    useEffect(() => {
        // Función para obtener los productos
        const getProducts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${session?.user?.token}`,
                    },
                });
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const getClients = async () => {
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
                console.error('Error fetching products:', error);
            }
        };

        // Llamar a la función para obtener los productos cuando el componente se monta
        getProducts();
        getClients();
    }, [session]); // El efecto se ejecutará cuando la sesión cambie

    if (status === "loading") {
        return <Spinner label="Default" color="default" labelColor="foreground" />;
    }

    const handleSearch = (e: any) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filtered = products.filter((product: any) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );

        setFilteredProducts(filtered);
    };

    const handleAddToCart = (product: any) => {
        const existingProductIndex = selectedProducts.findIndex((p: any) => p._id === product._id);

        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, actualiza la cantidad y el precio total
            setSelectedProducts((prevProducts) => {
                const updatedProducts = [...prevProducts];
                updatedProducts[existingProductIndex].quantity += 1;
                updatedProducts[existingProductIndex].totalPrice = updatedProducts[existingProductIndex].quantity * product.price;

                const suma = updatedProducts.reduce((sum, product) => sum + product.totalPrice, 0);
                setTotalPricesSum(parseFloat(suma.toFixed(2))); // Redondea a 2 decimales y convierte a número
                return updatedProducts;
            });
        } else {
            // Si el producto no está en el carrito, agrégalo
            const newProduct = {
                _id: product._id,
                name: product.name,
                quantity: 1,
                price: product.price,
                totalPrice: product.price,
            };

            setSelectedProducts((prevProducts) => {
                const updatedProducts = [...prevProducts, newProduct];
                const suma = updatedProducts.reduce((sum, product) => sum + product.totalPrice, 0);
                setTotalPricesSum(parseFloat(suma.toFixed(2))); // Redondea a 2 decimales y convierte a número
                return updatedProducts;
            });
        }
    };



    const handleClienteSeleccionado = (event: any) => {
        setClienteSeleccionado(event.target.value);
        console.log(clienteSeleccionado)
    };

    const handleVenta = async () => {
        const simplifiedProducts = selectedProducts.map(({ name, quantity, price }) => ({
            name,
            cantidad: quantity,
            precio: price
        }));

        const name = clients.find((p: any) => p._id === clienteSeleccionado)?.name;
        const phone = clients.find((p: any) => p._id === clienteSeleccionado)?.phone;

        const roundedTotal = totalPricesSum.toFixed(2);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/ventas`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    vendedor: session?.user._id,
                    cliente: {
                        name,
                        phone
                    },
                    total: roundedTotal,
                    detalle: simplifiedProducts
                }),
            }
        );

        const responseAPI = await res.json();

        if (res.ok) {
            // Notificación de éxito
            toast.success('Venta realizada exitosamente');
        } else {
            // Notificación de error
            toast.error('Error al realizar la venta');
        }

        setSelectedProducts([]);
        setTotalPricesSum(0);
        setClienteSeleccionado('');

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
                        label: 'Crear',
                        href: '/dashboard/ventas/create',
                        active: true
                    },
                ]}
            />

            <div className="w-full">
                <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                    <div className="w-full mb-5">
                        {/* Seleccionar Proveedor y cargar */}
                        <div className="grid grid-cols-[1fr,2fr] gap-4">
                            <div>
                                {/*value={proveedorSeleccionado} */}
                                <Select
                                    label="Cliente"
                                    color='success'
                                    placeholder="Selecciona Cliente"
                                    className="max-w-xs"
                                    onChange={handleClienteSeleccionado}
                                >
                                    {clients.map((cliente: any) => (
                                        <SelectItem key={cliente._id} value={cliente._id}>
                                            {cliente.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <Card>
                                    <CardHeader>
                                        <p>Datos del Cliente</p>
                                    </CardHeader>
                                    <CardBody>
                                        {clienteSeleccionado ? (
                                            <div>
                                                <p>Nombre: {clients.find((p: any) => p._id === clienteSeleccionado)?.name}</p>
                                                <p>Teléfono: {clients.find((p: any) => p._id === clienteSeleccionado)?.phone}</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>Nombre: </p>
                                                <p>Teléfono:</p>
                                            </div>
                                        )}
                                    </CardBody>
                                </Card>

                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-[1fr,2fr] gap-4">
                        <div>
                            <div className="relative flex flex-1 flex-shrink-0">
                                <label htmlFor="search" className="sr-only">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    placeholder="Buscar productos"
                                    className="border p-2 mb-4 peer block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <MagnifyingGlassIcon className="absolute left-3 top-1/3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>

                            {searchTerm && (
                                <ul>
                                    {filteredProducts.map((product: any) => (
                                        <Card className="max-w-[340px] mb-4" key={product._id}>
                                            <CardHeader className="justify-between">
                                                <div className="flex gap-5">
                                                    <div className="flex flex-col gap-1 items-start justify-center">
                                                        <h4 className="text-small font-semibold leading-none text-default-600">{product.name}</h4>
                                                    </div>
                                                </div>
                                                <Button
                                                    className=""
                                                    color="primary"
                                                    radius="full"
                                                    size="sm"
                                                    variant="solid"
                                                    onClick={() => handleAddToCart(product)}
                                                >
                                                    Agregar
                                                </Button>
                                            </CardHeader>
                                            <CardBody className="px-3 py-0 text-small text-default-400">
                                                <p>
                                                    {product.description}
                                                </p>
                                            </CardBody>
                                            <CardFooter className="gap-3">
                                                <div className="flex gap-1">
                                                    <p className=" text-default-400 text-small">Precio: $</p>
                                                    <p className="font-semibold text-default-400 text-small">{product.price}</p>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div>
                            {/* Contenido de la segunda columna */}
                            {/* Taba de compras */}
                            <h2 className="text-xl font-semibold mb-4">Detalle de Venta</h2>
                            <Table aria-label="Example static collection table">
                                <TableHeader>
                                    <TableColumn>Producto</TableColumn>
                                    <TableColumn>Cantidad</TableColumn>
                                    <TableColumn>Precio Unitario</TableColumn>
                                    <TableColumn>Precio Total</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {selectedProducts.map((selectedProduct: any) => (
                                        <TableRow key={selectedProduct._id}>
                                            <TableCell>{selectedProduct.name}</TableCell>
                                            <TableCell>{selectedProduct.quantity}</TableCell>
                                            <TableCell>{selectedProduct.price}</TableCell>
                                            <TableCell>${selectedProduct.totalPrice.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="mt-4 flex justify-end">
                                Total: {totalPricesSum}
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button color="success" onClick={handleVenta}>
                                    Generar Venta
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default Create