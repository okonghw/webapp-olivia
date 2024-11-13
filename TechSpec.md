# Technology Stack

## Phaser
- Overview: Phaser is a fast, free, and open-source HTML5 game framework for creating 2D games for desktop and mobile web browsers.
- Features:
- Supports both Canvas and WebGL rendering,     ensuring broad compatibility.
- Rich plugin ecosystem and a large community, providing extensive resources and support.
- Comprehensive documentation and tutorials to assist developers at all levels.
- Pros
- Easy to learn and use, making it ideal for beginners.
- Extensive feature set, including physics, input, and sound management.
- convert to javascript accessible
- I think it would be a great choice for creating simple, casual minigames in the Gaming Room in 2D.
- cons
- Limited support for 3D graphics and complex shaders, but then again we don't need that for this project.
- May not be suitable for large-scale projects with complex requirements.
- 

## PixiJS
- Overview: PixiJS is a fast and flexible 2D rendering library for creating interactive graphics and cross-platform applications.
Features:
- High-performance rendering with support for WebGL and Canvas fallback.
- Extensible architecture, allowing for the addition of custom features.
- Active community and extensive documentation.

# Architecture

1. AppManager
Manages the state of the app, including user sessions, room navigation, and global settings.

* Variables
- currentUser: User - The currently logged-in user.
- activeRoom: Room - The current room that the user is in.
- friendList: List<User> - List of friends the user can interact with.
- isAppPaused: boolean - Indicates if the app is paused.
- notificationQueue: List<UserActivity> - Queue for new notifications/messages.
- rooms: List<Room> - List of rooms available for the user.
* Methods
- initializeApp: Sets up the app with default settings, loads user data, and initializes rooms.
navigateToRoom: Switches the current room based on user selection.
- pauseApp: Pauses interactions within the app.
- resumeApp: Resumes app functionality after pausing.
- sendNotification(activity: UserActivity): Queues notifications for new messages, updates, or events.
- loadFriendList: Loads the friend list and their interaction statuses.

2. Room

Represents each "nook" or room in the app, managing layout, customization, and access control.

* Variables
- roomID: int - Unique identifier for the room.
- roomType: String - Type of room (e.g., "Living Room", "Study Room").
- accessLevel: String - Access control setting (e.g., "public", "friends-only").
- decorItems: List<DecorItem> - List of decor elements in the room.
- media: MediaItem - The current media being shared (e.g., video or music).
- interactiveElements: List<InteractiveElement> - Elements like Bulletin Board, Bookshelf, etc.
* Methods
- loadRoom: Loads the layout and elements of the room based on its type and decor.
- addDecorItem: Adds a decor item to the room.
- removeDecorItem: Removes a decor item from the room.
- setAccessLevel: Sets access permissions for the room.
- playMedia: Initiates playback for media content in the room.
- stopMedia: Stops media playback.
- resetRoom: Resets the room to its default layout and decor.

3. User

Represents each user in the app, including personal details and friendships.

*  Variables
- userID: int - Unique identifier for the user.
- username: String - User’s display name.
- friendshipLevel: FriendshipLevel - The level of friendship for each friend.
- personalRooms: List<Room> - Rooms that belong to the user.
- journalEntries: List<UserActivity> - Entries the user has created in their bookshelf.
* Methods
- sendFriendRequest: Sends a friend request to another user.
- acceptFriendRequest: Accepts a friend request from another user.
- createJournalEntry: Adds a new journal entry to the user’s bookshelf.
- updateProfile: Updates the user’s profile information.
- setFriendshipLevel: Sets friendship permissions for a friend.

4. DecorItem

Represents a customizable item within a room, such as furniture, plants, or wall art.

* Variables
- decorID: int - Unique identifier for the decor item.
- position: Point - Position of the item within the room.
- owner: User - The user who owns the item.
- isEditable: boolean - Indicates if the item can be moved or modified by other users.
- appearance: String - Visual details of the item (e.g., color, style).
*Methods
- move: Changes the position of the item within the room.
- editAppearance: Modifies the appearance of the item.
- setOwnerOnly: Restricts editing to the owner only.
- resetPosition: Resets the item to its original position.

5. MediaItem

Represents multimedia content (videos, music) that can be shared and played within rooms.

* Variables
- mediaID: int - Unique identifier for the media item.
- mediaType: String - Type of media (e.g., video, music).
- url: String - URL of the media source.
- duration: int - Length of the media in seconds.
- isPlaying: boolean - Indicates if the media is currently playing.
* Methods
- play: Starts the media playback.
- pause: Pauses the media playback.
- stop: Stops the media playback.
- reset: Resets the media to the beginning.

6. InteractiveElement (Base Class)

A base class for interactive components in each room, such as the Bulletin Board, Bookshelf, or Creative Canvas.

* Variables
- elementID: int - Unique identifier for the element.
- elementType: String - Type of interactive element (e.g., Bulletin Board).
* Methods
- interact: Defines generic interaction behavior for the element.
- display: Renders the element in the room.

7. BulletinBoard (Extends InteractiveElement)
* Variables
- posts: List<Post> - List of posts pinned to the board.
* Methods
- addPost: Adds a post to the bulletin board.
- removePost: Removes a post from the bulletin board.
- reactToPost: Adds a reaction to a post.

8. Bookshelf (Extends InteractiveElement)
* Variables
- entries: List<UserActivity> - Collection of journal entries stored by the user.
* Methods
- addJournalEntry: Adds an entry to the bookshelf.
- removeJournalEntry: Removes an entry from the bookshelf.

9. Post

Represents a post on the Bulletin Board, containing content and reactions.

* Variables
- postID: int - Unique identifier for the post.
- content: String - The text or media of the post.
- author: User - The user who created the post.

10. UserActivity

Represents both notifications and journal entries, depending on the activity type.

* Variables
- activityID: int - Unique identifier for each activity.
- content: String - The message, description, or entry text.
- type: String - Defines the activity type (e.g., "Notification", "JournalEntry").
- timestamp: Date - The time when the activity was created.
- isRead: boolean - For notifications, indicates if the activity has been viewed by the user.


* Methods
- markAsRead() - Marks the activity as read if it is a notification.
- addMedia(media: MediaItem) - Associates multimedia content if the activity is a journal entry.
- getSummary() - Returns a summary of the activity, including content, timestamp, and type.
- deleteActivity() - Deletes or archives the activity from the user’s view.
