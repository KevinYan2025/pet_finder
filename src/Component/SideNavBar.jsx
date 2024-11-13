import { Link } from "react-router-dom";
import { getAnimals } from "../utilities/helper";
import { useState } from "react";
import { useAnimals } from "../contexts/AnimalsContext";

const SideNavBar = () => {
    const { setAnimals, loading, setLoading ,setFilters} = useAnimals();
    const ageOptions = ["All", "baby", "young", "adult", "senior"];
    const colorOptions = ["All", "Agouti", "Black", "Blue / Gray", "Brown / Chocolate", "Cream", "Lilac", "Orange / Red", "Sable", "Silver Marten", "Tan", "Tortoiseshell", "White"];

    const [color, setColor] = useState(colorOptions);
    const [dogOnly, setDogOnly] = useState(false);
    const [catOnly, setCatOnly] = useState(false);
    const [gender, setGender] = useState(["male", "female", "unknown"]);
    const [age, setAge] = useState(ageOptions);
    const [location, setLocation] = useState('');

    const handleColorChange = (e) => {
        const { value, checked } = e.target;
        if (value === "All") {
            setColor(checked ? colorOptions : []);
        } else {
            setColor(prev =>
                checked ? [...prev, value] : prev.filter(colorOption => colorOption !== value)
            );
        }
    };

    const handleAgeChange = (e) => {
        const { value, checked } = e.target;
        if (value === "All") {
            setAge(checked ? ageOptions : []);
        } else {
            setAge(prev =>
                checked ? [...prev, value] : prev.filter(ageOption => ageOption !== value)
            );
        }
    };

    const handleGenderChange = (e) => {
        const { value } = e.target;
        setGender(value === "Any" ? ["male", "female", "unknown"] : [value]);
    };

    const applyFilters = async (e) => {
        e.preventDefault();
        setLoading(true);
        const animals = await getAnimals(
            1, 100, color, dogOnly, catOnly, gender, age, location
        );
        setFilters({
            page: 1,
            limit: 100,
            color,
            dogOnly,
            catOnly,
            gender,
            age,
            location
          });
        setAnimals(animals);
        setLoading(false);
    };

    return (
        <div className="flex">
            <div className="fixed top-0 left-0 h-full bg-gray-800 text-gray-200 p-6 w-64 shadow-lg rounded-r-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Filter Animals</h2>

                <div className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-semibold">Color</label>
                        <div className="grid grid-cols-2 gap-2">
                            {colorOptions.map((colorOption) => (
                                <div key={colorOption} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={colorOption}
                                        checked={color.includes(colorOption)}
                                        onChange={handleColorChange}
                                        className="mr-2 rounded bg-gray-700 border-gray-600"
                                    />
                                    <label className="text-sm">{colorOption}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={dogOnly}
                            onChange={() => setDogOnly(!dogOnly)}
                            className="mr-2 rounded bg-gray-700 border-gray-600"
                        />
                        <label className="text-sm">Dogs Only</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={catOnly}
                            onChange={() => setCatOnly(!catOnly)}
                            className="mr-2 rounded bg-gray-700 border-gray-600"
                        />
                        <label className="text-sm">Cats Only</label>
                    </div> */}

                    <div>
                        <label className="block mb-2 text-sm font-semibold">Gender</label>
                        <select
                            value={gender.length === 3 ? "Any" : gender[0]}
                            onChange={handleGenderChange}
                            className="w-full p-2 rounded bg-gray-700 text-gray-200 border-none focus:outline-none"
                        >
                            <option value="Any">Any</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="unknown">Unknown</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold">Age</label>
                        <div className="grid grid-cols-2 gap-2">
                            {ageOptions.map((ageOption) => (
                                <div key={ageOption} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={ageOption}
                                        checked={age.includes(ageOption)}
                                        onChange={handleAgeChange}
                                        className="mr-2 rounded bg-gray-700 border-gray-600"
                                    />
                                    <label className="text-sm">{ageOption}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold">Location (Zip Code)</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none"
                            placeholder="Enter zip code"
                        />
                    </div>

                    <button
                        onClick={applyFilters}
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200 mt-4 focus:outline-none"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideNavBar;
