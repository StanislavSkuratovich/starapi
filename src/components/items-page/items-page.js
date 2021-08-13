import React from 'react'
import ErrorButton from '../error-button/error-button';
import ItemsList from '../items-list/items-list';
import ItemDetails from '../item-details/item-details';
import ErrorPlate from '../error-plate/error-plate';

import './items-page.css';

export default class ItemsPage extends React.Component{
  state = {
    selectedItem:5,
    hasError: false
  }

  onItemSelected =(id)=>{
    console.log(id)
    this.setState({selectedItem:id})
  }

  componentDidCatch(){
    this.setState({hasError:true});
  }

  render(){
    const { getData, renderItem } = this.props;
   if(this.state.hasError){
     return <ErrorPlate/>
    }
    
    const _itemsList = (
      <ItemsList 
      onItemSelected = {this.onItemSelected}
      getData = {getData}
      renderItem = {renderItem} />
    );

    const _itemDetails = (
      <ItemDetails itemId = {this.state.selectedItem}/>
    );

    return(
      <div className="row mb2">
      <div className="col-md-6">
       {_itemsList}
      </div>
      <div className="col-md-6">
       {_itemDetails}
      </div>
      <ErrorButton/>
    </div>
    );
  }
}