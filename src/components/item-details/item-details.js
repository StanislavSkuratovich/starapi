import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import SwapiService from '../../services/swapi-service';

import './item-details.css';

export default class ItemDetails extends Component {

  swapi = new SwapiService();

  state = {
    item:null,
    itemId:null
  };

  updateItem(){
    const itemId = this.props.itemId;
    if(!itemId)//isnull
    {return};
    this.setState({itemId:itemId});
    console.log(` id in details ${this.props.itemId}`);
    console.log(` id in state ${this.state.itemId}`);
    this.swapi// todo next
    .getPerson(itemId)
    .then((item)=>{
      console.log(`got item - ${item.name}`)
      this.setState({item});
    })
  }

  componentDidMount(){
    this.updateItem();
  } 

  componentDidUpdate(prevProps){
    if(this.props.itemId !== prevProps.itemId){
      this.updateItem();
    }
  }
  
  renderItem(item){
    return (
      <div className="card-body">
      <ul className={item.id }>
      <h4>{item.name}</h4>
        <img className="item-image" src={item.image} />
       <li className="list-group-item">{item.gender}</li>
       <li className="list-group-item">{item.birthYear}</li>
       <li className="list-group-item">{item.eyeColor}</li>
      </ul>
      </div>
    )
  }

  render() {

    const {item} = this.state;
    if(!item){
      return <Spinner/>
    }
    const itemMarkup = this.renderItem(item);
    return (
      <div className="item-details card">
        {itemMarkup}        
      </div>
    )
  }
}