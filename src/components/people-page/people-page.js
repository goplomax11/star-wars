import React from 'react';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details';
import ErrorButton from '../error-btn'
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import Row from '../row'
import ErrorBoudry from '../error-boundry'




export default class PeoplePage extends React.Component {

    swapi = new SwapiService()

    state = {
        selectedPerson: null,
        hasError: false
    }

    onItemSelected = (id) => {
        console.log(id)
        this.setState({
            selectedPerson: id
        })
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.swapi.getAllPeople}
                renderItem={({ name, gender, birthYear }) => `${name} (${gender}, ${birthYear})`} />
        )

        const personDetails = (
            <ErrorBoudry>
                <PersonDetails selectedPerson={this.state.selectedPerson} />
            </ErrorBoudry>
        )

        return (
           <Row 
           left={itemList} 
           right = {personDetails} />
        )
    }
}