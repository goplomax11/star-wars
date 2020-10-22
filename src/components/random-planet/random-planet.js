import React from 'react';
import './random-planet.css'
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

export default class RandomPlanet extends React.Component {

    swapi = new SwapiService ();

    state ={
        planet:{},
        loading:true,
        error:false
    }




    componentDidMount() {
        this.updatePlanet()
       this.interval = setInterval(() => this.updatePlanet(), 10000)
    }

    componentWillUnmount() {
        this.clearInterval(this.interval)
    }

    onPlanetLoaded = (planet) =>{
        this.setState({
            planet,
            loading:false
        })
    }

    onError= (error) =>{
        this.setState({
            error:true,
            loading:false,
        })
    }

    updatePlanet() {
        const id = Math.floor(Math.random()*17) +3;
        this.swapi
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    }


    render(){
        const {planet,loading,error} =this.state

        

        const errorIndicate = error? < ErrorIndicator /> : null
        const spinner = loading? <Spinner /> : null;
        const content = (!loading && !error)? <PlanetView planet={planet} /> : null
        
        return (
            <div className='random-planet'>
                <div className='wrapper d-flex'>
                    {errorIndicate}
                    {spinner}
                    {content}               
                </div>     
            </div>
        )
    }
    
}


const PlanetView = ({planet}) =>{
    const {name,population,rotationPeriod,diameter,id} = planet
    
    return (
            <>
        
                    <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt='random-planet' />
                    <div className='description'>
                        <div className='d-flex '>
                          <h2> {name} </h2> 
                        </div>
                        <div className='item'>
                            Population: {population}
                        </div>
                        <div className='item'>
                            Rotation Period: {rotationPeriod}
                        </div>
                        <div className='item'>
                            Diameter: {diameter}
                        </div>
                    </div>
             
        </>
    )
}