import { Link, useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
const AnimalDetail = () => {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const token = import.meta.env.VITE_APP_ACCESS_TOKEN
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const params = useParams()
    const id = params.animal
    const [animal,setAnimal] = useState({})
    useEffect(()=>{
        const fetchAnimalById = async() => {
           try{
            console.log(animal);
               const response = await axios.get(`https://api.petfinder.com/v2/animals/${id}`,config)
               console.log(response.data.animal);
               setAnimal(response.data.animal)
           }catch(error) {
            console.log(error);
           }
        }
        fetchAnimalById()
    },[])
    return(
        <>
        {animal ?
           (<div className="animalDetail">
               
                <h1>Name:{animal.name}</h1>
                <h3>Gender:{animal.gender}</h3>
               <h3>Description:{animal.description}</h3>
               <h3>Contact: {animal.contact && animal.contact.email ? animal.contact.email : 'No contact email available'}</h3>
               <h3>Phone: {animal.contact && animal.contact.phone ? animal.contact.phone : 'No contact phone number available'}</h3>
               <h3>Address: {animal.address && animal.address.address1 ? animal.address.address1 : 'No address available'}</h3>
               <h3>Status: {animal.status ? animal.status : 'No status available'}</h3>
               <h2>Personalities:</h2>
               <ul>
                    {animal.tags &&
                        animal.tags.map((personality, index) => (
                        <li key={index}>{personality}</li>
                        ))}
               </ul>
            </div>) : <h1>Loading...</h1>
        }
        <Link to='/'>
        <button>Home</button>
        </Link>
        </>
    )
}
export default AnimalDetail