# MOV Health (Streamline the process between Doctor and Patient )

This project consists of a modern web application with a React frontend and FastAPI backend. The application uses various modern technologies and tools to provide a robust and scalable solution.

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI Components
- React Router DOM
- React Query
- Supabase Client
- React Hook Form
- Zod for validation
- Various Radix UI components for accessible UI elements

### Backend
- FastAPI
- Python 3.x
- Mistral AI Integration
- LangChain
- Pydantic
- Uvicorn
- Python-dotenv

## Prerequisites

- Node.js (v18 or higher)
- Python 3.x
- npm or yarn or bun
- Git

## Installation

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Create a `.env` file in the frontend directory with necessary environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a Python virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a `.env` file in the backend directory with necessary environment variables:
```env
MISTRAL_API_KEY=your_mistral_api_key
```

6. Start the backend server:
```bash
uvicorn app.main:app --reload
```

The backend API will be available at `http://localhost:8000`

## Development

- Frontend development server runs on port 5173
- Backend API server runs on port 8000
- API documentation is available at `http://localhost:8000/docs`

## Building for Production

### Frontend
```bash
cd frontend
npm run build
# or
yarn build
# or
bun run build
```

### Backend
The backend is ready for production deployment. Make sure to set appropriate environment variables in your production environment.

## Project Structure

```
.
├── frontend/               # React frontend application
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
│
└── backend/               # FastAPI backend application
    ├── app/              # Backend source files
    └── requirements.txt  # Backend dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 