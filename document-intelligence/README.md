# Document Intelligence - AI-Powered Document Analysis

A web-based application that uses artificial intelligence to analyze shipping documents, particularly Bills of Lading (BoL), and extract structured data automatically.

## Features

### 🤖 AI-Powered Analysis
- **Multiple AI Models**: Supports Google Gemini (1.5 Pro, 1.5 Flash, 2.5 Pro, 2.5 Flash), OpenAI GPT-4o, and Claude 4
- **Intelligent Extraction**: Automatically extracts key shipping information including order numbers, dates, carriers, addresses, and itemized contents
- **Coordinate Mapping**: Provides precise location coordinates for extracted data with visual overlays
- **Confidence Scoring**: Each extracted field includes confidence levels to help identify data quality

### 📄 Multiple Document Sources
- **Vector API Integration**: Load documents directly from Vector's document management system
- **PDF Upload**: Drag and drop PDF files for analysis
- **Camera Capture**: Take photos of physical documents using your device's camera
- **Multi-page Support**: Analyzes all pages of a document and consolidates information

### 🎯 Smart Data Extraction
Extracts comprehensive shipping information including:
- **Order Details**: Order numbers, BoL numbers, shipment numbers, delivery numbers
- **Logistics Info**: Carrier, SCAC codes, seal numbers, temperature requirements
- **Addresses**: Complete origin and destination addresses
- **Contents**: Itemized list with descriptions, quantities, weights, and expiration dates
- **Signatures**: Detects if documents are signed

### 💾 Export & Management
- **CSV Export**: Download extracted data in spreadsheet format
- **Print Support**: Clean, print-friendly layouts
- **Editable Results**: Click any field to edit extracted information
- **Raw Data Access**: View original AI response JSON

### ⚙️ Customizable Settings
- **API Configuration**: Manage API keys and endpoints
- **Confidence Thresholds**: Adjust quality indicators (high/medium/low confidence)
- **Visual Preferences**: Toggle coordinate overlays, confidence indicators, dark mode
- **Vector API Settings**: Configure document retrieval parameters

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for AI API calls
- API key for your chosen AI model:
  - **Google Gemini**: Free tier available at [Google AI Studio](https://aistudio.google.com/)
  - **OpenAI GPT**: Paid service at [OpenAI Platform](https://platform.openai.com/api-keys)
  - **Claude**: Paid service at [Anthropic Console](https://console.anthropic.com/account/keys)

### Running Locally

#### Option 1: Simple File Opening (Recommended)
1. **Download the files** to your computer
2. **Open `index.html`** in your web browser by either:
   - Double-clicking the file
   - Right-clicking and selecting "Open with [Browser]"
   - Dragging the file into your browser window

#### Option 2: Local Web Server (For advanced users)
For better performance and to avoid any CORS issues:

**Using Python:**
```bash
# Navigate to the document-intelligence folder
cd document-intelligence

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
# Install a simple server globally
npm install -g http-server

# Navigate to the document-intelligence folder
cd document-intelligence

# Start the server
http-server -p 8000
```

**Using PHP:**
```bash
# Navigate to the document-intelligence folder
cd document-intelligence

# Start PHP built-in server
php -S localhost:8000
```

Then open your browser and go to `http://localhost:8000`

### First-Time Setup

1. **Open the application** in your browser
2. **Click the Settings button** (gear icon) in the top right
3. **Navigate to "AI Configuration"** tab
4. **Enter your API key** for your chosen AI model
5. **Save settings** and close the settings panel

You're now ready to analyze documents!

## How to Use

### Analyzing a Document

1. **Select Document Source**:
   - **Vector API**: Load documents from your Vector system
   - **Upload PDF**: Drag and drop or select a PDF file
   - **Take Photo**: Use your device's camera for physical documents

2. **Choose Your Document**:
   - Upload a file or select from Vector API results
   - Preview will appear showing document pages

3. **Click "Analyze Document"**:
   - AI will process all pages
   - Progress bar shows analysis status
   - Results appear in structured format

4. **Review and Edit**:
   - Click any field to edit extracted information
   - Add or remove items from the contents table
   - Hover over fields to see source locations on the document

5. **Export Results**:
   - Download as CSV for spreadsheet use
   - Print with clean formatting
   - View raw AI response data

### Vector API Integration

For organizations using Vector's document management system:

1. **Configure API Settings**:
   - Go to Settings → API Configuration
   - Enter your Vector API endpoint
   - Provide your bearer token
   - Set date range and result limits

2. **Load Documents**:
   - Select "Vector API" as document source
   - Click "Load Documents"
   - Browse and select documents from the table

## Technical Details

### File Structure
- `index.html` - Main application interface
- `script.js` - Core application logic and AI integration
- `styles.css` - User interface styling and themes

### AI Integration
The application uses REST APIs to communicate with AI services:
- **Google Gemini**: Gemini API via Google AI Studio
- **OpenAI GPT**: OpenAI API for GPT-4o
- **Claude**: Anthropic API for Claude 4

### Data Processing
- PDF rendering using PDF.js library
- Image processing for camera capture
- JSON structured output for consistent data extraction
- Coordinate mapping for visual field highlighting

## Privacy & Security

- **API Keys**: Stored locally in browser storage, never transmitted to third parties
- **Document Processing**: Documents are sent only to your chosen AI provider
- **Local Storage**: Settings and preferences saved in browser local storage
- **No Data Retention**: No document data is stored permanently by the application

## Troubleshooting

### Common Issues

**API Key Errors**:
- Ensure your API key is correct and has proper permissions
- Check that billing is enabled for paid services
- Verify the selected model matches your API key provider

**Document Loading Issues**:
- Ensure PDF files are not password-protected
- Check file size limits (very large files may timeout)
- For Vector API, verify endpoint URL and token validity

**Camera Access**:
- Allow camera permissions in your browser
- Ensure you're using HTTPS or localhost (required for camera access)
- Check that your device has a camera available

### Performance Tips
- Use Gemini 2.5 Flash for faster processing
- Reduce image resolution for faster uploads
- Clear browser cache if experiencing issues
- Use local web server for better performance

## Support

For technical issues or questions about the application, please refer to:
- Browser developer console for error messages
- API provider documentation for service-specific issues
- Vector API documentation for integration questions 