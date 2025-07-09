        // Set the workerSrc for pdf.js
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

        // DOM Elements
        const modelSelector = document.getElementById('modelSelector');
        const googleKeyContainer = document.getElementById('googleKeyContainer');
        const openaiKeyContainer = document.getElementById('openaiKeyContainer');
        const googleApiKeyInput = document.getElementById('googleApiKeyInput');
        const openaiApiKeyInput = document.getElementById('openaiApiKeyInput');
        const loading = document.getElementById('loading');
        const messageContainer = document.getElementById('messageContainer');
        const message = document.getElementById('message');
        const resultsWrapper = document.getElementById('resultsWrapper');
        
        // Settings Elements
        const settingsBtn = document.getElementById('settingsBtn');
        const aiConfigSectionElement = document.getElementById('aiConfigSection');
        const highConfidenceThreshold = document.getElementById('highConfidenceSlider');
        const mediumConfidenceThreshold = document.getElementById('mediumConfidenceSlider');
        const saveConfidenceSettings = document.getElementById('saveConfidenceSettings');
        const resetConfidenceDefaults = document.getElementById('resetConfidenceDefaults');
        
        // Settings Tab Elements
        const settingsTabGeneral = document.getElementById('settingsTabGeneral');
        const settingsTabAI = document.getElementById('settingsTabAI');
        const settingsTabAPI = document.getElementById('settingsTabAPI');
        const settingsTabConfidence = document.getElementById('settingsTabConfidence');
        const settingsContentGeneral = document.getElementById('settingsContentGeneral');
        const settingsContentAI = document.getElementById('settingsContentAI');
        const settingsContentAPI = document.getElementById('settingsContentAPI');
        const settingsContentConfidence = document.getElementById('settingsContentConfidence');
        
        // Theme and Preference Elements
        const darkModeToggle = document.getElementById('darkModeToggle');
        const autoSaveToggle = document.getElementById('autoSaveToggle');
        const coordinateOverlaysToggle = document.getElementById('coordinateOverlaysToggle');
        const showConfidenceIndicators = document.getElementById('showConfidenceIndicators');
        // Confidence Settings
        let confidenceSettings = {
            high: 95,
            medium: 80
        };
        
        // Load saved settings
        const savedSettings = localStorage.getItem('confidenceSettings');
        if (savedSettings) {
            confidenceSettings = JSON.parse(savedSettings);
            if (highConfidenceThreshold) highConfidenceThreshold.value = confidenceSettings.high;
            if (mediumConfidenceThreshold) mediumConfidenceThreshold.value = confidenceSettings.medium;
        }
        
        // Load theme and preference settings
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedAutoSave = localStorage.getItem('autoSave') === 'true';
        const savedCoordinateOverlays = localStorage.getItem('coordinateOverlays') !== 'false'; // default true
        const savedShowConfidenceIndicators = localStorage.getItem('showConfidenceIndicators') !== 'false'; // default true
        
        // Apply saved settings
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (darkModeToggle) darkModeToggle.checked = true;
        }
        if (savedAutoSave && autoSaveToggle) autoSaveToggle.checked = true;
        if (coordinateOverlaysToggle) coordinateOverlaysToggle.checked = savedCoordinateOverlays;
        if (showConfidenceIndicators) showConfidenceIndicators.checked = savedShowConfidenceIndicators;
        
        // BoL Elements
        const bolUpload = document.getElementById('bolUpload');
        const bolPromptText = document.getElementById('bol-prompt-text');
        const pdfFileNameDisplay = document.getElementById('pdfFileName');
        const bolPreviewContainer = document.getElementById('bol-preview-container');
        const parseBolBtn = document.getElementById('parseBolBtn');
        const analyzeStatusMessage = document.getElementById('analyzeStatusMessage');
        const statusIcon = document.getElementById('statusIcon');
        const statusText = document.getElementById('statusText');
        const bolResultContainer = document.getElementById('bolResultContainer');
        const exportBolBtn = document.getElementById('exportBolBtn');
        const bolResultCard = document.getElementById('bolResultCard');

        // Upload Method Elements
        const uploadMethodPdf = document.getElementById('uploadMethodPdf');
        const uploadMethodCamera = document.getElementById('uploadMethodCamera');
        const uploadMethodVector = document.getElementById('uploadMethodVector');
        const pdfUploadSection = document.getElementById('pdfUploadSection');
        const cameraSection = document.getElementById('cameraSection');
        const vectorApiSection = document.getElementById('vectorApiSection');

        // Camera Elements
        const startCamera = document.getElementById('startCamera');
        const cameraPreview = document.getElementById('cameraPreview');
        const cameraControls = document.getElementById('cameraControls');
        const cameraVideo = document.getElementById('cameraVideo');
        const capturePhoto = document.getElementById('capturePhoto');
        const stopCamera = document.getElementById('stopCamera');
        const captureCanvas = document.getElementById('captureCanvas');
        const capturedImage = document.getElementById('capturedImage');
        const capturedImagePreview = document.getElementById('capturedImagePreview');
        const retakePhoto = document.getElementById('retakePhoto');
        const usePhoto = document.getElementById('usePhoto');

        // Vector API Elements
        const refreshVectorDocuments = document.getElementById('refreshVectorDocuments');
        const vectorApiStatus = document.getElementById('vectorApiStatus');
        const vectorDocumentsList = document.getElementById('vectorDocumentsList');
        const documentsTableBody = document.getElementById('documentsTableBody');
        const noDocumentsMessage = document.getElementById('noDocumentsMessage');
        const documentSearchInput = document.getElementById('documentSearchInput');

        // Vector API Settings Elements
        const settingsVectorApiEndpoint = document.getElementById('settingsVectorApiEndpoint');
        const settingsVectorBearerToken = document.getElementById('settingsVectorBearerToken');
        const settingsVectorFacility = document.getElementById('settingsVectorFacility');
        const settingsVectorDateRange = document.getElementById('settingsVectorDateRange');
        const settingsVectorResultSize = document.getElementById('settingsVectorResultSize');
        const saveVectorApiSettings = document.getElementById('saveVectorApiSettings');

        // Modal Elements
        const imageZoomModal = document.getElementById('imageZoomModal');
        const zoomedImage = document.getElementById('zoomedImage');
        const closeZoomModal = document.getElementById('closeZoomModal');
        const zoomPrevBtn = document.getElementById('zoomPrevBtn');
        const zoomNextBtn = document.getElementById('zoomNextBtn');
        const fieldEditModal = document.getElementById('fieldEditModal');
        const editModalTitle = document.getElementById('editModalTitle');
        const editModalContent = document.getElementById('editModalContent');
        const cancelEditBtn = document.getElementById('cancelEditBtn');
        const saveEditBtn = document.getElementById('saveEditBtn');

        // Side Panel Elements
        const howToBtn = document.getElementById('howToBtn');
        const sidePanel = document.getElementById('sidePanel');
        const sidePanelOverlay = document.getElementById('sidePanelOverlay');
        const closePanelBtn = document.getElementById('closePanelBtn');
        const panelTabKey = document.getElementById('panelTabKey');
        const panelTabBilling = document.getElementById('panelTabBilling');
        const panelContentKey = document.getElementById('panelContentKey');
        const panelContentBilling = document.getElementById('panelContentBilling');
        
        // Prompt Panel Elements
        const editBolPromptBtn = document.getElementById('editBolPromptBtn');
        const promptSidePanelOverlay = document.getElementById('promptSidePanelOverlay');
        const promptSidePanel = document.getElementById('promptSidePanel');
        const closePromptPanelBtn = document.getElementById('closePromptPanelBtn');
        const promptPanelContentBol = document.getElementById('promptPanelContentBol');
        const bolPromptTextarea = document.getElementById('bolPromptTextarea');
        const saveBolPromptBtn = document.getElementById('saveBolPromptBtn');
        const resetBolPromptBtn = document.getElementById('resetBolPromptBtn');
        
        let bolFile = null;
        let bolPageImages = [];
        let currentBolPageIndex = 0;
        let rawJsonResult = '';
        let currentUploadMethod = 'vector';
        let cameraStream = null;
        let selectedVectorDocument = null;
        let vectorAutoRefreshInterval = null;

        const defaultBolPrompt = `You are an expert at parsing shipping documents. Your task is to analyze all the following pages from a single Bill of Lading (BoL) and consolidate all information into a single JSON object.
Aggregate the data from all provided pages to find the most complete information for each field. Scrutinize every page for line items under tables like "Shipping Details" to create a comprehensive list of all unique items.

Extract the following fields and return them in one JSON object. If a field is not present across any of the pages, use "N/A" as the value.

For EACH field, you must provide:
1. The extracted value
2. Bounding box coordinates in PIXELS from the image provided. The image origin (0,0) is at the TOP-LEFT.
3. Confidence score (0-100) representing how certain you are about the accuracy of the extracted value

Use this format: {"value": "extracted_text", "coordinates": {"page": 1, "x": 150, "y": 300, "width": 225, "height": 30}, "confidence": 95}. The coordinates are in pixels of the image for that page.

COORDINATE SYSTEM: Use standard image coordinates where:
- Origin (0,0) is at the TOP-LEFT of the page
- X increases going RIGHT
- Y increases going DOWN
- Measure coordinates precisely from the visible text location

- "order_number": The order, appointment, or pickup number.
- "seal_number": The seal number for the trailer.
- "date": The pickup or shipping date.
- "carrier": The name of the carrier.
- "origin": The full address of the shipper/origin.
- "destination": The full address of the consignee/destination.
- "signed": Whether the BoL shows evidence of being signed by the driver (look for signatures, signature lines that are filled, or "Signature" fields with names/marks). Return true/false.
- "contents": An array of objects, where each object represents a unique line item found across all pages. Each object should contain:
    - "item_number": The item or SKU number for the product (if available).
    - "description": The description of the goods.
    - "amount": The total quantity or number of units (e.g., pallets, cases).
    - "weight": The total weight of the items.
    - "use_by_date": The use by, best by, or expiration date for the item (if available).
- "scac": The Standard Carrier Alpha Code (a 2-4 letter code).
- "delivery_number": The delivery or pro number.
- "bol_number": The primary Bill of Lading number.
- "shipment_number": The shipment ID or number.
- "temperature": The required transit temperature (e.g., 34-40°F).
- "customer": The name of the receiving company (the consignee, distinct from the destination address).
- "vendor": The name of the shipping company (the shipper, distinct from the origin address).

For fields where coordinates cannot be determined, use {"page": 0, "x": 0, "y": 0, "width": 0, "height": 0} and confidence: 0.

Return the JSON in this exact structure:
{
  "order_number": {"value": "...", "coordinates": {...}, "confidence": 95},
  "seal_number": {"value": "...", "coordinates": {...}, "confidence": 85},
  "date": {"value": "...", "coordinates": {...}, "confidence": 90},
  "carrier": {"value": "...", "coordinates": {...}, "confidence": 88},
  "origin": {"value": "...", "coordinates": {...}, "confidence": 92},
  "destination": {"value": "...", "coordinates": {...}, "confidence": 91},
  "customer": {"value": "...", "coordinates": {...}, "confidence": 90},
  "vendor": {"value": "...", "coordinates": {...}, "confidence": 90},
  "signed": {"value": true/false, "coordinates": {...}, "confidence": 75},
  "scac": {"value": "...", "coordinates": {...}, "confidence": 80},
  "delivery_number": {"value": "...", "coordinates": {...}, "confidence": 87},
  "bol_number": {"value": "...", "coordinates": {...}, "confidence": 98},
  "shipment_number": {"value": "...", "coordinates": {...}, "confidence": 89},
  "temperature": {"value": "...", "coordinates": {...}, "confidence": 70},
  "contents": [
    {
      "item_number": {"value": "...", "coordinates": {...}, "confidence": 85},
      "description": {"value": "...", "coordinates": {...}, "confidence": 90},
      "amount": {"value": "...", "coordinates": {...}, "confidence": 88},
      "weight": {"value": "...", "coordinates": {...}, "confidence": 82},
      "use_by_date": {"value": "...", "coordinates": {...}, "confidence": 75}
    }
  ]
}

Only output the final, consolidated JSON object. Do not include any other text, explanations, or markdown formatting.`;

        const defaultGoogleApiKey = "AIzaSyDe0pVIFyKI_SiTpVMlpbt1Gtdg3uF9WbU";
        googleApiKeyInput.value = defaultGoogleApiKey;

        bolPromptTextarea.value = defaultBolPrompt;

        // --- Dynamic API Key Help Content ---
        const keyHelpContent = {
            gemini: `
                <div class="space-y-6">
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 1: Go to Google AI Studio</h3>
                        <p class="mb-3 text-sm">Navigate to <a href="https://aistudio.google.com/" target="_blank" class="text-blue-600 hover:underline">aistudio.google.com</a> and sign in with your Google account.</p>
                        <img src="https://storage.googleapis.com/gemini-codelab-images/tutorial-api-key-1.png" alt="Google AI Studio Homepage" class="rounded-lg border shadow-sm" onerror="this.onerror=null;this.src='https://placehold.co/600x300/e2e8f0/334155?text=Image+Not+Found';">
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 2: Get API Key</h3>
                        <p class="mb-3 text-sm">Once in AI Studio, click <b>"Get API key"</b> from the left-hand menu.</p>
                        <img src="https://storage.googleapis.com/gemini-codelab-images/tutorial-api-key-2.png" alt="Get API Key button" class="rounded-lg border shadow-sm" onerror="this.onerror=null;this.src='https://placehold.co/600x300/e2e8f0/334155?text=Image+Not+Found';">
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 3: Create API key in a new project</h3>
                        <p class="mb-3 text-sm">A dialog will appear. Click on <b>"Create API key in new project"</b>.</p>
                        <img src="https://storage.googleapis.com/gemini-codelab-images/tutorial-api-key-3.png" alt="Create API Key in new project" class="rounded-lg border shadow-sm" onerror="this.onerror=null;this.src='https://placehold.co/600x300/e2e8f0/334155?text=Image+Not+Found';">
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 4: Copy Your Key</h3>
                        <p class="mb-3 text-sm">Your new API key will be displayed. Click the copy icon to copy the key.</p>
                        <img src="https://storage.googleapis.com/gemini-codelab-images/tutorial-api-key-4.png" alt="Copy new API key" class="rounded-lg border shadow-sm" onerror="this.onerror=null;this.src='https://placehold.co/600x300/e2e8f0/334155?text=Image+Not+Found';">
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 5: Paste it Here</h3>
                        <p class="mb-3 text-sm">Return to this page and paste the key into the "Google AI API Key" input field.</p>
                        <img src="https://storage.googleapis.com/gemini-codelab-images/tutorial-api-key-5.png" alt="Paste key into the application" class="rounded-lg border shadow-sm" onerror="this.onerror=null;this.src='https://placehold.co/600x300/e2e8f0/334155?text=Image+Not+Found';">
                    </div>
                </div>
            `,
            gpt: `
                <div class="space-y-6">
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 1: Go to OpenAI Platform</h3>
                        <p class="mb-3 text-sm">Visit <a href="https://platform.openai.com/api-keys" target="_blank" class="text-blue-600 hover:underline">platform.openai.com/api-keys</a> and sign in with your OpenAI account.</p>
                        <img src="https://platform.openai.com/static/images/api-keys.png" alt="OpenAI API Keys" class="rounded-lg border shadow-sm" onerror="this.onerror=null;this.src='https://placehold.co/600x300/e2e8f0/334155?text=Image+Not+Found';">
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 2: Create a New API Key</h3>
                        <p class="mb-3 text-sm">Click <b>"Create new secret key"</b>. Name your key and copy it. <b>Store it securely</b> as you won't be able to see it again.</p>
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 3: Paste it Here</h3>
                        <p class="mb-3 text-sm">Return to this page and paste the key into the "OpenAI API Key" input field.</p>
                    </div>
                </div>
            `,
            claude: `
                <div class="space-y-6">
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 1: Go to Anthropic Console</h3>
                        <p class="mb-3 text-sm">Visit <a href="https://console.anthropic.com/account/keys" target="_blank" class="text-blue-600 hover:underline">console.anthropic.com/account/keys</a> and sign in or create an Anthropic account.</p>
                        <img src="https://placehold.co/600x300/e2e8f0/334155?text=Anthropic+Console" alt="Anthropic Console" class="rounded-lg border shadow-sm">
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 2: Create an API Key</h3>
                        <p class="mb-3 text-sm">Click <b>"Create Key"</b>, give it a name, and copy the key. <b>Store it securely</b> as you won't be able to see it again.</p>
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 3: Paste it Here</h3>
                        <p class="mb-3 text-sm">Return to this page and paste the key into the "OpenAI API Key" input field (used for Claude as well).</p>
                    </div>
                </div>
            `
        };

        const billingHelpContent = {
            gemini: `
                <div class="space-y-6">
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 1: Go to Google Cloud Console</h3>
                        <p class="mb-3 text-sm">Navigate to the <a href="https://console.cloud.google.com/" target="_blank" class="text-blue-600 hover:underline">Google Cloud Console</a> and select the project associated with your API key.</p>
                        <img src="https://storage.googleapis.com/gemini-codelab-images/billing-1.png" alt="Google Cloud Console" class="rounded-lg border shadow-sm" onerror="this.onerror=null;this.src='https://placehold.co/600x300/e2e8f0/334155?text=Image+Not+Found';">
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 2: Open Billing Menu</h3>
                        <p class="mb-3 text-sm">Click the main navigation menu (hamburger icon) and select <b>"Billing"</b>.</p>
                        <img src="https://storage.googleapis.com/gemini-codelab-images/billing-2.png" alt="Billing Menu" class="rounded-lg border shadow-sm" onerror="this.onerror=null;this.src='https://placehold.co/600x300/e2e8f0/334155?text=Image+Not+Found';">
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 3: Link a Billing Account</h3>
                        <p class="mb-3 text-sm">If your project doesn't have a billing account, you'll see a prompt to <b>"Link a billing account"</b>. Click it. If you need to create one, select <b>"Manage billing accounts"</b> and then <b>"Create account"</b>.</p>
                        <img src="https://storage.googleapis.com/gemini-codelab-images/billing-3.png" alt="Link billing account" class="rounded-lg border shadow-sm" onerror="this.onerror=null;this.src='https://placehold.co/600x300/e2e8f0/334155?text=Image+Not+Found';">
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 4: Set Up Payment</h3>
                        <p class="mb-3 text-sm">Follow the on-screen instructions to provide your payment information and complete the setup.</p>
                        <img src="https://storage.googleapis.com/gemini-codelab-images/billing-4.png" alt="Payment information" class="rounded-lg border shadow-sm" onerror="this.onerror=null;this.src='https://placehold.co/600x300/e2e8f0/334155?text=Image+Not+Found';">
                    </div>
                </div>
            `,
            gpt: `
                <div class="space-y-6">
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 1: Go to OpenAI Billing</h3>
                        <p class="mb-3 text-sm">Visit <a href="https://platform.openai.com/account/billing/overview" target="_blank" class="text-blue-600 hover:underline">platform.openai.com/account/billing/overview</a> and sign in.</p>
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 2: Add a Payment Method</h3>
                        <p class="mb-3 text-sm">Click <b>"Add payment method"</b> and follow the instructions to add your credit card or other payment method.</p>
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 3: Set Usage Limits (Optional)</h3>
                        <p class="mb-3 text-sm">You can set usage limits to control your spending in the <b>"Usage limits"</b> tab.</p>
                    </div>
                </div>
            `,
            claude: `
                <div class="space-y-6">
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 1: Go to Anthropic Console Billing</h3>
                        <p class="mb-3 text-sm">Visit <a href="https://console.anthropic.com/account/billing" target="_blank" class="text-blue-600 hover:underline">console.anthropic.com/account/billing</a> and sign in.</p>
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 2: Add a Payment Method</h3>
                        <p class="mb-3 text-sm">Click <b>"Add payment method"</b> and follow the instructions to add your credit card or other payment method.</p>
                    </div>
                    <div>
                        <h3 class="font-bold font-google-sans text-lg mb-2">Step 3: Review Usage and Limits</h3>
                        <p class="mb-3 text-sm">Monitor your usage and set limits as needed to control your spending.</p>
                    </div>
                </div>
            `
        };

        function getCurrentProvider() {
            const val = modelSelector.value;
            if (val.startsWith('gemini')) return 'gemini';
            if (val.startsWith('gpt')) return 'gpt';
            if (val.startsWith('claude')) return 'claude';
            return 'gemini'; // fallback
        }

        function updateKeyHelpPanel() {
            const provider = getCurrentProvider();
            panelContentKey.innerHTML = keyHelpContent[provider];
            panelContentBilling.innerHTML = billingHelpContent[provider];
        }

        modelSelector.addEventListener('input', () => {
            // Since API keys are now in separate tabs, we don't need to hide/show them
            // Just update the button state and help panel
            checkAllInputs();
            updateKeyHelpPanel();
        });

        googleApiKeyInput.addEventListener('input', () => {
            checkAllInputs();
            updateAnalyzeButtonState();
        });
        openaiApiKeyInput.addEventListener('input', () => {
            checkAllInputs();
            updateAnalyzeButtonState();
        });

        bolUpload.addEventListener('change', async (event) => {
            if (event.target.files.length === 0) return;
            bolFile = event.target.files[0];
            pdfFileNameDisplay.textContent = bolFile.name;
            bolPromptText.classList.add('hidden');
            
            // Immediately enable the button if key is present
            checkAllInputs(); 

            bolPreviewContainer.innerHTML = '<div class="text-center col-span-full">Rendering PDF...</div>';

            try {
                bolPageImages = await renderPdfToImages(bolFile);
                bolPreviewContainer.innerHTML = '';
                bolPageImages.forEach(imgDataUrl => {
                    const img = document.createElement('img');
                    img.src = imgDataUrl;
                    img.className = 'w-full h-auto object-cover rounded-lg border shadow-sm';
                    img.alt = 'Bill of Lading Page';
                    img.addEventListener('click', () => openImageZoomModal());
                    bolPreviewContainer.appendChild(img);
                });
                
                // Show success status
                showAnalyzeStatus('success', `Document "${bolFile.name}" ready for analysis!`);
                updateAnalyzeButtonState();
            } catch (error) {
                displayMessage(`Error rendering PDF: ${error.message}`);
                bolPreviewContainer.innerHTML = '';
                bolPromptText.classList.remove('hidden');
                pdfFileNameDisplay.textContent = '';
                bolFile = null; // Reset the file on failure
                bolPageImages = []; // Reset images
                hideAnalyzeStatus(); // Clear any status messages
                checkAllInputs(); // Disable button on failure
            }
        });
        
        parseBolBtn.addEventListener('click', handleBolParsing);
        exportBolBtn.addEventListener('click', handleExportBolData);

        // Upload Method Event Listeners
        uploadMethodPdf.addEventListener('click', () => switchUploadMethod('pdf'));
        uploadMethodCamera.addEventListener('click', () => switchUploadMethod('camera'));
        uploadMethodVector.addEventListener('click', () => switchUploadMethod('vector'));

        // Camera Event Listeners
        startCamera.addEventListener('click', startCameraCapture);
        capturePhoto.addEventListener('click', capturePhotoFromCamera);
        stopCamera.addEventListener('click', stopCameraCapture);
        retakePhoto.addEventListener('click', retakePhotoCapture);
        usePhoto.addEventListener('click', useCapturedPhoto);

        // Vector API Event Listeners
        refreshVectorDocuments.addEventListener('click', loadDocumentsFromVector);
        if (saveVectorApiSettings) saveVectorApiSettings.addEventListener('click', saveVectorSettings);

        howToBtn.addEventListener('click', () => {
            updateKeyHelpPanel();
            sidePanel.classList.remove('translate-x-full');
            sidePanelOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });

        const closePanel = () => {
            sidePanel.classList.add('translate-x-full');
            sidePanelOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        };
        closePanelBtn.addEventListener('click', closePanel);
        sidePanelOverlay.addEventListener('click', closePanel);
        
        // Prompt Panel Listeners
        editBolPromptBtn.addEventListener('click', () => openPromptPanel());

        const openPromptPanel = () => {
            promptSidePanel.classList.remove('translate-x-full');
            promptSidePanelOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };
        
        const closePromptPanel = () => {
            promptSidePanel.classList.add('translate-x-full');
            promptSidePanelOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        };

        closePromptPanelBtn.addEventListener('click', closePromptPanel);
        promptSidePanelOverlay.addEventListener('click', closePromptPanel);
        saveBolPromptBtn.addEventListener('click', closePromptPanel);
        resetBolPromptBtn.addEventListener('click', () => { bolPromptTextarea.value = defaultBolPrompt; });

        // Side Panel Tab switching
        panelTabKey.addEventListener('click', () => switchSidePanelTab('key'));
        panelTabBilling.addEventListener('click', () => switchSidePanelTab('billing'));
        
        // Modal Listeners
        closeZoomModal.addEventListener('click', () => {
            imageZoomModal.classList.add('hidden');
            imageZoomModal.classList.remove('flex');
        });
        imageZoomModal.addEventListener('click', (e) => {
             if (e.target === imageZoomModal) {
                imageZoomModal.classList.add('hidden');
                imageZoomModal.classList.remove('flex');
            }
        });

        cancelEditBtn.addEventListener('click', () => {
             fieldEditModal.classList.add('hidden');
             fieldEditModal.classList.remove('flex');
        });
        saveEditBtn.addEventListener('click', () => {
            try {
                const fieldId = saveEditBtn.dataset.fieldId;
                const input = document.getElementById('edit-input');
                const targetSpan = document.querySelector(`[data-field-id="${fieldId}"]`);
                if (targetSpan && input) {
                    targetSpan.textContent = input.value || 'N/A';
                }
            } catch(error) {
                console.error("Error saving field:", error);
            } finally {
                fieldEditModal.classList.add('hidden');
                fieldEditModal.classList.remove('flex');
            }
        });
        fieldEditModal.addEventListener('click', (e) => {
             if (e.target === fieldEditModal) {
                fieldEditModal.classList.add('hidden');
                fieldEditModal.classList.remove('flex');
            }
        });

        const printBolBtn = document.getElementById('printBolBtn');
        if (printBolBtn) {
            printBolBtn.addEventListener('click', () => {
                const printContents = bolResultCard.cloneNode(true);

                // --- Modify content for printing ---
                
                // 1. Remove image carousel
                const carousel = printContents.querySelector('#mainCarouselContainer');
                if (carousel) carousel.remove();

                // 2. Remove all buttons (add/remove row, etc.)
                printContents.querySelectorAll('button').forEach(btn => btn.remove());

                // 3. Remove Confidence column from the main details table
                const mainTable = printContents.querySelector('.lg\\:col-span-3 .data-table');
                if (mainTable) {
                    const header = mainTable.querySelector('thead tr');
                    if(header && header.children[2]) header.children[2].remove(); // Remove 3rd TH
                    
                    mainTable.querySelectorAll('tbody tr').forEach(row => {
                        if(row.children[2]) row.children[2].remove(); // Remove 3rd TD
                    });
                }
                
                // 4. Remove Actions column from Contents table
                const contentsTable = printContents.querySelector('#contentsTable');
                if (contentsTable) {
                    const contentHeader = contentsTable.querySelector('thead tr');
                    if(contentHeader && contentHeader.lastElementChild) contentHeader.lastElementChild.remove();
                    
                    contentsTable.querySelectorAll('tbody tr').forEach(row => {
                         if(row.lastElementChild) row.lastElementChild.remove();
                    });
                }

                // 5. Style the 'Contents' label as a proper heading
                const contentsLabel = printContents.querySelector('label.block');
                if (contentsLabel && contentsLabel.textContent === 'Contents') {
                    const newHeading = document.createElement('h3');
                    newHeading.textContent = 'Contents';
                    contentsLabel.replaceWith(newHeading);
                }

                // --- Create print-friendly window ---

                const printWindow = window.open('', '', 'width=900,height=700');
                printWindow.document.write(`
                    <html>
                    <head>
                        <title>Print Document Analysis</title>
                        <style>
                            @page {
                                size: A4 portrait;
                                margin: 0.75in;
                            }
                            body { 
                                font-family: 'Inter', sans-serif; 
                                -webkit-print-color-adjust: exact !important;
                                print-color-adjust: exact !important;
                            }
                            h2, h3 { 
                                font-family: 'Roboto', sans-serif;
                                font-weight: 600;
                                margin-top: 0;
                                margin-bottom: 1.5rem;
                                color: #111;
                            }
                            h2 { font-size: 22pt; }
                            h3 { font-size: 14pt; margin-top: 2rem; }
                            table { 
                                width: 100%; 
                                border-collapse: collapse; 
                                font-size: 9pt; 
                                page-break-inside: avoid;
                            }
                            th, td { 
                                border: 1px solid #999; 
                                padding: 0.5rem; 
                                text-align: left;
                                vertical-align: top;
                            }
                            th { 
                                background-color: #f2f2f2 !important;
                                font-weight: 600;
                            }
                            /* The 'about:blank' footer is a browser setting. This stylesheet provides a clean layout for printing. */
                        </style>
                    </head>
                    <body>
                        <h2>Extracted Details</h2>
                        ${printContents.innerHTML}
                    </body>
                    </html>
                `);
                
                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => { 
                    printWindow.print(); 
                    printWindow.close(); 
                }, 500);
            });
        }

        // --- Core Functions ---
        
        function switchSidePanelTab(tabName) {
            if (tabName === 'key') {
                panelTabKey.classList.add('active');
                panelTabBilling.classList.remove('active');
                panelContentKey.classList.remove('hidden');
                panelContentBilling.classList.add('hidden');
            } else {
                panelTabKey.classList.remove('active');
                panelTabBilling.classList.add('active');
                panelContentKey.classList.add('hidden');
                panelContentBilling.classList.remove('hidden');
            }
        }
        
        function hasApiKey() {
            const model = modelSelector.value;
            const googleKey = googleApiKeyInput.value.trim();
            const openaiKey = openaiApiKeyInput.value.trim();
            return (model.startsWith('gpt') || model.startsWith('claude')) ? !!openaiKey : !!googleKey;
        }

        function checkAllInputs() {
            const hasKey = hasApiKey();
            parseBolBtn.disabled = !(hasKey && bolFile);
        }

        // Remove spinner loader references and add progress bar logic
        // --- Progress Bar Logic ---
        const progressBar = document.getElementById('progressBar');
        const progressLabel = document.getElementById('progressLabel');

        let progressInterval = null;
        let messageRotationInterval = null;
        let currentMessageIndex = 0;
        let currentProgress = 0;

        const progressMessages = [
            "Ingesting BoL PDF",
            "Parsing documents", 
            "Organizing content", 
            "Finalizing output"
        ];

        function setProgress(targetProgress, message = null) {
            // Update progress bar width
            currentProgress = targetProgress;
            progressBar.style.width = currentProgress + '%';
            
            // Update message if provided
            if (message) {
                progressLabel.innerHTML = message + '<span class="animated-dots"></span>';
            }
        }

        function startMessageRotation() {
            // Clear any existing rotation
            if (messageRotationInterval) {
                clearInterval(messageRotationInterval);
            }
            
            // Start rotating messages
            messageRotationInterval = setInterval(() => {
                const message = progressMessages[currentMessageIndex];
                progressLabel.innerHTML = message + '<span class="animated-dots"></span>';
                currentMessageIndex = (currentMessageIndex + 1) % progressMessages.length;
            }, 2000); // Change message every 2 seconds
        }

        function stopMessageRotation() {
            if (messageRotationInterval) {
                clearInterval(messageRotationInterval);
                messageRotationInterval = null;
            }
        }

        function startContinuousProgress() {
            // Start a background progress that slowly increments
            const backgroundInterval = setInterval(() => {
                if (currentProgress < 95) { // Don't go above 95% until explicitly set to 100%
                    currentProgress += 0.5;
                    progressBar.style.width = currentProgress + '%';
                }
            }, 100); // Update every 100ms for smooth background progress
            
            return backgroundInterval;
        }

        // --- Update handleBolParsing and PDF rendering to use progress bar ---
        async function handleBolParsing() {
            // Don't reset UI completely - allow multiple runs
            loading.classList.remove('hidden');
            currentProgress = 0;
            setProgress(0, 'Analyzing Document');
            
            // Update button state during analysis
            parseBolBtn.disabled = true;
            parseBolBtn.textContent = 'Analyzing...';
            
            // Start message rotation
            startMessageRotation();

            if (bolPageImages.length === 0) {
                stopMessageRotation();
                displayMessage("Please upload a PDF and wait for pages to render.");
                loading.classList.add('hidden');
                return;
            }

            const selectedModel = modelSelector.value;
            let backgroundProgressInterval = null;

            try {
                setProgress(25, 'Parsing documents');
                const apiKey = getApiKey();
                const prompt = bolPromptTextarea.value;
                let resultText = '';
                const imageParts = bolPageImages.map(imgDataUrl => ({
                    inlineData: { mimeType: 'image/jpeg', data: imgDataUrl.split(',')[1] }
                }));

                // Start background progress during API calls
                backgroundProgressInterval = startContinuousProgress();

                if (selectedModel.startsWith('gemini')) {
                    setProgress(50, 'Organizing content');
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;
                    const payload = {
                        contents: [{ parts: [{ text: prompt }, ...imageParts] }],
                        generationConfig: { "response_mime_type": "application/json" }
                    };
                    const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                    if (!response.ok) throw new Error(`API Error: ${response.status} ${await response.text()}`);
                    setProgress(75, 'Finalizing output');
                    const result = await response.json();
                    resultText = result.candidates[0].content.parts[0].text;
                } else if (selectedModel === 'claude-4') {
                    setProgress(50, 'Organizing content');
                    const apiUrl = 'https://api.anthropic.com/v1/messages';
                    const imageContent = bolPageImages.map(imgDataUrl => ({
                        type: 'image',
                        source: { type: 'base64', media_type: 'image/jpeg', data: imgDataUrl.split(',')[1] }
                    }));
                    const payload = {
                        model: 'claude-4-opus-20250514',
                        max_tokens: 4096,
                        messages: [
                            {
                                role: 'user',
                                content: [
                                    { type: 'text', text: prompt },
                                    ...imageContent
                                ]
                            }
                        ]
                    };
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': apiKey,
                            'anthropic-version': '2023-06-01'
                        },
                        body: JSON.stringify(payload)
                    });
                    if (!response.ok) throw new Error(`Claude 4 API Error: ${response.status} ${await response.text()}`);
                    setProgress(75, 'Finalizing output');
                    const result = await response.json();
                    const textBlock = result.content.find(c => c.type === 'text');
                    if (!textBlock) throw new Error('Claude 4 did not return a text response.');
                    resultText = textBlock.text;
                } else {
                    setProgress(50, 'Organizing content');
                    const apiUrl = "https://api.openai.com/v1/chat/completions";
                    const imageContent = bolPageImages.map(imgDataUrl => ({
                         type: 'image_url', image_url: { url: imgDataUrl } 
                    }));
                    const payload = {
                        model: selectedModel,
                        response_format: { "type": "json_object" },
                        messages: [{ role: 'user', content: [ { type: 'text', text: prompt }, ...imageContent]}]
                    };
                    const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` }, body: JSON.stringify(payload) });
                    if (!response.ok) throw new Error(`API Error: ${response.status} ${await response.text()}`);
                    setProgress(75, 'Finalizing output');
                    const result = await response.json();
                    resultText = result.choices[0].message.content;
                }
                
                // Clear background progress
                if (backgroundProgressInterval) {
                    clearInterval(backgroundProgressInterval);
                }
                
                rawJsonResult = resultText;
                setProgress(90, 'Finalizing output');
                const consolidatedData = JSON.parse(resultText);
                stopMessageRotation();
                setProgress(100, 'Analysis Complete');
                displayBolResults(consolidatedData);
                setTimeout(() => { 
                    loading.classList.add('hidden');
                    // Re-enable button for multiple runs
                    updateAnalyzeButtonState();
                    // Show success message briefly
                    showAnalyzeStatus('success', 'Analysis completed! You can run another analysis or select a different document.');
                }, 800);
            } catch (error) {
                if (backgroundProgressInterval) {
                    clearInterval(backgroundProgressInterval);
                }
                stopMessageRotation();
                loading.classList.add('hidden');
                displayMessage(error.message);
                setProgress(0, 'Error');
                // Re-enable button after error
                updateAnalyzeButtonState();
            }
        }

        // Update PDF rendering to show progress
        async function renderPdfToImages(file) {
            const fileReader = new FileReader();
            return new Promise((resolve, reject) => {
                fileReader.onload = async (event) => {
                    try {
                        setProgress(20, 'Processing PDF pages');
                        const typedarray = new Uint8Array(event.target.result);
                        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
                        const pageImages = [];
                        
                        // Start background progress during page rendering
                        const backgroundProgressInterval = startContinuousProgress();
                        
                        for (let i = 1; i <= pdf.numPages; i++) {
                            const page = await pdf.getPage(i);
                            const viewport = page.getViewport({ scale: 1.5 });
                            const canvas = document.createElement('canvas');
                            const context = canvas.getContext('2d');
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;
                            await page.render({ canvasContext: context, viewport: viewport }).promise;
                            pageImages.push(canvas.toDataURL('image/jpeg'));
                            setProgress(20 + Math.round((i/pdf.numPages)*20), `Converting page ${i} of ${pdf.numPages}`);
                        }
                        
                        // Clear background progress
                        clearInterval(backgroundProgressInterval);
                        
                        setProgress(40, 'PDF processing complete');
                        resolve(pageImages);
                    } catch (error) {
                        setProgress(0, 'Error');
                        reject(error);
                    }
                };
                setProgress(10, 'Reading PDF file');
                fileReader.readAsArrayBuffer(file);
            });
        }

        function displayBolResults(data) {
            bolResultCard.innerHTML = '';
            currentBolPageIndex = 0; // Reset page index

            // Store coordinate data globally for coordinate overlay functionality
            window.coordinateData = data;

            const updateBolCarousel = () => {
                const img = bolResultCard.querySelector('#carouselImage');
                const pageCounter = bolResultCard.querySelector('#pageCounter');
                if (img && pageCounter) {
                    img.src = bolPageImages[currentBolPageIndex];
                    img.alt = `Document Page ${currentBolPageIndex + 1}`;
                    pageCounter.textContent = `${currentBolPageIndex + 1} / ${bolPageImages.length}`;
                    
                    // Update coordinate overlays when page changes
                    updateCoordinateOverlays();
                }
                const zoomImg = document.getElementById('zoomedImage');
                if(zoomImg) {
                    zoomImg.src = bolPageImages[currentBolPageIndex];
                }
            };
            
            const createCarousel = () => {
                const carouselContainer = document.createElement('div');
                carouselContainer.className = 'md:col-span-1 relative carousel-container';
                carouselContainer.id = 'carouselContainer';

                const img = document.createElement('img');
                img.id = 'carouselImage';
                img.src = bolPageImages.length > 0 ? bolPageImages[0] : '';
                img.className = 'rounded-lg border shadow-md w-full h-auto cursor-pointer';
                img.alt = 'Document Page 1';
                img.addEventListener('click', () => openImageZoomModal());
                img.addEventListener('load', () => {
                    // Update overlays when image loads
                    setTimeout(() => updateCoordinateOverlays(), 100);
                });

                const prevBtn = document.createElement('button');
                prevBtn.className = 'absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 z-20';
                prevBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentBolPageIndex = (currentBolPageIndex - 1 + bolPageImages.length) % bolPageImages.length;
                    updateBolCarousel();
                });
                
                const nextBtn = document.createElement('button');
                nextBtn.className = 'absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 z-20';
                nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
                 nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentBolPageIndex = (currentBolPageIndex + 1) % bolPageImages.length;
                    updateBolCarousel();
                });

                const pageCounter = document.createElement('div');
                pageCounter.id = 'pageCounter';
                pageCounter.className = 'absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-1 rounded-full z-20';
                
                carouselContainer.append(img, prevBtn, nextBtn, pageCounter);

                if (bolPageImages.length <= 1) {
                    prevBtn.classList.add('hidden');
                    nextBtn.classList.add('hidden');
                }
                
                updateBolCarousel();
                return carouselContainer;
            };

            // Helper function to extract value from coordinate object or use direct value
            const getValue = (field) => {
                if (typeof field === 'object' && field.value !== undefined) {
                    return field.value;
                }
                return field || 'N/A';
            };

            // Helper function to extract coordinates
            const getCoordinates = (field) => {
                if (typeof field === 'object' && field.coordinates) {
                    return field.coordinates;
                }
                return null;
            };

            // Helper function to extract confidence score
            const getConfidence = (field) => {
                if (typeof field === 'object' && field.confidence !== undefined) {
                    return field.confidence;
                }
                return 0;
            };

            let contentsHtml = `
                    <table class="w-full text-sm mt-1 data-table border border-gray-300 rounded-lg overflow-hidden" id="contentsTable">
                        <thead>
                           <tr class="border-b-2 border-gray-300 bg-gray-100">
                                <th class="p-3 text-left font-semibold text-gray-700 border-r border-gray-300">Item #</th>
                                <th class="p-3 text-left font-semibold text-gray-700 border-r border-gray-300">Description</th>
                                <th class="p-3 text-left font-semibold text-gray-700 border-r border-gray-300">Amount</th>
                                <th class="p-3 text-left font-semibold text-gray-700 border-r border-gray-300">Weight</th>
                                <th class="p-3 text-left font-semibold text-gray-700 border-r border-gray-300">Use By Date</th>
                                <th class="p-3 text-center font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        ${(data.contents || []).map((item, idx) => {
                            const getConfidenceIndicator = (field) => {
                                const confidence = getConfidence(field);
                                const hasCoords = getCoordinates(field) && getCoordinates(field).x > 0;
                                if (!hasCoords) return '';
                                
                                let indicatorColor = 'bg-gray-400';
                                if (confidence >= confidenceSettings.high) indicatorColor = 'bg-green-500';
                                else if (confidence >= confidenceSettings.medium) indicatorColor = 'bg-orange-500';
                                else if (confidence > 0) indicatorColor = 'bg-red-500';
                                
                                return `<span class="w-2 h-2 ${indicatorColor} rounded-full inline-block mr-2" title="Confidence: ${confidence}%"></span>`;
                            };
                            
                            return `
                            <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors" data-row="${idx}">
                                <td class="p-3 editable-table-cell field-with-coordinates border-r border-gray-200" data-col="item_number" data-coordinates='${getCoordinates(item.item_number) ? JSON.stringify(getCoordinates(item.item_number)) : ''}'>${getConfidenceIndicator(item.item_number)}${getValue(item.item_number)}</td>
                                <td class="p-3 editable-table-cell field-with-coordinates border-r border-gray-200" data-col="description" data-coordinates='${getCoordinates(item.description) ? JSON.stringify(getCoordinates(item.description)) : ''}'>${getConfidenceIndicator(item.description)}${getValue(item.description)}</td>
                                <td class="p-3 editable-table-cell field-with-coordinates border-r border-gray-200" data-col="amount" data-coordinates='${getCoordinates(item.amount) ? JSON.stringify(getCoordinates(item.amount)) : ''}'>${getConfidenceIndicator(item.amount)}${getValue(item.amount)}</td>
                                <td class="p-3 editable-table-cell field-with-coordinates border-r border-gray-200" data-col="weight" data-coordinates='${getCoordinates(item.weight) ? JSON.stringify(getCoordinates(item.weight)) : ''}'>${getConfidenceIndicator(item.weight)}${getValue(item.weight)}</td>
                                <td class="p-3 editable-table-cell field-with-coordinates border-r border-gray-200" data-col="use_by_date" data-coordinates='${getCoordinates(item.use_by_date) ? JSON.stringify(getCoordinates(item.use_by_date)) : ''}'>${getConfidenceIndicator(item.use_by_date)}${getValue(item.use_by_date)}</td>
                                <td class="p-3 text-center"><button class="remove-row-btn text-red-500 hover:text-red-700 font-bold text-lg transition-colors" title="Remove row">&minus;</button></td>
                            </tr>`;
                        }).join('')}
                        </tbody>
                    </table>
                    <div class="mt-2 text-right">
                        <button id="addRowBtn" class="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded hover:bg-blue-200 transition">+ Add Row</button>
                    </div>
            `;

            const mainDiv = document.createElement('div');
            mainDiv.className = 'grid grid-cols-1 lg:grid-cols-5 gap-4 grid-container';
            mainDiv.innerHTML = `
                <div class="lg:col-span-2">
                    <div id="mainCarouselContainer" class="relative">
                        </div>
                </div>
                <div class="lg:col-span-3">
                    <div class="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm mb-4">
                        <table class="w-full data-table">
                            <thead>
                                <tr class="bg-gray-100 border-b-2 border-gray-300">
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Order Information</th>
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Value</th>
                                    <th id="confidenceHeader" class="px-4 py-3 text-center text-sm font-semibold text-gray-700 confidence-col cursor-pointer group" title="Toggle Confidence Column">
                                        <div class="flex items-center justify-center gap-2">
                                            <span>Confidence(%)</span>
                                            <svg id="confidenceChevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 group-hover:text-gray-800">
                                                <path d="m6 9 6 6 6-6"/>
                                            </svg>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                ${createDisplayField('bol_number', 'BoL Number', getValue(data.bol_number), getCoordinates(data.bol_number), getConfidence(data.bol_number))}
                                ${createDisplayField('order_number', 'Order #', getValue(data.order_number), getCoordinates(data.order_number), getConfidence(data.order_number))}
                                ${createDisplayField('seal_number', 'Seal Number', getValue(data.seal_number), getCoordinates(data.seal_number), getConfidence(data.seal_number))}
                                ${createDisplayField('shipment_number', 'Shipment #', getValue(data.shipment_number), getCoordinates(data.shipment_number), getConfidence(data.shipment_number))}
                                ${createDisplayField('delivery_number', 'Delivery #', getValue(data.delivery_number), getCoordinates(data.delivery_number), getConfidence(data.delivery_number))}
                                ${createDisplayField('scac', 'SCAC', getValue(data.scac), getCoordinates(data.scac), getConfidence(data.scac))}
                                ${createDisplayField('date', 'Date', getValue(data.date), getCoordinates(data.date), getConfidence(data.date))}
                                ${createDisplayField('carrier', 'Carrier', getValue(data.carrier), getCoordinates(data.carrier), getConfidence(data.carrier))}
                                ${createDisplayField('temperature', 'Temperature', getValue(data.temperature), getCoordinates(data.temperature), getConfidence(data.temperature))}
                                ${createDisplayField('signed', 'Signed?', getValue(data.signed) === true ? 'Yes' : getValue(data.signed) === false ? 'No' : getValue(data.signed), getCoordinates(data.signed), getConfidence(data.signed))}
                                ${createDisplayField('origin', 'Origin', getValue(data.origin), getCoordinates(data.origin), getConfidence(data.origin))}
                                ${createDisplayField('destination', 'Destination', getValue(data.destination), getCoordinates(data.destination), getConfidence(data.destination))}
                                ${createDisplayField('vendor', 'Vendor', getValue(data.vendor), getCoordinates(data.vendor), getConfidence(data.vendor))}
                                ${createDisplayField('customer', 'Customer', getValue(data.customer), getCoordinates(data.customer), getConfidence(data.customer))}
                            </tbody>
                        </table>
                    </div>
                    <div class="border border-gray-200 rounded-lg bg-white shadow-sm">
                        <label class="block text-sm font-medium text-gray-700 mb-2 px-3 pt-3">Contents</label>
                        <div class="p-3 pt-1 overflow-x-auto">${contentsHtml}</div>
                    </div>
                </div>
            `;
            bolResultCard.appendChild(mainDiv);
            if (bolPageImages.length > 0) {
                bolResultCard.querySelector('#mainCarouselContainer').appendChild(createCarousel());
            }
            
            // Collapsible confidence column logic
            const confidenceHeader = bolResultCard.querySelector('#confidenceHeader');
            if (confidenceHeader) {
                const confidenceChevron = bolResultCard.querySelector('#confidenceChevron');
                const allConfidenceCells = bolResultCard.querySelectorAll('.confidence-col');

                const setConfidenceCollapsed = (isCollapsed) => {
                    if (confidenceChevron) {
                        confidenceChevron.classList.toggle('collapsed', isCollapsed);
                    }
                    allConfidenceCells.forEach(col => {
                        col.classList.toggle('collapsed', isCollapsed);
                    });
                };

                // Collapse by default
                setConfidenceCollapsed(true);

                confidenceHeader.addEventListener('click', () => {
                    const isCurrentlyCollapsed = confidenceChevron ? confidenceChevron.classList.contains('collapsed') : true;
                    setConfidenceCollapsed(!isCurrentlyCollapsed);
                });
            }

            // Re-attach listeners for dynamically created elements
            bolResultCard.querySelectorAll('[data-action="edit"]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const wrapper = e.currentTarget.closest('div');
                    const fieldId = wrapper.querySelector('span[data-field-id]').dataset.fieldId;
                    const fieldLabel = wrapper.querySelector('label').textContent;
                    const currentValue = wrapper.querySelector('span[data-field-id]').textContent;
                    openEditModal(fieldId, fieldLabel, currentValue);
                });
            });

             bolResultCard.querySelectorAll('#carouselImage').forEach(img => {
                 img.addEventListener('click', () => openImageZoomModal());
            });
            
            resultsWrapper.classList.remove('hidden');
            bolResultContainer.classList.remove('hidden');
            attachContentsTableListeners();
        }

        function createDisplayField(id, label, value, coordinates = null, confidence = 0) {
            const coordsData = coordinates ? JSON.stringify(coordinates) : '';
            const coordsClass = coordinates ? 'field-with-coordinates' : '';
            const hasCoords = coordinates && coordinates.x > 0 && coordinates.y > 0;
            
            // Determine confidence indicator color using configurable thresholds
            let indicatorColor = 'bg-gray-400';
            let confidenceTextColor = 'text-gray-600';
            
            if (confidence >= confidenceSettings.high) {
                indicatorColor = 'bg-green-500';
                confidenceTextColor = 'text-green-700';
            } else if (confidence >= confidenceSettings.medium) {
                indicatorColor = 'bg-orange-500';
                confidenceTextColor = 'text-orange-700';
            } else if (confidence > 0) {
                indicatorColor = 'bg-red-500';
                confidenceTextColor = 'text-red-700';
            }
            
            const confidenceDisplay = confidence > 0 ? `${confidence.toFixed(1)}%` : 'N/A';
            const coordsIndicator = hasCoords ? `<span class="w-2 h-2 ${indicatorColor} rounded-full inline-block" title="Hover field to see source location"></span>` : '';
            
            return `
                <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td class="px-4 py-3 border-r border-gray-200 bg-gray-50">
                        <div class="flex items-center gap-2">
                            ${coordsIndicator}
                            <span class="text-sm font-medium text-gray-700">${label}</span>
                        </div>
                    </td>
                    <td class="px-4 py-3 border-r border-gray-200 ${coordsClass}">
                        <span class="text-sm text-gray-900 editable-field" data-field-id="${id}" data-coordinates='${coordsData}' tabindex="0" title="${value || 'N/A'}">${value || 'N/A'}</span>
                    </td>
                    <td class="px-4 py-3 text-center confidence-col">
                        <span class="text-sm font-medium ${confidenceTextColor}">${confidenceDisplay}</span>
                    </td>
                </tr>`;
        }
        
        function openEditModal(fieldId, fieldLabel, currentValue) {
            editModalTitle.textContent = `Edit ${fieldLabel}`;
            editModalContent.innerHTML = `<textarea id="edit-input" class="w-full rounded-md border-gray-300 shadow-sm" rows="3">${currentValue === 'N/A' ? '' : currentValue}</textarea>`;
            saveEditBtn.dataset.fieldId = fieldId;
            fieldEditModal.classList.remove('hidden');
            fieldEditModal.classList.add('flex');
        }
        
        function openImageZoomModal() {
            zoomedImage.src = bolPageImages[currentBolPageIndex];
            imageZoomModal.classList.remove('hidden');
            imageZoomModal.classList.add('flex');
        }

        // Coordinate overlay functionality
        function updateCoordinateOverlays() {
            // Remove existing overlays
            document.querySelectorAll('.coordinate-overlay').forEach(overlay => overlay.remove());
            
            // Check if coordinate overlays are enabled
            const showOverlays = localStorage.getItem('coordinateOverlays') !== 'false';
            if (!showOverlays) return;
            
            const carouselContainer = document.getElementById('carouselContainer');
            const carouselImage = document.getElementById('carouselImage');
            
            if (!carouselContainer || !carouselImage || !window.coordinateData) {
                return;
            }
            
            // Wait for image to load completely
            if (!carouselImage.complete || carouselImage.naturalWidth === 0) {
                setTimeout(() => updateCoordinateOverlays(), 200);
                return;
            }
            
            // Get the actual bounding rectangles to get precise positioning
            const containerRect = carouselContainer.getBoundingClientRect();
            const imageRect = carouselImage.getBoundingClientRect();
            
            // Calculate the image's position within the container
            const imageOffsetX = imageRect.left - containerRect.left;
            const imageOffsetY = imageRect.top - containerRect.top;
            
            // Get actual displayed image dimensions
            const displayWidth = carouselImage.clientWidth;
            const displayHeight = carouselImage.clientHeight;
            
            // Get natural image dimensions (original source image size)
            const naturalWidth = carouselImage.naturalWidth;
            const naturalHeight = carouselImage.naturalHeight;
            
            if (naturalWidth === 0 || naturalHeight === 0 || displayWidth === 0 || displayHeight === 0) {
                return;
            }
            
            // Calculate scale factors from source image pixels to displayed pixels
            const scaleX = displayWidth / naturalWidth;
            const scaleY = displayHeight / naturalHeight;
            
            // Create overlays for all fields that have coordinates for the current page
            document.querySelectorAll('[data-coordinates]').forEach(element => {
                const coordsData = element.getAttribute('data-coordinates');
                if (!coordsData) return;
                
                try {
                    const coordinates = JSON.parse(coordsData);
                    if (coordinates.page === currentBolPageIndex + 1 && coordinates.x > 0 && coordinates.y > 0) {
                        const overlay = document.createElement('div');
                        overlay.className = 'coordinate-overlay';
                        overlay.style.opacity = '0';
                        
                        // AI provides coordinates in pixels of the natural-sized source image.
                        // We scale them to the on-screen display size of the image.
                        const pixelX = coordinates.x;
                        const pixelY = coordinates.y;
                        const pixelWidth = coordinates.width || 100; // Default width if not provided
                        const pixelHeight = coordinates.height || 25; // Default height if not provided
                        
                        // Scale coordinates from natural image space to display space
                        const scaledX = pixelX * scaleX;
                        const scaledY = pixelY * scaleY;
                        const scaledWidth = pixelWidth * scaleX;
                        const scaledHeight = pixelHeight * scaleY;
                        
                        // Add small padding around the highlighted area
                        const padding = 2;
                        
                        // Calculate final position relative to the container
                        // Position overlay at the exact scaled coordinates on the image
                        const left = imageOffsetX + scaledX - padding;
                        const top = imageOffsetY + scaledY - padding;
                        const width = scaledWidth + (padding * 2);
                        const height = scaledHeight + (padding * 2);
                        
                        // Ensure overlay stays within image bounds
                        const finalLeft = Math.max(imageOffsetX, Math.min(left, imageOffsetX + displayWidth - width));
                        const finalTop = Math.max(imageOffsetY, Math.min(top, imageOffsetY + displayHeight - height));
                        const finalWidth = Math.min(width, imageOffsetX + displayWidth - finalLeft);
                        const finalHeight = Math.min(height, imageOffsetY + displayHeight - finalTop);
                        
                        // Ensure minimum size for visibility
                        const minWidth = Math.max(finalWidth, 20);
                        const minHeight = Math.max(finalHeight, 15);
                        
                        // Position the overlay absolutely within the carousel container
                        overlay.style.position = 'absolute';
                        overlay.style.left = `${finalLeft}px`;
                        overlay.style.top = `${finalTop}px`;
                        overlay.style.width = `${minWidth}px`;
                        overlay.style.height = `${minHeight}px`;
                        overlay.style.pointerEvents = 'none'; // Don't interfere with image interaction
                        overlay.style.zIndex = '20'; // Ensure it appears above the image
                        
                        // Add debug info as data attributes
                        overlay.setAttribute('data-debug', `Source: ${pixelX},${pixelY},${pixelWidth}x${pixelHeight} | Scaled: ${scaledX.toFixed(1)},${scaledY.toFixed(1)},${scaledWidth.toFixed(1)}x${scaledHeight.toFixed(1)} | ImageOffset: ${imageOffsetX.toFixed(1)},${imageOffsetY.toFixed(1)} | Final: ${finalLeft.toFixed(1)},${finalTop.toFixed(1)},${minWidth.toFixed(1)}x${minHeight.toFixed(1)}`);
                        
                        carouselContainer.appendChild(overlay);
                        
                        // Store reference to overlay on element for easy access
                        element._coordinateOverlay = overlay;
                        
                        // Add hover event listeners (remove old ones first)
                        element.removeEventListener('mouseenter', element._mouseEnterHandler);
                        element.removeEventListener('mouseleave', element._mouseLeaveHandler);
                        
                        element._mouseEnterHandler = () => {
                            overlay.style.opacity = '1';
                        };
                        element._mouseLeaveHandler = () => {
                            overlay.style.opacity = '0';
                        };
                        
                        element.addEventListener('mouseenter', element._mouseEnterHandler);
                        element.addEventListener('mouseleave', element._mouseLeaveHandler);
                    }
                } catch (e) {
                    console.error('Error parsing coordinates:', e, coordsData);
                }
            });
        }

        // Add resize observer to update overlays when image size changes
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(() => {
                setTimeout(() => updateCoordinateOverlays(), 100);
            });
            
            // Observe the carousel container
            setTimeout(() => {
                const carouselContainer = document.getElementById('carouselContainer');
                if (carouselContainer) {
                    resizeObserver.observe(carouselContainer);
                }
            }, 1000);
        }

        zoomPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentBolPageIndex = (currentBolPageIndex - 1 + bolPageImages.length) % bolPageImages.length;
            zoomedImage.src = bolPageImages[currentBolPageIndex];
            bolResultCard.querySelector('#carouselImage').src = bolPageImages[currentBolPageIndex];
            bolResultCard.querySelector('#pageCounter').textContent = `${currentBolPageIndex + 1} / ${bolPageImages.length}`;
        });
        zoomNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentBolPageIndex = (currentBolPageIndex + 1) % bolPageImages.length;
            zoomedImage.src = bolPageImages[currentBolPageIndex];
            bolResultCard.querySelector('#carouselImage').src = bolPageImages[currentBolPageIndex];
            bolResultCard.querySelector('#pageCounter').textContent = `${currentBolPageIndex + 1} / ${bolPageImages.length}`;
        });

        function handleExportBolData() {
            const card = document.getElementById('bolResultCard');
            if (!card) return;

            const headers = ["BoL Number", "Order Number", "Seal Number", "Shipment Number", "Delivery Number", "SCAC", "Date", "Carrier", "Temperature", "Signed", "Origin", "Destination", "Vendor", "Customer", "Item #", "Content Description", "Content Amount", "Content Weight", "Use By Date"];
            const rows = [];
            
            const getValue = (id) => card.querySelector(`[data-field-id="${id}"]`) ? card.querySelector(`[data-field-id="${id}"]`).textContent : 'N/A';
            
            const baseData = {
                bol_number: getValue('bol_number'),
                order_number: getValue('order_number'),
                seal_number: getValue('seal_number'),
                shipment_number: getValue('shipment_number'),
                delivery_number: getValue('delivery_number'),
                scac: getValue('scac'),
                date: getValue('date'),
                carrier: getValue('carrier'),
                temperature: getValue('temperature'),
                signed: getValue('signed'),
                origin: getValue('origin'),
                destination: getValue('destination'),
                vendor: getValue('vendor'),
                customer: getValue('customer'),
            };

            const contentRows = card.querySelectorAll('tbody > tr');
            if (contentRows.length > 0 && contentRows[0].cells.length > 1) {
                 contentRows.forEach(row => {
                    rows.push([
                        baseData.bol_number, baseData.order_number, baseData.seal_number, baseData.shipment_number, baseData.delivery_number, baseData.scac, baseData.date, baseData.carrier, baseData.temperature, baseData.signed, baseData.origin, baseData.destination, baseData.vendor, baseData.customer,
                        row.cells[0] ? row.cells[0].innerText : 'N/A', // Item #
                        row.cells[1] ? row.cells[1].innerText : 'N/A', // Description
                        row.cells[2] ? row.cells[2].innerText : 'N/A', // Amount
                        row.cells[3] ? row.cells[3].innerText : 'N/A', // Weight
                        row.cells[4] ? row.cells[4].innerText : 'N/A'  // Use By Date
                    ].map(d => `"${String(d).replace(/"/g, '""')}"`).join(','));
                });
            } else {
                 rows.push([baseData.bol_number, baseData.order_number, baseData.seal_number, baseData.shipment_number, baseData.delivery_number, baseData.scac, baseData.date, baseData.carrier, baseData.temperature, baseData.signed, baseData.origin, baseData.destination, baseData.vendor, baseData.customer, 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'].map(d => `"${String(d).replace(/"/g, '""')}"`).join(','));
            }

            let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.join("\n");
            const link = document.createElement("a");
            link.setAttribute("href", encodeURI(csvContent));
            link.setAttribute("download", "bol_data.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        function getApiKey() {
            const isGpt = modelSelector.value.startsWith('gpt');
            const isClaude = modelSelector.value.startsWith('claude');
            const key = (isGpt || isClaude) ? openaiApiKeyInput.value.trim() : googleApiKeyInput.value.trim();
            if (!key) throw new Error(`Please provide an ${(isGpt || isClaude) ? 'OpenAI' : 'Google AI'} API Key.`);
            return key;
        }
        
        function resetUI() {
            loading.classList.add('hidden');
            parseBolBtn.disabled = true;
            resultsWrapper.classList.add('hidden');
            messageContainer.classList.add('hidden');
            bolResultContainer.classList.add('hidden');
            
            // Reset progress state
            if (progressInterval) {
                clearInterval(progressInterval);
                progressInterval = null;
            }
            stopMessageRotation();
            currentProgress = 0;
            setProgress(0, '');
        }
        
        function displayMessage(msg) {
            messageContainer.classList.remove('hidden');
            message.innerText = msg;
        }

        const howToBtnOpenAI = document.getElementById('howToBtnOpenAI');
        if (howToBtnOpenAI) {
            howToBtnOpenAI.addEventListener('click', () => {
                updateKeyHelpPanel();
                sidePanel.classList.remove('translate-x-full');
                sidePanelOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        }

        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('editable-field')) {
                const span = e.target;
                const currentValue = span.textContent === 'N/A' ? '' : span.textContent;
                const input = document.createElement(span.dataset.fieldId === 'origin' || span.dataset.fieldId === 'destination' ? 'textarea' : 'input');
                input.value = currentValue;
                input.className = 'w-full rounded-md border border-blue-300 focus:ring-blue-500 focus:border-blue-500 p-1 bg-white editable-input';
                input.style.minHeight = span.dataset.fieldId === 'origin' || span.dataset.fieldId === 'destination' ? '2.5em' : '';
                input.addEventListener('blur', function() {
                    span.textContent = input.value || 'N/A';
                    span.style.display = '';
                    input.replaceWith(span);
                });
                input.addEventListener('keydown', function(ev) {
                    if (ev.key === 'Enter' && input.tagName !== 'TEXTAREA') {
                        input.blur();
                    }
                });
                span.parentNode.replaceChild(input, span);
                input.focus();
                input.select();
            }
            // Table cell editing
            if (e.target.classList.contains('editable-table-cell')) {
                const td = e.target;
                const currentValue = td.textContent === 'N/A' ? '' : td.textContent;
                const input = document.createElement('input');
                input.value = currentValue;
                input.className = 'w-full rounded-md border border-blue-300 focus:ring-blue-500 focus:border-blue-500 p-1 bg-white editable-input';
                input.addEventListener('blur', function() {
                    td.textContent = input.value || 'N/A';
                    td.style.display = '';
                    input.replaceWith(td);
                });
                input.addEventListener('keydown', function(ev) {
                    if (ev.key === 'Enter') {
                        input.blur();
                    }
                });
                td.parentNode.replaceChild(input, td);
                input.focus();
                input.select();
            }
            // Add row
            if (e.target.id === 'addRowBtn') {
                const table = document.getElementById('contentsTable').getElementsByTagName('tbody')[0];
                const row = document.createElement('tr');
                row.className = 'border-b border-gray-200 hover:bg-gray-50 transition-colors';
                row.innerHTML = `
                    <td class="p-3 editable-table-cell border-r border-gray-200" data-col="item_number">N/A</td>
                    <td class="p-3 editable-table-cell border-r border-gray-200" data-col="description">N/A</td>
                    <td class="p-3 editable-table-cell border-r border-gray-200" data-col="amount">N/A</td>
                    <td class="p-3 editable-table-cell border-r border-gray-200" data-col="weight">N/A</td>
                    <td class="p-3 editable-table-cell border-r border-gray-200" data-col="use_by_date">N/A</td>
                    <td class="p-3 text-center"><button class="remove-row-btn text-red-500 hover:text-red-700 font-bold text-lg transition-colors" title="Remove row">&minus;</button></td>
                `;
                table.appendChild(row);
            }
            // Remove row
            if (e.target.classList.contains('remove-row-btn')) {
                const row = e.target.closest('tr');
                row.parentNode.removeChild(row);
            }
        });

        function attachContentsTableListeners() {
            const table = document.getElementById('contentsTable');
            if (!table) return;
            // Remove any previous event listeners by cloning
            const newTable = table.cloneNode(true);
            table.parentNode.replaceChild(newTable, table);
            // Use only event delegation on the table
            newTable.addEventListener('click', function(e) {
                if (e.target.classList.contains('editable-table-cell')) {
                    const td = e.target;
                    const currentValue = td.textContent === 'N/A' ? '' : td.textContent;
                    const input = document.createElement('input');
                    input.value = currentValue;
                    input.className = 'w-full rounded-md border border-blue-300 focus:ring-blue-500 focus:border-blue-500 p-1 bg-white editable-input';
                    input.addEventListener('blur', function() {
                        td.textContent = input.value || 'N/A';
                        td.style.display = '';
                        input.replaceWith(td);
                    });
                    input.addEventListener('keydown', function(ev) {
                        if (ev.key === 'Enter') {
                            input.blur();
                        }
                    });
                    td.parentNode.replaceChild(input, td);
                    input.focus();
                    input.select();
                }
                if (e.target.classList.contains('remove-row-btn')) {
                    const row = e.target.closest('tr');
                    row.parentNode.removeChild(row);
                }
                if (e.target.id === 'addRowBtn') {
                    const tbody = newTable.getElementsByTagName('tbody')[0];
                    const row = document.createElement('tr');
                    row.className = 'border-b border-gray-200 hover:bg-gray-50 transition-colors';
                    row.innerHTML = `
                        <td class="p-3 editable-table-cell border-r border-gray-200" data-col="item_number">N/A</td>
                        <td class="p-3 editable-table-cell border-r border-gray-200" data-col="description">N/A</td>
                        <td class="p-3 editable-table-cell border-r border-gray-200" data-col="amount">N/A</td>
                        <td class="p-3 editable-table-cell border-r border-gray-200" data-col="weight">N/A</td>
                        <td class="p-3 editable-table-cell border-r border-gray-200" data-col="use_by_date">N/A</td>
                        <td class="p-3 text-center"><button class="remove-row-btn text-red-500 hover:text-red-700 font-bold text-lg transition-colors" title="Remove row">&minus;</button></td>
                    `;
                    tbody.appendChild(row);
                }
            });
        }

        // Hide AI config section initially and toggle on triple-click of logo
        const aiConfigSection = document.getElementById('aiConfigSection');
        const vectorLogo = document.getElementById('vectorLogo');
        let logoClickCount = 0;
        let logoClickTimer = null;
        function toggleAIConfigSection() {
            aiConfigSection.classList.toggle('hidden');
        }
        vectorLogo.addEventListener('click', function() {
            logoClickCount++;
            if (logoClickTimer) clearTimeout(logoClickTimer);
            logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 1000);
            if (logoClickCount === 3) {
                toggleAIConfigSection();
                logoClickCount = 0;
            }
        });

        // Raw JSON modal logic
        const rawResultsBtn = document.getElementById('rawResultsBtn');
        const rawJsonModal = document.getElementById('rawJsonModal');
        const rawJsonContent = document.getElementById('rawJsonContent');
        const closeRawJsonBtn = document.getElementById('closeRawJsonBtn');

        if (rawResultsBtn) {
            rawResultsBtn.addEventListener('click', () => {
                if (rawJsonResult) {
                    try {
                        const formattedJson = JSON.stringify(JSON.parse(rawJsonResult), null, 2);
                        rawJsonContent.textContent = formattedJson;
                    } catch (e) {
                        rawJsonContent.textContent = rawJsonResult; // Show raw text if not valid JSON
                    }
                } else {
                    rawJsonContent.textContent = 'No raw data available.';
                }
                rawJsonModal.classList.remove('hidden');
                rawJsonModal.classList.add('flex');
            });
        }
        if(closeRawJsonBtn) {
            closeRawJsonBtn.addEventListener('click', () => {
                rawJsonModal.classList.add('hidden');
                rawJsonModal.classList.remove('flex');
            });
        }
        if(rawJsonModal) {
            rawJsonModal.addEventListener('click', (e) => {
                if (e.target === rawJsonModal) {
                    rawJsonModal.classList.add('hidden');
                    rawJsonModal.classList.remove('flex');
                }
            });
        }

        // Settings functionality - replaces old logo triple-click functionality
        if (settingsBtn && aiConfigSection) {
            settingsBtn.addEventListener('click', function() {
                aiConfigSection.classList.toggle('hidden');
            });
        }
        
        // Settings Tab Navigation
        function switchSettingsTab(activeTab) {
            // Remove active class from all tabs and hide all content
            [settingsTabGeneral, settingsTabAI, settingsTabAPI, settingsTabConfidence].forEach(tab => {
                if (tab) tab.classList.remove('active');
            });
            [settingsContentGeneral, settingsContentAI, settingsContentAPI, settingsContentConfidence].forEach(content => {
                if (content) content.classList.add('hidden');
            });
            
            // Show active tab and content
            if (activeTab && document.getElementById(activeTab)) {
                document.getElementById(activeTab).classList.add('active');
                const contentId = activeTab.replace('Tab', 'Content');
                const content = document.getElementById(contentId);
                if (content) content.classList.remove('hidden');
            }
        }
        
        // Settings Tab Event Listeners
        if (settingsTabGeneral) settingsTabGeneral.addEventListener('click', () => switchSettingsTab('settingsTabGeneral'));
        if (settingsTabAI) settingsTabAI.addEventListener('click', () => switchSettingsTab('settingsTabAI'));
        if (settingsTabAPI) settingsTabAPI.addEventListener('click', () => switchSettingsTab('settingsTabAPI'));
        if (settingsTabConfidence) settingsTabConfidence.addEventListener('click', () => switchSettingsTab('settingsTabConfidence'));
        
        // Dark Mode Toggle
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', function() {
                const isDark = this.checked;
                if (isDark) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                }
            });
        }
        

        
        // Auto Save Toggle
        if (autoSaveToggle) {
            autoSaveToggle.addEventListener('change', function() {
                const isAutoSave = this.checked;
                localStorage.setItem('autoSave', isAutoSave.toString());
            });
        }
        
        // Coordinate Overlays Toggle
        if (coordinateOverlaysToggle) {
            coordinateOverlaysToggle.addEventListener('change', function() {
                const showOverlays = this.checked;
                localStorage.setItem('coordinateOverlays', showOverlays.toString());
                // Update overlay visibility
                const overlays = document.querySelectorAll('.coordinate-overlay');
                overlays.forEach(overlay => {
                    overlay.style.display = showOverlays ? 'block' : 'none';
                });
            });
        }
        
        // Show Confidence Indicators Toggle
        if (showConfidenceIndicators) {
            showConfidenceIndicators.addEventListener('change', function() {
                const showIndicators = this.checked;
                localStorage.setItem('showConfidenceIndicators', showIndicators.toString());
                // Update confidence indicator visibility
                const indicators = document.querySelectorAll('.w-2.h-2.rounded-full');
                indicators.forEach(indicator => {
                    indicator.style.display = showIndicators ? 'inline-block' : 'none';
                });
            });
        }
        
        // Confidence slider functionality
        function updateConfidenceDisplay() {
            const highValue = parseInt(highConfidenceThreshold.value);
            const mediumValue = parseInt(mediumConfidenceThreshold.value);
            
            // Update value displays
            document.getElementById('highValueDisplay').textContent = `${highValue}%`;
            document.getElementById('mediumValueDisplay').textContent = `${mediumValue}%`;
            document.getElementById('lowRangeDisplay').textContent = `< ${mediumValue}%`;
            
            // Update preview
            document.getElementById('previewHigh').textContent = `${highValue}%+`;
            document.getElementById('previewMedium').textContent = `${mediumValue}%-${highValue - 1}%`;
            document.getElementById('previewLow').textContent = `<${mediumValue}%`;
            
            // Ensure medium is always less than high
            if (mediumValue >= highValue) {
                mediumConfidenceThreshold.value = highValue - 1;
                updateConfidenceDisplay();
            }
        }
        
        // Add event listeners for sliders
        if (highConfidenceThreshold) {
            highConfidenceThreshold.addEventListener('input', updateConfidenceDisplay);
        }
        if (mediumConfidenceThreshold) {
            mediumConfidenceThreshold.addEventListener('input', updateConfidenceDisplay);
        }
        
        // Reset to defaults functionality
        if (resetConfidenceDefaults) {
            resetConfidenceDefaults.addEventListener('click', function() {
                highConfidenceThreshold.value = 95;
                mediumConfidenceThreshold.value = 80;
                updateConfidenceDisplay();
            });
        }
        
        // Save confidence settings
        if (saveConfidenceSettings) {
            saveConfidenceSettings.addEventListener('click', function() {
                confidenceSettings.high = parseInt(highConfidenceThreshold.value);
                confidenceSettings.medium = parseInt(mediumConfidenceThreshold.value);
                localStorage.setItem('confidenceSettings', JSON.stringify(confidenceSettings));
                
                // Show success message
                const originalText = saveConfidenceSettings.textContent;
                saveConfidenceSettings.textContent = 'Saved!';
                saveConfidenceSettings.classList.add('bg-green-600');
                saveConfidenceSettings.classList.remove('bg-blue-600');
                
                setTimeout(() => {
                    saveConfidenceSettings.textContent = originalText;
                    saveConfidenceSettings.classList.remove('bg-green-600');
                    saveConfidenceSettings.classList.add('bg-blue-600');
                }, 2000);
            });
        }
        
        // Initialize confidence display on page load
        updateConfidenceDisplay();

        // ===== NEW UPLOAD METHOD FUNCTIONALITY =====

        // Upload Method Switching
        function switchUploadMethod(method) {
            currentUploadMethod = method;
            
            // Update button states - remove active from all buttons first
            document.querySelectorAll('.upload-method-btn').forEach(btn => {
                btn.classList.remove('active');
                // Reset to default styling
                btn.classList.remove('border-blue-500', 'bg-blue-50', 'text-blue-700');
                btn.classList.add('border-gray-300', 'bg-white', 'text-gray-700');
            });
            
            // Add active state to selected button
            const activeButton = document.getElementById(`uploadMethod${method.charAt(0).toUpperCase() + method.slice(1)}`);
            if (activeButton) {
                activeButton.classList.add('active');
                // Apply active styling
                activeButton.classList.remove('border-gray-300', 'bg-white', 'text-gray-700');
                activeButton.classList.add('border-blue-500', 'bg-blue-50', 'text-blue-700');
            }
            
            // Show/hide sections
            document.querySelectorAll('.upload-section').forEach(section => {
                section.classList.add('hidden');
            });
            
            if (method === 'pdf') {
                pdfUploadSection.classList.remove('hidden');
            } else if (method === 'camera') {
                cameraSection.classList.remove('hidden');
            } else if (method === 'vector') {
                vectorApiSection.classList.remove('hidden');
                // Load documents automatically and start auto-refresh
                setTimeout(() => {
                    loadDocumentsFromVector();
                    startVectorAutoRefresh();
                }, 100);
            }
            
            // Reset states
            resetUploadStates();
        }

        function resetUploadStates() {
            // Reset PDF
            bolFile = null;
            bolPageImages = [];
            pdfFileNameDisplay.textContent = '';
            bolPreviewContainer.innerHTML = '';
            
            // Reset camera
            if (cameraStream) {
                stopCameraCapture();
            }
            
            // Reset Vector API
            selectedVectorDocument = null;
            vectorApiStatus.classList.add('hidden');
            vectorDocumentsList.classList.add('hidden');
            stopVectorAutoRefresh();
            
            // Reset analyze status
            hideAnalyzeStatus();
            
            // Reset UI states
            parseBolBtn.disabled = true;
            resultsWrapper.classList.add('hidden');
            messageContainer.classList.add('hidden');
            bolResultContainer.classList.add('hidden');
        }

        // ===== CAMERA FUNCTIONALITY =====

        async function startCameraCapture() {
            try {
                cameraStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        facingMode: 'environment', // Use back camera if available
                        width: { ideal: 1920 },
                        height: { ideal: 1080 }
                    } 
                });
                
                cameraVideo.srcObject = cameraStream;
                cameraControls.classList.add('hidden');
                cameraPreview.classList.remove('hidden');
                
            } catch (error) {
                console.error('Error accessing camera:', error);
                showVectorStatus('error', 'Camera access denied. Please ensure camera permissions are granted and try again.');
            }
        }

        function capturePhotoFromCamera() {
            const canvas = captureCanvas;
            const context = canvas.getContext('2d');
            
            // Set canvas size to match video
            canvas.width = cameraVideo.videoWidth;
            canvas.height = cameraVideo.videoHeight;
            
            // Draw the video frame to canvas (flip horizontally to match preview)
            context.scale(-1, 1);
            context.drawImage(cameraVideo, -canvas.width, 0, canvas.width, canvas.height);
            context.scale(-1, 1); // Reset scale
            
            // Convert to blob and create image
            canvas.toBlob((blob) => {
                const imageUrl = URL.createObjectURL(blob);
                capturedImagePreview.src = imageUrl;
                
                // Store the image data for processing
                canvas.toBlob((blob) => {
                    const file = new File([blob], 'captured-document.jpg', { type: 'image/jpeg' });
                    bolFile = file;
                    
                    // Convert to image for processing
                    const img = new Image();
                    img.onload = () => {
                        bolPageImages = [canvas.toDataURL('image/jpeg', 0.9)];
                        parseBolBtn.disabled = false;
                        URL.revokeObjectURL(imageUrl);
                    };
                    img.src = imageUrl;
                }, 'image/jpeg', 0.9);
                
                cameraPreview.classList.add('hidden');
                capturedImage.classList.remove('hidden');
            }, 'image/jpeg', 0.9);
        }

        function stopCameraCapture() {
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
                cameraStream = null;
            }
            cameraPreview.classList.add('hidden');
            cameraControls.classList.remove('hidden');
            capturedImage.classList.add('hidden');
        }

        function retakePhotoCapture() {
            capturedImage.classList.add('hidden');
            startCameraCapture();
        }

        function useCapturedPhoto() {
            // Photo is already processed in capturePhotoFromCamera
                            showAnalyzeStatus('success', 'Photo captured successfully! Ready for analysis!');
        }

        // ===== VECTOR API FUNCTIONALITY =====

        async function loadDocumentsFromVector() {
            const endpoint = settingsVectorApiEndpoint.value.trim();
            const token = settingsVectorBearerToken.value.trim();
            const dateRange = parseInt(settingsVectorDateRange.value) || 30;
            const resultSize = parseInt(settingsVectorResultSize.value) || 100;
            
            if (!endpoint || !token) {
                showVectorStatus('error', 'Please provide both API endpoint and bearer token.');
                return;
            }
            
            showVectorStatus('info', 'Loading documents from Vector API...');
            
            // Calculate date range
            const endDate = new Date();
            console.log('End date:', endDate);
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - dateRange);
            console.log('Start date:', startDate, 'Date range:', dateRange, 'days');
            
            const gteDate = startDate.toISOString();
            const lteDate = endDate.toISOString();
            
            // Construct request body for document query
            const requestBody = {
                "filters": [
                    {
                        "type": "containsEdge",
                        "path": "mixins.active",
                        "values": [
                            {
                                "entityId": "11111111-0000-0000-0000-000000000011"
                            }
                        ]
                    },
                    {
                        "type": "range",
                        "entityType": "/1.0/entities/metadata/entity.json",
                        "label": "Posted Date",
                        "path": "creationDate",
                        "gte": gteDate,
                        "lte": lteDate
                    },
                    {
                        "type": "match",
                        "path": "core_documents_shipment.facility.displayName",
                        "value": localStorage.getItem('vectorFacility') || 'US Cold Lumberton'
                    }
                ],
                "orders": [
                    {
                        "path": "creationDate",
                        "type": "descending",
                        "label": "Posted Date"
                    }
                ],
                "metadata": {
                    "size": resultSize,
                    "offset": 0,
                    "maxSizePerGroup": 25,
                    "shouldIncludeLeafEntities": true
                }
            };
            
            console.log('Making API request to:', endpoint);
            console.log('Request body:', JSON.stringify(requestBody, null, 2));
            console.log('Using facility:', localStorage.getItem('vectorFacility') || 'US Cold Lumberton');
            
            try {
                let response;
                
                try {
                    // Try direct API call first
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
                    
                    response = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(requestBody),
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                } catch (corsError) {
                    // Fallback to CORS proxy
                    showVectorStatus('info', 'Retrying with CORS proxy...');
                    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(endpoint)}`;
                    response = await fetch(proxyUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(requestBody)
                    });
                }
                
                if (!response.ok) {
                    const errorText = await response.text();
                    let errorMessage = `API call failed: ${response.status}`;
                    
                    if (response.status === 401) {
                        errorMessage = 'Authentication failed. Please check your bearer token.';
                    } else if (response.status === 403) {
                        errorMessage = 'Access forbidden. Your token may not have the required permissions.';
                    } else if (response.status === 404) {
                        errorMessage = 'API endpoint not found. Please verify the endpoint URL.';
                    } else if (response.status === 429) {
                        errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
                    } else if (errorText.includes('corsdemo')) {
                        errorMessage = 'CORS proxy access required. Please visit https://cors-anywhere.herokuapp.com/corsdemo to request temporary access.';
                    }
                    
                    throw new Error(errorMessage);
                }
                
                const responseData = await response.json();
                console.log('Vector API Response:', responseData);
                console.log('Response children count:', responseData?.children?.length || 0);
                
                const documents = transformVectorDocuments(responseData);
                console.log('Transformed documents count:', documents.length);
                
                if (documents.length === 0) {
                    showVectorStatus('warning', 'No documents found in Vector API response. Please check your API configuration in Settings.');
                    console.log('No documents after transformation. Check facility name, date range, and API response structure.');
                    return;
                }
                
                displayVectorDocuments(documents);
                showVectorStatus('success', `Successfully loaded ${documents.length} documents.`);
                
            } catch (error) {
                console.error('Vector API error:', error);
                let errorMessage = error.message;
                
                if (error.name === 'AbortError') {
                    errorMessage = 'Request timed out after 30 seconds. Please try reducing the date range or result size.';
                } else if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
                    errorMessage = 'Network error: Unable to connect to the Vector API. Please check your internet connection and API endpoint.';
                }
                
                showVectorStatus('error', errorMessage);
            }
        }

        function transformVectorDocuments(apiData) {
            console.log('Transforming Vector documents...', apiData);
            if (!apiData || !apiData.children) {
                console.log('No children found in API data');
                return [];
            }
            
            console.log(`Processing ${apiData.children.length} documents`);
            
            return apiData.children.map((item, index) => {
                
                // Extract document data from the nested structure
                const itemData = item.data || {};
                const documentInfo = itemData.document || {};
                const attachments = documentInfo.attachments || {};
                const precomputation = itemData.precomputation || {};
                
                // Get document name from precomputation.displayName or document.name
                const documentName = precomputation.displayName || documentInfo.name || `Document ${index + 1}`;
                
                // Get document URLs - try multiple sources
                let documentUrl = null;
                
                // First try the aggregate PDF URL
                if (attachments.aggregate && attachments.aggregate.uri) {
                    documentUrl = attachments.aggregate.uri;
                } else if (attachments.files && attachments.files.length > 0) {
                    // Try to get the first file's URL
                    const firstFile = attachments.files[0];
                    documentUrl = firstFile.uri || firstFile.transformUri;
                }
                
                // Get file type
                let fileType = 'Document';
                if (attachments.aggregate) {
                    fileType = attachments.aggregate.type === 'pdf' ? 'PDF' : attachments.aggregate.type;
                } else if (attachments.files && attachments.files.length > 0) {
                    fileType = attachments.files[0].type || 'Document';
                }
                
                // Get dates
                const creationDate = itemData.creationDate;
                const modifiedDate = itemData.modifiedDate || creationDate;
                
                // Extract shipping-specific data from various sources
                const extractValue = (paths) => {
                    for (const path of paths) {
                        const value = path.split('.').reduce((obj, key) => obj?.[key], itemData);
                        if (value !== undefined && value !== null && value !== '') {
                            return value;
                        }
                    }
                    return null;
                };
                
                // Extract shipping data from the document structure
                const shippingData = {
                    checkInTime: extractValue([
                        'core_documents_shipment.checkinTime.dateTime',
                        'core_documents_shipment.checkInTime.dateTime',
                        'core_documents_shipment.checkinTime',
                        'core_documents_shipment.checkInTime'
                    ]),
                    signedDate: extractValue([
                        'core_documents_shipment.receiverSignature.signedDate',
                        'core_documents_shipment.receiverSignature.signedDate',
                        'core_documents_shipment.signedDate',
                        'core_documents_shipment.signature.signedDate'
                    ]),
                    driver: extractValue([
                        'core_documents_shipment.driver.displayName',
                        'core_documents_shipment.driver.name',
                        'owner.user.displayName',
                        'createdBy.displayName'
                    ]),
                    firm: extractValue([
                        'core_documents_shipment.driver.denormalizedProperties.owner.firm.displayName',
                        'owner.firm.displayName',
                        'core_documents_shipment.driver.firm.displayName',
                        'core_documents_shipment.carrier.displayName'
                    ]),
                    receiver: extractValue([
                        'core_documents_shipment.receiverSignature.signer',
                        'core_documents_shipment.receiverSignature.signedBy.user.displayName',
                        'core_documents_shipment.receiver.displayName',
                        'core_documents_shipment.signer'
                    ]),
                    trailerNumber: extractValue([
                        'core_documents_shipment.trailerNumber',
                        'core_documents_shipment.trailer.number',
                        'core_documents_shipment.trailer',
                        'core_documents_shipment.trailerNo'
                    ]),
                    sealNumber: extractValue([
                        'core_documents_shipment.seal.number',
                        'core_documents_shipment.sealNumber',
                        'core_documents_shipment.seal',
                        'core_documents_shipment.sealNo'
                    ]),
                    setTemperature: extractValue([
                        'core_documents_shipment.setTemperature',
                        'core_documents_shipment.temperature',
                        'core_documents_shipment.tempSetting',
                        'core_documents_shipment.setTemp'
                    ])
                };
                
                const doc = {
                    id: itemData.uniqueId || `doc_${index}`,
                    name: documentName,
                    type: fileType,
                    size: attachments.aggregate ? 'PDF Document' : 'Unknown',
                    modifiedDate: modifiedDate,
                    creationDate: creationDate,
                    url: documentUrl,
                    // Add shipping-specific fields
                    checkInTime: shippingData.checkInTime,
                    signedDate: shippingData.signedDate,
                    driver: shippingData.driver,
                    firm: shippingData.firm,
                    receiver: shippingData.receiver,
                    trailerNumber: shippingData.trailerNumber,
                    sealNumber: shippingData.sealNumber,
                    setTemperature: shippingData.setTemperature,
                    metadata: {
                        originalData: itemData,
                        attachments: attachments,
                        precomputation: precomputation
                    }
                };
                
                console.log(`Document ${index + 1}:`, {
                    name: doc.name,
                    url: doc.url,
                    hasUrl: !!doc.url,
                    checkInTime: doc.checkInTime,
                    driver: doc.driver,
                    firm: doc.firm
                });
                
                return doc;
            }).filter(doc => {
                const hasUrl = !!doc.url;
                if (!hasUrl) {
                    console.log(`Filtering out document without URL: ${doc.name}`);
                }
                return hasUrl;
            }); // Only include documents with download URLs
        }

        let allVectorDocuments = []; // Store all documents for search
        let currentPage = 0;
        const documentsPerPage = 10;

        function displayVectorDocuments(documents) {
            allVectorDocuments = documents; // Store for search functionality
            currentPage = 0; // Reset to first page
            renderDocuments(documents);
            
            // Setup search functionality (remove existing listener first)
            if (documentSearchInput) {
                // Clear any existing value and remove old listeners
                documentSearchInput.value = '';
                documentSearchInput.removeEventListener('input', handleDocumentSearch);
                documentSearchInput.addEventListener('input', handleDocumentSearch);
            }
            
            vectorDocumentsList.classList.remove('hidden');
        }

        function handleDocumentSearch(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            currentPage = 0; // Reset to first page on search
            if (searchTerm === '') {
                renderDocuments(allVectorDocuments);
            } else {
                const filteredDocs = allVectorDocuments.filter(doc => 
                    doc.name.toLowerCase().includes(searchTerm) ||
                    doc.type.toLowerCase().includes(searchTerm) ||
                    (doc.id && doc.id.toLowerCase().includes(searchTerm)) ||
                    (doc.driver && doc.driver.toLowerCase().includes(searchTerm)) ||
                    (doc.firm && doc.firm.toLowerCase().includes(searchTerm)) ||
                    (doc.receiver && doc.receiver.toLowerCase().includes(searchTerm)) ||
                    (doc.trailerNumber && doc.trailerNumber.toLowerCase().includes(searchTerm)) ||
                    (doc.sealNumber && doc.sealNumber.toLowerCase().includes(searchTerm)) ||
                    (doc.setTemperature && doc.setTemperature.toLowerCase().includes(searchTerm))
                );
                renderDocuments(filteredDocs);
            }
        }

        function renderDocuments(documents) {
            documentsTableBody.innerHTML = '';
            
            // Calculate pagination
            const totalCount = documents.length;
            const totalPages = Math.ceil(totalCount / documentsPerPage);
            const startIndex = currentPage * documentsPerPage;
            const endIndex = Math.min(startIndex + documentsPerPage, totalCount);
            const currentPageDocs = documents.slice(startIndex, endIndex);
            
            // Update document count and pagination info
            const documentsCount = document.getElementById('documentsCount');
            if (documentsCount) {
                const allDocsCount = allVectorDocuments.length;
                let countText = '';
                if (documents.length === allDocsCount) {
                    countText = `${startIndex + 1}-${endIndex} of ${totalCount} documents`;
                } else {
                    countText = `${startIndex + 1}-${endIndex} of ${totalCount} filtered documents (${allDocsCount} total)`;
                }
                if (totalPages > 1) {
                    countText += ` • Page ${currentPage + 1} of ${totalPages}`;
                }
                documentsCount.textContent = countText;
            }
            
            // Update pagination controls
            updatePaginationControls(totalPages);
            
            if (currentPageDocs.length === 0) {
                noDocumentsMessage.classList.remove('hidden');
                return;
            } else {
                noDocumentsMessage.classList.add('hidden');
            }

            currentPageDocs.forEach(doc => {
                const row = document.createElement('tr');
                row.className = 'hover:bg-gray-50';
                row.dataset.documentId = doc.id;
                
                // Format dates and times
                const formatDateTime = (dateStr) => {
                    if (!dateStr) return '-';
                    try {
                        const date = new Date(dateStr);
                        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    } catch (e) {
                        return dateStr;
                    }
                };
                
                const formatDate = (dateStr) => {
                    if (!dateStr) return '-';
                    try {
                        return new Date(dateStr).toLocaleDateString();
                    } catch (e) {
                        return dateStr;
                    }
                };
                
                const formatValue = (value, type = 'default') => {
                    const isEmpty = !value || value === '';
                    const displayValue = isEmpty ? '-' : value;
                    const cssClass = isEmpty ? 'data-cell empty' : 'data-cell';
                    
                    if (type === 'trailer-seal') {
                        return `<span class="${cssClass} trailer-seal">${displayValue}</span>`;
                    } else if (type === 'temperature') {
                        return `<span class="${cssClass} temperature">${displayValue}</span>`;
                    } else {
                        return `<span class="${cssClass}">${displayValue}</span>`;
                    }
                };
                
                const receivedDate = formatDate(doc.modifiedDate || doc.creationDate);
                const checkInTime = formatDateTime(doc.checkInTime);
                const signedDate = formatDate(doc.signedDate);

                row.innerHTML = `
                    <td class="px-3 py-3 w-52">
                        <div class="document-name truncate pr-2" title="${doc.name}">${doc.name}</div>
                    </td>
                    <td class="px-3 py-3 w-32 text-sm text-gray-500">
                        <span class="data-cell">${receivedDate}</span>
                    </td>
                    <td class="px-3 py-3 w-32 text-sm text-gray-500">
                        <span class="data-cell">${signedDate}</span>
                    </td>
                    <td class="px-3 py-3 w-24 text-sm text-gray-500" title="${doc.trailerNumber || 'No trailer number'}">${formatValue(doc.trailerNumber, 'trailer-seal')}</td>
                    <td class="px-3 py-3 w-24 text-sm text-gray-500" title="${doc.sealNumber || 'No seal number'}">${formatValue(doc.sealNumber, 'trailer-seal')}</td>
                    <td class="px-3 py-3 w-24 text-sm text-gray-500" title="${doc.setTemperature || 'No temperature setting'}">${formatValue(doc.setTemperature, 'temperature')}</td>
                    <td class="px-3 py-3 w-32 text-sm text-gray-500" title="${doc.driver || 'No driver information'}">${formatValue(doc.driver)}</td>
                    <td class="px-3 py-3 w-32 text-sm text-gray-500" title="${doc.firm || 'No firm information'}">${formatValue(doc.firm)}</td>
                    <td class="px-3 py-3 w-32 text-sm text-gray-500" title="${doc.receiver || 'No receiver information'}">${formatValue(doc.receiver)}</td>
                    <td class="px-3 py-3 w-32 text-sm text-gray-500">
                        <span class="data-cell">${checkInTime}</span>
                    </td>
                    <td class="px-3 py-3 w-24">
                        <button class="preview-btn text-blue-600 hover:text-blue-800 text-sm font-medium" onclick="event.stopPropagation(); previewDocument('${doc.id}')" title="Preview Document">
                            Preview
                        </button>
                    </td>
                `;

                row.addEventListener('click', () => selectDocumentForAnalysis(doc.id));
                documentsTableBody.appendChild(row);
            });

            // Restore selection state
            if (selectedVectorDocument) {
                const selectedRow = document.querySelector(`tr[data-document-id="${selectedVectorDocument.id}"]`);
                if (selectedRow) {
                    selectedRow.classList.add('selected');
                }
            }
        }

        function updatePaginationControls(totalPages) {
            // Remove existing pagination controls
            const existingPagination = document.getElementById('documentsPagination');
            if (existingPagination) {
                existingPagination.remove();
            }
            
            if (totalPages <= 1) return;
            
            // Create pagination container
            const paginationContainer = document.createElement('div');
            paginationContainer.id = 'documentsPagination';
            paginationContainer.className = 'flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200';
            
            // Previous button
            const prevButton = document.createElement('button');
            prevButton.className = `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
            }`;
            prevButton.innerHTML = `
                <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Previous
            `;
            prevButton.disabled = currentPage === 0;
            prevButton.addEventListener('click', () => {
                if (currentPage > 0) {
                    currentPage--;
                    const searchTerm = documentSearchInput.value.toLowerCase().trim();
                    const docsToRender = searchTerm === '' ? allVectorDocuments : 
                        allVectorDocuments.filter(doc => 
                            doc.name.toLowerCase().includes(searchTerm) ||
                            doc.type.toLowerCase().includes(searchTerm) ||
                            (doc.id && doc.id.toLowerCase().includes(searchTerm))
                        );
                    renderDocuments(docsToRender);
                }
            });
            
            // Page info
            const pageInfo = document.createElement('span');
            pageInfo.className = 'text-sm text-gray-700';
            pageInfo.textContent = `Page ${currentPage + 1} of ${totalPages}`;
            
            // Next button
            const nextButton = document.createElement('button');
            nextButton.className = `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === totalPages - 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
            }`;
            nextButton.innerHTML = `
                Next
                <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            `;
            nextButton.disabled = currentPage === totalPages - 1;
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages - 1) {
                    currentPage++;
                    const searchTerm = documentSearchInput.value.toLowerCase().trim();
                    const docsToRender = searchTerm === '' ? allVectorDocuments : 
                        allVectorDocuments.filter(doc => 
                            doc.name.toLowerCase().includes(searchTerm) ||
                            doc.type.toLowerCase().includes(searchTerm) ||
                            (doc.id && doc.id.toLowerCase().includes(searchTerm))
                        );
                    renderDocuments(docsToRender);
                }
            });
            
            paginationContainer.appendChild(prevButton);
            paginationContainer.appendChild(pageInfo);
            paginationContainer.appendChild(nextButton);
            
            // Insert pagination after the table
            const tableContainer = document.querySelector('#vectorDocumentsList .bg-white');
            if (tableContainer) {
                tableContainer.appendChild(paginationContainer);
            }
        }

        // Global function for selecting document for analysis
        window.selectDocumentForAnalysis = function(documentId) {
            const documentObj = allVectorDocuments.find(doc => doc.id === documentId);
            if (!documentObj) return;

            // If the same document is clicked, do nothing
            if (selectedVectorDocument && selectedVectorDocument.id === documentId) {
                return;
            }
            
            // Update UI selection
            document.querySelectorAll('#documentsTableBody tr').forEach(row => {
                row.classList.remove('selected');
            });
            
            const selectedRow = document.querySelector(`tr[data-document-id="${documentId}"]`);
            if (selectedRow) {
                selectedRow.classList.add('selected');
            }
            
            selectedVectorDocument = documentObj;
            
            // Load document for analysis
            loadDocumentForAnalysis(documentObj);
        };

        // Global function for previewing document
        window.previewDocument = function(documentId) {
            const documentObj = allVectorDocuments.find(doc => doc.id === documentId);
            if (!documentObj) return;
            
            // Open PDF in new tab/window
            window.open(documentObj.url, '_blank');
        };

        async function loadDocumentForAnalysis(documentObj) {
            try {
                showAnalyzeStatus('info', 'Loading document for analysis...');
                
                // Download the document
                const response = await fetch(documentObj.url);
                if (!response.ok) {
                    throw new Error(`Failed to download document: ${response.status}`);
                }
                
                const blob = await response.blob();
                const file = new File([blob], documentObj.name, { type: blob.type });
                
                // Process based on file type
                if (documentObj.name.toLowerCase().endsWith('.pdf') || blob.type === 'application/pdf') {
                    bolFile = file;
                    bolPageImages = await renderPdfToImages(file);
                    updateAnalyzeButtonState();
                    showAnalyzeStatus('success', `Document "${documentObj.name}" ready for analysis!`);
                } else {
                    // Try to process as image
                    const imageUrl = URL.createObjectURL(blob);
                    const img = new Image();
                    
                    img.onload = () => {
                        bolPageImages = [imageUrl];
                        bolFile = file;
                        updateAnalyzeButtonState();
                        showAnalyzeStatus('success', `Document "${documentObj.name}" ready for analysis!`);
                    };
                    
                    img.onerror = () => {
                        URL.revokeObjectURL(imageUrl);
                        showAnalyzeStatus('error', 'Unsupported file format. Please select a PDF or image file.');
                    };
                    
                    img.src = imageUrl;
                }
                
            } catch (error) {
                console.error('Document download error:', error);
                showAnalyzeStatus('error', `Failed to load document: ${error.message}`);
            }
        }

        // Show status message beside the analyze button
        function showAnalyzeStatus(type, message) {
            analyzeStatusMessage.classList.remove('hidden');
            statusText.textContent = message;
            
            // Remove existing classes
            analyzeStatusMessage.querySelector('div').className = 'flex items-center gap-2 px-4 py-2 rounded-lg';
            statusIcon.innerHTML = '';
            
            if (type === 'info') {
                analyzeStatusMessage.querySelector('div').classList.add('bg-blue-50', 'text-blue-700', 'border', 'border-blue-200');
                statusIcon.innerHTML = `
                    <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                `;
            } else if (type === 'success') {
                analyzeStatusMessage.querySelector('div').classList.add('bg-green-50', 'text-green-700', 'border', 'border-green-200');
                statusIcon.innerHTML = `
                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                `;
            } else if (type === 'error') {
                analyzeStatusMessage.querySelector('div').classList.add('bg-red-50', 'text-red-700', 'border', 'border-red-200');
                statusIcon.innerHTML = `
                    <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                `;
            }
        }

        // Hide status message beside the analyze button
        function hideAnalyzeStatus() {
            analyzeStatusMessage.classList.add('hidden');
        }

        // Update analyze button state based on requirements
        function updateAnalyzeButtonState() {
            const hasKey = googleApiKeyInput.value.trim() !== '';
            parseBolBtn.disabled = !(hasKey && bolFile);
            
            if (hasKey && bolFile) {
                // Include document name in button text
                const docName = selectedVectorDocument ? selectedVectorDocument.name : (bolFile ? bolFile.name : 'Document');
                parseBolBtn.textContent = `Analyze "${docName}"`;
                parseBolBtn.classList.remove('bg-gray-400');
                parseBolBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
            } else {
                parseBolBtn.textContent = 'Select Document & Configure API';
                parseBolBtn.classList.add('bg-gray-400');
                parseBolBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            }
        }

        function showVectorStatus(type, message) {
            vectorApiStatus.className = `mb-4 p-3 rounded-lg status-${type}`;
            vectorApiStatus.textContent = message;
            vectorApiStatus.classList.remove('hidden');
            
            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    vectorApiStatus.classList.add('hidden');
                }, 5000);
            }
        }

        function formatFileSize(bytes) {
            if (!bytes || bytes === 'Unknown') return 'Unknown size';
            if (typeof bytes === 'string') return bytes;
            
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            if (bytes === 0) return '0 Bytes';
            
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
        }

        // ===== VECTOR API SETTINGS MANAGEMENT =====

        // Load saved Vector API settings
        function loadVectorApiSettings() {
            const savedEndpoint = localStorage.getItem('vectorApiEndpoint');
            const savedToken = localStorage.getItem('vectorBearerToken');
            const savedFacility = localStorage.getItem('vectorFacility') || 'US Cold Lumberton';
            const savedDateRange = localStorage.getItem('vectorDateRange') || '30';
            const savedResultSize = localStorage.getItem('vectorResultSize') || '100';
            
            if (savedEndpoint && settingsVectorApiEndpoint) {
                settingsVectorApiEndpoint.value = savedEndpoint;
            }
            
            if (savedToken && settingsVectorBearerToken) {
                settingsVectorBearerToken.value = savedToken;
            }
            
            if (settingsVectorFacility) {
                settingsVectorFacility.value = savedFacility;
            }
            
            if (settingsVectorDateRange) settingsVectorDateRange.value = savedDateRange;
            if (settingsVectorResultSize) settingsVectorResultSize.value = savedResultSize;
        }

        // Save Vector API settings
        function saveVectorSettings() {
            const endpoint = settingsVectorApiEndpoint.value.trim();
            const token = settingsVectorBearerToken.value.trim();
            const facility = settingsVectorFacility.value.trim() || 'US Cold Lumberton';
            const dateRange = settingsVectorDateRange.value || '30';
            const resultSize = settingsVectorResultSize.value || '100';
            
            if (!endpoint || !token) {
                alert('Please provide both API endpoint and bearer token.');
                return;
            }
            
            // Save to localStorage
            localStorage.setItem('vectorApiEndpoint', endpoint);
            localStorage.setItem('vectorBearerToken', token);
            localStorage.setItem('vectorFacility', facility);
            localStorage.setItem('vectorDateRange', dateRange);
            localStorage.setItem('vectorResultSize', resultSize);
            
            // Show success message
            const originalText = saveVectorApiSettings.textContent;
            saveVectorApiSettings.textContent = 'Saved!';
            saveVectorApiSettings.classList.add('bg-green-600');
            saveVectorApiSettings.classList.remove('bg-blue-600');
            
            setTimeout(() => {
                saveVectorApiSettings.textContent = originalText;
                saveVectorApiSettings.classList.remove('bg-green-600');
                saveVectorApiSettings.classList.add('bg-blue-600');
            }, 2000);
        }

        // Auto-refresh functions
        function startVectorAutoRefresh() {
            // Clear existing interval if any
            if (vectorAutoRefreshInterval) {
                clearInterval(vectorAutoRefreshInterval);
            }
            
            // Set up auto-refresh every minute (60000 milliseconds)
            vectorAutoRefreshInterval = setInterval(() => {
                loadDocumentsFromVector();
            }, 60000);
        }

        function stopVectorAutoRefresh() {
            if (vectorAutoRefreshInterval) {
                clearInterval(vectorAutoRefreshInterval);
                vectorAutoRefreshInterval = null;
            }
        }

        // Initialize Vector API settings
        loadVectorApiSettings();

        // Initialize with Vector API method selected
        switchUploadMethod('vector');
