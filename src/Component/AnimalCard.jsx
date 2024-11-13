import { useState } from "react";
import { Link } from "react-router-dom";
import { memo } from "react";

const AnimalCard = memo(({ animal }) => {
    const [showAllPersonalities, setShowAllPersonalities] = useState(false);
    const maxVisiblePersonalities = 3;

    return (
        <>
            {animal ? (
                <div className="relative animalDetail bg-white shadow-lg rounded-lg p-6 mx-auto my-4 transform transition duration-300 hover:scale-105 max-w-xs">
                    {animal.photos && animal.photos.length > 0 ? (
                        <img
                            src={animal.photos[0].medium || animal.photos[0].small || animal.photos[0].large}
                            alt={animal.name}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                            style={{ width: '256px', height: '256px' }}
                        />
                    ) : (
                        <div
                            className="flex items-center justify-center bg-gray-200 rounded-lg mb-4"
                            style={{ width: '256px', height: '256px' }}
                        >
                            <h1 className="text-gray-500">No Image Available</h1>
                        </div>
                    )}
                    <h1 className="text-2xl font-bold text-gray-800 mb-2 truncate">Name: {animal.name}</h1>
                    <h3 className="text-lg text-gray-600 mb-2">Gender: {animal.gender}</h3>
                    <p className="text-base text-gray-700 mb-4 line-clamp-3">
                        Description: {animal.description || 'No description available'}
                    </p>
                    
                    <p className="text-base text-gray-600 mb-2">
                        Status: {animal.status || 'No status available'}
                    </p>
                    
                    <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Personalities:</h2>
                    <ul className="list-disc list-inside space-y-1">
                        {animal.tags && animal.tags.length > 0 ? (
                            animal.tags
                                .slice(0, showAllPersonalities ? animal.tags.length : maxVisiblePersonalities)
                                .map((personality, index) => (
                                    <li key={index} className="text-gray-700">{personality}</li>
                                ))
                        ) : (
                            <li className="text-gray-500">No personalities listed</li>
                        )}
                    </ul>
                    {animal.tags && animal.tags.length > maxVisiblePersonalities && (
                        <button
                            onClick={() => setShowAllPersonalities(!showAllPersonalities)}
                            className="text-blue-500 mt-2 underline"
                        >
                            {showAllPersonalities ? 'Show Less' : 'Show More'}
                        </button>
                    )}

                    {/* Overlay covering the entire card */}
                    <Link
                        to={`/animal/${animal.id}`}
                        className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"
                    >
                        <span className="text-lg font-semibold">View Details</span>
                    </Link>
                </div>
            ) : (
                <h1 className="text-center text-xl font-semibold text-gray-700">Loading...</h1>
            )}
        </>
    );
});

export default AnimalCard;
