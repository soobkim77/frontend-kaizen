# Kaizen

A to-do list app that can be utilized for personal and group based work. This repo is meant to be used with this [repo](https://github.com/soobkim77/backend-kaizen) as a backend

## Project Basis

To-do list apps are often some of the most basic and simple starter apps for new developers. This app was designed to show the full range of capabilities in React.js as well as incorporating a backend with Rails as an API. The core of this project is desinged to maximize the user's experience and increase their efficieny through assignment tracking. 

### The User Story

User functionality rests on a simple principle, the ability to create tasks for certain project/workspaces, and to track progess on these new tasks. Beyond personal use, a team model was incorporated within so that User's amy share their workspaces with other's for collaborative work. Users thus have the ability to create an account, but also create teams. From the teams panel, they are able to add new members to their team and give them access to boards that are assigned to a team. 

Workspaces are modeled as boards within the backend. Within a board, the user has the ability to add new tasks, change the status level of the task, add due dates, and add notes/descriptions to tasks as well. Boards are meant to be the main project space where users can interact with other team members through notes, or if the board is a personal one, manage their tasks as they deem fit. 

### Stlying

Utilizing Google's @material-ui library, the style of the website reflects many of Google's specific styling ettiquette. This provides a clear and intuitive design for the website to make the user experience more fluid. On top of the imported code from the library, custom CSS was utilized to incorporate a dark theme for the application.

## Techs

Listed below are some technologies used on top of the React and Ruby on Rails stack. 

### BCrypt/JWT

To ensure secure logins and proper validation processes, User's passwords are encrypted in the backend using the b-crypt gem. AFter successful logins, a JWT token is assigned and sent on every request to the backend. This token is required as part of the validation on the backend to ensure that validated user's are making requests to the backend. 

### fast_jsonapi 

Netflix's fast_jsonapi was used on the backend to serialize data and streamline responses from the backend. This gem created a specific format for the data being pulled from the backend, enabling the backend to complete requests at much faster speeds than Ruby's Active-Record serializers (x25 times faster). 

### Redux

React-Redux was used as a global state management package. Due to the heirarchal nature of React, state is often set the highest level component and then passed down to the necessary components using props. However, Redux allows the application to have a single store that regulates state across the app. This provides the application with stateful logic and is accessible to any component that the state is needed in. 

#### Redux-Thunk

In order to handle asynchronus AJAX requests, Redux-Thunk was used to control state when making these requests. Due ot the asynch nature of AJAX requests, Redux may dispatch actions before the proper data is returned from the backend. Redux-Thunk handles this by allowing a function to be returned on a dispatch. Thus, the correct state modifier will be applied as a return function on the original AJAX requests, ensuring that the backend has returned the data before the state is manipulated.


