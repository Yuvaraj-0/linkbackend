# linkbackend
🚀 Features
🔐 Authentication

Signup / Login Pages

Secure user registration and login using JWT-based authentication.

Passwords are encrypted using bcrypt.

After login, users are redirected to their personal feed/dashboard.

👤 Profile Management

Own Profile Page

Shows user details such as name, email, bio, and skills.

Displays all posts created by that specific user.

Profile data can only be edited by the logged-in user.

Visiting Other User Profiles

Users can visit other users’ profiles to view their public details and posts.

Edit options are hidden when viewing another user’s profile.

🧾 Feed Functionality

Post Creation

Users can post text, images, or mixed media.

Each post is linked to the creator’s profile.

Post Editing & Deletion

Only the post owner can edit or delete their posts.

Like, Comment & Share

Users can like or unlike posts.

Commenting supports threaded replies.

Share option allows copying the post link or sharing via social platforms.

🔍 Search System

Integrated search bar to find users by their name or username.

Real-time filtering and suggestions using frontend queries.

⚙️ API Behavior (Important Clarification)

There is a special rule due to current API configuration:

🧩 Profile data exists only if the user has created at least one feed (post).
If a user has not posted anything yet, their profile data will also be empty when fetched from the API.

💬 Usage

Sign Up → Create your account

Login → Access your feed and profile

Create a Post → Add text/image posts

Edit/Delete → Manage your posts

Interact → Like, comment, and share

Search Users → Find and visit others’ profiles

🧑‍💻 Developer Note

Due to the current API linkage between Profile and Feed, ensure that at least one feed is created per user for proper profile visibility.
This behavior will be improved in the next backend revision.
