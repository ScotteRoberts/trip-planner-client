// export const Trip = {
//   id: '',
//   title: '',
//   destination: '',
//   description: '',
//   startDate: '',
//   endDate: '',
//   tripDuration: '', //TODO: calculated from the endData and startDate
//   category: '',
//   reminder: {
//     isSet: false,
//     dateTime: '',
//   },
//   todos: [],
//   planningState: 'created', //TODO: calculated from the todos
// };

import uuid from 'uuid/v4';

export class Trip {
  constructor() {
    this.id = uuid();
    this.title = '';
    this.destination = '';
    this.description = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.tripDuration = 0;
    this.category = '';
    this.reminder = {
      isSet: false,
      dateTime: new Date(),
    };
    this.todos = [];
    this.planningState = 'created';
  }
}

export const exampleTripList = [
  {
    id: '1',
    title: 'Going to Las Vegas!',
    destination: 'Las Vegas',
    description: 'Las Vegas Description',
    startDate: new Date(),
    endDate: new Date(),
    tripDuration: 0, //TODO: calculated from the endData and startDate
    category: 'none',
    reminder: {
      isSet: true,
      dateTime: new Date(),
    },
    todos: [
      {
        id: '1',
        isCompleted: true,
        description: 'Reminder for working ahead',
      },
      {
        id: '2',
        isCompleted: false,
        description: 'Can we leave yet?',
      },
    ],
    planningState: 'created', //TODO: calculated from the todos
  },
  {
    id: '2',
    title: 'Going to Canada!',
    destination: 'Canada',
    description: 'Canada Description',
    startDate: new Date(),
    endDate: new Date(),
    tripDuration: 0, //TODO: calculated from the endData and startDate
    category: 'none',
    reminder: {
      isSet: true,
      dateTime: new Date(),
    },
    todos: [
      {
        id: '1',
        isCompleted: true,
        description: 'Reminder for working ahead',
      },
    ],
    planningState: 'created', //TODO: calculated from the todos
  },
];
