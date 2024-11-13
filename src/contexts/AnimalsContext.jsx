
import { createContext, useState, useContext } from 'react';

const AnimalsContext = createContext();


// Provider
export const AnimalsProvider = ({ children }) => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilters] = useState({});


    return (
        <AnimalsContext.Provider value={{ animals, setAnimals, loading, setLoading,filter,setFilters }}>
            {children}
        </AnimalsContext.Provider>
    );
};

// Custom hook for accessing the context
export const useAnimals = () => useContext(AnimalsContext);