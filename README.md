# Logistics Analyzer

A comprehensive suite of AI-powered logistics tools for modern supply chain management. This project includes advanced video analysis, document processing, and data comparison capabilities designed to streamline yard operations and logistics workflows.

## 🚀 Features

### 📹 Camera Vision: Yard Auditor
AI-powered video analysis tool that automatically identifies and catalogs trailers in yard footage.

**Key Capabilities:**
- **Multi-AI Model Support**: Gemini 1.5/2.5 Pro/Flash, GPT-4o, Claude 4
- **Automated Trailer Detection**: Identifies unique trailers from video frames
- **Comprehensive Data Extraction**: Trailer ID, carrier, load status, location, type, and size
- **Real-time API Comparison**: Compare AI results against live Vector API data
- **CSV Import/Export**: Flexible data import and export capabilities
- **Interactive Results**: Editable tables, image carousel, and detailed reporting

### 📄 BOL Report Generator
Automated Bill of Lading document processing and analysis.

## 🛠️ Setup & Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- API Keys for your chosen AI provider:
  - **Google AI Studio** (for Gemini models)
  - **OpenAI** (for GPT-4o)
  - **Anthropic** (for Claude 4)
- **Vector API Bearer Token** (for comparison functionality)

### Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/Logistics_Analyzer.git
cd Logistics_Analyzer
```

2. **Open the application:**
   - For Camera Vision: Open `camera_vision.html` in your browser
   - For BOL Generator: Open `bol_report_generator.html` in your browser

3. **Configure API Keys:**
   - Triple-click the Vector logo to reveal AI configuration
   - Enter your API keys for the desired AI models
   - Configure Vector API bearer token for comparison functionality

## 📖 Usage Guide

### Camera Vision: Yard Auditor

#### Step 1: Configure AI Settings
1. **Triple-click the Vector logo** to access AI configuration
2. **Select AI Model**: Choose from Gemini, GPT-4o, or Claude 4
3. **Enter API Key**: Provide the appropriate API key for your selected model
4. **Configure Vector API**: Set up bearer token for comparison functionality

#### Step 2: Upload Video
1. **Select Video File**: Click the upload area and choose your yard video
2. **Wait for Processing**: The system will extract frames automatically (up to 100 frames)
3. **Review Preview**: Confirm the video has been processed successfully

#### Step 3: Run Analysis
1. **Click "Initiate Yard Auditor"**: Start the AI analysis process
2. **Monitor Progress**: Track the analysis progress through multiple stages
3. **Review Results**: Examine the detected trailers in the interactive table

#### Step 4: Compare Data (Optional)
1. **Click "Compare Against Yard"**: Open the comparison modal
2. **Choose Method**:
   - **API Comparison**: Fetch live data from Vector API
   - **CSV Upload**: Upload your own comparison data
3. **Review Comparison**: Analyze added, removed, and remaining trailers

#### Step 5: Export Results
- **Print Results**: Generate a printer-friendly report
- **Export CSV**: Download trailer data as CSV file
- **View Raw Data**: Access the complete AI model response

### API Configuration

#### Vector API Setup
The application connects to the Vector API for real-time data comparison:

- **Default Endpoint**: `https://api.withvector-demo.com/1.0/entities/query?DEBUG=view--Trailers`
- **Authentication**: Bearer Token authentication
- **Headers**: Content-Type: application/json, Origin: localhost
- **Method**: POST with comprehensive facility query

#### CORS Handling
The application includes robust CORS handling:
1. **Direct Connection**: Attempts direct API call first
2. **Proxy Fallback**: Uses CORS proxy if direct connection fails
3. **Error Handling**: Provides clear error messages and alternatives

## 🔧 Configuration Options

### AI Model Configuration
```javascript
// Supported Models
- gemini-1.5-pro-latest
- gemini-1.5-flash-latest  
- gemini-2.5-pro (default)
- gemini-2.5-flash
- gpt-4o
- claude-4
```

### API Endpoints
- **Vector API**: Configurable endpoint for trailer data queries
- **CORS Proxy**: Automatic fallback for cross-origin requests
- **Error Handling**: Comprehensive error management and user feedback

### Video Processing
- **Frame Extraction**: Up to 100 frames per video
- **Format Support**: Standard video formats (MP4, AVI, MOV, etc.)
- **Quality Settings**: Optimized for trailer identification accuracy

## 📊 Data Schema

### Trailer Object Structure
```json
{
  "trailer_id": "string",           // Primary identifier
  "carrier": "string",              // Operating company
  "is_loaded": boolean,             // Load status (true/false)
  "location": "string",             // Position/dock number
  "trailer_type": "string",         // Type (Dry Van, Reefer, etc.)
  "trailer_size": number,           // Length in feet
  "image_identifier": number        // Best frame reference (1-100)
}
```

### Vector API Response Transformation
The application automatically transforms Vector API responses to match the internal trailer schema, handling:
- Complex nested entity structures
- Denormalized properties
- Facility-specific configurations
- Load status interpretation

## 🎯 AI Prompt Engineering

The system uses a sophisticated prompt designed for logistics environments:

- **LOGOS System**: Specialized AI agent for logistics observation
- **Stateful Tracking**: Maintains trailer state across video frames
- **De-duplication**: Ensures unique trailer identification
- **Confidence Handling**: Uses null values for uncertain data
- **JSON Schema Compliance**: Strict adherence to defined output format

## 🔒 Security & Privacy

- **Client-Side Processing**: All video processing happens in the browser
- **API Key Security**: Keys are stored locally and not transmitted unnecessarily
- **CORS Protection**: Proper handling of cross-origin requests
- **Error Sanitization**: Safe error message handling

## 🚨 Troubleshooting

### Common Issues

**CORS Errors:**
- The application automatically handles CORS issues with proxy fallback
- If API calls fail, use the CSV upload option as an alternative

**Video Processing Errors:**
- Ensure video file is in a supported format
- Check file size (large files may take longer to process)
- Verify browser compatibility

**API Authentication:**
- Verify API keys are correctly entered
- Check bearer token validity for Vector API
- Ensure proper network connectivity

### Error Messages
- **Clear User Feedback**: All errors include actionable guidance
- **Fallback Options**: Alternative workflows when primary methods fail
- **Debug Information**: Raw model responses available for troubleshooting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vector**: For providing the logistics API infrastructure
- **Google AI**: For Gemini model access
- **OpenAI**: For GPT-4o capabilities
- **Anthropic**: For Claude 4 integration
- **Tailwind CSS**: For responsive UI framework

## 📞 Support

For support, questions, or feature requests:
- Create an issue in this repository
- Contact the development team
- Check the troubleshooting section above

---

**Built with ❤️ for the logistics industry**