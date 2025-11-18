/**
 * Lovable Prompt Generator for Google Sheets
 * Analyzes Google Sheets structure and generates comprehensive prompts for Lovable.dev
 */

/* What should the add-on do after it is installed */
function onInstall() {
  onOpen();
}

/* Add menu when spreadsheet opens */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Lovable Generator')
    .addItem('Generate Lovable Prompt', 'showLovableSidebar')
    .addToUi();
}

/* Show the sidebar UI */
function showLovableSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('LovableSidebar')
    .setTitle('Lovable Prompt Generator')
    .setWidth(400);
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Test function - run this from Apps Script editor to debug
 * Go to Apps Script, select this function from dropdown, and click Run
 * Then check View > Logs to see the output
 */
function testAnalyzer() {
  var result = analyzeWorkbook();
  Logger.log('Result: ' + JSON.stringify(result, null, 2));

  if (result && result.success) {
    Logger.log('SUCCESS! Found ' + result.analysis.sheets.length + ' sheets');
    Logger.log('Prompt length: ' + result.prompt.length + ' characters');
  } else if (result) {
    Logger.log('ERROR: ' + result.error);
  } else {
    Logger.log('ERROR: No result returned');
  }

  return result;
}

/**
 * Main function to analyze entire workbook and generate Lovable prompt
 * @return {Object} Analysis result with prompt
 */
function analyzeWorkbook() {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    if (!spreadsheet) {
      return {
        success: false,
        error: 'No active spreadsheet found. Please open a Google Sheet first.'
      };
    }

    var sheets = spreadsheet.getSheets();

    if (!sheets || sheets.length === 0) {
      return {
        success: false,
        error: 'No sheets found in this workbook.'
      };
    }

    var analysis = {
      workbookName: spreadsheet.getName(),
      sheets: [],
      relationships: [],
      summary: {}
    };

    // Analyze each sheet
    var errors = [];
    for (var i = 0; i < sheets.length; i++) {
      var sheet = sheets[i];
      try {
        var sheetAnalysis = analyzeSheet(sheet);
        if (sheetAnalysis) {
          analysis.sheets.push(sheetAnalysis);
        }
      } catch (sheetError) {
        errors.push('Error analyzing sheet "' + sheet.getName() + '": ' + sheetError.toString());
      }
    }

    // Check if we have any data to work with
    if (analysis.sheets.length === 0) {
      var errorMsg = 'No data found to analyze. Please ensure your sheets have:\n';
      errorMsg += '- Headers in row 1\n';
      errorMsg += '- At least one row of data below the headers\n\n';
      if (errors.length > 0) {
        errorMsg += 'Errors encountered:\n' + errors.join('\n');
      }
      return {
        success: false,
        error: errorMsg
      };
    }

    // Detect relationships between sheets
    analysis.relationships = detectRelationships(analysis.sheets);

    // Generate summary statistics
    analysis.summary = generateSummary(analysis.sheets);

    // Generate the Lovable prompt
    var prompt = generateLovablePrompt(analysis);

    return {
      success: true,
      prompt: prompt,
      analysis: analysis
    };

  } catch (error) {
    return {
      success: false,
      error: 'Analysis failed: ' + error.toString() + '\n\nPlease check that your sheet has data and try again.'
    };
  }
}

/**
 * Analyze a single sheet
 * @param {Sheet} sheet - Google Sheets sheet object
 * @return {Object} Sheet analysis
 */
function analyzeSheet(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  // Skip empty sheets
  if (lastRow === 0 || lastCol === 0) {
    return null;
  }

  // Skip sheets with only headers (need at least 1 data row)
  if (lastRow < 2) {
    return null;
  }

  var sheetName = sheet.getName();
  var range = sheet.getRange(1, 1, lastRow, lastCol);
  var values = range.getValues();
  var formulas = range.getFormulas();

  // Extract headers (row 1)
  var headers = values[0];

  // Check if headers are valid (at least one non-empty header)
  var hasValidHeaders = headers.some(function(h) {
    return h !== null && h !== '';
  });

  if (!hasValidHeaders) {
    return null;
  }

  // Analyze columns
  var columns = [];
  for (var col = 0; col < lastCol; col++) {
    var columnData = {
      name: headers[col] || 'Column' + (col + 1),
      index: col,
      dataType: detectColumnDataType(values, col),
      hasFormulas: hasFormulasInColumn(formulas, col),
      sampleValues: getSampleValues(values, col, 5),
      isRequired: isColumnRequired(values, col),
      isUnique: isColumnUnique(values, col)
    };

    // Extract formulas if present
    if (columnData.hasFormulas) {
      columnData.formulas = extractColumnFormulas(formulas, col);
      columnData.formulaLogic = parseFormulaLogic(columnData.formulas);
    }

    columns.push(columnData);
  }

  return {
    name: sheetName,
    rowCount: lastRow - 1, // Exclude header
    columnCount: lastCol,
    headers: headers,
    columns: columns,
    hasPrimaryKey: detectPrimaryKey(columns),
    businessContext: inferBusinessContext(sheetName, columns)
  };
}

/**
 * Detect data type of a column
 * @param {Array} values - 2D array of cell values
 * @param {number} col - Column index
 * @return {string} Data type
 */
function detectColumnDataType(values, col) {
  var types = {
    number: 0,
    date: 0,
    boolean: 0,
    email: 0,
    url: 0,
    text: 0
  };

  // Sample rows 2-10 (skip header)
  var sampleSize = Math.min(values.length, 10);
  for (var row = 1; row < sampleSize; row++) {
    var value = values[row][col];

    if (value === null || value === '') continue;

    if (typeof value === 'number') {
      types.number++;
    } else if (value instanceof Date) {
      types.date++;
    } else if (typeof value === 'boolean') {
      types.boolean++;
    } else if (typeof value === 'string') {
      if (value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        types.email++;
      } else if (value.match(/^https?:\/\//)) {
        types.url++;
      } else {
        types.text++;
      }
    }
  }

  // Return dominant type
  var maxType = 'text';
  var maxCount = 0;
  for (var type in types) {
    if (types[type] > maxCount) {
      maxCount = types[type];
      maxType = type;
    }
  }

  return maxType;
}

/**
 * Check if column has formulas
 * @param {Array} formulas - 2D array of formulas
 * @param {number} col - Column index
 * @return {boolean}
 */
function hasFormulasInColumn(formulas, col) {
  for (var row = 1; row < formulas.length; row++) {
    if (formulas[row][col] && formulas[row][col] !== '') {
      return true;
    }
  }
  return false;
}

/**
 * Extract formulas from a column
 * @param {Array} formulas - 2D array of formulas
 * @param {number} col - Column index
 * @return {Array} Array of unique formulas
 */
function extractColumnFormulas(formulas, col) {
  var uniqueFormulas = {};
  for (var row = 1; row < formulas.length; row++) {
    var formula = formulas[row][col];
    if (formula && formula !== '') {
      uniqueFormulas[formula] = true;
    }
  }
  return Object.keys(uniqueFormulas);
}

/**
 * Parse formula logic to human-readable description
 * @param {Array} formulas - Array of formulas
 * @return {string} Description
 */
function parseFormulaLogic(formulas) {
  if (!formulas || formulas.length === 0) return '';

  var descriptions = [];
  for (var i = 0; i < formulas.length; i++) {
    var formula = formulas[i];
    var desc = '';

    if (formula.indexOf('SUM') >= 0) {
      desc = 'Calculates sum of values';
    } else if (formula.indexOf('AVERAGE') >= 0 || formula.indexOf('AVG') >= 0) {
      desc = 'Calculates average of values';
    } else if (formula.indexOf('IF') >= 0) {
      desc = 'Conditional logic based on criteria';
    } else if (formula.indexOf('VLOOKUP') >= 0 || formula.indexOf('XLOOKUP') >= 0) {
      desc = 'Lookup value from another range/sheet';
    } else if (formula.indexOf('CONCATENATE') >= 0 || formula.indexOf('&') >= 0) {
      desc = 'Combines text values';
    } else if (formula.indexOf('COUNT') >= 0) {
      desc = 'Counts values';
    } else if (formula.indexOf('MAX') >= 0 || formula.indexOf('MIN') >= 0) {
      desc = 'Finds maximum or minimum value';
    } else {
      desc = 'Custom calculation: ' + formula.substring(0, 50);
    }

    descriptions.push(desc);
  }

  return descriptions.join('; ');
}

/**
 * Get sample values from a column
 * @param {Array} values - 2D array of values
 * @param {number} col - Column index
 * @param {number} count - Number of samples
 * @return {Array} Sample values
 */
function getSampleValues(values, col, count) {
  var samples = [];
  for (var row = 1; row < Math.min(values.length, count + 1); row++) {
    var value = values[row][col];
    if (value !== null && value !== '') {
      samples.push(value);
    }
  }
  return samples;
}

/**
 * Check if column is required (no empty values)
 * @param {Array} values - 2D array of values
 * @param {number} col - Column index
 * @return {boolean}
 */
function isColumnRequired(values, col) {
  for (var row = 1; row < values.length; row++) {
    if (values[row][col] === null || values[row][col] === '') {
      return false;
    }
  }
  return true;
}

/**
 * Check if column has unique values
 * @param {Array} values - 2D array of values
 * @param {number} col - Column index
 * @return {boolean}
 */
function isColumnUnique(values, col) {
  var seen = {};
  for (var row = 1; row < values.length; row++) {
    var value = values[row][col];
    if (value === null || value === '') continue;

    if (seen[value]) {
      return false;
    }
    seen[value] = true;
  }
  return true;
}

/**
 * Detect primary key column
 * @param {Array} columns - Array of column objects
 * @return {string} Primary key column name or null
 */
function detectPrimaryKey(columns) {
  for (var i = 0; i < columns.length; i++) {
    var col = columns[i];
    var name = col.name.toLowerCase();

    // Check for ID-like names and uniqueness
    if ((name.indexOf('id') >= 0 || name === 'key') && col.isUnique) {
      return col.name;
    }
  }
  return null;
}

/**
 * Infer business context from sheet name and columns
 * @param {string} sheetName - Sheet name
 * @param {Array} columns - Array of column objects
 * @return {string} Business context description
 */
function inferBusinessContext(sheetName, columns) {
  var contexts = [];
  var name = sheetName.toLowerCase();
  var columnNames = columns.map(function(c) { return c.name.toLowerCase(); }).join(' ');

  if (name.indexOf('customer') >= 0 || columnNames.indexOf('customer') >= 0) {
    contexts.push('Customer Management');
  }
  if (name.indexOf('order') >= 0 || columnNames.indexOf('order') >= 0) {
    contexts.push('Order Processing');
  }
  if (name.indexOf('product') >= 0 || name.indexOf('inventory') >= 0) {
    contexts.push('Product/Inventory Management');
  }
  if (name.indexOf('sales') >= 0 || name.indexOf('revenue') >= 0) {
    contexts.push('Sales Tracking');
  }
  if (name.indexOf('employee') >= 0 || name.indexOf('staff') >= 0) {
    contexts.push('HR/Employee Management');
  }
  if (columnNames.indexOf('email') >= 0) {
    contexts.push('Contact Management');
  }

  return contexts.length > 0 ? contexts.join(', ') : 'Data Management';
}

/**
 * Detect relationships between sheets
 * @param {Array} sheets - Array of sheet analysis objects
 * @return {Array} Array of relationships
 */
function detectRelationships(sheets) {
  var relationships = [];

  for (var i = 0; i < sheets.length; i++) {
    for (var j = 0; j < sheets.length; j++) {
      if (i === j) continue;

      var sheet1 = sheets[i];
      var sheet2 = sheets[j];

      // Check for foreign key relationships
      for (var c1 = 0; c1 < sheet1.columns.length; c1++) {
        var col1 = sheet1.columns[c1];

        for (var c2 = 0; c2 < sheet2.columns.length; c2++) {
          var col2 = sheet2.columns[c2];

          // Check if column names suggest relationship
          var name1 = col1.name.toLowerCase();
          var name2 = col2.name.toLowerCase();
          var sheet2Name = sheet2.name.toLowerCase();

          if (name1.indexOf(sheet2Name) >= 0 && name1.indexOf('id') >= 0) {
            relationships.push({
              fromSheet: sheet1.name,
              fromColumn: col1.name,
              toSheet: sheet2.name,
              toColumn: col2.name,
              type: 'Foreign Key',
              description: sheet1.name + '.' + col1.name + ' references ' + sheet2.name + '.' + col2.name
            });
          }

          // Check for VLOOKUP formulas
          if (col1.hasFormulas && col1.formulas) {
            for (var f = 0; f < col1.formulas.length; f++) {
              var formula = col1.formulas[f];
              if (formula.indexOf('VLOOKUP') >= 0 && formula.indexOf(sheet2.name) >= 0) {
                relationships.push({
                  fromSheet: sheet1.name,
                  fromColumn: col1.name,
                  toSheet: sheet2.name,
                  toColumn: 'VLOOKUP reference',
                  type: 'Lookup',
                  description: sheet1.name + '.' + col1.name + ' looks up data from ' + sheet2.name
                });
              }
            }
          }
        }
      }
    }
  }

  return relationships;
}

/**
 * Generate summary statistics
 * @param {Array} sheets - Array of sheet analysis objects
 * @return {Object} Summary statistics
 */
function generateSummary(sheets) {
  var totalRows = 0;
  var totalColumns = 0;
  var totalFormulas = 0;

  for (var i = 0; i < sheets.length; i++) {
    totalRows += sheets[i].rowCount;
    totalColumns += sheets[i].columnCount;

    for (var j = 0; j < sheets[i].columns.length; j++) {
      if (sheets[i].columns[j].hasFormulas) {
        totalFormulas++;
      }
    }
  }

  return {
    totalSheets: sheets.length,
    totalRows: totalRows,
    totalColumns: totalColumns,
    totalFormulaColumns: totalFormulas
  };
}

/**
 * Generate comprehensive Lovable prompt
 * @param {Object} analysis - Workbook analysis object
 * @return {string} Lovable prompt
 */
function generateLovablePrompt(analysis) {
  var prompt = [];

  // Header
  prompt.push('# App Requirements Based on Google Sheets Analysis');
  prompt.push('');
  prompt.push('**Source:** ' + analysis.workbookName);
  prompt.push('**Generated:** ' + new Date().toISOString());
  prompt.push('');

  // Executive Summary
  prompt.push('## Executive Summary');
  prompt.push('');
  prompt.push('Create a web application based on the following Google Sheets structure:');
  prompt.push('- **' + analysis.summary.totalSheets + '** data tables/entities');
  prompt.push('- **' + analysis.summary.totalRows + '** total records across all tables');
  prompt.push('- **' + analysis.summary.totalFormulaColumns + '** calculated/derived fields');
  prompt.push('- **' + analysis.relationships.length + '** relationships between tables');
  prompt.push('');

  // Data Model
  prompt.push('## Data Model');
  prompt.push('');

  for (var i = 0; i < analysis.sheets.length; i++) {
    var sheet = analysis.sheets[i];
    prompt.push('### ' + (i + 1) + '. ' + sheet.name + ' (' + sheet.businessContext + ')');
    prompt.push('');
    prompt.push('**Purpose:** ' + sheet.businessContext + ' entity with ' + sheet.rowCount + ' records');

    if (sheet.hasPrimaryKey) {
      prompt.push('**Primary Key:** ' + sheet.hasPrimaryKey);
    }
    prompt.push('');
    prompt.push('**Fields:**');

    for (var j = 0; j < sheet.columns.length; j++) {
      var col = sheet.columns[j];
      var fieldDesc = '- **' + col.name + '** (' + col.dataType + ')';

      var attributes = [];
      if (col.isRequired) attributes.push('required');
      if (col.isUnique) attributes.push('unique');
      if (col.hasFormulas) attributes.push('calculated');

      if (attributes.length > 0) {
        fieldDesc += ' - *' + attributes.join(', ') + '*';
      }

      prompt.push(fieldDesc);

      // Add formula logic if present
      if (col.hasFormulas && col.formulaLogic) {
        prompt.push('  - **Calculation Logic:** ' + col.formulaLogic);
      }

      // Add sample values for context
      if (col.sampleValues && col.sampleValues.length > 0) {
        prompt.push('  - **Sample values:** ' + col.sampleValues.slice(0, 3).join(', '));
      }
    }
    prompt.push('');
  }

  // Relationships
  if (analysis.relationships.length > 0) {
    prompt.push('## Data Relationships');
    prompt.push('');
    prompt.push('The following relationships exist between tables:');
    prompt.push('');

    for (var r = 0; r < analysis.relationships.length; r++) {
      var rel = analysis.relationships[r];
      prompt.push((r + 1) + '. **' + rel.type + '**: ' + rel.description);
    }
    prompt.push('');
  }

  // Business Logic
  prompt.push('## Business Logic & Calculations');
  prompt.push('');
  prompt.push('Implement the following calculated fields and transformations:');
  prompt.push('');

  var hasLogic = false;
  for (var s = 0; s < analysis.sheets.length; s++) {
    var sheet = analysis.sheets[s];
    var sheetHasLogic = false;

    for (var c = 0; c < sheet.columns.length; c++) {
      var col = sheet.columns[c];
      if (col.hasFormulas && col.formulaLogic) {
        if (!sheetHasLogic) {
          prompt.push('### ' + sheet.name);
          sheetHasLogic = true;
          hasLogic = true;
        }
        prompt.push('- **' + col.name + '**: ' + col.formulaLogic);
      }
    }

    if (sheetHasLogic) {
      prompt.push('');
    }
  }

  if (!hasLogic) {
    prompt.push('*No calculated fields detected in the sheets.*');
    prompt.push('');
  }

  // CRUD Operations
  prompt.push('## Required Features');
  prompt.push('');
  prompt.push('### 1. Data Management (CRUD Operations)');
  prompt.push('');
  prompt.push('For each entity, implement:');
  prompt.push('- **Create**: Forms to add new records with validation');
  prompt.push('- **Read**: Tables/lists to view all records with search and filtering');
  prompt.push('- **Update**: Edit forms to modify existing records');
  prompt.push('- **Delete**: Ability to remove records with confirmation');
  prompt.push('');

  // UI Components
  prompt.push('### 2. User Interface Components');
  prompt.push('');
  prompt.push('**Dashboard:**');
  prompt.push('- Overview cards showing key metrics from each table');
  prompt.push('- Quick access links to main sections');

  if (analysis.summary.totalFormulaColumns > 0) {
    prompt.push('- Charts/visualizations for calculated metrics');
  }
  prompt.push('');

  prompt.push('**Data Tables:**');
  for (var t = 0; t < analysis.sheets.length; t++) {
    prompt.push('- ' + analysis.sheets[t].name + ' table with sortable columns, pagination, and search');
  }
  prompt.push('');

  prompt.push('**Forms:**');
  prompt.push('- Input forms for each entity with appropriate field types:');
  for (var f = 0; f < analysis.sheets.length; f++) {
    var sheet = analysis.sheets[f];
    var formFields = [];
    for (var cf = 0; cf < sheet.columns.length; cf++) {
      var col = sheet.columns[cf];
      if (!col.hasFormulas) { // Only non-calculated fields in forms
        var fieldType = col.dataType;
        if (fieldType === 'date') fieldType = 'date picker';
        if (fieldType === 'email') fieldType = 'email input';
        if (fieldType === 'boolean') fieldType = 'checkbox';
        formFields.push(col.name + ' (' + fieldType + ')');
      }
    }
    prompt.push('  - **' + sheet.name + '**: ' + formFields.slice(0, 5).join(', '));
    if (formFields.length > 5) {
      prompt.push('    and ' + (formFields.length - 5) + ' more fields...');
    }
  }
  prompt.push('');

  // Additional Features
  prompt.push('### 3. Additional Features');
  prompt.push('');
  prompt.push('- **Data Validation**: Enforce required fields and data type constraints');
  prompt.push('- **Search & Filter**: Allow users to search and filter records in each table');
  prompt.push('- **Export**: Ability to export data to CSV/Excel');

  if (analysis.relationships.length > 0) {
    prompt.push('- **Related Data**: Show related records from linked tables');
  }

  if (analysis.summary.totalFormulaColumns > 0) {
    prompt.push('- **Auto-calculations**: Automatically calculate derived fields based on formulas');
  }

  prompt.push('- **Responsive Design**: Mobile-friendly interface');
  prompt.push('');

  // Technical Requirements
  prompt.push('## Technical Requirements');
  prompt.push('');
  prompt.push('- Modern, clean UI with intuitive navigation');
  prompt.push('- Fast, responsive performance');
  prompt.push('- Proper error handling and user feedback');
  prompt.push('- Data persistence (database or API integration)');
  prompt.push('- Form validation with helpful error messages');
  prompt.push('');

  // Footer
  prompt.push('---');
  prompt.push('');
  prompt.push('*This prompt was automatically generated by analyzing the structure, data types, formulas, and relationships in your Google Sheets workbook.*');

  return prompt.join('\n');
}
