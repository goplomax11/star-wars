
 export default class SwapiService {
    _baseUrl = 'https://swapi.dev/api';

      getResource = async (url) =>{
        const res = await fetch(`${this._baseUrl}${url}`);
  
      if(!res.ok) {
        throw new Error(`Could not fetch ${url} , received ${res.status}`)
      }
      const body = await res.json();
      return body;
        
    };
   

    getAllPeople= async () => {
      const res = await this.getResource('/people/')
      return res.results.map(this._transformPerson)
    }

    getPerson = async  (id) => {
      const person = await this.getResource(`/people/${id}`)
      return this._transformPerson(person)
    }

    getAllPlanets= async () => {
      const res = await this.getResource(`/planets/`)
      return res.results.map(this._transformPlanet)
    }

    getPlanet = async (id) => {
      const planet = await this.getResource(`/planets/${id}`)
      return this._transformPlanet(planet)
    }

     getAllStarships= async () => {
      const res = await this.getResource(`/starships/`)
      return res.results.map(this._transformStarship)
    }

     getStarship = async (id)=> {
      const starship = await this.getResource(`/starships/${id}`)
      return this._transformStarship(starship);
    }

    extractId = (item) => {
      const idRegExp = /\/([0-9]*)\/$/;
      return item.url.match(idRegExp)[1];
    }

    _transformPlanet = (planet) => {
     const id = this.extractId(planet)
      return {
          id,
          name:planet.name,
          population:planet.population,
          rotationPeriod:planet.rotation_period,
          diameter:planet.diameter
      
      }
    }
    _transformStarship = (starship) => {
      return {
        id: this.extractId(starship),
        name:starship.name,
        model: starship.model,
        manufacturer:starship.manufacturer,
        costInCredits:starship.costInCredits,
        length:starship.length,
        crew:starship.crew,
        passengers:starship.passengers,
        cargoCapacity:starship.cargoCapacity
      }
    }

    _transformPerson = (person) => {
      return {
        id: this.extractId(person),
        name: person.name,
        gender:person.gender,
        birthYear:person.birth_year,
        eyeColor: person.eye_color
      }
    }
    
  }


  