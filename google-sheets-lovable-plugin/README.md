# Google Sheets to Lovable Prompt Generator

A Google Apps Script add-on that analyzes your Google Sheets structure and automatically generates comprehensive prompts for [Lovable.dev](https://lovable.dev) to build web applications.

---

## ⚠️ 100% Dynamic - Zero Assumptions

**This plugin analyzes YOUR spreadsheet, whatever it contains:**
- ✅ Works with ANY sheet structure (budgets, inventories, game data, research, etc.)
- ✅ Uses YOUR column names, YOUR sheet names, YOUR data types
- ✅ Discovers YOUR formulas and relationships
- ✅ Makes NO assumptions about entity types or structure
- ✅ No predefined templates - adapts completely to YOUR data

**Examples in docs show "Customers" and "Orders"?** That's just ONE possible scenario. Your output will reflect YOUR actual spreadsheet structure.

---

## 🎯 Overview

This plugin is **completely dynamic** - it analyzes **YOUR** Google Sheets workbook (whatever structure you have) and generates a detailed, structured prompt that includes:

- **Data models** discovered from YOUR actual sheet structure and column types
- **Relationships** detected between YOUR different sheets/tables
- **Business logic** extracted from YOUR formulas
- **CRUD operations** specifications tailored to YOUR data
- **UI component** recommendations based on YOUR data types
- **Feature requirements** derived from YOUR specific spreadsheet

**No assumptions are made** - it works with ANY spreadsheet: budgets, inventories, research data, game stats, project trackers, or any custom structure you create.

## 📋 Features

### Comprehensive Analysis
- ✅ Analyzes **all sheets** in your workbook
- ✅ Detects data types (text, number, date, email, URL, boolean)
- ✅ Identifies primary keys and unique fields
- ✅ Extracts and interprets formulas (SUM, AVERAGE, VLOOKUP, IF, etc.)
- ✅ Discovers relationships between sheets
- ✅ Infers business context from names and structure

### Smart Prompt Generation
- 📝 Structured, ready-to-use Lovable prompt
- 📝 Data model documentation with field details
- 📝 Business logic descriptions from formulas
- 📝 CRUD operation specifications
- 📝 UI/UX recommendations
- 📝 Technical requirements

### User-Friendly Interface
- 🎨 Clean sidebar UI
- 🎨 One-click analysis and generation
- 🎨 Copy-to-clipboard functionality
- 🎨 Summary statistics display
- 🎨 Error handling and feedback

## 🚀 Installation

### Step 1: Open Your Google Sheet
1. Open the Google Sheet you want to analyze
2. Go to **Extensions** → **Apps Script**

### Step 2: Add the Code Files
1. Delete any existing code in the script editor
2. Copy the contents of `LovableCode.gs` and paste it into the editor
3. Click the **+** button next to "Files" and select **HTML**
4. Name it `LovableSidebar`
5. Copy the contents of `LovableSidebar.html` and paste it

### Step 3: Save and Authorize
1. Click **💾 Save** (or Ctrl+S / Cmd+S)
2. Refresh your Google Sheet
3. You'll see a new menu: **Lovable Generator**
4. Click **Lovable Generator** → **Generate Lovable Prompt**
5. Authorize the script when prompted (first time only)

## 📖 Usage

### Basic Usage
1. **Open your Google Sheet** with data you want to analyze
2. Click **Lovable Generator** → **Generate Lovable Prompt** in the menu
3. A sidebar will appear on the right
4. Click **"Analyze Sheets & Generate Prompt"** button
5. Wait a few seconds while it analyzes your workbook
6. Review the generated prompt in the text area
7. Click **"Copy"** to copy the prompt to your clipboard
8. Paste into Lovable.dev to generate your app!

### What Gets Analyzed

#### Sheet Structure
- Column names (headers in row 1)
- Data types in each column
- Required vs optional fields
- Unique constraints
- Primary keys

#### Formulas & Logic
- Formula columns (e.g., calculated fields)
- Business rules from IF statements
- Aggregations (SUM, AVERAGE, COUNT)
- Lookups (VLOOKUP, XLOOKUP)
- Data transformations

#### Relationships
- Foreign key references between sheets
- VLOOKUP/XLOOKUP dependencies
- Cross-sheet formula references

#### Business Context (Optional Inference)
- Attempts to infer purpose from YOUR sheet names
- Detects entity types IF naming patterns suggest them (e.g., if you name something "Customers")
- Otherwise, describes as generic "Data Management" entities
- All inference is based solely on YOUR actual data

## 💡 Example Use Cases

**The plugin adapts to ANY spreadsheet structure. Here are just a few examples:**

### 1. Customer Management System
**Your Sheet:** Tabs for Customers, Orders, Products
**Generated Prompt:** CRM with customer profiles, order tracking, and product catalog

### 2. Inventory Tracker
**Your Sheet:** Products, Stock Levels, Suppliers, and formula-based reorder calculations
**Generated Prompt:** Inventory management app with automated reorder alerts

### 3. Budget Tracker
**Your Sheet:** Monthly expenses, income, categories with SUM formulas
**Generated Prompt:** Personal finance app with expense tracking and budget visualization

### 4. Recipe Manager
**Your Sheet:** Recipes, Ingredients, Nutritional info with calculation formulas
**Generated Prompt:** Recipe app with ingredient lists and nutrition calculator

### 5. Game Stats Tracker
**Your Sheet:** Players, Matches, Scores with ranking formulas
**Generated Prompt:** Gaming leaderboard with player profiles and match history

### 6. Research Data
**Your Sheet:** Experiments, Observations, Calculations with statistical formulas
**Generated Prompt:** Research data management app with analysis tools

**The point:** Whatever YOU have in your sheets becomes the app structure. No predefined templates.

## 📊 Sample Output Structure

**Note:** This is just ONE example based on a hypothetical customer database. Your output will be completely different and based on YOUR actual spreadsheet structure.

```markdown
# App Requirements Based on Google Sheets Analysis

**Source:** [YOUR WORKBOOK NAME]
**Generated:** [TIMESTAMP]

## Executive Summary
Create a web application based on the following Google Sheets structure:
- **3** data tables/entities
- **150** total records across all tables
- **5** calculated/derived fields
- **2** relationships between tables

## Data Model

### 1. Customers (Customer Management)
**Purpose:** Customer Management entity with 50 records
**Primary Key:** CustomerID

**Fields:**
- **CustomerID** (number) - *required, unique*
- **Name** (text) - *required*
- **Email** (email) - *required, unique*
- **TotalOrders** (number) - *calculated*
  - **Calculation Logic:** Counts values
...

## Data Relationships
1. **Foreign Key**: Orders.CustomerID references Customers.CustomerID
...

## Business Logic & Calculations
### Orders
- **TotalAmount**: Calculates sum of values
- **Status**: Conditional logic based on criteria
...

## Required Features
### 1. Data Management (CRUD Operations)
...

### 2. User Interface Components
**Dashboard:**
- Overview cards showing key metrics from each table
...
```

## 🔧 Customization

### Modifying the Prompt Template
You can customize the prompt format by editing the `generateLovablePrompt()` function in `LovableCode.gs`. The function uses a string array that gets joined with newlines.

### Adding More Analysis Logic
Extend the analysis by modifying these functions:
- `detectColumnDataType()` - Add more data type patterns
- `parseFormulaLogic()` - Add more formula interpretations
- `inferBusinessContext()` - Add more context patterns
- `detectRelationships()` - Improve relationship detection

### Changing the UI
Modify `LovableSidebar.html` to change colors, layout, or add features like:
- Dark mode toggle
- Export to file
- Prompt history
- Custom template selection

## 🐛 Troubleshooting

### "Script requires authorization" error
- This is normal on first run
- Click "Continue" and grant the requested permissions
- The script only reads your sheet data (no external access)

### Empty or incomplete prompt
- Ensure your sheet has headers in row 1
- Check that sheets contain data (not just headers)
- Try with at least 2-3 rows of data for better analysis

### Formulas not detected
- Formulas must be in cells (not manually typed values)
- Ensure row 2 contains your formula prototypes
- Check that formulas use valid Google Sheets syntax

### Relationships not found
- Use consistent naming (e.g., "CustomerID" in both sheets)
- Include foreign key columns
- Use VLOOKUP/XLOOKUP formulas that reference other sheets

## 🔒 Privacy & Security

- **No external data transmission**: All analysis happens within Google Apps Script
- **No data storage**: Nothing is saved or logged
- **Read-only access**: Only reads sheet data, never modifies it
- **No third-party APIs**: Self-contained script

## 📝 Requirements

- Google Account with access to Google Sheets
- Basic understanding of Google Sheets structure
- No external dependencies or libraries

## 🤝 Contributing

Suggestions for improvement:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with your enhancements

Ideas for contributions:
- Additional formula pattern recognition
- More sophisticated relationship detection
- Custom prompt templates
- Export formats (JSON, YAML)
- Direct Lovable API integration

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Built for use with [Lovable.dev](https://lovable.dev)
- Part of the Bullsheet/Sciencesheet project ecosystem
- Inspired by the need to bridge spreadsheets and modern web apps

## 📞 Support

For issues, questions, or suggestions:
1. Check the Troubleshooting section above
2. Review the example outputs
3. Open an issue in the repository

---

**Made with ❤️ for the spreadsheet-to-app workflow**
