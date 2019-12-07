import React from 'react';
import './App.css';
import FilterPanel from '../filter-panel';
import TripTable from '../trip-table';
import DetailPanel from '../detail-panel';
import TripForm from '../trip-form';
import TodoList from '../todo-list';
import TripFilters from '../trip-filters';

// Auth
import {
  getAppStorage,
  setAppStorage,
  appStorage,
} from '../../common/tokens/appStorage';

// Trips
import { Trip } from '../../common/trip/Trip.model';
import {
  filterTrips,
  deleteTripById,
  updateTripList,
  calcPlanningState,
  calcTripDuration,
} from '../../common/trip/Trip.util';

// Todos
import {
  addTodo,
  deleteTodoById,
  updateTodoById,
} from '../../common/todo/Todo.util';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = appStorage;
  }

  componentDidMount() {
    const token = getAppStorage();
    this.setState(token);
  }

  // ===================== GENERAL ================================

  setTripList = newTripList => {
    this.setState({ tripList: newTripList });
  };

  setFilterOptions = updatedFilterOptions => {
    this.setState({ filterOptions: updatedFilterOptions });
  };

  handleSelectingTrip = trip => {
    this.setState({
      currentTrip: trip,
      isDetailPanelActive: true,
      isNewTrip: false,
    });
  };

  toggleTripForm = event => {
    if (event) event.preventDefault();
    this.setState(prevState => ({
      isDetailPanelActive: !prevState.isDetailPanelActive,
    }));
  };

  handleAddNewTrip = event => {
    if (event) event.preventDefault();
    this.setState({
      currentTrip: new Trip(),
      isDetailPanelActive: true,
      isNewTrip: true,
    });
  };

  // ===================== TRIP FORM HANDLERS ================================

  handleSaveTrip = event => {
    if (event) event.preventDefault();
    // Update the trips list

    const tempCurrentTrip = { ...this.state.currentTrip };

    this.setState(
      prevState => {
        console.log(tempCurrentTrip);

        // Calculate new trip progress
        tempCurrentTrip.planningState = calcPlanningState(
          tempCurrentTrip.todos
        );

        // Calculate trip duration
        tempCurrentTrip.tripDuration = calcTripDuration(
          tempCurrentTrip.startDate,
          tempCurrentTrip.endDate
        );

        // Update the list of trips
        const updatedTripList = updateTripList(
          prevState.tripList,
          tempCurrentTrip
        );

        // Set the state
        return {
          tripList: updatedTripList,
          isDetailPanelActive: !prevState.isDetailPanelActive,
        };
      },
      () => setAppStorage({ ...this.state })
    );
  };

  handleResetTrip = event => {
    if (event) event.preventDefault();
    this.setState(prevState => ({
      currentTrip: new Trip(),
      isDetailPanelActive: !prevState.isDetailPanelActive,
    }));
  };

  handleDeleteTrip = event => {
    if (event) event.preventDefault();
    this.setState(
      prevState => {
        const updatedTripList = deleteTripById(
          prevState.tripList,
          this.state.currentTrip.id
        );
        return {
          tripList: updatedTripList,
          currentTrip: new Trip(),
          isDetailPanelActive: !prevState.isDetailPanelActive,
        };
      },
      () => setAppStorage({ ...this.state })
    );
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      currentTrip: { ...prevState.currentTrip, [name]: value },
    }));
  };

  handleNamedChange = (name, value) => {
    this.setState(prevState => ({
      currentTrip: { ...prevState.currentTrip, [name]: value },
    }));
  };

  // FIXME: This is getting ridiculous with these functions
  handleReminderChange = (name, value) => {
    this.setState(prevState => ({
      currentTrip: {
        ...prevState.currentTrip,
        reminder: {
          ...prevState.currentTrip.reminder,
          [name]: value,
        },
      },
    }));
  };

  handleReminderSet = event => {
    this.setState(prevState => ({
      currentTrip: {
        ...prevState.currentTrip,
        reminder: {
          ...prevState.currentTrip.reminder,
          isSet: !prevState.currentTrip.reminder.isSet,
        },
      },
    }));
  };

  // ===================== TODO HANDLERS A================================

  setTodoList = newTodoList => {
    this.setState(prevState => ({
      currentTrip: {
        ...prevState.currentTrip,
        todos: newTodoList,
      },
    }));
  };

  handleAddTodo = todo => {
    todo.isCompleted = !todo.isCompleted;
    const newTodoList = addTodo(this.state.currentTrip.todos, todo);
    this.setTodoList(newTodoList);
  };

  handleCheckedTodo = todo => {
    todo.isCompleted = !todo.isCompleted;
    const newTodoList = updateTodoById(this.state.currentTrip.todos, todo);
    this.setTodoList(newTodoList);
  };

  handleDeleteTodo = todo => {
    const newTodoList = deleteTodoById(this.state.currentTrip.todos, todo.id);
    this.setTodoList(newTodoList);
  };

  // ===================== RENDER ================================

  render() {
    const {
      tripList,
      filterOptions,
      currentTrip,
      isDetailPanelActive,
      isNewTrip,
    } = this.state;
    return (
      <main id="app">
        <FilterPanel>
          <TripFilters
            filterOptions={filterOptions}
            setFilterOptions={this.setFilterOptions}
            onAddTrip={this.handleAddNewTrip}
          />
        </FilterPanel>

        <TripTable
          tripList={filterTrips(tripList, filterOptions)}
          setTripList={this.setTripList}
          onTripSelect={this.handleSelectingTrip}
          onAddNewTrip={this.handleAddNewTrip}
        />

        <DetailPanel isActive={isDetailPanelActive}>
          <TripForm
            currentTrip={currentTrip}
            isNewTrip={isNewTrip}
            setTripList={this.setTripList}
            onSaveTrip={this.handleSaveTrip}
            onCancelTrip={this.handleResetTrip}
            onDeleteTrip={this.handleDeleteTrip}
            onInputChange={this.handleInputChange}
            onNamedChange={this.handleNamedChange}
            onReminderChange={this.handleReminderChange}
            onReminderSet={this.handleReminderSet}
          >
            <TodoList
              todos={currentTrip.todos}
              onAddTodo={this.handleAddTodo}
              onChecked={this.handleCheckedTodo}
              onDelete={this.handleDeleteTodo}
            />
          </TripForm>
        </DetailPanel>
      </main>
    );
  }
}

export default App;
