import React from 'react';
import './App.css';
import FilterPanel from '../filter-panel';
import TripTable from '../trip-table';
import DetailPanel from '../detail-panel';
import TripForm from '../trip-form';
import { exampleTripList, Trip } from '../../common/trip/Trip.model';
import { filterTrips, deleteTripById } from '../../common/trip/Trip.util';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripList: exampleTripList,
      filterOptions: {
        searchText: '',
        category: '',
      },
      currentListing: new Trip(),
    };
  }

  handleSaveTrip = event => {
    event.preventDefault();
    const newTripList = [...this.state.tripList];
    newTripList.push(this.state.currentListing);
    this.setTripList(newTripList);
  };

  handleCancelTrip = event => {
    event.preventDefault();
    this.setState({ currentListing: new Trip() });
  };

  handleDeleteTrip = event => {
    event.preventDefault();
    const newTripList = deleteTripById(
      this.state.tripList,
      this.state.currentListing.id
    );
    this.setTripList(newTripList);
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      currentListing: { ...prevState.currentListing, [name]: value },
    }));
  };

  handleNamedChange = (name, value) => {
    this.setState(prevState => ({
      currentListing: { ...prevState.currentListing, [name]: value },
    }));
  };

  // FIXME: This is getting ridiculous with these functions
  handleDateTimePicker = (name, value) => {
    this.setState(prevState => ({
      currentListing: {
        ...prevState.currentListing,
        reminder: {
          ...prevState.currentListing.reminder,
          [name]: value,
        },
      },
    }));
  };

  // ==========================

  setTripList = newTripList => {
    this.setState({ tripList: newTripList });
  };

  setFilterOptions = updatedFilterOptions => {
    this.setState({ filterOptions: updatedFilterOptions });
  };

  handleSelectingTrip = trip => {
    this.setState({ currentListing: trip });
  };

  // ============================

  render() {
    const { tripList, filterOptions, currentListing } = this.state;
    return (
      <main id="app">
        <FilterPanel
          filterOptions={filterOptions}
          setFilterOptions={this.setFilterOptions}
        />
        <TripTable
          onTripSelect={this.handleSelectingTrip}
          tripList={filterTrips(tripList, filterOptions)}
          setTripList={this.setTripList}
        />
        <DetailPanel>
          <TripForm
            currentListing={currentListing}
            setTripList={this.setTripList}
            onSaveTrip={this.handleSaveTrip}
            onCancelTrip={this.handleCancelTrip}
            onDeleteTrip={this.handleDeleteTrip}
            onInputChange={this.handleInputChange}
            onNamedChange={this.handleNamedChange}
            onDateTimePicker={this.handleDateTimePicker}
          />
        </DetailPanel>
      </main>
    );
  }
}

export default App;
