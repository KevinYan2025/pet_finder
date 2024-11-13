import React, { useEffect, useState } from 'react';
import { getAnimals } from '../utilities/helper';
import AnimalCard from './AnimalCard';
import { useAnimals } from '../contexts/AnimalsContext';

const AnimalInfo = React.memo(() => {
  const { animals, loading, setLoading, setAnimals, setFilters, filter } = useAnimals();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAnimals = async () => {
      if (isNaN(page) || page < 1) {
        setPage(1); // Reset page to 1 if invalid
        return;
      }


      setLoading(true);

      // Fetch animals with the current page
      const response = await getAnimals(
        page,
        filter?.limit || 100,
        filter?.color || '',
        filter?.dogOnly || false,
        filter?.catOnly || false,
        filter?.gender || '',
        filter?.age || '',
        filter?.location || ''
      );

      setAnimals(response);
      setLoading(false);
    };

    fetchAnimals();
  }, [page, filter, setLoading, setAnimals]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-green-700 text-white text-center p-4 rounded mb-6 shadow-lg">
        <h1 className="text-2xl font-bold">Adopt These Lovely Pets!</h1>
        <p className="mt-2">Give a pet a loving home. Adopt today and make a difference!</p>
      </div>

      {!loading && animals.length > 0 ? (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {animals.map((animal, index) => (
              <AnimalCard key={index} animal={animal} />
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md font-semibold ${
                page === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 transition-colors'
              }`}
            >
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition-colors"
            >
              Next Page
            </button>
          </div>
        </>
      ) : (
        <h1 className="mt-96 text-center text-4xl font-semibold text-gray-700">Loading...</h1>
      )}
    </div>
  );
});

export default AnimalInfo;
