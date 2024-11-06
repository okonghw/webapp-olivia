# Nook&Story Game Design

## Overview
**Nook&Story** is a cozy virtual space where friends can hang out, decorate multiple themed rooms, enjoy media together, and capture memories in creative, multimedia journals. With interactive features like minigames, collaborative decorating, a Bulletin Board, a Bookshelf for keepsake entries, and a unique messaging system, it’s a place to stay connected, have fun, and reminisce together.

---

### 1. Project Choice
- **Option**: Web App Design
- **Website Title**: “Nook&Story”

---

### 2. Purpose of the Website
- **Goal**: Create an inviting, versatile virtual “nook” where friends can interact, explore multiple themed rooms, and share memories through creative, social, and interactive experiences.
- **Target Audience**:
  - **Age Group**: Teens to older adults!
  - **Interests**: Social interaction, multimedia journaling, casual gaming, and creative expression

---

## Design

### Functionality

#### Core Features

**Friendship Levels**
   - **Visitor**: Cannot change anything in the rooms, is able to view anything except the objects that are marked as only-owner. Can only enter private rooms if the owner allows them.
   - **Roommate**: Cannot change anything in the rooms, is able to view and interact with the objects except the objects that are marked as only-owner. Can enter private rooms if they are unlocked.
   - **Friend**: Can change anything in the rooms, is able to view and interact with the objects except the objects that are marked as only-owner. Can enter private rooms.
   - **Best Friend**: Has almost the same privileges as the owner except cannot interact with objects that are marked as only-owner.
   - **Adding a someone**: Can add someone from the friend menu with a friend request or friend code.

1. **Multiple "Nooks" (Rooms) System**:
   - **Main Shared Room**: Space for journaling, reading shared entries, and adding memories to the Bookshelf. Everyone has access to this room.
   - **Personal Rooms**: Private spaces for individual decor, journaling, and self-expression. Other users are able to access/view these personal romms if they have a roommate rank or higher.
   - **Shared Living Room**: Common area for group hangouts, collaborative decorating, and shared media. Can change access settings to limit who can enter.
   - **Gaming Room**: Room dedicated to playing simple minigames with friends. Can change access settings to limit who can enter.
   - **Navigation**: Can navigate between rooms with the buttons on the toolbar menu on the bottom of the screen that the user can always see even if they move between rooms.

2. **Room Customization**
   - Users can collaboratively customize shared rooms and personalize private rooms with furniture, decor, wallpaper, and themes.

3. **Media Interaction**
   - Shared screens in the Living Room enable users to watch movies, YouTube videos, and listen to music together in real-time.

4. **Creative Canvas**
   - An interactive drawing board in each room, especially the Study Room, allows users to doodle, create art, and add to a shared gallery or journal entries.

5. **Bookshelf for Keepsake Entries**
   - A virtual Bookshelf in the Study Room lets users store and browse multimedia journal entries. The toolbar will change to have buttons to edit the journal entries (text, stickers, photo, media).

6. **Bulletin Board for Quick Updates**
   - A Bulletin Board in the Living Room is available for posting quick updates (photos, notes, or recordings) with reaction options like stickers, comments, and voice notes. Each post can feature icons for mood, weather, or location. A post can look like an Instagram post with a photo and a caption or just a photo or text message on something that resembles a post-it note (like a real bulletin board).

7. **Mailbox with Notifications**
   - Users can send multimedia messages privately or to the group, with notifications to keep them updated on new messages.

8. **Minigames in the Gaming Room**
   - A selection of simple, casual games like puzzles, memory games, or quick arcade-style challenges allows users to play alone or with friends.

---

### User Flow

1. **Start Screen**
   - Options include Login, settings, or tutorial (brief overview of room features, navigation, and core interactions.) --> Choose a "house" to enter

2. **Room Navigation**
   - Users choose which room to enter: Personal Room, Living Room, Study Room, or Gaming Room. Room themes and decor reflect each room’s purpose. After the user initially enters a "house" from the start screen, they can navigate between rooms with the buttons on the toolbar in the bottom center.

3. **Interactive Elements**
   - Users can interact with various room features, such as watching media in the Living Room, browsing the Bulletin Board for updates, or journaling in the Study Room. Minigames in the Gaming Room allow for solo or group play, with quick leaderboard-style scores to encourage friendly competition.

4. **End of Session**
   - Options include saving changes to room decor, closing the session, or leaving a message for friends.

---

### Mechanics

- **Room Navigation** enables users to move seamlessly between rooms with buttoms on the toolbar, each offering unique features and interactive elements.
- **Message System** provides notifications for new messages or updates in any room, enhancing the connected experience.
- **Toolbar** has buttons leading to the rooms, a buttom to edit the decor, a button to edit media elements (youtube videos, music, temporary drawing pen, stickers), a button for friends menu, a button to create a new post.

---

### Aesthetics

1. **Visual Style**
   - The theme is cozy and slightly vintage to give a nostalgic feel across multiple rooms. Each room has a distinct theme: the Living Room is cozy, the Study Room is library-like, and the Gaming Room is lively. The Bulletin Board resembles a virtual corkboard with “snapshots” of posts.

2. **Color Scheme**
   - The palette features warm, soft colors with specific accent colors in each room: soft greens and browns in the Living Room, deep blue and dark wood tones in the Study Room, and initial purple color palette in the Gaming Room. (Users can change these colors as they wish).
 
3. **Typography**
   - Font styles are simple and rounded for a cozy feel, with handwritten fonts for personal entries to enhance readability across interactive elements and labels (Users can change the font or upload a desired font).

4. **Layout**

   - **Screen Arrangement**: The main area occupies most of the screen, providing easy access to interactive elements and decor options. The HUD (Heads-Up Display) includes a Notification Center with small icons showing updates for each room and a Navigation Bar on the button center with easy-access icons to switch between rooms and access tools. All elements are accessible to the user.

![Nook&Story Mockup](https://github.com/RiyanBK/webapp-olivia/blob/main/DALL%C2%B7E%202024-10-31%2009.11.35%20-%20Create%20a%203D%20visual%20representation%20of%20a%20cozy%2C%20nostalgic%20virtual%20space%20called%20'Nook%26Story%2C'%20with%20a%20slightly%20retro%20aesthetic.%20Each%20new%20'nook'%20includes%20an.webp)
