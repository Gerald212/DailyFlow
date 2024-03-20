# DailyFlow
## About
DailyFlow is an application for tracking the time spent performing certain activities. The structure of the application is based on an interactive list in which all the types of tasks the user wants to control are included, divided into categories. It allows the user to add tasks with a specific due date and habits that can be updated with the time spent on them. This makes it easier to maintain efficiency and track the progress made in a particular area.

The app was created as a practical part of a bachelor thesis on the use of React Native in mobile app development.

At this moment DailyFlow only supports polish language.
## Installation & Setup
DailyFlow was created using the Expo Go developer toolkit.

- Set up the development environment, using Expo Go toolkit: https://reactnative.dev/docs/environment-setup.
- Clone repository
- Install dependencies: npm install.
- Run server: npm start. Then use app Expo Go on your mobile and scan QR code on the terminal.

Alternatively, you can use the ready-made .apk file found in root.
## Screenshots & Description
<img src="https://github.com/Gerald212/DailyFlow/assets/98669020/dff53579-e9bd-4dd9-af43-9364b3e9b4f3" width="300"/>
<img src="https://github.com/Gerald212/DailyFlow/assets/98669020/03b3a448-7be1-456b-9a5e-be75e84fb323" width="300"/>
The main screen of the app, visible when you turn it on, is the List. It contains all tasks and habits grouped into categories, which can be selected from a horizontal list at the top of the screen. Each item in the list includes the type (task/habit), title and progress. Clicking on the items takes the user to a screen containing the details. To update the progress of a habit, click on the update icon on the right.

<img src="https://github.com/Gerald212/DailyFlow/assets/98669020/b2fa00f5-b314-4c18-abe9-d17e79f509de" width="300"/>
The second screen, accessible by selecting the appropriate tab from the menu at the bottom of the application, is the Calendar. It consists of two elements: a calendar and a list containing tasks and habits. 

On the calendar, coloured dots mark the days for which tasks are scheduled and the days on which habits were performed. When a day is selected, the tasks and habits associated with that day appear in the list below the calendar. From this list, just like the main list, it is possible to update tasks and check their details.

<img src="https://github.com/Gerald212/DailyFlow/assets/98669020/535da80f-f6a4-4f1a-bbd4-8fefde4508a6" width="300"/>
The third screen accessible from the tab menu is the Panel, and contains general statistics on tasks and habits, as well as a shortcut to the application's most important functions. The Panel header also contains a button to change the current theme of the application.

<img src="https://github.com/Gerald212/DailyFlow/assets/98669020/2e0386f7-1bb9-438e-993e-14ec09ca3980" width="300"/>
<img src="https://github.com/Gerald212/DailyFlow/assets/98669020/39fbd469-bcd1-4f91-a658-e482c194ecaf" width="300"/>
After pressing the relevant button the user is taken to the adding screen. The form allows the user to provide a name, an optional description, assign a category and (in the case of a habit) set a goal or (in the case of a task) select a completion date.



## Application Structure
**Database diagram**

![obraz](https://github.com/Gerald212/DailyFlow/assets/98669020/2a6cb4e7-e5ab-4406-bf52-40a81ec2fb43)

**Components diagram**

![schemat komponentow(3)](https://github.com/Gerald212/DailyFlow/assets/98669020/3f7703a0-e087-4a21-8ad4-62d0e17cd9d6)

**Project Structure**
The project consists of **screens**, **components** used inside the screens, a **database** folder containing files related to the database operation and an **assets** folder with additional files such as icons.
## Technologies
The application was written entirely in JavaScript using React Native. The Expo toolkit was used to make testing the application easier.

The database was created using SQLite.

Additional libraries (MIT licence) used during application development: React Navigation, React Natives Calendars, React Native SVG.
