# Aclic Chatbot

A modern, responsive chatbot application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and integrated with OpenAI's GPT API. Built with Vite for fast development and Tailwind CSS for beautiful styling.

## Features

- 🤖 **AI-Powered Chat**: Integrated with OpenAI's GPT-3.5-turbo model
- 💬 **Real-time Messaging**: Instant message exchange with typing indicators
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Responsive**: Works perfectly on all device sizes
- ⚡ **Fast Development**: Vite for lightning-fast hot reload
- 🔒 **Secure**: Environment-based API key management

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **OpenAI API** - AI chat completions
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com/api-keys)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aclic
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env and add your OpenAI API key
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   ```

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the Vite development server**
   ```bash
   npm run client
   ```
   The frontend will start on `http://localhost:5173`

### Production Mode

1. **Build the React app**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## API Endpoints

### POST `/api/chat`
Send a message to the chatbot.

**Request Body:**
```json
{
  "message": "Hello, how are you?"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Hello! I'm doing well, thank you for asking. How can I help you today?",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Project Structure

```
aclic/
├── client/                 # React frontend (Vite)
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── App.jsx        # Main App component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Tailwind CSS imports
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── postcss.config.js  # PostCSS configuration
│   └── package.json       # Frontend dependencies
├── server.js              # Express server
├── package.json           # Backend dependencies
├── .env                   # Environment variables
├── env.example            # Environment variables template
└── README.md              # Project documentation
```

## Configuration

### OpenAI API Configuration

The application uses OpenAI's GPT-3.5-turbo model by default. You can modify the model and parameters in `server.js`:

```javascript
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",        // Change model here
  messages: [...],
  max_tokens: 1000,              // Adjust response length
  temperature: 0.7,              // Adjust creativity (0-2)
});
```

### Available Models
- `gpt-3.5-turbo` - Fast and cost-effective
- `gpt-4` - More capable but slower and more expensive
- `gpt-4-turbo` - Latest GPT-4 model

### Tailwind CSS Configuration

The project includes a custom Tailwind configuration with:
- Custom color palette with primary colors
- Custom animations for smooth transitions
- Responsive design utilities
- Custom component classes

You can modify the design by editing `client/tailwind.config.js` and `client/src/index.css`.

## Customization

### Styling with Tailwind CSS
The chatbot UI is built with Tailwind CSS utility classes. You can customize the design by:

1. **Modifying colors** in `tailwind.config.js`:
   ```javascript
   colors: {
     primary: {
       500: '#6366f1', // Your custom primary color
     }
   }
   ```

2. **Adding custom components** in `src/index.css`:
   ```css
   @layer components {
     .custom-button {
       @apply px-4 py-2 bg-primary-500 text-white rounded-lg;
     }
   }
   ```

### System Prompt
Modify the system prompt in `server.js` to change the chatbot's personality:

```javascript
{
  role: "system",
  content: "You are a helpful assistant. Provide clear, concise, and accurate responses."
}
```

## Development

### Vite Features
- **Hot Module Replacement (HMR)** - Instant updates without page refresh
- **Fast Build Times** - Optimized bundling and development server
- **ES Modules** - Native ES module support
- **Plugin System** - Extensible with plugins

### Tailwind CSS Features
- **Utility-First** - Rapid UI development with utility classes
- **Responsive Design** - Built-in responsive utilities
- **Custom Components** - Reusable component classes
- **Purge CSS** - Automatic unused CSS removal in production

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `client/dist`
4. Set environment variables

### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git:
   ```bash
   git push heroku main
   ```

## Troubleshooting

### Common Issues

1. **"Failed to get response from OpenAI"**
   - Check your OpenAI API key in `.env`
   - Verify your OpenAI account has credits
   - Check API rate limits

2. **CORS errors**
   - Ensure the backend is running on the correct port
   - Check CORS configuration in `server.js`
   - Verify Vite proxy settings in `vite.config.js`

3. **Build errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility
   - Verify all dependencies are installed

4. **Tailwind CSS not working**
   - Ensure PostCSS and Tailwind are installed
   - Check `tailwind.config.js` content paths
   - Verify `@tailwind` directives in `index.css`

## Performance

### Vite Optimizations
- **Tree Shaking** - Automatic dead code elimination
- **Code Splitting** - Automatic chunk splitting
- **Pre-bundling** - Fast dependency pre-bundling
- **ES Build** - Lightning-fast builds with esbuild

### Tailwind Optimizations
- **Purge CSS** - Removes unused styles in production
- **JIT Mode** - Just-in-time CSS generation
- **Minification** - Automatic CSS minification

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed information

## Acknowledgments

- OpenAI for providing the GPT API
- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS team for the utility-first framework
- Express.js team for the web framework
- Lucide for the beautiful icons 