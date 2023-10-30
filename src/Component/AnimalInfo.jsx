import '../App.css'
import { Link, Outlet } from 'react-router-dom';
const AnimalInfo = ({animals,searchItem}) => {
console.log(animals);

    return(
        <>
<div className="mainContent"> <h1>Love Animal? Adopt them</h1>
   <div className="animal-grid">
     {animals.length === 9 ? (
        animals.map((animal, index) => (
          <div key={index} className="animal-item">
            <img src={animal.photos[0].large} alt="" />
                <div className="animal-info">
                    <h1>{animal.name}</h1>
                        <div className="age-gender">
                            <p>{animal.age} .</p>
                            <p>{animal.gender}</p>
                        </div>
                            <p>{animal.breeds.primary}</p>
                </div>
            <Link to={`/animalDetail/${animal.id}`}>
              <button>Learn More About {animal.gender === "Female" ? "Her" : "Him"}</button>
            </Link>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
    </div>
        </>
    )
}
export default AnimalInfo;