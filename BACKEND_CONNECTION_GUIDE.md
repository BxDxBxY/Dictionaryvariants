# Backend Connection Guide - Find Uz & Dictionary API

**Version:** 1.0.0  
**Last Updated:** 2026-06-02  
**Framework:** Django 5.2.1 + Django REST Framework  

---

## 🚀 Quick Start

### Base URL
```
http://localhost:8000/api/
```

### Swagger Documentation (Interactive API Explorer)
```
http://localhost:8000/api/swagger/
```

### ReDoc Documentation
```
http://localhost:8000/api/redoc/
```

### OpenAPI Schema (JSON)
```
http://localhost:8000/api/schema/
```

---

## 📋 Authentication System

### JWT Token-Based Authentication

All protected endpoints require JWT token in request header:

```
Authorization: Bearer {access_token}
```

### 1. User Registration & Login

#### Register New User
```
POST /api/auth/token/
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123",
  "phone_number": "+998901234567",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response (200 OK):**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user_id": 1,
  "username": "john_doe"
}
```

#### Refresh Access Token
```
POST /api/auth/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### Verify Token
```
POST /api/auth/token/verify/
Content-Type: application/json

{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

## 🔑 Phone Number Format

**Required Format:** `+998XXYYZZAA` (Uzbekistan numbers)

Valid Examples:
- `+998901234567`
- `+998 90 123 45 67`
- `998901234567`

---

## 🎯 API Endpoints

### A. AUTHENTICATION ENDPOINTS

**Base:** `/api/auth/`

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| POST | `token/` | Get JWT tokens | ❌ No |
| POST | `token/refresh/` | Refresh access token | ❌ No |
| POST | `token/verify/` | Verify token validity | ❌ No |

---

### B. FIND UZ (LOST & FOUND) ENDPOINTS

**Base:** `/api/finduz/`

#### Users Management

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `user_view/` | List all users | ❌ |
| GET | `user_view/{id}/` | Get user details | ❌ |
| POST | `user_create_view/` | Create new user | ❌ |
| GET | `admin_user_view/` | List admin users | ✅ |

**Create User Request:**
```json
POST /api/finduz/user_create_view/

{
  "username": "newuser",
  "password": "password123",
  "phone_number": "+998901234567",
  "first_name": "John",
  "last_name": "Doe",
  "user_type": "find_uz_user"
}
```

#### Items (Lost & Found Items)

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `items_view/` | List all items | ❌ |
| GET | `items_view/{id}/` | Get item details | ❌ |
| POST | `items_view/` | Create new item | ✅ |
| PUT | `items_edit_view/{id}/` | Update item | ✅ |
| DELETE | `items_edit_view/{id}/` | Delete item | ✅ |

**Create Item Request:**
```json
POST /api/finduz/items_view/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "item_name": "Black Wallet",
  "description": "Lost black leather wallet with ID inside",
  "category": 1,
  "status": "lost",
  "latitude": 41.2995,
  "longitude": 69.2401,
  "date_lost_found": "2026-06-01",
  "time_lost_found": "14:30:00",
  "color": "black",
  "brand": "Guess"
}
```

**Item Status Values:**
- `lost` - Item reported as lost
- `found` - Item reported as found
- `claimed` - Item has been claimed
- `returned` - Item has been returned to owner

#### Item Images

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `item_images_view/` | List all item images | ❌ |
| GET | `item_images_view/{id}/` | Get image details | ❌ |
| POST | `items_images_edit_view/` | Upload image | ✅ |
| DELETE | `items_images_edit_view/{id}/` | Delete image | ✅ |

**Upload Item Image:**
```
POST /api/finduz/items_images_edit_view/
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

item: 1
image: <file>
```

#### Messages (Direct Messaging Between Users)

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `message_view/` | List messages | ✅ |
| GET | `message_view/{id}/` | Get message details | ✅ |
| POST | `create_message_view/` | Send message | ✅ |
| PUT | `edit_message_view/{id}/` | Edit message | ✅ |
| DELETE | `edit_message_view/{id}/` | Delete message | ✅ |

**Send Message Request:**
```json
POST /api/finduz/create_message_view/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "receiver": 2,
  "content": "Hi, is this wallet still available?"
}
```

#### Message Attachments (Images & Files)

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `message_images_view/` | List message images | ✅ |
| POST | `message_images_view/` | Attach image to message | ✅ |
| DELETE | `message_images_view/{id}/` | Delete image attachment | ✅ |
| GET | `message_files_view/` | List message files | ✅ |
| POST | `message_files_view/` | Attach file to message | ✅ |
| DELETE | `message_files_view/{id}/` | Delete file attachment | ✅ |

---

### C. DICTIONARY ENDPOINTS

**Base:** `/api/dictionary/`

#### Users (Dictionary Users)

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `user/` | List dictionary users | ❌ |
| GET | `user/{id}/` | Get user details | ❌ |
| POST | `user_create/` | Create dictionary user | ❌ |

#### Diplomatic Terms (Core Dictionary)

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `term/` | List all terms | ❌ |
| GET | `term/{id}/` | Get term details | ❌ |
| GET | `term_detailed/` | Get terms with full details | ❌ |
| GET | `term_detailed/{id}/` | Get detailed term info | ❌ |
| POST | `create_term/` | Create new term | ✅ Admin |
| PUT | `create_term/{id}/` | Update term | ✅ Admin |

**Create/Update Term Request:**
```json
POST /api/dictionary/create_term/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "title": "Diplomatic Immunity",
  "definition": "Special legal status granted to diplomats...",
  "category": 1,
  "country": 1,
  "source": 1
}
```

#### Search Diplomatic Terms

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `search_term/?query=test` | Search terms by keyword | ❌ |
| POST | `search_term/` | Advanced search | ❌ |

**Search Examples:**
```
GET /api/dictionary/search_term/?query=immunity
GET /api/dictionary/search_term/?query=agreement&category=1
```

#### Categories

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `category/` | List categories | ❌ |
| GET | `category/{id}/` | Get category details | ❌ |
| POST | `create_category/` | Create category | ✅ Admin |
| PUT | `create_category/{id}/` | Update category | ✅ Admin |
| DELETE | `create_category/{id}/` | Delete category | ✅ Admin |

**Category Creation:**
```json
POST /api/dictionary/create_category/
Authorization: Bearer {access_token}

{
  "name": "International Law",
  "description": "Terms related to international law"
}
```

#### Countries

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `country/` | List countries | ❌ |
| GET | `country/{id}/` | Get country details | ❌ |
| POST | `country_admin/` | Create country | ✅ Admin |
| PUT | `country_admin/{id}/` | Update country | ✅ Admin |
| DELETE | `country_admin/{id}/` | Delete country | ✅ Admin |

#### Sources

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `source/` | List sources | ❌ |
| GET | `source/{id}/` | Get source details | ❌ |
| POST | `source_admin/` | Create source | ✅ Admin |
| PUT | `source_admin/{id}/` | Update source | ✅ Admin |
| DELETE | `source_admin/{id}/` | Delete source | ✅ Admin |

#### Term Photos/Images

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `term_photo/` | List term photos | ❌ |
| GET | `term_photo/{id}/` | Get photo details | ❌ |
| POST | `term_photo_admin/` | Upload term photo | ✅ Admin |
| DELETE | `term_photo_admin/{id}/` | Delete photo | ✅ Admin |

**Upload Term Photo:**
```
POST /api/dictionary/term_photo_admin/
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

term: 1
photo: <file>
```

#### Contact Messages

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `contact/` | List contact messages | ❌ |
| POST | `contact/` | Send contact message | ❌ |
| GET | `contact_admin/` | List messages (admin) | ✅ Admin |
| DELETE | `contact_admin/{id}/` | Delete contact message | ✅ Admin |

**Send Contact Message:**
```json
POST /api/dictionary/contact/
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about translations",
  "message": "I have a question about diplomatic terms..."
}
```

---

## 📱 Request/Response Examples

### Example 1: Complete Login Flow

```javascript
// Step 1: Get tokens
const loginResponse = await fetch('http://localhost:8000/api/auth/token/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john_doe',
    password: 'securepassword123'
  })
});

const tokens = await loginResponse.json();
const accessToken = tokens.access;

// Step 2: Make authenticated request
const itemsResponse = await fetch('http://localhost:8000/api/finduz/items_view/', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
});

const items = await itemsResponse.json();
```

### Example 2: Create Lost Item

```javascript
const accessToken = 'your_access_token_here';

const response = await fetch('http://localhost:8000/api/finduz/items_view/', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    item_name: 'Black Wallet',
    description: 'Lost at the train station',
    category: 1,
    status: 'lost',
    latitude: 41.2995,
    longitude: 69.2401,
    date_lost_found: '2026-06-01',
    time_lost_found: '14:30:00',
    color: 'black',
    brand: 'Guess'
  })
});

const newItem = await response.json();
```

### Example 3: Upload Image to Item

```javascript
const formData = new FormData();
formData.append('item', 1); // Item ID
formData.append('image', imageFile); // File from input

const response = await fetch('http://localhost:8000/api/finduz/items_images_edit_view/', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  },
  body: formData
});

const imageData = await response.json();
```

### Example 4: Search Dictionary Terms

```javascript
const searchQuery = 'immunity';

const response = await fetch(
  `http://localhost:8000/api/dictionary/search_term/?query=${searchQuery}`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
);

const searchResults = await response.json();
```

---

## 🔐 Authentication Requirements Summary

### Public Endpoints (No Auth Required)
- List users (`GET /api/finduz/user_view/`)
- List items (`GET /api/finduz/items_view/`)
- Get item details (`GET /api/finduz/items_view/{id}/`)
- List dictionary terms (`GET /api/dictionary/term/`)
- Search terms (`GET /api/dictionary/search_term/`)
- Login (`POST /api/auth/token/`)
- Contact form (`POST /api/dictionary/contact/`)

### Protected Endpoints (Auth Required)
- Create item (`POST /api/finduz/items_view/`)
- Update item (`PUT /api/finduz/items_edit_view/{id}/`)
- Delete item (`DELETE /api/finduz/items_edit_view/{id}/`)
- Send message (`POST /api/finduz/create_message_view/`)
- Upload images (`POST /api/finduz/items_images_edit_view/`)
- Create dictionary terms (`POST /api/dictionary/create_term/`)
- Admin operations (all admin endpoints)

### Admin-Only Endpoints (Admin Auth Required)
- Create category (`POST /api/dictionary/create_category/`)
- Create country (`POST /api/dictionary/country_admin/`)
- Create source (`POST /api/dictionary/source_admin/`)
- Upload term photos (`POST /api/dictionary/term_photo_admin/`)
- View admin users (`GET /api/finduz/admin_user_view/`)

---

## 📊 Data Models Overview

### User Model
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone_number": "+998901234567",
  "user_type": "find_uz_user",
  "created_at": "2026-06-01T10:00:00Z",
  "updated_at": "2026-06-01T10:00:00Z"
}
```

### Item Model
```json
{
  "id": 1,
  "user": 1,
  "item_name": "Black Wallet",
  "description": "Lost black leather wallet",
  "category": 1,
  "status": "lost",
  "latitude": 41.2995,
  "longitude": 69.2401,
  "date_lost_found": "2026-06-01",
  "time_lost_found": "14:30:00",
  "color": "black",
  "brand": "Guess",
  "created_at": "2026-06-01T10:00:00Z",
  "images": [
    {
      "id": 1,
      "image": "http://localhost:8000/media/images/items/wallet.jpg"
    }
  ]
}
```

### Message Model
```json
{
  "id": 1,
  "sender": 1,
  "receiver": 2,
  "content": "Hi, is this item still available?",
  "created_at": "2026-06-01T10:00:00Z",
  "image": null,
  "file": null
}
```

### Diplomatic Term Model
```json
{
  "id": 1,
  "title": "Diplomatic Immunity",
  "definition": "Special legal status granted to diplomats...",
  "category": 1,
  "country": 1,
  "source": 1,
  "photos": [
    {
      "id": 1,
      "photo": "http://localhost:8000/media/terms/immunity.jpg"
    }
  ]
}
```

---

## ⚙️ Setup & Running

### Start Development Server

```bash
# Install dependencies
uv sync

# Run migrations
uv run python manage.py migrate

# Create superuser (admin)
uv run python manage.py createsuperuser

# Run server
uv run python manage.py runserver
```

### Docker Deployment

```bash
# Build image
docker build -t find-uz .

# Run container
docker run -p 8000:8000 find-uz
```

---

## 🐛 Common Response Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Data retrieved/updated successfully |
| 201 | Created | New resource created successfully |
| 204 | No Content | Successful deletion |
| 400 | Bad Request | Invalid data format |
| 401 | Unauthorized | Missing/invalid JWT token |
| 403 | Forbidden | No permission for this action |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error |

---

## 📋 Error Response Format

```json
{
  "detail": "Error message",
  "code": "error_code"
}
```

Or for validation errors:
```json
{
  "field_name": ["Error message for this field"]
}
```

---

## 🎯 Connection Checklist for AI Integration

- [ ] Backend is running (`http://localhost:8000/api/`)
- [ ] Swagger docs are accessible (`http://localhost:8000/api/swagger/`)
- [ ] Can get auth token via `POST /api/auth/token/`
- [ ] Can list items via `GET /api/finduz/items_view/`
- [ ] Can search dictionary via `GET /api/dictionary/search_term/`
- [ ] Can authenticate with Bearer token
- [ ] Can create items with authenticated request
- [ ] Can upload images to items
- [ ] Can send messages between users
- [ ] Can perform admin operations (if admin user)

---

## 📞 Support

For detailed API testing, use Swagger UI at:
```
http://localhost:8000/api/swagger/
```

For OpenAPI schema (useful for code generation):
```
http://localhost:8000/api/schema/
```

---

**Next Steps for AI Integration:**
1. Use Swagger endpoint to explore all available operations
2. Generate API client using OpenAPI schema
3. Start with public endpoints (no auth required)
4. Implement JWT token management
5. Gradually add protected endpoints
6. Test with real data before production deployment
