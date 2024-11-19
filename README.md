
# User Notification Preferences API

This API manages user notification preferences and handles notification delivery. It provides functionality for managing preferences for different types of notifications and channels, simulating notification sending, and tracking notification statuses.

## API Features
- **User Preferences Management**: CRUD operations for user preferences.
- **Notification Management**: Simulate sending notifications and track their status.
- **Basic Rate Limiting**: Prevent API abuse by limiting the number of requests.
- **Request Logging**: Logs request details for debugging and monitoring.
- **Statistics Tracking**: Provides basic stats on notifications sent.

## Tech Stack
- **NestJS**: Framework for building the API.
- **TypeScript**: For type safety and better development experience.
- **MongoDB with Mongoose**: To store user preferences and notification logs.
- **Jest**: Testing framework for unit and integration tests.
- **Class Validator**: For validating request bodies.
- **Serverless Deployment**: Deployed to [Vercel](https://vercel.com) or [AWS Lambda](https://aws.amazon.com/lambda/).

## Core Models
### `UserPreference`
```typescript
interface UserPreference {
  userId: string;
  email: string;
  preferences: {
    marketing: boolean;
    newsletter: boolean;
    updates: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'never';
    channels: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  timezone: string;
  lastUpdated: Date;
  createdAt: Date;
}
```

### `NotificationLog`
```typescript
interface NotificationLog {
  userId: string;
  type: 'marketing' | 'newsletter' | 'updates';
  channel: 'email' | 'sms' | 'push';
  status: 'pending' | 'sent' | 'failed';
  sentAt?: Date;
  failureReason?: string;
  metadata: Record<string, any>;
}
```

## API Endpoints

### User Preferences

- **POST /api/preferences**
  - Create user preferences.
  - **Request Body**:
    ```json
    {
      "userId": "user123",
      "email": "user@example.com",
      "preferences": {
        "marketing": true,
        "newsletter": false,
        "updates": true,
        "frequency": "weekly",
        "channels": {
          "email": true,
          "sms": false,
          "push": true
        }
      },
      "timezone": "America/New_York"
    }
    ```
  
- **GET /api/preferences/:userId**
  - Retrieve user preferences by `userId`.

- **PATCH /api/preferences/:userId**
  - Update user preferences by `userId`.
  
- **DELETE /api/preferences/:userId**
  - Delete user preferences by `userId`.

### Notification Management

- **POST /api/notifications/send**
  - Simulate sending a notification.
  - **Request Body**:
    ```json
    {
      "userId": "user123",
      "type": "marketing",
      "channel": "email",
      "content": {
        "subject": "Special Offer",
        "body": "Check out our latest deals!"
      }
    }
    ```

- **GET /api/notifications/:userId/logs**
  - Get notification logs for a user by `userId`.

- **GET /api/notifications/stats**
  - Get basic statistics on notifications sent.

## Technical Requirements
- **Data Models**: `UserPreference` and `NotificationLog`.
- **Validation**: 
  - Valid email format.
  - Valid timezone string.
  - Enum validation for `frequency` and `status`.
- **Rate Limiting**: Prevent abuse of the API.
- **Error Handling**: Proper error messages and status codes.
- **Unit & Integration Testing**: Test service layer, validation, API endpoints, and database operations.

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance (can use MongoDB Atlas for cloud database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/D-D-Roshan/User-Notification-Preferences-API-.git
   cd your-repository
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following content:
   ```env
   MONGODB_URI=mongodb://localhost:27017/notification-preferences
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application locally:
   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:3000`.

### Deployment

This API is designed to be deployed to Vercel or AWS Lambda.

#### Vercel Deployment

1. Push the code to your GitHub repository.
2. Create a new project on [Vercel](https://vercel.com).
3. Link your repository and deploy.
4. Set up environment variables in Vercel’s dashboard.

#### AWS Lambda Deployment

1. Use the [serverless framework](https://www.serverless.com/) to deploy:
   - Install serverless framework globally:
     ```bash
     npm install -g serverless
     ```
   - Configure `serverless.yml` to deploy the app.
   - Deploy using:
     ```bash
     serverless deploy
     ```

## API Documentation

- **OpenAPI/Swagger**: Swagger documentation will be available at `http://localhost:3000/api-docs` when running locally. On deployment, it will be available via the same URL pattern.

## Testing

1. Run unit tests:
   ```bash
   npm run test
   ```

2. Run integration tests:
   ```bash
   npm run test:e2e
   ```

## Example Requests and Responses

### Create User Preferences

**Request**:
```bash
POST /api/preferences
```
**Body**:
```json
{
  "userId": "user123",
  "email": "user@example.com",
  "preferences": {
    "marketing": true,
    "newsletter": false,
    "updates": true,
    "frequency": "weekly",
    "channels": {
      "email": true,
      "sms": false,
      "push": true
    }
  },
  "timezone": "America/New_York"
}
```

**Response**:
```json
{
  "message": "User preferences created successfully"
}
```

### Send Notification

**Request**:
```bash
POST /api/notifications/send
```
**Body**:
```json
{
  "userId": "user123",
  "type": "marketing",
  "channel": "email",
  "content": {
    "subject": "Special Offer",
    "body": "Check out our latest deals!"
  }
}
```

**Response**:
```json
{
  "message": "Notification sent successfully"
}
```

## Environment Variables

- `MONGODB_URI`: MongoDB connection URI.


## Submission

Please provide the following:
- GitHub repository link
- Deployed API URL
- Example requests and responses
