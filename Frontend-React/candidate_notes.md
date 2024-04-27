# Front-end

## Notes

- There are a lot of package vulnerabilities, also its slightly unusual to be writing React applications in vanilla javascript.
- The app could probably do with an overhaul, for example Typescript is more typical in modern React apps for some type safety, perhaps have a more modern bundler like Vite, etc (keeping things up to date is hard!)
- Im used to seeing javascript-based React files use the jsx extension, so im just going to rename those for my own OCD
- Current CSS imports are not scoped to the component, possible name collisions. I i've converted these to css modules
- Do I need application state management? Probably not
- The application has not been "componentized". Refactor the in-lined application into a more typical component tree
- Refactor CSS out into seperate files (per component)
- I dont really want to use Axios (additional package effecting bundle size), so using Fetch instead. Hope thats not an issue
- Add error handling for possible http failures, reused the error card for validation error (probably not ideal!)
- Added a spinner while waiting for asynchronous operations to complete

- Added too many tests! Rather safe then sorry

# Back-end

## Notes

- Aim for skinny controller, adstract application logic into a todo list service and repo
- Introduce a new todo item DTO so that EF models dont cross the service boundary
- Write some unit tests, mock using MOQ
- Make sure that internal exception messages are never returned to the client, but logged instead
