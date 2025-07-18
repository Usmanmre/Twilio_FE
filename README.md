# Call Activity Feed Dashboard

A modern React frontend for displaying and managing call activity logs. Built with TypeScript, React hooks, and TailwindCSS.

## Features

- 📞 **Call Display**: Shows caller number, call type, status, duration, and timestamp
- 🎵 **Voicemail Integration**: Direct links to voicemail recordings when available
- 🔍 **Filtering**: Filter calls by type (All, Forwarded, Voicemail)
- 📄 **Pagination**: Navigate through large call lists efficiently
- 📱 **Mobile Responsive**: Optimized layout for all screen sizes
- ⚡ **Loading States**: Smooth loading animations and error handling
- 🎨 **Modern UI**: Clean, professional design with TailwindCSS

## Tech Stack

- **React 18** with TypeScript
- **React Hooks** for state management
- **TailwindCSS** for styling
- **Custom Components** for reusability

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd twillio-fe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## API Integration

The application expects a backend API endpoint at `/calls` that returns JSON data in the following format:

```json
[
  {
    "id": "string",
    "callerNumber": "string",
    "callType": "forwarded" | "voicemail",
    "callStatus": "completed" | "missed" | "busy" | "failed",
    "callDuration": number,
    "timestamp": "ISO string",
    "voicemailRecordingUrl": "string (optional)"
  }
]
```

### Mock Data

For development purposes, the application includes mock data that will be used when the API endpoint is not available or returns an error.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CallCard.tsx    # Individual call display card
│   ├── CallFilters.tsx # Filter controls
│   ├── CallList.tsx    # Main call list with pagination
│   ├── ErrorState.tsx  # Error display component
│   ├── LoadingState.tsx # Loading spinner component
│   └── Pagination.tsx  # Pagination controls
├── hooks/              # Custom React hooks
│   └── useCalls.ts     # Call data fetching hook
├── types/              # TypeScript type definitions
│   └── call.ts         # Call-related interfaces
├── utils/              # Utility functions
│   └── formatters.ts   # Data formatting helpers
├── App.tsx             # Main application component
└── index.css           # Global styles with TailwindCSS
```

## Components

### CallCard
Displays individual call information in a clean card layout with:
- Caller number and timestamp
- Call type and status badges
- Duration information
- Voicemail recording link (if available)

### CallFilters
Provides filtering controls for call types with a dropdown selector.

### CallList
Main component that orchestrates:
- Filtering logic
- Pagination
- Loading and error states
- Responsive grid layout

### Pagination
Smart pagination component with:
- Page number display
- Previous/Next navigation
- Current page indicator
- Items per page information

## Styling

The application uses TailwindCSS for styling with:
- Responsive design patterns
- Consistent color scheme
- Hover and focus states
- Smooth transitions
- Mobile-first approach

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
