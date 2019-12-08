import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

// =========================== Common Imports ================================

// Store Object
import { AppStoreType } from '../../common/store/store';

// Auth
import { setAppStorage } from '../../common/tokens/appStorage';

// Alerts
import {
  handleReminderModal,
  confirmSuccessfulAction,
} from '../../common/alerts/swal.util';

// Trips
import { Trip } from '../../common/trip/Trip.model';
import {
  filterTrips,
  deleteTripById,
  updateTripList,
  calcPlanningState,
  calcTripDuration,
  tripsWithReminders,
  timeToExec,
  wait,
} from '../../common/trip/Trip.util';

// Todos
import {
  addTodo,
  deleteTodoById,
  updateTodoById,
} from '../../common/todo/Todo.util';

// =========================== Component Imports ================================

import FilterPanel from '../filter-panel';
import TripTable from '../trip-table';
import DetailPanel from '../detail-panel';
import TripForm from '../trip-form';
import TodoList from '../todo-list';
import TripFilters from '../trip-filters';

// ================================= App =========================================

class App extends React.Component {
  static propTypes = {
    store: AppStoreType,
  };
  constructor(props) {
    super(props);
    this.state = props.store;
  }

  componentDidMount() {
    tripsWithReminders(this.state.tripList).forEach(trip => {
      this.setReminder(trip);
    });
  }

  componentDidUpdate() {}

  // ===================== TIME KEEPING ===========================

  setReminder = trip => {
    const timeFromNow = timeToExec(trip);
    if (timeFromNow > 0)
      wait(timeFromNow)
        .then(() => handleReminderModal(trip))
        .then(result => {
          if (result.openDetails) {
            return this.setState({
              currentTrip: result.trip,
              isDetailPanelActive: true,
            });
          } else {
            return this.setState(
              prevState => {
                const newTripList = [...prevState.tripList];
                const updatedList = updateTripList(newTripList, result.trip);
                return { tripList: updatedList };
              },
              // TODO: recursively call the wait method
              () => {
                this.setReminder(result.trip);
              }
            );
          }
        })
        .catch(err => console.error(err));
  };

  // ===================== GENERAL ================================

  // FIXME: Bring out the reducer pattern for this state!!

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
        const { todos, startDate, endDate } = tempCurrentTrip;

        // Calculate new trip progress
        tempCurrentTrip.planningState = calcPlanningState(todos);

        // Calculate trip duration
        tempCurrentTrip.tripDuration = calcTripDuration(startDate, endDate);

        this.setReminder(tempCurrentTrip);

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
      () => {
        // Persist to Local Storage
        setAppStorage({ ...this.state });
        // Send Feedback to the user
        confirmSuccessfulAction('Save');
      }
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

    const tempCurrentTrip = { ...this.state.currentTrip };

    this.setState(
      prevState => {
        const updatedTripList = deleteTripById(
          prevState.tripList,
          tempCurrentTrip.id
        );
        return {
          tripList: updatedTripList,
          currentTrip: new Trip(),
          isDetailPanelActive: !prevState.isDetailPanelActive,
        };
      },
      () => {
        // Persist to local storage
        setAppStorage({ ...this.state });
        // Give feedback to the user
        confirmSuccessfulAction('Delete');
      }
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

  // ===================== TODO HANDLERS ================================

  setTodoList = newTodoList => {
    this.setState(prevState => ({
      currentTrip: {
        ...prevState.currentTrip,
        todos: newTodoList,
      },
    }));
  };

  handleAddTodo = todo => {
    const newTodoList = addTodo(this.state.currentTrip.todos, todo);
    this.setTodoList(newTodoList);
  };

  handleEditTodo = todo => {
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
            onAddNewTrip={this.handleAddNewTrip}
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
              maxHeight="20vh"
              height="20vh"
              todos={currentTrip.todos}
              onAddTodo={this.handleAddTodo}
              onEditTodo={this.handleEditTodo}
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
