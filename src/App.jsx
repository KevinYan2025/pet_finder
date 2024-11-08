import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import AnimalInfo from './Component/AnimalInfo';
import SideNavBar from './Component/SideNavBar';
import { BrowserRouter, Route, Routes ,Outlet} from "react-router-dom";
import AnimalDetail from './Component/AnimalDetail.jsx';

function App() {
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const token = import.meta.env.VITE_APP_ACCESS_TOKEN
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const [currentPage,setCurrentPage] = useState(1);
  const [loveDog,setLoveDog] = useState(false);
  const [loveCat,setLoveCat] = useState(false);
  const [animals,setAnimals]=useState([]);
  const [filteredAnimals,setFilteredAnimals] = useState(animals)
  const [searchItem,setSearchItem] = useState('')
  const nextPage = () => {    
      setCurrentPage(currentPage+1)
  }  
  const previousPage = () => {
    if(currentPage>0){
      setCurrentPage(currentPage-1)
    }
  }
  useEffect(() => {
    const apiCall = async() => {
      try{
        const response = await axios.get(`https://api.petfinder.com/v2/animals/?page=${currentPage}&&limit=100&&good_with_cats=${loveCat}&&good_with_dogs=${loveDog}`,config)
        // console.log(response.data.animals);
        
        const data = response.data.animals
        .filter((animal) => animal.photos.length !== 0)
        .filter((animal, index, self) => {
          return (
            index === self.findIndex((a) => a.name === animal.name)
          );
        })
        .slice(0,9)
        setAnimals(
          data
          )
      }catch(err){
        console.log(err)
      }
    }
    apiCall()
  },[currentPage,loveCat,loveDog,searchItem,filteredAnimals])
  // console.log(animals);
  return (
    <>
      <div className="bg-black">
      <Router>
        <div className="flex flex-row">
          <SideNavBar loveDog={loveDog} setLoveDog={setLoveDog} loveCat={loveCat} setLoveCat={setLoveCat} searchItem={searchItem} setSearchItem={setSearchItem}/>
          <Routes>
            <Route path="/" element={<AnimalInfo animals={animals} nextPage={nextPage} previousPage={previousPage} currentPage={currentPage} setFilteredAnimals={setFilteredAnimals} filteredAnimals={filteredAnimals} searchItem={searchItem} setSearchItem={setSearchItem}/>}/>
            <Route path="/:id" element={<AnimalDetail animals={animals} setAnimals={setAnimals}/>}/>
          </Routes>
        </div>
      </Router>
      </div>
    </>
  )
}

export default App
