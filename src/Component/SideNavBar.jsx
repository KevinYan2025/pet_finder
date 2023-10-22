
const SideNavBar = ({animals,setFilteredAnimals,searchItem,setSearchItem,setLoveCat,setLoveDog,setCurrentPage,currentPage}) => {
    const handleDogOnly = (event) => {
        const isChecked = event.target.checked;
        if(isChecked){
            setLoveCat(false)
        }else{
            setLoveCat(true)
        }
    }
    const handleCatOnly = (event) => {
        const isChecked = event.target.checked;
        if(isChecked){
            setLoveDog(false)
        }else{
            setLoveDog(true)
        }
    }
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
                    value="false"
                    onChange={handleDogOnly}
                    />
                    Dog Only
                </label>
                <label>
                    <input
                    type="checkbox"
                    value="false"
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