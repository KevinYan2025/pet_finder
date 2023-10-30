
const SideNavBar = ({animals,setFilteredAnimals,searchItem,setSearchItem,setLoveCat,setLoveDog,setCurrentPage,currentPage,loveCat,loveDog}) => {
    const handleDogOnly = () => {
        setLoveDog(true);
        setLoveCat(false);
      };
    
      const handleCatOnly = () => {
        setLoveCat(true);
        setLoveDog(false);
      };
    
      const fetchAllAnimal = () => {
        setLoveCat(false);
        setLoveDog(false);
      };
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
    }
    const handleSearch = (event) => {
        setSearchItem(event.target.value)
        setFilteredAnimals(animals.filter((animal) => {animal.breeds.primary.toLowerCase().includes(searchItem.toLowerCase())}))

    }
    return(
        <>
        <div className="sidebar"> 
            <input 
            type="text" 
            placeholder="Search for dog breed"
            value={searchItem}
            onChange={handleSearch}
            />
            <h1>Filter</h1>
            <div>
                <label>
                    <input
                    type="checkbox"
                    checked={!loveCat && !loveDog}
                    onChange={fetchAllAnimal}
                    />
                    All
                </label>
                <label>
                    <input
                    type="checkbox"
                    checked={loveDog}
                    onChange={handleDogOnly}
                    />
                    Dog Only
                </label>
                <label>
                    <input
                    type="checkbox"
                    checked={loveCat}
                    onChange={handleCatOnly}
                    />
                    Cat Only
                </label>
                <button onClick={handleNextPage}>next</button>
            </div>
        </div>
        </>
    )
}
export default SideNavBar;