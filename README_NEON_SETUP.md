# Neon Database Setup for INDICAPRO

## Overview
This project has been updated to use Neon (Netlify's database service) alongside Supabase for authentication. The setup maintains Supabase for user authentication while using Neon for data storage.

## Files Created/Modified

### New Files:
- `src/componets/lib/neonClient.js` - Neon database client
- `src/componets/lib/databaseService.js` - Database service functions using Neon
- `neon_setup.sql` - SQL schema for Neon database
- `README_NEON_SETUP.md` - This setup guide

### Modified Files:
- `src/componets/contexts/AuthContext.jsx` - Updated to use Neon for user data operations
- `package.json` - Added @netlify/neon dependency

## Environment Variables Setup

You need to add the following environment variables to your `.env` file:

```env
# Neon Database Configuration
NETLIFY_DATABASE_URL=your_neon_database_connection_string_here

# Supabase Configuration (keep existing)
VITE_SUPABASE_URL=https://gwvauiuxazuztcgvcfmb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3dmF1aXV4YXp1enRjZ3ZjZm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NjAxNDcsImV4cCI6MjA3MjMzNjE0N30.M5wdO-EBB3eS2wiX
```

## Database Setup

1. **Create a Neon Database:**
   - Go to [Neon Console](https://console.neon.tech/)
   - Create a new project
   - Copy the connection string

2. **Run the Schema:**
   - Connect to your Neon database
   - Execute the SQL commands from `neon_setup.sql`

## Architecture

- **Supabase**: Handles user authentication (login/signup/signout)
- **Neon**: Handles all data operations (users, indicacoes, metas, comissoes)

## Usage Example

```javascript
import databaseService from './src/componets/lib/databaseService';

// Get user by ID
const user = await databaseService.getUserById(userId);

// Create new indicacao
const indicacao = await databaseService.createIndicacao({
  nome: 'João Silva',
  telefone: '11999999999',
  vendedor_id: userId,
  // ... other fields
});
```

## Migration Notes

- User authentication still uses Supabase
- All database queries now use Neon
- The app maintains the same functionality
- Performance may improve due to Neon's serverless architecture

## Next Steps

1. Set up your Neon database
2. Add the NETLIFY_DATABASE_URL to your .env file
3. Run the neon_setup.sql in your Neon database
4. Test the application functionality

The application should work seamlessly with this hybrid setup!
