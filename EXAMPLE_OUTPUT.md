# Example Lovable Prompt Output

⚠️ **IMPORTANT:** This is just ONE example showing what the output looks like when analyzing a hypothetical customer/order database.

**Your actual output will be completely different** and will reflect YOUR spreadsheet's structure, column names, data types, and formulas. The plugin doesn't assume any entity names or structure - it discovers everything from your actual data.

This example is provided to show the format and level of detail you can expect.

---

# App Requirements Based on Google Sheets Analysis

**Source:** Sample Customer Database
**Generated:** 2025-01-18T10:30:00.000Z

## Executive Summary

Create a web application based on the following Google Sheets structure:
- **3** data tables/entities
- **125** total records across all tables
- **6** calculated/derived fields
- **3** relationships between tables

## Data Model

### 1. Customers (Customer Management, Contact Management)

**Purpose:** Customer Management, Contact Management entity with 50 records
**Primary Key:** CustomerID

**Fields:**
- **CustomerID** (number) - *required, unique*
  - **Sample values:** 1001, 1002, 1003
- **Name** (text) - *required*
  - **Sample values:** John Smith, Jane Doe, Acme Corp
- **Email** (email) - *required, unique*
  - **Sample values:** john@example.com, jane@example.com, contact@acme.com
- **Phone** (text)
  - **Sample values:** 555-1234, 555-5678, 555-9012
- **SignupDate** (date) - *required*
  - **Sample values:** 2024-01-15, 2024-02-20, 2024-03-10
- **TotalOrders** (number) - *calculated*
  - **Calculation Logic:** Counts values
- **TotalSpent** (number) - *calculated*
  - **Calculation Logic:** Calculates sum of values
- **CustomerSegment** (text) - *calculated*
  - **Calculation Logic:** Conditional logic based on criteria
  - **Sample values:** Gold, Silver, Bronze

### 2. Orders (Order Processing, Sales Tracking)

**Purpose:** Order Processing, Sales Tracking entity with 45 records
**Primary Key:** OrderID

**Fields:**
- **OrderID** (number) - *required, unique*
  - **Sample values:** 5001, 5002, 5003
- **CustomerID** (number) - *required*
  - **Sample values:** 1001, 1002, 1001
- **OrderDate** (date) - *required*
  - **Sample values:** 2024-11-15, 2024-11-18, 2024-11-20
- **ProductID** (number) - *required*
  - **Sample values:** 2001, 2002, 2003
- **Quantity** (number) - *required*
  - **Sample values:** 2, 1, 5
- **UnitPrice** (number) - *required*
  - **Sample values:** 29.99, 149.99, 19.99
- **TotalAmount** (number) - *calculated*
  - **Calculation Logic:** Calculates sum of values
- **Status** (text) - *calculated*
  - **Calculation Logic:** Conditional logic based on criteria
  - **Sample values:** Shipped, Processing, Delivered

### 3. Products (Product/Inventory Management)

**Purpose:** Product/Inventory Management entity with 30 records
**Primary Key:** ProductID

**Fields:**
- **ProductID** (number) - *required, unique*
  - **Sample values:** 2001, 2002, 2003
- **ProductName** (text) - *required*
  - **Sample values:** Widget A, Gadget B, Tool C
- **Category** (text) - *required*
  - **Sample values:** Electronics, Tools, Accessories
- **Price** (number) - *required*
  - **Sample values:** 29.99, 149.99, 19.99
- **StockLevel** (number) - *required*
  - **Sample values:** 45, 12, 89
- **ReorderPoint** (number)
  - **Sample values:** 10, 5, 20
- **NeedsReorder** (boolean) - *calculated*
  - **Calculation Logic:** Conditional logic based on criteria

## Data Relationships

The following relationships exist between tables:

1. **Foreign Key**: Orders.CustomerID references Customers.CustomerID
2. **Foreign Key**: Orders.ProductID references Products.ProductID
3. **Lookup**: Customers.TotalOrders looks up data from Orders

## Business Logic & Calculations

Implement the following calculated fields and transformations:

### Customers
- **TotalOrders**: Counts values
- **TotalSpent**: Calculates sum of values
- **CustomerSegment**: Conditional logic based on criteria

### Orders
- **TotalAmount**: Calculates sum of values
- **Status**: Conditional logic based on criteria

### Products
- **NeedsReorder**: Conditional logic based on criteria

## Required Features

### 1. Data Management (CRUD Operations)

For each entity, implement:
- **Create**: Forms to add new records with validation
- **Read**: Tables/lists to view all records with search and filtering
- **Update**: Edit forms to modify existing records
- **Delete**: Ability to remove records with confirmation

### 2. User Interface Components

**Dashboard:**
- Overview cards showing key metrics from each table
- Quick access links to main sections
- Charts/visualizations for calculated metrics

**Data Tables:**
- Customers table with sortable columns, pagination, and search
- Orders table with sortable columns, pagination, and search
- Products table with sortable columns, pagination, and search

**Forms:**
- Input forms for each entity with appropriate field types:
  - **Customers**: CustomerID (number input), Name (text input), Email (email input), Phone (text input), SignupDate (date picker)
  - **Orders**: OrderID (number input), CustomerID (number input), OrderDate (date picker), ProductID (number input), Quantity (number input)
    and 1 more fields...
  - **Products**: ProductID (number input), ProductName (text input), Category (text input), Price (number input), StockLevel (number input)
    and 1 more fields...

### 3. Additional Features

- **Data Validation**: Enforce required fields and data type constraints
- **Search & Filter**: Allow users to search and filter records in each table
- **Export**: Ability to export data to CSV/Excel
- **Related Data**: Show related records from linked tables
- **Auto-calculations**: Automatically calculate derived fields based on formulas
- **Responsive Design**: Mobile-friendly interface

## Technical Requirements

- Modern, clean UI with intuitive navigation
- Fast, responsive performance
- Proper error handling and user feedback
- Data persistence (database or API integration)
- Form validation with helpful error messages

---

*This prompt was automatically generated by analyzing the structure, data types, formulas, and relationships in your Google Sheets workbook.*

---

## 🎯 What You Get From This Prompt

When you paste this prompt into Lovable.dev, you'll get a fully functional web application with:

### ✅ Complete Data Layer
- Database schema matching your Google Sheets structure
- Proper relationships between entities
- Data validation rules

### ✅ User Interface
- Dashboard with key metrics and charts
- Data tables for viewing/managing records
- Forms for adding/editing data
- Search and filter functionality

### ✅ Business Logic
- Calculated fields that update automatically
- Status indicators based on conditions
- Validation rules from your sheet structure

### ✅ Modern Features
- Responsive design (mobile & desktop)
- Real-time updates
- Export functionality
- User-friendly error messages

## 🚀 Next Steps

1. **Copy this prompt** to your clipboard
2. **Go to [Lovable.dev](https://lovable.dev)**
3. **Paste the prompt** into the chat
4. **Refine as needed** - Add specific design preferences, authentication requirements, or additional features
5. **Let Lovable build your app!**

## 💡 Tips for Best Results

### Enhance Your Prompt
You can append additional requirements to this generated prompt:

```
Additional requirements:
- Use a dark theme with purple accents
- Add user authentication with email/password
- Include email notifications for new orders
- Add charts showing sales trends over time
- Implement role-based access (admin vs customer view)
```

### Iterate
After Lovable generates the initial app, you can refine it:
- "Make the dashboard more visual"
- "Add a chart showing customer segments"
- "Include a search bar in the top navigation"
- "Change the color scheme to match my brand"

### Test First
Before building the full app, you might want to:
1. Start with one entity to test the concept
2. Verify the data model matches your needs
3. Expand to include all entities and features

---

**This example demonstrates the power of the Google Sheets to Lovable workflow - from spreadsheet to production app in minutes!**
