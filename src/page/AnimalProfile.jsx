import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnimals } from '../contexts/AnimalsContext';

const AnimalProfile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [animal, setCurrentAnimal] = useState(null);
  const { animals } = useAnimals();

  useEffect(() => {
    const getAnimalById = () => {
      const foundAnimal = animals.find((a) => a.id === parseInt(params.id));
      setCurrentAnimal(foundAnimal);
    };
    getAnimalById();
  }, [params.id, animals]);

  if (!animal) return <p className="text-center text-2xl font-semibold mt-32">Loading...</p>;

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-green-100 via-purple-100 to-blue-100 shadow-lg rounded-lg max-w-2xl relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
      >
        &larr; Return
      </button>

      <h1 className="text-5xl font-extrabold mb-4 text-center text-purple-700">{animal.name}</h1>


      <div className="flex justify-center mb-6">
        {animal.primary_photo_cropped ? (
          <img
            src={animal.primary_photo_cropped.large}
            alt={animal.name}
            className="rounded-lg shadow-xl w-64 h-64 object-cover border-4 border-purple-500"
          />
        ) : (
          <div className="bg-gray-200 rounded-lg w-64 h-64 flex items-center justify-center text-gray-500 border-4 border-purple-500">
            No Image Available
          </div>
        )}
      </div>


      <div className="mb-6 p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2 text-blue-700">Basic Information</h2>
        <p><strong>Type:</strong> {animal.type}</p>
        <p><strong>Species:</strong> {animal.species}</p>
        <p><strong>Age:</strong> {animal.age}</p>
        <p><strong>Gender:</strong> {animal.gender}</p>
        <p><strong>Size:</strong> {animal.size}</p>
        <p><strong>Status:</strong> {animal.status}</p>
      </div>


      <div className="mb-6 p-6 bg-gradient-to-br from-yellow-100 to-yellow-300 border border-yellow-400 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2 text-yellow-700">Breed and Colors</h2>
        <p><strong>Primary Breed:</strong> {animal.breeds.primary}</p>
        <p><strong>Secondary Breed:</strong> {animal.breeds.secondary || 'N/A'}</p>
        <p><strong>Mixed:</strong> {animal.breeds.mixed ? 'Yes' : 'No'}</p>
        <p><strong>Primary Color:</strong> {animal.colors.primary || 'N/A'}</p>
        <p><strong>Secondary Color:</strong> {animal.colors.secondary || 'N/A'}</p>
      </div>

      <div className="mb-6 p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2 text-green-700">Attributes</h2>
        <p><strong>Spayed/Neutered:</strong> {animal.attributes.spayed_neutered ? 'Yes' : 'No'}</p>
        <p><strong>House Trained:</strong> {animal.attributes.house_trained ? 'Yes' : 'No'}</p>
        <p><strong>Declawed:</strong> {animal.attributes.declawed ? 'Yes' : 'No'}</p>
        <p><strong>Special Needs:</strong> {animal.attributes.special_needs ? 'Yes' : 'No'}</p>
        <p><strong>Shots Current:</strong> {animal.attributes.shots_current ? 'Yes' : 'No'}</p>
      </div>

      <div className="mb-6 p-6 bg-gradient-to-br from-pink-100 to-pink-300 border border-pink-400 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2 text-pink-700">Environment</h2>
        <p><strong>Good with Children:</strong> {animal.environment.children !== null ? (animal.environment.children ? 'Yes' : 'No') : 'Unknown'}</p>
        <p><strong>Good with Dogs:</strong> {animal.environment.dogs !== null ? (animal.environment.dogs ? 'Yes' : 'No') : 'Unknown'}</p>
        <p><strong>Good with Cats:</strong> {animal.environment.cats !== null ? (animal.environment.cats ? 'Yes' : 'No') : 'Unknown'}</p>
      </div>


      <div className="mb-6 p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2 text-blue-700">Contact Information</h2>
        <p><strong>Email:</strong> <a href={`mailto:${animal.contact.email}`} className="text-blue-500 underline">{animal.contact.email}</a></p>
        <p><strong>Phone:</strong> <a href={`tel:${animal.contact.phone}`} className="text-blue-500 underline">{animal.contact.phone}</a></p>
        <p><strong>Address:</strong> {animal.contact.address.address1}, {animal.contact.address.city}, {animal.contact.address.state} {animal.contact.address.postcode}, {animal.contact.address.country}</p>
      </div>

      {animal.description && (
        <div className="mb-6 p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-2 text-purple-700">Description</h2>
          <p>{animal.description}</p>
        </div>
      )}


      <div className="text-center mb-6">
        <a
          href={animal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 underline font-semibold hover:text-purple-800 transition-colors"
        >
          View on Petfinder
        </a>
      </div>
    </div>
  );
};

export default AnimalProfile;
