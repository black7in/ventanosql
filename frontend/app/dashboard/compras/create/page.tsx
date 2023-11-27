'use client'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import React from 'react'
import { useState } from 'react';
import { StopCircleIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Spinner, TableHeader, TableColumn, TableBody, TableRow, TableCell, } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import { Select, SelectItem, Table } from '@nextui-org/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

interface ProductSelected {
    name: string;
    cantidad: number;
    costoUnitario: number;
    costoTotal: number;
}

interface Proveedor {
    _id: string;
    name: string;
    descripcion: string;
    direccion: string;
    email: string;
    phone: number;
}


interface PreProduct {
    name: string;
    costoUnitario: number;
    cantidad: number;
}

function Comprar() {
    const { data: session, status } = useSession();
    const [products, setProducts] = useState([]);
    const [proveedores, setProveedores] = useState<Proveedor[]>([])

    const [selectedProducts, setSelectedProducts] = useState<ProductSelected[]>([]);
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState<Proveedor>();

    const [selectedPreProduct, setSelectedPreProduct] = useState<PreProduct>();

    const initialStateSelectedProducts: ProductSelected[] = [];
    const initialStateProveedorSeleccionado: Proveedor = { _id: '', name: '', descripcion: '', direccion: '', email: '', phone: 0 };
    const initialStateSelectedPreProduct: PreProduct = { name: '', costoUnitario: 0, cantidad: 0 };


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

        const getProveedor = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/proveedores`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${session?.user?.token}`,
                    },
                });
                const data = await res.json();
                setProveedores(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };




        // Llamar a la función para obtener los productos cuando el componente se monta
        getProducts();
        getProveedor();
    }, [session]); // El efecto se ejecutará cuando la sesión cambie

    if (status === "loading") {
        return <Spinner label="Loading..." color="default" labelColor="foreground" />;
    }

    const handleAddToCart = (product: any) => {
        const newProduct = {
            name: product.name,
            cantidad: parseFloat(product.cantidad),
            costoUnitario: parseFloat(product.costoUnitario),
            costoTotal: product.cantidad * product.costoUnitario,
        };

        setSelectedProducts([...selectedProducts, newProduct]);
        // Limpiar el formulario
        setSelectedPreProduct({
            name: '',
            costoUnitario: 0,
            cantidad: 0
        });
    };

    const handleProveedorSeleccionado = (event: any) => {
        setProveedorSeleccionado(event.target.value);
    };

    const handleAddToForm = (product: any) => {
        setSelectedPreProduct({
            name: product.name,
            costoUnitario: 0,
            cantidad: 0
        });

        console.log(selectedPreProduct)
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setSelectedPreProduct((preProduct: any) => ({
            ...preProduct,
            [name]: value,
        }));
    };

    const handleCompra = async () => {

        const total = selectedProducts.reduce((total, product) => total + product.costoTotal, 0);
        
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/compras`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    proveedor: proveedorSeleccionado,
                    detalle: selectedProducts,
                    total: total
                }),
            }
        );

        const responseAPI = await res.json();

        if (res.ok) {
            // Notificación de éxito
            toast.success('Compra creada exitosamente');
            setSelectedPreProduct({
                name: '',
                costoUnitario: 0,
                cantidad: 0
            });
            
            // Reiniciar selectedProducts
            setSelectedProducts(initialStateSelectedProducts);

            // Reiniciar proveedorSeleccionado
            setProveedorSeleccionado(initialStateProveedorSeleccionado);

            // Reiniciar selectedPreProduct
            setSelectedPreProduct(initialStateSelectedPreProduct);

        } else {
            // Notificación de error
            toast.error('Error al crear la Compra');
        }
    };

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
                        label: 'Nueva Compra',
                        href: '/dashboard/compras/create',
                        active: true
                    },
                ]}
            />
            <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                <div className="w-full mb-5">
                    {/* Seleccionar Proveedor y cargar */}
                    <div className="grid grid-cols-[1fr,2fr] gap-4">
                        <div>
                            {/*value={proveedorSeleccionado} */}
                            <Select
                                label="Proveedor"
                                color='success'
                                placeholder="Selecciona Proveedor"
                                className="max-w-xs"
                                onChange={handleProveedorSeleccionado}
                            >
                                {proveedores.map((proveedor: any) => (
                                    <SelectItem key={proveedor._id} value={proveedor._id}>
                                        {proveedor.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <p>Datos del proveedor</p>
                                </CardHeader>
                                <CardBody>
                                    {proveedorSeleccionado ? (
                                        <div>
                                            <p>Nombre: {proveedores.find((p: any) => p._id === proveedorSeleccionado)?.name}</p>
                                            <p>Email: {proveedores.find((p: any) => p._id === proveedorSeleccionado)?.email}</p>
                                            <p>Teléfono: {proveedores.find((p: any) => p._id === proveedorSeleccionado)?.phone}</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>Nombre: </p>
                                            <p>Email: </p>
                                            <p>Teléfono:</p>
                                        </div>
                                    )}
                                </CardBody>
                            </Card>

                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="grid grid-cols-[1fr,2fr] gap-4">
                        <div>
                            <div>

                                <Card className='mt-4'>
                                    <CardHeader>
                                        <Select
                                            label="Seleccionar Producto"
                                            placeholder="Select products"
                                            color='primary'
                                            className="max-w-xs"
                                        >
                                            {products.map((product: any) => (
                                                <SelectItem key={product._id} value={product._id} onClick={() => handleAddToForm(product)}>
                                                    {product.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </CardHeader>
                                    <CardBody>
                                        <div>
                                            <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                                                Nombre Producto
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    step="0.01"
                                                    value={selectedPreProduct ? selectedPreProduct.name : ''}
                                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                                />
                                                <StopCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="customers" className="mb-2 block text-sm font-medium">
                                                Costo Unitario
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="costoUnitario"
                                                    name="costoUnitario"
                                                    type="number"
                                                    step="0.01"
                                                    value={selectedPreProduct ? selectedPreProduct.costoUnitario : ''}
                                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                                    onChange={(e) => handleInputChange(e)} // Agrega esta línea para manejar los cambios
                                                />
                                                <StopCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                                                Cantidad
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="cantidad"
                                                    name="cantidad"
                                                    type="number"
                                                    step="0.01"
                                                    value={selectedPreProduct ? selectedPreProduct.cantidad : ''}
                                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                                    onChange={(e) => handleInputChange(e)} // Agrega esta línea para manejar los cambios
                                                />
                                                <StopCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                            </div>
                                        </div>
                                    </CardBody>

                                    <CardFooter className="flex justify-end">
                                        <Button color="primary" onPress={() => handleAddToCart(selectedPreProduct)}>
                                            Agregar
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                        <div>
                            {/* Taba de compras */}
                            <h2 className="text-xl font-semibold mb-4">Carrito de Compras</h2>
                            <Table aria-label="Example static collection table">
                                <TableHeader>
                                    <TableColumn>Producto</TableColumn>
                                    <TableColumn>Cantidad</TableColumn>
                                    <TableColumn>Costo Unitario</TableColumn>
                                    <TableColumn>Costo Total</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {selectedProducts.map((selectedProduct: any) => (
                                        <TableRow key={selectedProduct._id}>
                                            <TableCell>{selectedProduct.name}</TableCell>
                                            <TableCell>{selectedProduct.cantidad}</TableCell>
                                            <TableCell>{selectedProduct.costoUnitario}</TableCell>
                                            <TableCell>{selectedProduct.costoTotal}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="mt-4 flex justify-end">
                                <Button color="primary" onPress={handleCompra}>
                                    Comprar
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div >
    )
}

export default Comprar