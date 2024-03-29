import React from 'react';
import './App.css';

// =========================== Common Imports ================================

// Store Object
import { AppStorePropType } from '../../common/store/store';

// Auth
import { setAppStorage } from '../../common/tokens/appStorage';

// Alerts
import { handleReminderModal } from '../alert/Reminder';
import { confirmSuccessfulAction } from '../alert/Feedback';

// Trips
import { Trip } from '../../common/trip/Trip.model';
import {
  filterTrips,
  deleteTripById,
  updateTripList,
  calcPlanningState,
  calcTripDuration,
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

import PanelLayout from '../panel-layout';
import TripTable from '../trip-table';
import TripForm from '../trip-form';
import TodoList from '../todo-list';
import TripFilters from '../trip-filters';

// ================================= App =========================================

class App extends React.Component {
  static propTypes = {
    store: AppStorePropType.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = props.store;
  }

  componentDidMount() {
    this.state.tripList.forEach(trip => {
      this.setReminder(trip);
    });
  }

  // ===================== TIME KEEPING ===========================

  /**
   * Uses a timeout function to set a pop-up reminder for the future
   * @param {Trip} trip Trip object
   */
  setReminder = trip => {
    const timeFromNow = timeToExec(trip);
    if (trip.reminder.isSet && timeFromNow > 0) {
      wait(timeFromNow)
        .then(() => handleReminderModal(trip))
        .then(result => {
          if (result.openDetails) {
            // View Trip details now
            return this.setState({
              currentTrip: result.trip,
              isDetailPanelActive: true,
            });
          } else {
            // Snoozing
            return this.setState(
              prevState => {
                const newTripList = [...prevState.tripList];
                const updatedList = updateTripList(newTripList, result.trip);
                return { tripList: updatedList };
              },

              () => {
                // Recursively call the wait method when snoozing
                this.setReminder(result.trip);
              }
            );
          }
        })
        .catch(err => console.error(err));
    }
  };

  // ===================== GENERAL ================================

  // TODO: Bring out the `reducer` pattern for this state management in the future.

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

  handleAddNewTrip = () => {
    this.setState({
      currentTrip: new Trip(),
      isDetailPanelActive: true,
      isNewTrip: true,
    });
  };

  // ===================== TRIP FORM HANDLERS ================================

  handleSaveTrip = () => {
    const tempCurrentTrip = { ...this.state.currentTrip };
    const { todos, startDate, endDate } = tempCurrentTrip;

    // Calculate new trip progress
    tempCurrentTrip.planningState = calcPlanningState(todos);

    // Calculate trip duration
    tempCurrentTrip.tripDuration = calcTripDuration(startDate, endDate);

    this.setState(
      prevState => {
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
        // Remind me later to look at my todos.
        this.setReminder(tempCurrentTrip);
        // Persist to Local Storage
        setAppStorage({ ...this.state });
        // Send Feedback to the user
        confirmSuccessfulAction('Save');
      }
    );
  };

  handleResetTrip = () => {
    this.setState(prevState => ({
      currentTrip: new Trip(),
      isDetailPanelActive: !prevState.isDetailPanelActive,
    }));
  };

  handleDeleteTrip = () => {
    this.setState(
      prevState => {
        const updatedTripList = deleteTripById(
          prevState.tripList,
          prevState.currentTrip.id
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
      currentTrip: {
        ...prevState.currentTrip,
        [name]: value,
      },
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
        <PanelLayout isActive>
          <TripFilters
            filterOptions={filterOptions}
            setFilterOptions={this.setFilterOptions}
            onAddNewTrip={this.handleAddNewTrip}
          />
        </PanelLayout>

        <TripTable
          tripList={filterTrips(tripList, filterOptions)}
          onTripSelect={this.handleSelectingTrip}
          onAddNewTrip={this.handleAddNewTrip}
        />

        <PanelLayout isActive={isDetailPanelActive}>
          <TripForm
            currentTrip={currentTrip}
            isNewTrip={isNewTrip}
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
              onDelete={this.handleDeleteTodo}
            />
          </TripForm>
        </PanelLayout>
      </main>
    );
  }
}

export default App;
