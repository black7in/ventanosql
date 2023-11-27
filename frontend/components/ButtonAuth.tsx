"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
    const { data: session, status } = useSession();

    console.log({ session, status });

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (session) {
        return (
            <>
                Conectado {session.user?.email} <br />
                <button
                    onClick={() => signOut()}
                    className='flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
                >
                    Cerrar Sesion
                </button>
            </>
        );
    }
    return (
        <>
            No esta conectado <br />
            <button
                onClick={() => signIn()}
                className='flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
            >
                Iniciar Sesion
            </button>
        </>
    );
}