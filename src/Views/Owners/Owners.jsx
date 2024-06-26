import React from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, ArrowDownRightIcon } from '@heroicons/react/20/solid';
import { getOwners } from '../../api/queries';
import { useQuery } from '@tanstack/react-query';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Loading from '../../Components/Loading';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export const Owners = () => {
  const authUser = useAuthUser();
  const id = authUser.id;

  const { data: owners, isLoading } = useQuery({
    queryKey: ['owners', id],
    queryFn: () => getOwners(id),
    enabled: !!id,
  });
  

  if (isLoading) {
    return <Loading />;
  }

  const ownersElements = owners.map(owner => (
    <tr key={owner.id}>
      <td className='px-6 py-4 whitespace-nowrap'>{owner.nombre}</td>
      <td className='px-6 py-4 whitespace-nowrap'>{owner.correo}</td>
      <td className='px-6 py-4 whitespace-nowrap '>
        <Link to={`/properties/${owner.id}`} className='flex'>
          <ArrowDownRightIcon className='w-6 h-6 mr-1' />
          <span>Ver propiedades</span>
        </Link>
      </td>
    </tr>
  ));

  return (
    <>
      <div className='flex pb-3 mb-5 justify-between border-b border-b-gray-300'>
        <h2 className='text-3xl font-bold'>Propietarios</h2>
        <Link to="create" className='py-2 px-3 text-white bg-firstColor rounded flex items-center'>
          <PlusIcon className='w-6 h-6 mr-1' />
          <span>Nuevo propietario</span>
        </Link>
      </div>
      {
        owners.length === 0 ?
          <div className='absolute inset-x-0 mt-20 flex flex-col items-center justify-center'>
            <UserGroupIcon className='w-24 h-24' color='#0E9594' />
            <p className='mt-2 italic text-firstColor'>No has añadido ningún propietario</p>
          </div>
          :
          <table className="table min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Nombre</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Correo</th>
                <th className='px-6 py-3 tracking-wider w-1/5'></th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {ownersElements}
            </tbody>
          </table>
      }
    </>
  );
};
