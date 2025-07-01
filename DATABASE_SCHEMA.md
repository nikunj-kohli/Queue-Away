
# Database Schema for Queue Away

## MongoDB Collections

### 1. users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  googleId: String (unique, sparse),
  profilePicture: String,
  phone: String,
  isVerified: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. messages
```javascript
{
  _id: ObjectId,
  sender: ObjectId (ref: User),
  receiver: ObjectId (ref: User),
  content: String,
  messageType: String, // 'text', 'image', 'notification'
  isRead: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. sessions
```javascript
{
  _id: ObjectId,
  sessionId: String,
  userId: ObjectId (ref: User),
  expiresAt: Date,
  createdAt: Date
}
```

### 4. businesses
```javascript
{
  _id: ObjectId,
  businessName: String,
  businessType: String,
  ownerName: String,
  email: String (unique),
  phone: String,
  address: String,
  panCard: String,
  gstNumber: String,
  businessLicense: String,
  status: String, // 'pending', 'approved', 'rejected'
  verificationDocuments: [String], // file URLs
  subscriptionPlan: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. queues
```javascript
{
  _id: ObjectId,
  businessId: ObjectId (ref: Business),
  name: String,
  description: String,
  maxCapacity: Number,
  currentCount: Number,
  estimatedWaitTime: Number, // in minutes
  isActive: Boolean,
  settings: {
    allowBooking: Boolean,
    requirePayment: Boolean,
    maxAdvanceBooking: Number // days
  },
  createdAt: Date,
  updatedAt: Date
}
```

## MySQL Tables

### 1. payments
```sql
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(24) NOT NULL, -- MongoDB ObjectId
  business_id VARCHAR(24), -- MongoDB ObjectId
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  razorpay_signature VARCHAR(255),
  status ENUM('pending', 'success', 'failed', 'refunded') DEFAULT 'pending',
  payment_type ENUM('booking', 'subscription', 'premium') DEFAULT 'booking',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. logs
```sql
CREATE TABLE logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(24), -- MongoDB ObjectId
  business_id VARCHAR(24), -- MongoDB ObjectId
  action_type VARCHAR(50) NOT NULL,
  description TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. feedback
```sql
CREATE TABLE feedback (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(24), -- MongoDB ObjectId
  business_id VARCHAR(24), -- MongoDB ObjectId
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  feedback_type ENUM('service', 'app', 'general') DEFAULT 'service',
  is_anonymous BOOLEAN DEFAULT FALSE,
  status ENUM('pending', 'reviewed', 'resolved') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 4. usage_analytics
```sql
CREATE TABLE usage_analytics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(24), -- MongoDB ObjectId
  business_id VARCHAR(24), -- MongoDB ObjectId
  event_type VARCHAR(50) NOT NULL,
  page_url VARCHAR(255),
  referrer VARCHAR(255),
  session_duration INT, -- in seconds
  device_info JSON,
  location_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables Required

Create a `.env` file in the backend directory:

```env
# MongoDB
MONGO_URI=mongodb+srv://nikunj:12345@queueaway.3yqo9i2.mongodb.net/queueaway

# MySQL
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=queueaway

# JWT
JWT_SECRET=your_jwt_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Session
SESSION_SECRET=your_session_secret

# Server
PORT=5000
NODE_ENV=development
```

## Setup Instructions

1. **MongoDB Setup**: 
   - Use the provided MONGO_URI
   - Collections will be created automatically

2. **MySQL Setup**:
   - Create a MySQL database named 'queueaway'
   - Run the SQL commands above to create tables

3. **Environment Variables**:
   - Copy `.env.example` to `.env`
   - Fill in all the required values

4. **Google OAuth Setup**:
   - Go to Google Cloud Console
   - Create OAuth 2.0 credentials
   - Add redirect URI: `https://your-domain.com/api/auth/google/callback`

5. **Razorpay Setup**:
   - Create Razorpay account
   - Get API keys from dashboard
   - Add to environment variables
