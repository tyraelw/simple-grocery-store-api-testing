# 🛒 Simple Grocery Store API Testing Suite
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=postman&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ![Newman](https://img.shields.io/badge/Newman-5C5C5C?style=flat&logo=postman&logoColor=white) ![API Testing](https://img.shields.io/badge/API-Testing-blue)

A comprehensive end-to-end API testing suite for a grocery store e-commerce platform. This collection demonstrates complete shopping flow automation including product browsing, cart management, order creation, and authentication workflows.

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Test Coverage](#-test-coverage)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Running Tests](#-running-tests)
- [Testing Data](#-testing-data)
- [Security Notes](#-security-notes)
- [Troubleshooting](#-troubleshooting)
- [Author](#-author)

## 🎯 Overview

This project provides a complete testing framework for the Simple Grocery Store API, covering the entire e-commerce customer journey from product discovery to order completion. The collection includes 45 automated tests with dynamic data generation and environment variable management.

## ✨ Features

- ✅ **Complete E-commerce Flow** - Tests cover the full shopping experience
- ✅ **Dynamic Authentication** - Automatic client registration with unique email generation
- ✅ **Cart Management** - Create, modify, and manage shopping cart operations
- ✅ **Order Lifecycle** - Complete order creation, retrieval, update, and deletion
- ✅ **Product Catalog** - Comprehensive product browsing with filters
- ✅ **Automated Cleanup** - Validates proper deletion with 404 verification
- ✅ **Environment Management** - Dynamic variable storage for seamless test execution
- ✅ **Extensive Validation** - 45 test assertions covering all scenarios

## 🔧 Prerequisites

- **Postman** - Desktop application or web version
- **Node.js** - For running Newman CLI (optional)
- **Newman** - Postman's command-line runner (optional)
```bash
# Install Newman globally (optional)
npm install -g newman
```

## 📥 Installation

### Option 1: Import to Postman Desktop/Web

1. Download `simple-grocery-store-api-collection.json`
2. Open Postman
3. Click **Import** button
4. Select the downloaded file
5. Collection will appear in your workspace

### Option 2: Clone Repository
```bash
# Clone the repository
git clone https://github.com/tyraelw/simple-grocery-store-api-testing.git

# Navigate to the directory
cd simple-grocery-store-api-testing
```

## 🚀 Usage

### Running in Postman

1. Import the collection as described above
2. Select the collection in Postman
3. Click **Run collection**
4. Configure run settings (iterations, delay, etc.)
5. Click **Run Simple Grocery Store API**
6. View detailed test results in the runner

### Running with Newman (Optional)
```bash
# Run the entire collection
newman run simple-grocery-store-api-collection.json

# Run with detailed output
newman run simple-grocery-store-api-collection.json --reporters cli,json

# Run with HTML report
newman run simple-grocery-store-api-collection.json --reporters cli,html --reporter-html-export report.html

# Run with environment file
newman run simple-grocery-store-api-collection.json \
  --environment simple-grocery-store-environment.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export report.html
```

## 📊 Test Coverage

| Category | Endpoints | Tests | Coverage |
|----------|-----------|-------|----------|
| API Status | 1 | 2 | ✅ 100% |
| Products | 5 | 17 | ✅ 100% |
| Cart Management | 6 | 12 | ✅ 100% |
| Authentication | 1 | 3 | ✅ 100% |
| Orders | 5 | 11 | ✅ 100% |
| **Total** | **18** | **45** | **✅ 100%** |

### Test Scenarios Covered

#### 🔍 Product Tests
- API health check validation
- Retrieve all products with pagination
- Filter by category (coffee, fresh-produce, meat-seafood)
- Filter by availability (in stock)
- Limit results (pagination)
- Get single product details
- Validate product schema and data types

#### 🛒 Cart Management Tests
- Create new shopping cart
- Add items to cart
- Modify item quantities
- Replace items in cart
- Delete items from cart
- Retrieve cart contents
- Get all cart items

#### 🔐 Authentication Tests
- Register API client with dynamic email
- Generate and store access token
- Validate Bearer token authentication
- Email uniqueness with timestamp generation

#### 📦 Order Tests
- Create order from cart
- Retrieve all orders
- Get single order details
- Update order information
- Delete order
- Verify 404 on deleted order

## 🌍 Environment Variables

The collection uses environment variables for dynamic data management:

| Variable | Description | Example |
|----------|-------------|---------|
| baseUrl | API base URL | https://simple-grocery-store-api.glitch.me |
| cartId | Shopping cart identifier | Auto-generated |
| accessToken | Authentication token | Auto-generated |
| orderId | Order identifier | Auto-generated |
| clientEmail | Unique client email | test1234567890@example.com |

### Dynamic Variable Generation

The collection automatically generates:

- **Unique Emails:** Using timestamp (`test${Date.now()}@example.com`)
- **Customer Names:** Using Postman's `$randomFullName` variable
- **Cart IDs:** Saved from API response
- **Access Tokens:** Generated during client registration
- **Order IDs:** Stored from order creation

## 📡 API Endpoints

### Base URL
```
https://simple-grocery-store-api.glitch.me
```

### Endpoints Overview

#### Status
- `GET /status` - Check API health

#### Products
- `GET /products` - Get all products
- `GET /products?category={category}` - Filter by category
- `GET /products?results={limit}` - Limit results
- `GET /products?available=true` - Filter available products
- `GET /products/{productId}` - Get product details

#### Carts
- `POST /carts` - Create new cart
- `GET /carts/{cartId}` - Get cart
- `GET /carts/{cartId}/items` - Get cart items
- `POST /carts/{cartId}/items` - Add item to cart
- `PATCH /carts/{cartId}/items/{itemId}` - Modify item
- `PUT /carts/{cartId}/items/{itemId}` - Replace item
- `DELETE /carts/{cartId}/items/{itemId}` - Delete item

#### Authentication
- `POST /api-clients` - Register client

#### Orders (Requires Authentication)
- `POST /orders` - Create order
- `GET /orders` - Get all orders
- `GET /orders/{orderId}` - Get single order
- `PATCH /orders/{orderId}` - Update order
- `DELETE /orders/{orderId}` - Delete order

## 🧪 Running Tests

### Sequential Execution (Recommended)

The collection is designed to run sequentially as tests depend on previous responses:

1. API Status check
2. Product browsing and filtering
3. Cart creation and management
4. Client registration
5. Order creation and lifecycle
6. Cleanup verification

### Individual Request Testing

You can also test individual endpoints, but ensure:

- Cart ID exists for cart operations
- Access token is generated for order operations
- Order ID exists for order-specific operations

## 📝 Testing Data

This collection uses generic test data for demonstration purposes:

- **Client Name:** "API Test Client"
- **Customer Names:** Randomly generated using Postman variables
- **Emails:** Dynamically generated with timestamps for uniqueness
- **Product IDs:** Standard test products from the API

All test data is generated dynamically and cleaned up after execution.

## 🔒 Security Notes

- ✅ No hardcoded credentials in the collection
- ✅ Access tokens are generated dynamically
- ✅ Email addresses use timestamp for uniqueness
- ✅ Bearer token authentication properly implemented
- ✅ All sensitive data stored in environment variables

## 🐛 Troubleshooting

### Common Issues

**Issue:** Tests fail due to missing cart ID  
**Solution:** Ensure "Create a new cart" request runs first

**Issue:** Authentication errors on order endpoints  
**Solution:** Run "Register API Client" to generate fresh access token

**Issue:** 404 errors on specific products  
**Solution:** Check product availability with "Get all products" first

**Issue:** Rate limiting errors  
**Solution:** Add delay between requests in collection runner

## 📚 Additional Resources

- [Simple Grocery Store API Documentation](https://github.com/vdespa/Postman-Complete-Guide-API-Testing/blob/main/simple-grocery-store-api.md)
- [Postman Learning Center](https://learning.postman.com/)
- [Newman Documentation](https://learning.postman.com/docs/running-collections/using-newman-cli/command-line-integration-with-newman/)

### My Other Testing Projects

- [Cypress E-Commerce Testing](link) - End-to-end UI automation with Page Object Model
- [Trello API Testing Suite](link) - CRUD operations and board management testing

## 👤 Author

**Isrrael Andres Toro Alvarez**

- GitHub: [@tyraelw](https://github.com/tyraelw)
- LinkedIn: [Isrrael Toro Alvarez](https://linkedin.com/in/your-profile)
- Email: tyrael78w@gmail.com

## 📧 Contact

For questions, feedback, or collaboration opportunities, please reach out via tyrael78w@gmail.com

---

⭐ **If you find this project useful, please consider giving it a star on GitHub!**
