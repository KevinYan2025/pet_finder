import '../App.css'
const AnimalInfo = ({animals,searchItem}) => {
console.log(animals);

    return(
        <>
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
            <button>Adopt {animal.gender === "Female" ? "her" : "him"}</button>

          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
        </>
    )
}
export default AnimalInfo;