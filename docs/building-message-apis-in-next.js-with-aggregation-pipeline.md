# Building Message APIs in Next.js with Aggregation Pipeline

### API to Toggle Message Acceptance Status (POST)

This **POST** API, likely at `/api/accept-messages`, allows the currently logged-in user to switch their message acceptance status on or off.

**Implementation Details:**

* **Database Connection:** It starts by connecting to the database.
* **User Identification:** Uses `getServerSession` with `authOptions` to fetch session information, then extracts the user's `_id` from the session object.
* **Error Handling:** Includes checks for a logged-in user (session or user in session).
* **Request Body:** Expects a boolean flag (`acceptMessages`) to indicate the desired status.
* **Database Update:** Finds the user by ID and updates the `isAcceptingMessages` field using `findByIdAndUpdate`, ensuring the updated document is returned with `new: true`.
* **Responses:** Handles both successful updates and failures (e.g., user not found).
* **Robustness:** Database operations are wrapped in a `try-catch` block for error handling.

***

### API to Get Message Acceptance Status (GET)

This **GET** API checks the current message acceptance status for the logged-in user.

**Implementation Details:**

* **Similar Setup:** Follows similar initial steps to the POST method: connect to the DB, get the session, and extract the user ID.
* **Error Handling:** Includes checks for a logged-in user.
* **Database Query:** Finds the user document by their ID using `findById`.
* **Error Handling:** Catches cases where the user isn't found.
* **Response:** Returns the current value of the `isAcceptingMessages` field from the user document upon success.
* **Robustness:** Database operations are within a `try-catch` block.

***

### API to Get All Messages for Logged-in User (GET)

This **GET** API fetches all messages associated with the logged-in user.

**Implementation Details:**

* **Initial Steps:** Connects to the DB, gets the session, and extracts the user ID.
* **Type Conversion:** Addresses a potential issue where the user ID from the session might be a string, converting it to a Mongoose `ObjectId` using `new mongoose.Types.ObjectId(userId)`.
* **Complex Fetching:** Since messages are an array within the user document, a **MongoDB Aggregation Pipeline** is used for efficient processing.
* **Aggregation Pipeline Stages:**
  * **`$match`:** Filters user documents to find the one matching the logged-in user's `ObjectId`.
  * **`$unwind`:** Deconstructs the `messages` array, creating a separate document for each message.
  * **`$sort`:** Sorts the individual message documents, typically by `createdAt` in descending order (`-1`) for the newest messages first.
  * **`$group`:** Groups the sorted message documents back together by the original user's `_id`, collecting the messages into a new array.
* **Result Extraction:** The messages are extracted from the aggregated result.
* **Error Handling:** Includes checks if the user isn't found after aggregation.
* **Response:** Returns the sorted list of messages upon success.
* **Robustness:** The aggregation logic is placed within a `try-catch` block.

***

### API to Send a Message (POST)

This **POST** API, likely at `/api/send-message`, allows sending a message to a specific user. Notably, the sender **doesn't need to be logged in**, enabling "mystery messages" or feedback.

**Implementation Details:**

* **Database Connection:** Requires connecting to the database.
* **Request Body:** Receives the recipient's `username` and the `message` content.
* **Recipient Lookup:** Finds the recipient user in the database using their username via `findOne`.
* **Error Handling:** Checks if the recipient user is not found.
* **Acceptance Check:** Verifies if the recipient is currently accepting messages (`isAcceptingMessages` field).
* **Error Handling:** Returns a **403 Forbidden** status if the recipient isn't accepting messages.
* **Message Creation:** Creates a new message object, including content and a `createdAt` timestamp, matching the `Message` interface/schema.
* **Message Storage:** Adds the new message to the recipient user's `messages` array and saves the updated user document.
* **Responses:** Handles successful message sending and various failures (e.g., user not found, not accepting messages, database save errors).
* **Robustness:** The core logic is within a `try-catch` block.
