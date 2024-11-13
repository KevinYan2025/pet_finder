import axios from 'axios';
//get access token from petfinder and store it in local storage
export const getAccessToken = async () => {
    try {
        const apiKey = import.meta.env.VITE_APP_API_KEY;
        const secret = import.meta.env.VITE_APP_SECRET;
    
        let token = localStorage.getItem('token');
        let expiration = localStorage.getItem('expiration');
    
        if (token && expiration > Date.now()){
            return token;
        }
        // will not only enter the reminder if the token is expired or not present
        const response = await axios.post(`https://api.petfinder.com/v2/oauth2/token`, {
            grant_type: 'client_credentials',
            client_id: apiKey,
            client_secret: secret
        });
    
        token = response.data.access_token;
        expiration = response.data.expires_in;
    
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expiration);
        return token;
    } catch (error) {
        console.log(error);
        
        throw error;
    }
}
const buildPetfinderUrl = (page, limit, colors, dogOnly, catOnly, genders, ages, location) => {
    let url = new URL('https://api.petfinder.com/v2/animals');
    // if (dogOnly) {
    //     url = new URL(`https://api.petfinder.com/v2/types/dog`);
    // } else if (catOnly) {
    //     url = new URL(`https://api.petfinder.com/v2/types/cat`);
    // }

    
    const params = new URLSearchParams();
    
    // Add parameters only if they are defined and non-empty
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    
    if (colors && colors.length > 0 && !colors.includes('All')) {
        colors.forEach(color => params.append('color', color));
    }
    
    
    if (genders && genders.length > 0 && !genders.includes('Any')) {
        genders.forEach(gender => params.append('gender', gender));
    }
    
    if (ages && ages.length > 0 && !ages.includes('All')) {
        ages.forEach(age => params.append('age', age));
    }

    if (location && location.length > 0) params.append('location', location);

    url.search = params.toString();
    console.log(url.toString());    
    return url.toString();
};

export const getAnimals = async (page, limit,colors, dogOnly, catOnly, genders, ages, location) => {
    const token = await getAccessToken();
    console.log(page, limit,colors, dogOnly, catOnly, genders, ages, location);
    
    const url = buildPetfinderUrl(page, 100, colors, dogOnly, catOnly, genders, ages, location)

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(response);
    
    return getAnimalWithPhoto(response.data.animals);
};

export const getAnimalWithPhoto = (animals) => {
    const uniqueNames = new Set();
    const result = [];

    for (const animal of animals) {
        if (animal.photos.length > 0 && !uniqueNames.has(animal.name)) {
            uniqueNames.add(animal.name);
            result.push(animal);
        }

        if (result.length === 20) break;
    }

    return result;
};

export const getAnimalById = async (id) => {
    const token = await getAccessToken();
    const response = await axios.get(`https://api.petfinder.com/v2/animals/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}