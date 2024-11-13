# Technology Stack

## Phaser (P0)
- Overview: Phaser is a fast, free, and open-source HTML5 game framework for creating 2D games for desktop and mobile web browsers.
  - Pros:
    - Easy to learn and use, ideal for beginners (P0).
    - Extensive feature set, including physics, input, and sound management (P0).

## PixiJS (P1)
- Overview: PixiJS is a fast and flexible 2D rendering library for creating interactive graphics and cross-platform applications.
  - Pros:
    - High-performance rendering with WebGL support (P1).

# Architecture

## 1. AppManager (P0)
Manages the state of the app, including user sessions, room navigation, and global settings.

### Variables:
- `currentUser`: User (P0) - Core for user interactions.
- `activeRoom`: Room (P0) - Necessary for room navigation.
- `friendList`: List<User> (P1) - Adds value for social interaction.
- `isAppPaused`: boolean (P0) - Core functionality for app control.
- `notificationQueue`: List<UserActivity> (P1) - Important for real-time notifications.
- `rooms`: List<Room> (P0) - Essential for room-based navigation.

### Methods:
- `initializeApp`: Sets up the app with default settings (P0).
- `navigateToRoom`: Allows users to switch between rooms (P0).
- `pauseApp`: Pauses interactions (P0).
- `resumeApp`: Resumes app (P0).
- `sendNotification(activity: UserActivity)`: Queues notifications (P1).

## 2. Room (P0)
Represents each "nook" or room, managing layout, customization, and access control.

### Variables:
- `roomID`: int (P0) - Unique identifier, essential for app functionality.
- `roomType`: String (P1) - Adds value by allowing varied room experiences.
- `accessLevel`: String (P1) - Access control is important but can be simplified initially.
- `decorItems`: List<DecorItem> (P2) - Nice-to-have for room customization.
- `media`: MediaItem (P1) - Significant for entertainment features but not core.
- `interactiveElements`: List<InteractiveElement> (P1).

### Methods:
- `loadRoom`: Loads layout and elements (P0).
- `addDecorItem`: Adds decor (P2).
- `setAccessLevel`: Sets permissions (P1).
- `playMedia`: Initiates media playback (P1).
- `stopMedia`: Stops playback (P1).

## 3. User (P0)
Represents users, personal details, and friendships.

### Variables:
- `userID`: int (P0) - Critical for managing user identity.
- `username`: String (P0) - Core for user experience.
- `friendshipLevel`: FriendshipLevel (P1) - Important for user interactions but not essential at launch.
- `personalRooms`: List<Room> (P1).
- `journalEntries`: List<UserActivity> (P2).

### Methods:
- `sendFriendRequest`: Allows adding friends (P1).
- `acceptFriendRequest`: Manages friendships (P1).
- `createJournalEntry`: Adds journal entries (P2).
- `updateProfile`: Updates user profile (P0).
- `setFriendshipLevel`: Controls friendship permissions (P2).

## 4. DecorItem (P2)
Represents a customizable item within a room, such as furniture.

### Variables:
- `decorID`: int (P2).
- `decorType`: String (P2).

### Methods:
- `interact`: Allows interaction (P2).
- `display`: Renders the item (P2).

## 5. InteractiveElement (P1)
Manages interactive elements like bulletin boards and bookshelves.

### Variables:
- `elementID`: int (P1).
- `elementType`: String (P1).

### Methods:
- `interact`: Defines interaction behavior (P1).
- `display`: Renders the element (P1).

## 6. BulletinBoard (P1)
Represents interactive bulletin boards.

### Variables:
- `posts`: List<Post> (P1).

### Methods:
- `addPost`: Adds a post (P1).
- `removePost`: Removes a post (P1).
- `reactToPost`: Adds reactions (P2).

## 7. Bookshelf (P1)
Stores user-created content such as journal entries.

### Variables:
- `entries`: List<UserActivity> (P1).

### Methods:
- `addJournalEntry`: Adds journal content (P1).
- `removeJournalEntry`: Removes entries (P2).

## 8. UserActivity (P1)
Represents notifications and journal entries.

### Variables:
- `activityID`: int (P1).
- `content`: String (P1).
- `type`: String (P1).
- `timestamp`: Date (P1).
- `isRead`: boolean (P1).

### Methods:
- `markAsRead`: Marks notifications as read (P1).
- `addMedia`: Associates media with journal entries (P2).
- `getSummary`: Summarizes the activity (P1).
- `deleteActivity`: Deletes activity (P1).
