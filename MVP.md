# MVP Implementation Plan

## Next Steps - Completed
- Implement the `User` class:
  - `userID`: Manage user identity and session
  - `username`: Set up user profile
  - `updateProfile`: Allow users to update their profile details
- Refine the Room features by adding images and better the customization features such as naming things or color

-------------

## Day 1-2 (Core Framework)

- **Phaser setup for game framework**: Not Done (Not mentioned in the files)
- **Implement `AppManager`**: Done
  - `currentUser`: Not Done (No user session management is shown in `AppManager.js`)
  - `activeRoom`: Done (Handled by `selectedHouse` in `AppManager.js`)
  - `initializeApp`: Done (`useEffect` to load saved NookHouses from `localStorage`)
  - `navigateToRoom`: Done (`navigateToRoom` function implemented)
  - `addRoom`: Not Done (This is more specific to `Room` component functionality, not directly in `AppManager`)
- **Implement `Room`**: Done
  - `roomID`: Done (Rooms have `roomID` in `Room.js`)
  - `loadRoom`: Done (`loadRoom` function is implemented to change rooms)

## Day 3-4 (Essential Features)

- **Continue work on `AppManager`**: Done
- **Implement `User`**: Done
  - `userID`: Done (Users now have explicit IDs)
  - `username`: Done (Usernames present in app)
  - `updateProfile`: Done (Users can update the names of the houses they own (I didn't implement changing user profiles because I was unsure on how you inteded that to work))
- **Implement more `Room` functionality**:
  - `rooms`: Done (`rooms` list is implemented in `Room.js`)

## Day 5 (Enhancement & Testing)

- **Implement `friendList`:** Not Done (No friend list functionality in the provided files)
- **Implement `sendNotification`:** Not Done (No notification system is present in the provided files)
- **Implement `Room`**:
  - `roomType`: Done (Room types like 'living-room', 'study-room', etc., are hardcoded)
  - `accessLevel`: Done (`accessLevel` is implemented in `Room.js`)
- **Final testing and refinement**: Not Done (No testing or refinement stage mentioned)
