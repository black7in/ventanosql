"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import {
  UserGroupIcon,
  HomeIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  ArchiveBoxArrowDownIcon,
  UserIcon
} from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Vendedores',
    href: '/dashboard/vendedores',
    icon: UserIcon,
  },
  {
    name: 'Ventas',
    href: '/dashboard/ventas',
    icon: BuildingStorefrontIcon,
  },
  {
    name: 'Compras',
    href: '/dashboard/compras',
    icon: ShoppingBagIcon
  },
  {
    name: 'Clientes',
    href: '/dashboard/clients',
    icon: UserGroupIcon,
  },
  {
    name: 'Productos',
    href: '/dashboard/products',
    icon: DevicePhoneMobileIcon
  },
  {
    name: 'Categorias',
    href: '/dashboard/categories',
    icon: ChartBarIcon
  },
  {
    name: 'Proveedores',
    href: '/dashboard/proveedores',
    icon: ArchiveBoxArrowDownIcon
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
        )}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
