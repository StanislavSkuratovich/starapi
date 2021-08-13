import React from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorPlate from '../error-plate/error-plate';
import Header from '../header/header';
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

    const itemsPage = (
      <ItemsPage getData = {this.swapi.getAllPeople}
      renderItem = {(item)=><span><button>{item.name}</button> ( {item.birthYear}, {item.gender})</span> }/>
      /* renderItem = {(item)=>`${item.name} ( ${item.birthYear}, ${item.gender})`}/> */
      /* <ItemsPage getData = {this.swapi.getAllPlanets}/> */
     /* <ItemList/> */
    )

    return (
      
      <div>
        <Header />
        <RandomPlanet />
        {itemsPage}
       
      </div>
    );
  }
 
};

