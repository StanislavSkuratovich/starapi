import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import './items-list.css';

export default class ItemsList extends Component {

  //swapi = new SwapiService();
  state = {
    itemList:null,
    selectedItem:null
  };

  componentDidMount(){
    const {getData} = this.props;
    getData()
    .then((itemList)=>{
      this.setState({
        itemList
      });
    }) 
  }

  renderlist(arr){       
return arr.map((item)=>{
  const label = this.props.renderItem(item);
  return(
    <li className="list-group-item" 
    key={item.id}
    onClick={()=>this.props.onItemSelected(item.id)}>
    {label}    
  </li>
  );})
}

  render() {
    const {itemList} = this.state;
    if(!itemList){
      return <Spinner/>
    }

    const list = this.renderlist(itemList);
    return (     
      <ul className="item-list list-group">      
         {list}
      </ul>
    );
  }
}