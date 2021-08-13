import React from 'react'
import ErrorButton from '../error-button/error-button';
import ItemList from '../items-list/items-list';
import ItemDetails from '../item-details/item-details';
import ErrorPlate from '../error-plate/error-plate';

import './items-page.css';


export default class ItemsPage extends React.Component{
  state = {
    selectedPerson:5,
    hasError: false
  }

  onPersonSelected =(id)=>{
    console.log(id)
    this.setState({selectedPerson:id})
  }

  componentDidCatch(){
    this.setState({hasError:true});
  }

  render(){
    const { getData, renderItem } = this.props;
   if(this.state.hasError){
     return <ErrorPlate/>
    }

    return(
      <div className="row mb2">
      <div className="col-md-6">
        <ItemList 
        onItemSelected = {this.onPersonSelected}
        getData = {getData}
        renderItem = {renderItem} />
      </div>
      <div className="col-md-6">
        <ItemDetails itemId = {this.state.selectedPerson}/>
      </div>
      <ErrorButton/>
    </div>
    );
  }
}