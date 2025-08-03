# Mock Data Feature

This application includes a comprehensive mock data system that allows you to test the application locally without making real API calls.

## Features

- **Secure Mock Data**: Mock data is only available when explicitly enabled via environment variable
- **Toggle Mock Data**: Switch between real API calls and mock data through the settings panel (when enabled)
- **Realistic Data**: Mock data includes realistic analysis for various topics
- **No Fallback**: No automatic fallback to mock data - API failures are properly handled
- **Environment Configuration**: Can be configured via environment variables
- **Persistent Settings**: Mock data preference is saved in localStorage (when enabled)
- **Production Safe**: Mock data option is completely hidden in production when disabled

## How to Use

### 1. Through the UI Settings Panel

1. Click the settings icon (⚙️) in the top-right corner
2. In the "Data Source" section, choose between:
   - **Live API**: Uses real API calls
   - **Mock Data**: Uses mock data for testing

**Note**: This option is only available when `NEXT_PUBLIC_USE_MOCK_DATA=true` is set.

### 2. Environment Variable

Set the environment variable in your `.env.local` file:

```bash
# Use mock data (no API calls)
NEXT_PUBLIC_USE_MOCK_DATA=true

# Use real API calls
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### 3. Production Deployment

For production, you can:

1. **Use Environment Variables**: Set `NEXT_PUBLIC_USE_MOCK_DATA=false` in your production environment
2. **Secure by Default**: Mock data is completely disabled and hidden when not enabled
3. **No Fallback**: API failures are properly handled without falling back to mock data
4. **Conditional Loading**: Mock data is only loaded when explicitly enabled

## Mock Data Content

The mock data includes:

- **Topic Suggestions**: 10 predefined topic suggestions
- **Random Topics**: 15 topics for random selection
- **Analysis Data**: Detailed analysis for 5 predefined topics
- **Dynamic Generation**: Automatically generates analysis for new topics

### Predefined Topics with Full Analysis

1. Climate Change and Renewable Energy
2. Artificial Intelligence Ethics
3. Global Economic Inequality
4. Cybersecurity Threats
5. Mental Health in Digital Age

### Generated Analysis

For topics not in the predefined list, the system:
- Selects a random base analysis
- Replaces topic-specific content
- Maintains realistic structure and content

## Benefits

- **No API Costs**: Test without consuming API quotas
- **Offline Development**: Work without internet connection
- **Consistent Testing**: Predictable data for testing
- **Fast Development**: No waiting for API responses
- **Demo Purposes**: Perfect for demonstrations

## Technical Implementation

### Files Structure

```
app/
├── data/
│   └── mockData.ts          # Mock data definitions
├── services/
│   └── apiService.ts        # API service with mock toggle
├── contexts/
│   └── SettingsContext.tsx  # Settings including mock toggle
└── components/
    └── SettingsPanel.tsx    # UI for toggling mock data
```

### API Service

The `ApiService` class handles:
- Switching between real and mock data (only when enabled)
- Proper error handling without fallback to mock data
- Simulated API delays for realistic experience
- Secure access control based on environment variables

### Settings Context

The settings context manages:
- Mock data preference state (only when enabled)
- localStorage persistence (only when enabled)
- Environment variable integration
- UI state management
- Conditional rendering of mock data options

## Development Workflow

1. **Local Development**: Use mock data for fast iteration
2. **API Testing**: Switch to live API to test real endpoints
3. **Production**: Ensure mock data is disabled
4. **Demo**: Use mock data for presentations

## Troubleshooting

### Mock Data Not Working

1. Check if `NEXT_PUBLIC_USE_MOCK_DATA=true` is set in environment variables
2. Verify the setting is enabled in the UI (only visible when enabled)
3. Clear localStorage and refresh the page
4. Check browser console for errors

### API Calls Still Being Made

1. Ensure `NEXT_PUBLIC_USE_MOCK_DATA=true` is set
2. Check if the API service is properly initialized
3. Verify the settings context is working
4. Look for any direct fetch calls that bypass the service

### Mock Data Option Not Visible

1. Check if `NEXT_PUBLIC_USE_MOCK_DATA=true` is set
2. The option is intentionally hidden when mock data is disabled
3. This is a security feature to prevent unauthorized access to mock data

## Future Enhancements

- [ ] Add more predefined mock topics
- [ ] Support for different languages in mock data
- [ ] Customizable mock data through UI
- [ ] Mock data import/export functionality
- [ ] Performance metrics for mock vs real API 