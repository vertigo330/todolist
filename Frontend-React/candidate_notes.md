# Candidate Notes for Front-End

## Notes
* There are a lot of package vulnerabilities, also its slightly unusual to be writing React applications in vanilla javascript. 
* The app could probably do with an overhaul, for example Typescript is more typical in modern React apps for some type safety, perhaps have a more modern bundler like Vite, etc (keeping things up to date is hard)
* Im used to seeing javascript-based React files use the jsx extension, so im just going to rename those for my own OCD
* API integration mean asynchrony, be aware of the implications of this (Thunks? Spinners? How far should I go with regards to optimization)
* Current CSS imports are not scoped to the component, possible name collisions. I should use CSS modules? maybe if time permits
* Do I need application state management? Probably not
* The application has not been "componentized". Refactor the in-lined application into a more typical component tree, perhaps something like:

```
app
│
└───layout (dumb ui component for rendering children in the desired format)
    │
    └───header (dumb ui component for main header)
    │
    └───todos (composite of components making up the main application)
    │   │
    │   └───card (dumb ui component for green card for instructions)
    │   │
    │   └───addTodo (composite of ui for adding)
    │   │
    │   └───listTodo (composite of ui for listing)
    │
    └───footer (dumb ui component for copyright text)
```
* Refactor CSS out into seperate files (per component)
* I dont really want to use Axios (additional package effecting bundle size), so using Fetch instead

## Todo
* The list todos component needs unique keys defined on the map function
* Intoduce a layouts component to manage tabular layout of the application
* Add error handling for possible http failures, possible error component required or reuse Card with a variant = danger
* Add a spinner while waiting for todos list to arrive at the client, and perhaps while waiting for the PUT to complete. A backdrop is probably more appropriate for the PUT
* Remember to implement the HTTPPUT method for setting todo to completed
* Use optimistic updating when updating the todo to completed i.e assume the call will succeed and update local state accordingly? If it fails, revert it to the old state.
* UseRef for accessing the todo input?