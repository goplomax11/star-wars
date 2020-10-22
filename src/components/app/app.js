import React from 'react';
import ErrorIndicator from '../error-indicator';
import Header from '../header'
import ItemList from '../item-list/item-list';
import PeoplePage from '../people-page';
import PersonDetails from '../person-details';
import RandomPlanet from '../random-planet';
import './app.css'
import ErrorButton from '../error-btn'
import SwapiService from '../../services/swapi-service';

class App extends React.Component {


  swapi = new SwapiService()

  state = {
    selectedPerson: null,
    hasError: false
  }



  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  render() {


    return (
      <>
        <Header />
        <RandomPlanet />
        <PeoplePage />
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onItemSelected}
              getData={this.swapi.getAllPlanets} 
              renderItem={(item) => item.name }/>
          </div>
          <div className="col-md-6">
            <PersonDetails selectedPerson={this.state.selectedPerson} />
            <ErrorButton />
          </div>
        </div>
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onItemSelected}
              getData={this.swapi.getAllStarships}
              renderItem={(item) => item.name } />
          </div>
          <div className="col-md-6">
            <PersonDetails selectedPerson={this.state.selectedPerson} />
            <ErrorButton />
          </div>
        </div>

      </>
    )
  }

}

export default App