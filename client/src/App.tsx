import { useEffect, useState } from 'react';
import { Cliente, DataResponse } from './types/intefaces';

export default function App() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [totalClients, setTotalClients] = useState(0);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`http://localhost:3030/clientes?page=${page}&pageSize=${pageSize}`);
        const data = await response.json() as DataResponse;
        setClients(data.clients);
        setTotalClients(data.count);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, [page, pageSize]);

  const totalPages = Math.ceil(totalClients / pageSize);

  return (
    <div className='flex flex-col'>

      <div className='py-4 bg-blue-600 text-white text-2xl font-semibold text-center'>
        Listado de Clientes
      </div>

      <div className='h-[86vh] overflow-y-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-black sticky top-0 z-10'>
          <thead className='text-xs text-black uppercase bg-blue-200 '>
            <tr>
              <th className='px-6 py-3'> Documento </th>
              <th className='px-6 py-3'> Nombres </th>
              <th className='px-6 py-3'> Telefono </th>
              <th className='px-6 py-3'> Correo </th>
              <th className='px-6 py-3'> Categoría </th>
            </tr>
          </thead>
          <tbody>
            {
              clients.length > 0 ? (
                clients.map(client => (
                  <tr key={client.DOCUMENTO} className='text-black odd:bg-white odd:dark:bg-gray-200 even:bg-gray-50 even:dark:bg-gray-100'>
                    <th scope='row' className='px-6 py-4'>
                      {client.DOCUMENTO}
                    </th>
                    <td className='px-6 py-4'>
                      {client.NOMBRES}
                    </td>
                    <td className='px-6 py-4'>
                      {client.TELEFONO1}
                    </td>
                    <td className='px-6 py-4'>
                      {client.EMAIL}
                    </td>
                    <td className='px-6 py-4'>
                      {client.CATEGORIA}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td colSpan={5} className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    No hay datos
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      <div className='py-2 bg-yellow-400 flex items-center gap-4 justify-center'>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}
          className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}>
          Anterior
        </button>
        <span className='text-lg font-semibold'>
          Página {page} ↔  {totalPages}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}
          className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}>
          Siguiente
        </button>
      </div>

    </div>
  );
}