import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorPlate from '../error-plate/error-plate'
import ErrorButton from '../error-button/error-button';

import './random-palet-details.css';

export default class RandomPlanet extends Component {
  swapi = new SwapiService();
  imageLinkBody = 'https://starwars-visualguide.com/assets/img/planets/';

  state = {
   planet: {},
   loading:true,
   error:false
  };
  
constructor(){
  super();
  console.log('constr');  
};

componentDidMount(){
  this.getRandomPlatet();
  this.interval = setInterval(()=>this.getRandomPlatet(), 15000);
}
componentWillUnmount() {
  clearInterval(this.interval);
}

onPlanetLoaded = (planet) =>{
  
  setTimeout(() => {
    this.setState({planet,loading: false});
  }, 1000);
  

};

onError = (err)=>{
  this.setState({error:true, loading:false});
};

  getRandomPlatet = ()=>{
    this.setState({loading: true});
    const id = Math.floor(Math.random()*22+2);
    this.swapi
    .getPlanet(id)
    .then(this.onPlanetLoaded)
    .catch(this.onError);  
  };

  render() {
    const {planet, loading, error} = this.state;
    const contentIndicator = (error===false && loading===false);
    const loadingIndicator = (loading === true && error === false);
    const errorIndicator = (loading === false && error === true);
    const content = !contentIndicator? null : <PlanetView planet={planet}/>
    const spinner = !loadingIndicator? null: <Spinner/>
    const errorMessage = !errorIndicator? null : <ErrorPlate/>

    return (
         
      <div className="random-planet jumbotron rounded">
        {content}
        {spinner}
        {errorMessage}
        <ErrorButton/>        
      </div>

    );
  }
}

const PlanetView = ({planet})=>{
  const{id, name,population,rotationPeriod,diameter,image} = planet; 
  return(
    <React.Fragment>
       <img className="planet-image"
             src={image} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
        </React.Fragment>
  )
}