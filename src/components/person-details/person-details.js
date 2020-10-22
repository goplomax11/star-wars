import React from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-btn';
import Spinner from '../spinner';
import './person-details.css'

class PersonDetails extends React.Component{

     swapi = new SwapiService()

    state ={
        loading:false,
        person:null
    }

    componentDidUpdate(prevprops){
        if (prevprops.selectedPerson !== this.props.selectedPerson){
            this.setState({
                loading:true
            })
            console.log('update')
            this.updatePeson()
        }
        
    }

    updatePeson = () => {
        
        const {selectedPerson} = this.props
        
        this.swapi
            .getPerson(selectedPerson)
            .then((person) =>{
                console.log(person)
                this.setState({
                    person,
                    loading:false
                })
            })
    }
    
    render(){

        if(!this.state.person) {
            return (
                <div className='person-details'>
                    <span>Choose a person</span>
                </div>
            )
            
        }
        if(this.state.loading){
            return <Spinner />
        }

        
        const {person:{name,gender,eyeColor,birthYear,id}} = this.state
        return (
            <div className='person-details card'>
            <div className='wrapper d-flex'>
                <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt='person' />
                <div className='description card-body'>
                    <div className='d-flex '>
                      <h2> {name} </h2> 
                      
                    </div>
                    <div className='item'>
                        Gender: {gender}
                    </div>
                    <div className='item'>
                        Birth Year: {birthYear}
                    </div>
                    <div className='item'>
                        Eye Color: {eyeColor}
                    </div>
                    <ErrorButton />
                </div>
            </div>
        </div>
        )
    }
    
}

export default PersonDetails;