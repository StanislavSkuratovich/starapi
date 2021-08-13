import React from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorPlate from '../error-plate/error-plate';
import Header from '../header/header';
import ItemList from '../items-list/items-list';
import ItemsPage from '../items-page/items-page';
import RandomPlanet from '../random-palet-details/random-palet-details';
import './app.css';

export default class App extends React.Component  {
  swapi = new SwapiService();
  state = {
    selectedPerson:5,
    hasError:false
  }

  componentDidCatch(){
  this.setState({hasError:true})
  }

  render(){
    
    if(this.state.hasError){
      return <ErrorPlate/>
    }
    return (
      
      <div>
        <Header />
        <RandomPlanet />
        <ItemsPage getData = {this.swapi.getAllPeople}
        renderItem = {(item)=>item.birthYear}/>
        {/* <ItemsPage getData = {this.swapi.getAllPlanets}/> */}
       {/* <ItemList/> */}
      </div>
    );

  }
 
};

