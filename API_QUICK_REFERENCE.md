# Find Uz API - Quick Reference Card

## 🚀 URLs & Documentation

| Purpose | URL |
|---------|-----|
| **API Base** | `http://localhost:8000/api/` |
| **Swagger Docs** | `http://localhost:8000/api/swagger/` |
| **OpenAPI Schema** | `http://localhost:8000/api/schema/` |
| **ReDoc** | `http://localhost:8000/api/redoc/` |

---

## 🔐 Authentication

```bash
# 1. Login
curl -X POST http://localhost:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"pass"}'

# Response: {"access": "token...", "refresh": "token..."}

# 2. Use access token in headers
Authorization: Bearer {access_token}

# 3. Refresh token when expired
curl -X POST http://localhost:8000/api/auth/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh":"token..."}'
```

---

## 📂 All Endpoints

### Auth (`/api/auth/`)
- `POST token/` → Login (get JWT tokens)
- `POST token/refresh/` → Refresh access token
- `POST token/verify/` → Verify token

### Find Uz - Users (`/api/finduz/`)
- `GET user_view/` → List users
- `GET user_view/{id}/` → Get user details
- `POST user_create_view/` → Create user
- `GET admin_user_view/` → List admins (auth required)

### Find Uz - Items (`/api/finduz/`)
- `GET items_view/` → List items
- `GET items_view/{id}/` → Get item
- `POST items_view/` → Create item (auth required)
- `PUT items_edit_view/{id}/` → Update item (auth required)
- `DELETE items_edit_view/{id}/` → Delete item (auth required)

### Find Uz - Images (`/api/finduz/`)
- `GET item_images_view/` → List images
- `POST items_images_edit_view/` → Upload image (auth required, multipart/form-data)
- `DELETE items_images_edit_view/{id}/` → Delete image (auth required)

### Find Uz - Messages (`/api/finduz/`)
- `GET message_view/` → List messages (auth required)
- `GET message_view/{id}/` → Get message (auth required)
- `POST create_message_view/` → Send message (auth required)
- `PUT edit_message_view/{id}/` → Edit message (auth required)
- `DELETE edit_message_view/{id}/` → Delete message (auth required)

### Find Uz - Message Attachments (`/api/finduz/`)
- `GET message_images_view/` → List images (auth required)
- `POST message_images_view/` → Attach image (auth required, multipart/form-data)
- `DELETE message_images_view/{id}/` → Delete image (auth required)
- `GET message_files_view/` → List files (auth required)
- `POST message_files_view/` → Attach file (auth required, multipart/form-data)
- `DELETE message_files_view/{id}/` → Delete file (auth required)

### Dictionary - Users (`/api/dictionary/`)
- `GET user/` → List dict users
- `GET user/{id}/` → Get user
- `POST user_create/` → Create user

### Dictionary - Terms (`/api/dictionary/`)
- `GET term/` → List terms
- `GET term/{id}/` → Get term
- `GET term_detailed/` → List detailed terms
- `GET term_detailed/{id}/` → Get detailed term
- `POST create_term/` → Create term (admin required)
- `PUT create_term/{id}/` → Update term (admin required)

### Dictionary - Search (`/api/dictionary/`)
- `GET search_term/?query=TEXT` → Search terms
- `POST search_term/` → Advanced search

### Dictionary - Categories (`/api/dictionary/`)
- `GET category/` → List categories
- `GET category/{id}/` → Get category
- `POST create_category/` → Create (admin required)
- `PUT create_category/{id}/` → Update (admin required)
- `DELETE create_category/{id}/` → Delete (admin required)

### Dictionary - Countries (`/api/dictionary/`)
- `GET country/` → List countries
- `GET country/{id}/` → Get country
- `POST country_admin/` → Create (admin required)
- `PUT country_admin/{id}/` → Update (admin required)
- `DELETE country_admin/{id}/` → Delete (admin required)

### Dictionary - Sources (`/api/dictionary/`)
- `GET source/` → List sources
- `GET source/{id}/` → Get source
- `POST source_admin/` → Create (admin required)
- `PUT source_admin/{id}/` → Update (admin required)
- `DELETE source_admin/{id}/` → Delete (admin required)

### Dictionary - Photos (`/api/dictionary/`)
- `GET term_photo/` → List photos
- `GET term_photo/{id}/` → Get photo
- `POST term_photo_admin/` → Upload (admin required, multipart/form-data)
- `DELETE term_photo_admin/{id}/` → Delete (admin required)

### Dictionary - Contact (`/api/dictionary/`)
- `GET contact/` → List contacts
- `POST contact/` → Send contact message
- `GET contact_admin/` → List (admin required)
- `DELETE contact_admin/{id}/` → Delete (admin required)

---

## 📨 Common Payloads

### Register User
```json
POST /api/finduz/user_create_view/
{
  "username": "john",
  "password": "pass123",
  "phone_number": "+998901234567",
  "first_name": "John",
  "last_name": "Doe",
  "user_type": "find_uz_user"
}
```

### Create Lost Item
```json
POST /api/finduz/items_view/
Authorization: Bearer {token}
{
  "item_name": "Wallet",
  "description": "Black wallet lost at station",
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

### Send Message
```json
POST /api/finduz/create_message_view/
Authorization: Bearer {token}
{
  "receiver": 2,
  "content": "Is this item available?"
}
```

### Create Dictionary Term
```json
POST /api/dictionary/create_term/
Authorization: Bearer {admin_token}
{
  "title": "Diplomatic Immunity",
  "definition": "Legal protection...",
  "category": 1,
  "country": 1,
  "source": 1
}
```

### Search Dictionary
```
GET /api/dictionary/search_term/?query=immunity
```

---

## 📊 Item Status Values

| Status | Meaning |
|--------|---------|
| `lost` | Item reported as lost |
| `found` | Item reported as found |
| `claimed` | Someone claimed the item |
| `returned` | Item returned to owner |

---

## 📞 User Types

| Type | Purpose |
|------|---------|
| `find_uz_user` | Lost & Found users |
| `dict_user` | Dictionary users |

---

## ✅ Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 201 | Created - New resource |
| 204 | No Content - Success (delete) |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - No/invalid token |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource missing |
| 500 | Server Error |

---

## 🔧 Phone Number Format

Must be: `+998XXYYZZAA` (Uzbekistan)

Examples:
- ✅ `+998901234567`
- ✅ `+998 90 123 45 67`
- ✅ `998901234567`
- ❌ `90 1234567` (missing country code)

---

## 🐍 Python Example

```python
import requests

# 1. Login
response = requests.post(
    'http://localhost:8000/api/auth/token/',
    json={'username': 'john', 'password': 'pass123'}
)
access_token = response.json()['access']

# 2. Create item
headers = {'Authorization': f'Bearer {access_token}'}
response = requests.post(
    'http://localhost:8000/api/finduz/items_view/',
    headers=headers,
    json={
        'item_name': 'Wallet',
        'description': 'Black wallet lost',
        'category': 1,
        'status': 'lost',
        'latitude': 41.2995,
        'longitude': 69.2401,
    }
)
item = response.json()

# 3. Upload image
files = {'image': open('wallet.jpg', 'rb')}
response = requests.post(
    'http://localhost:8000/api/finduz/items_images_edit_view/',
    headers=headers,
    files=files,
    data={'item': item['id']}
)

# 4. Search dictionary
response = requests.get(
    'http://localhost:8000/api/dictionary/search_term/',
    params={'query': 'immunity'}
)
terms = response.json()
```

---

## 🎯 Typical Workflow

```
1. User Registration (POST user_create_view)
   ↓
2. User Login (POST token)
   ↓
3. Create Lost Item (POST items_view)
   ↓
4. Upload Item Photos (POST items_images_edit_view)
   ↓
5. Other Users View Item (GET items_view/{id})
   ↓
6. Send Message to Item Owner (POST create_message_view)
   ↓
7. Update Item Status (PUT items_edit_view/{id})
```

---

## 🌐 CORS & Headers

Default headers for all requests:
```
Content-Type: application/json
```

For file uploads:
```
Content-Type: multipart/form-data
```

For authenticated requests:
```
Authorization: Bearer {access_token}
```

---

## 📝 Notes

- Phone numbers must be in format: `+998XXYYZZAA`
- Coordinates: latitude (41-43°N), longitude (69-71°E) for Uzbekistan
- Images: JPG, PNG, WebP supported
- Max image size: Check Django settings (typically 5MB)
- All timestamps are UTC
- Pagination available on list endpoints (check Swagger for details)

