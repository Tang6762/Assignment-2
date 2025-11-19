Group 3 Music Website
	A small website to help listen to music and recieve recommendations and guidance on songs.

How to Run 
	Prerequisites Required:
		Node.js installed 	
		npm 
	CD into the file.
	npm install.
	npm start.
	Browser will automatically open on website.


## APIs Used

## APIs Used

### 1. iTunes API
Endpoint: https://itunes.apple.com/search
Purpose: Fetch popular Pakistani artists data
Parameters:
- term=pakistani+artist (search query)
- entity=musicArtist (type of content)
- limit=6 (number of results)

### 2. Google Gemini AI API
Endpoint: https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent
Purpose: Music recommendations and AI chat functionality
Method: POST
Headers: Content-Type: application/json
Request Body:
```json
{
  "contents": [
    {
      "parts": [{ "text": "user message here" }]
    }
  ]
}


Ammar   - Did the AI chatbot integration and CSS in task 1.
Shaheer - Did the rest of task 1.
Irtaza  - Did Task 2.

