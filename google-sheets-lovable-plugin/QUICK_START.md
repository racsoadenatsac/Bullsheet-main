# Quick Start Guide

Get started with the Google Sheets to Lovable Prompt Generator in 5 minutes!

## ⚡ 5-Minute Setup

### 1. Install the Add-on (2 minutes)

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Delete the default code
4. Copy and paste the code from `LovableCode.gs`
5. Click **+** next to Files → **HTML** → Name it `LovableSidebar`
6. Copy and paste the code from `LovableSidebar.html`
7. Click **Save** 💾
8. Close the Apps Script tab
9. Refresh your Google Sheet
10. A new menu **"Lovable Generator"** should appear!

### 2. Prepare Your Sheet (1 minute)

Make sure your Google Sheet follows this structure:

```
Row 1: Headers (column names)
Row 2+: Data rows
```

**Example:**
```
| CustomerID | Name       | Email              | Status    |
|------------|------------|--------------------|-----------|
| 1          | John Doe   | john@example.com   | Active    |
| 2          | Jane Smith | jane@example.com   | Inactive  |
```

### 3. Generate Your Prompt (1 minute)

1. Click **Lovable Generator** → **Generate Lovable Prompt**
2. In the sidebar, click **"Analyze Sheets & Generate Prompt"**
3. Wait 5-10 seconds ⏳
4. Click **"Copy"** to copy the prompt
5. Done! 🎉

### 4. Use in Lovable (1 minute)

1. Go to [lovable.dev](https://lovable.dev)
2. Paste your prompt
3. Let Lovable build your app!

---

## 📊 Sheet Structure Best Practices

### ✅ Good Structure

**Headers in Row 1:**
```
| ProductID | ProductName | Price | Category    | InStock |
|-----------|-------------|-------|-------------|---------|
| 101       | Widget A    | 29.99 | Electronics | TRUE    |
| 102       | Gadget B    | 49.99 | Tools       | FALSE   |
```

**Multiple Related Sheets:**
- **Customers** sheet with CustomerID
- **Orders** sheet with CustomerID (foreign key)
- **Products** sheet with ProductID

**Clear Naming:**
- Use descriptive column names: `CustomerEmail` not `col1`
- Use sheet names that describe entities: `Customers` not `Sheet1`

### ❌ Avoid These Issues

**No Headers:**
```
| 1 | John | john@example.com |  ← Missing headers!
| 2 | Jane | jane@example.com |
```

**Merged Cells:**
```
|    Customer Info     |  ← Don't merge cells
| ID | Name  | Email   |
```

**Multiple Header Rows:**
```
| Customer Information |  ← Only use row 1 for headers
| ID | Name  | Email   |
| 1  | John  | ...     |
```

**Empty Rows:**
```
| ID | Name  |
| 1  | John  |
|    |       |  ← Avoid empty rows
| 3  | Jane  |
```

---

## 🎯 Tips for Better Prompts

### 1. Use Meaningful Names

**Good:**
- Column: `CustomerEmail`, Sheet: `Customers`
- Column: `OrderTotal`, Sheet: `Orders`

**Bad:**
- Column: `col1`, Sheet: `Sheet1`
- Column: `data`, Sheet: `temp`

### 2. Include ID Columns

Every entity should have an ID column:
- `CustomerID`, `OrderID`, `ProductID`
- Makes relationships clear
- Helps the analyzer detect primary keys

### 3. Use Consistent Data Types

Each column should contain the same type of data:
- ✅ Date column: `2024-01-15`, `2024-02-20`
- ❌ Mixed: `2024-01-15`, `Next Tuesday`, `45`

### 4. Add Formulas for Business Logic

The analyzer understands formulas:
```
| OrderTotal | Tax       | GrandTotal           |
|------------|-----------|----------------------|
| 100.00     | =B2*0.08  | =B2+C2              |
```

Becomes: "GrandTotal calculates sum of OrderTotal and Tax"

### 5. Link Sheets with References

Use VLOOKUP or similar to show relationships:
```
In Orders sheet:
| CustomerID | CustomerName                           |
|------------|----------------------------------------|
| 1001       | =VLOOKUP(A2,Customers!A:B,2,FALSE)    |
```

The analyzer will detect: "Orders references Customers"

---

## 🔍 What Gets Analyzed?

### ✅ Detected Automatically

- **Column Names** from row 1
- **Data Types** (text, number, date, email, URL, boolean)
- **Required Fields** (no empty values)
- **Unique Constraints** (all values different)
- **Formulas** and their business logic
- **Relationships** between sheets
- **Primary Keys** (ID columns)
- **Business Context** from names

### 📝 Included in Prompt

- Complete data model for each sheet
- Field definitions with types and constraints
- Calculated field logic
- Relationships between tables
- CRUD operation specs
- UI component recommendations
- Sample values for context

---

## 💡 Common Use Cases

### 1. Simple Data Tracker

**Your Sheet:**
- Single sheet with data
- No formulas

**You Get:**
- Simple CRUD app
- Table view with search
- Add/edit/delete forms

### 2. Multi-Table Application

**Your Sheets:**
- Customers, Orders, Products
- ID columns for relationships
- Some calculated fields

**You Get:**
- Complete app with related data
- Dashboard with metrics
- Linked data views

### 3. Business Logic App

**Your Sheets:**
- Data with many formulas
- Conditional calculations
- Status indicators

**You Get:**
- App with auto-calculations
- Business rules enforcement
- Dynamic status updates

---

## 🐛 Quick Troubleshooting

### "Script requires authorization"
→ Normal first time, click "Continue" and approve

### "No data found"
→ Make sure you have headers in row 1 and data in row 2+

### "Empty prompt generated"
→ Check that sheets aren't completely empty

### Formulas not detected
→ Ensure formulas start with `=` and are in actual cells

### Relationships not found
→ Use consistent ID column names across sheets

---

## 📚 Next Steps

1. ✅ **Generated your first prompt?**
   → Try it in Lovable and see what you get!

2. ✅ **App generated successfully?**
   → Refine by adding more requirements to the prompt

3. ✅ **Want more features?**
   → Check out the full README.md for customization options

4. ✅ **Have multiple projects?**
   → Install the add-on in each Google Sheet you want to convert

---

## 🎉 You're Ready!

You now know enough to:
- ✅ Install the add-on
- ✅ Structure your sheets properly
- ✅ Generate prompts
- ✅ Create apps with Lovable

**Happy building! 🚀**

---

## 🤔 Need Help?

**Problem with the analyzer?**
- Review the "Sheet Structure Best Practices" section
- Check the EXAMPLE_OUTPUT.md to see what to expect
- Ensure your sheet has proper headers and data

**Problem with the generated app?**
- The prompt is just a starting point
- You can refine it by adding more details
- Ask Lovable to modify specific aspects

**Want to customize the analyzer?**
- Check out README.md for customization guide
- Modify the code to fit your specific needs
- Contribute improvements back to the project

---

**Questions? Open an issue in the repository!**
