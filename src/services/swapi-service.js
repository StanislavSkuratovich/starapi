export default class SwapiService{

  _root = 'https://swapi.dev/api';
  _apiBase = 'https://swapi.dev/api';

getResource = async (url) => {
  const res = await fetch(`${this._apiBase}${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}` +
      `, received ${res.status}`)
  }
  return await res.json();
};

 extractId(item){
  const idRegexp = /\/([0-9]*)\/$/;
  //console.log(item.url.match(idRegexp)[1]);
  return item.url.match(idRegexp)[1];
 }

getAllPlanets= async()=>{
 const resourse = await this.getResource('/planets/');
 return resourse.results.map(this._transformPlanet)
 }

getPlanet = async(id)=>{
  const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet, id);  
 }


getAllPeople= async()=>{
  const res = await this.getResource(`/people/`);
  return res.results.map(this._transformPerson);
}

 async getPerson(id){
   console.log(id)
   const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person, id);  
 }

 getAllstarships = async()=>{
 const resourse = await this.getResource('/starships/');
 return resourse.results.map(this._transformStarship)
 }

 async getStarship(id){
   const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship, id);  
 }

 _transformPlanet=(planet)=>{
 return {
  id: this.extractId(planet),
  name: planet.name,
  population:planet.population,
  rotationPeriod:planet.rotation_period,
  diameter:planet.diameter,
  image:'https://starwars-visualguide.com/assets/img/planets/'+this.extractId(planet)+'.jpg'
};
 }

 _transformStarship =(starship)=>{
  return {
   id: this.extractId(starship),
   name: starship.name,
   model:starship.model,
   manufacturer:starship.manufacturer,
   costInCredits:starship.model,
   length:starship.length,
   crew:starship.crew,
   passangers:starship.passangers,
   cargoCapacity:starship.cargoCapacity,
   image:'https://starwars-visualguide.com/assets/img/starships/'+this.extractId(starship)+'.jpg'
 }
  }

  _transformPerson = (person) => {   
    return {
     id: this.extractId(person),
     name: person.name,
     gender: person.gender,
     birthYear: person.birth_year,
     eyeColor: person.eye_color,
     image:'https://starwars-visualguide.com/assets/img/characters/'+this.extractId(person)+'.jpg'
   }
    }
}