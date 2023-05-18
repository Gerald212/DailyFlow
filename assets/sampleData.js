const sampleData = [
    {
      title: 'Sekcja1',
      data: [
        {
            name: 'Zadanie1',
            progress: 3,
            target: 100,
            id: 1,
        },
        {
            name: 'Zadanie2',
            progress: 22,
            target: 200,
            id: 2,
        },
        {
            name: 'Zadanie3',
            progress: 1,
            target: 100,
            id: 3,
        },
        ],
    },
    {
        title: 'Sekcja2',
        data: [
          {
              name: 'Glaskac',
              progress: 5,
              target: 10,
          },
          {
              name: 'Kotek',
              progress: 6,
              target: 100,
          },
          {
              name: 'Zadanie3',
              progress: 12,
              target: 67,
          },
          {
            name: 'Kotek',
            progress: 6,
            target: 100,
        },
        {
            name: 'Zadanie3',
            progress: 12,
            target: 67,
        },
          ],
      },
      {
        title: 'Sekcja3',
        data: [
          {
              name: 'Jesc',
              progress: 55,
          },
          {
              name: 'Zadanie2',
              progress: 2,
              target: 100,
          },
          {
              name: 'Zadanie3',
              progress: 8,
          },
          ],
      },

    // {
    //   title: 'Sekcja2',
    //   data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    // },
    // {
    //   title: 'Sekcja3',
    //   data: ['Water', 'Coke', 'Beer'],
    // },
    // {
    //   title: 'Sekcja4',
    //   data: ['Cheese Cake', 'Ice Cream'],
    // },
  ];

  export const sampleData2 = [
    {
        title: 'Rysowanie',
        data: [
            {
                name: 'Rysowac cos',
                type: 0,        //0 - habit, 1 - task
                id: 1,          //id
                hours: 1,       
                days: ['2023/01/03','2023/01/04','2023/01/07'],       //tablica z datami?
                times: 0,
                timesGoal: 0,
                hoursGoal: 0,
                daysGoal: 10,
                completed: false,
            },
            {
                name: 'Rysowac kotki',
                type: 0,        //0 - habit, 1 - task
                id: 2,          //id
                hours: 100,       
                days: [],       //tablica z datami?
                times: 0,
                timesGoal: 0,
                hoursGoal: 200,
                daysGoal: 0,
                completed: false,
            },
            {
                name: 'Nie rysowac',
                type: 0,        //0 - habit, 1 - task
                id: 3,          //id
                hours: 156,       
                days: [],       //tablica z datami?
                times: 0,
                timesGoal: 0,
                hoursGoal: 0,
                daysGoal: 0,
                completed: false,
            },
            {
                name: 'Rysowac inne',
                type: 0,        //0 - habit, 1 - task
                id: 5,          //id
                hours: 1,       
                days: ['2023/01/03','2023/01/04','2023/01/07'],       //tablica z datami?
                times: 0,
                timesGoal: 0,
                hoursGoal: 0,
                daysGoal: 10,
                completed: false,
            },
            {
                name: 'Rysowac jedzenie',
                type: 0,        //0 - habit, 1 - task
                id: 6,          //id
                hours: 10,       
                days: [],       //tablica z datami?
                times: 0,
                timesGoal: 0,
                hoursGoal: 20,
                daysGoal: 0,
                completed: false,
            },
            {
                name: 'Malowac',
                type: 0,        //0 - habit, 1 - task
                id: 7,          //id
                hours: 156,       
                days: [],       //tablica z datami?
                times: 0,
                timesGoal: 0,
                hoursGoal: 170,
                daysGoal: 0,
                completed: false,
            },
        ],
    },
    {
        title: 'Gotowanie',
        data: [
            {
                name: 'Gotowac obiad',
                type: 0,        //0 - habit, 1 - task
                id: 4,          //id
                hours: 18,       
                days: [],       //tablica z datami?
                times: 0,
                timesGoal: 0,
                hoursGoal: 0,
                daysGoal: 0,
                completed: false,
            },
            {
                name: 'Gotowac kotu',
                type: 0,        //0 - habit, 1 - task
                id: 4,          //id
                hours: 18,       
                days: ['2023/01/03','2023/01/04','2023/01/07', '2023/01/13','2023/01/24','2023/01/27'],       //tablica z datami?
                times: 0,
                timesGoal: 0,
                hoursGoal: 0,
                daysGoal: 10,
                completed: false,
            },
        ],
    },
];

export const sampleData3 = [
    {
        name: 'Rysowac cos',
        type: 0,        //0 - habit, 1 - task
        id: 1,          //id
        hours: 1,       
        days: ['2023/01/03','2023/01/04','2023/01/07'],       //tablica z datami?
        times: 0,
        timesGoal: 0,
        hoursGoal: 0,
        daysGoal: 10,
        completed: false,
    },
    {
        name: 'Rysowac kotki',
        type: 0,        //0 - habit, 1 - task
        id: 2,          //id
        hours: 100,       
        days: [],       //tablica z datami?
        times: 0,
        timesGoal: 0,
        hoursGoal: 200,
        daysGoal: 0,
        completed: false,
    },
    {
        name: 'Nie rysowac',
        type: 0,        //0 - habit, 1 - task
        id: 3,          //id
        hours: 156,       
        days: [],       //tablica z datami?
        times: 0,
        timesGoal: 0,
        hoursGoal: 0,
        daysGoal: 0,
        completed: false,
    },
    {
        name: 'Rysowac inne',
        type: 0,        //0 - habit, 1 - task
        id: 5,          //id
        hours: 1,       
        days: ['2023/01/03','2023/01/04','2023/01/07'],       //tablica z datami?
        times: 0,
        timesGoal: 0,
        hoursGoal: 0,
        daysGoal: 10,
        completed: false,
    },
    {
        name: 'Rysowac jedzenie',
        type: 0,        //0 - habit, 1 - task
        id: 6,          //id
        hours: 10,       
        days: [],       //tablica z datami?
        times: 0,
        timesGoal: 0,
        hoursGoal: 20,
        daysGoal: 0,
        completed: false,
    },
    {
        name: 'Malowac',
        type: 0,        //0 - habit, 1 - task
        id: 7,          //id
        hours: 156,       
        days: [],       //tablica z datami?
        times: 0,
        timesGoal: 0,
        hoursGoal: 170,
        daysGoal: 0,
        completed: false,
    },
    {
        name: 'Gotowac obiad',
        type: 0,        //0 - habit, 1 - task
        id: 4,          //id
        hours: 18,       
        days: [],       //tablica z datami?
        times: 0,
        timesGoal: 0,
        hoursGoal: 0,
        daysGoal: 0,
        completed: false,
    },
    {
        name: 'Gotowac kotu',
        type: 0,        //0 - habit, 1 - task
        id: 8,          //id
        hours: 18,       
        days: ['2023/01/03','2023/01/04','2023/01/07', '2023/01/13','2023/01/24','2023/01/27'],       //tablica z datami?
        times: 0,
        timesGoal: 0,
        hoursGoal: 0,
        daysGoal: 10,
        completed: false,
    },
];

export const sampleData4 = [
    {
        id: 0,
        name: 'Wszystkie'
    },
    {
        id: 1,
        name: 'Rysowanie'
    },
    {
        id: 2,
        name: 'Gotowanie'
    },
    {
        id: 3,
        name: 'Cos innego'
    },
];



  export default sampleData;