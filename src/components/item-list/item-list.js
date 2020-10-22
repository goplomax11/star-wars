import React,{useState} from 'react';
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'
import './item-list.css'

class ItemList extends React.Component{
  
  swapi = new SwapiService ();
  
  state ={
    ItemList:null
  }
  
 componentDidMount() {
  const {getData} =this.props

   getData()
        .then((ItemList) =>{
          this.setState({
            ItemList
          })
        })
 }
  
 renderItems = (arr) =>{
 return arr.map((item) =>{
   const {id} = item
   const label = this.props.renderItem(item)
   return (
    <li className="list-group-item"
    key={id}
    onClick={() => this.props.onItemSelected(id)}>
          {label}
      </li>
   )
 })
 }

 

render(){
  
  
  const {ItemList} = this.state

  if(!ItemList) {
    return <Spinner />
  }

  const listItems = this.renderItems(ItemList)
  
  return (
    <div className="list-group item-list">
      {listItems}
    </div>
 )
}

} 

export default ItemList

