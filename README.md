# Guestara – Menu & Services Management Backend

This project is a backend system built using **Node.js, Express, and MongoDB** for managing menu categories, items, and pricing for a hospitality platform.

The system supports:
- Category-based menu organization
- Item management with availability and soft deletion
- Tax inheritance from category to item
- A pricing engine that calculates final prices dynamically

The focus of this assignment is **clean architecture, clear data modeling, and business logic**, rather than building a large number of features.


## Tech Stack

- **Node.js** – JavaScript runtime for building scalable backend services
- **Express.js** – Lightweight web framework for REST API development
- **MongoDB** – NoSQL database suitable for flexible and evolving data models
- **Mongoose** – ODM for schema modeling and data validation
- **Postman** – API testing and validation

## Project Architecture & Folder Structure

The project follows a layered architecture to keep the code clean, modular, and maintainable.

### Folder Structure

guestara-backend/
│
├── controllers/ # Request handling & business logic
│ ├── category.controller.js
│ └── item.controller.js
│
├── models/ # Mongoose schemas
│ ├── category.model.js
│ └── item.model.js
│
├── routes/ # API route definitions
│ ├── category.routes.js
│ └── item.routes.js
│
├── utils/ # Reusable utilities
│ └── pricing.util.js
│
├── config/ # Database configuration
│ └── db.js
│
├── app.js # Express app setup
├── server.js # Server bootstrap
├── .env # Environment variables
└── README.md


### Architectural Decisions

- **Controllers** handle request validation and business logic
- **Models** define data structure and enforce consistency
- **Routes** keep API endpoints organized and readable
- **Utils** contain shared logic like pricing calculation
- This separation improves readability, scalability, and testing

## Data Modeling Decisions

### Category Model

A Category represents a top-level grouping in the menu, such as:
- Food
- Beverages
- Services
- Rooms

Each category contains tax-related information that can be inherited by its items.

Key fields:
- `name`: Category name
- `tax_applicable`: Whether tax applies to this category
- `tax_percentage`: Tax rate for the category
- `is_active`: Used for soft delete
- `timestamps`: Track creation and updates

### Item Model

An Item represents an individual menu entry under a category (e.g., Coffee under Beverages).

Each item references a category using a MongoDB ObjectId.

Key fields:
- `category_id`: Reference to Category (`ObjectId`)
- `name`: Item name
- `base_price`: Price before tax
- `is_available`: Availability status
- `is_active`: Used for soft delete
- `timestamps`: Track creation and updates

### Relationship

- One **Category** can have many **Items**
- Each **Item** belongs to exactly one **Category**
- MongoDB references (`ref`) are used instead of embedding to keep data normalized
- Category data is populated when required (e.g., pricing calculation)


## Tax Inheritance Logic

Tax is defined at the **Category level** and inherited by its items.

### How It Works

- Each Category has:
  - `tax_applicable` (boolean)
  - `tax_percentage` (number)

- Items do **not** store tax information directly.
- When item pricing is calculated:
  - The system checks the item's category
  - If `tax_applicable` is `true`, tax is applied using `tax_percentage`
  - If `false`, no tax is added

### Why This Design

- Avoids duplicating tax logic across items
- Makes tax changes easier (update once at category level)
- Matches real-world restaurant/service pricing systems
- Keeps item schema simple and flexible

This approach ensures consistency and reduces the risk of incorrect tax calculations.

## Pricing Engine

The pricing engine is responsible for calculating the final price of an item by applying tax rules inherited from its category.

### Pricing Flow

1. The item’s `base_price` is taken as the starting value
2. The item’s category is fetched to determine tax rules
3. If the category has `tax_applicable = true`:
   - Tax is calculated using `tax_percentage`
   - `final_price = base_price + tax`
4. If tax is not applicable:
   - `final_price = base_price`

### Implementation

- Pricing logic is isolated inside `pricing.util.js`
- This keeps controllers clean and focused on request handling
- Makes pricing logic reusable and easy to test or extend

### Example

- Base Price: ₹60  
- Tax Percentage: 8%  
- Final Price: ₹64.8

### Why This Design

- Separation of concerns (business logic vs API logic)
- Easy to modify pricing rules in the future
- Avoids hardcoding tax calculations inside controllers
