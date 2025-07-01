# Lecturer Management System

A modern, responsive web application for managing university lecturer data with offline capabilities and PWA support.

![Lecturer Management System](https://images.pexels.com/photos/306198/pexels-photo-306198.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🚀 Features

- **Complete CRUD Operations** - Create, read, update, and delete lecturer records
- **Advanced Search & Filtering** - Search by name/NIDN with position and certification filters
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Progressive Web App (PWA)** - Install as a native app with offline capabilities
- **Real-time Data Sync** - Automatic synchronization when connection is restored
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Data Validation** - Comprehensive form validation and error handling

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **Deployment**: Netlify
- **PWA**: Service Worker with offline storage

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account and project

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lecturer-management-system.git
   cd lecturer-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   
   Run the migration file in your Supabase SQL editor:
   ```sql
   -- The migration file is located at: supabase/migrations/20250629011741_floating_trail.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🗄️ Database Schema

The application uses a single `lecturers` table with the following structure:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `nidn` | TEXT | Lecturer ID number (unique) |
| `name` | TEXT | Full name of lecturer |
| `degree` | TEXT | Academic degree |
| `scopus_id` | TEXT | Scopus researcher ID (optional) |
| `functional_position` | TEXT | Academic position |
| `rank` | TEXT | Academic rank |
| `last_education` | TEXT | Latest education background |
| `serdos_status` | TEXT | Certification status |
| `created_at` | TIMESTAMPTZ | Record creation timestamp |

## 🚀 Deployment

### Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

### Environment Variables for Production

Set these variables in your Netlify dashboard:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 PWA Features

The application includes Progressive Web App capabilities:

- **Offline Support** - Continue working without internet connection
- **Install Prompt** - Add to home screen on mobile devices
- **Background Sync** - Sync data when connection is restored
- **Service Worker** - Cache resources for faster loading

## 🎯 Usage

### Adding a Lecturer
1. Click the "Add Lecturer" button
2. Fill in the required information
3. Click "Save Lecturer"

### Searching and Filtering
- Use the search bar to find lecturers by name or NIDN
- Filter by functional position or certification status
- Sort by name, NIDN, or creation date

### Editing a Lecturer
1. Click the edit icon on a lecturer card
2. Modify the information
3. Click "Save Lecturer"

### Viewing Details
- Click the eye icon to view complete lecturer information
- Access edit and delete options from the detail view

## 🔒 Security

- Row Level Security (RLS) enabled on database tables
- Environment variables for sensitive configuration
- Input validation and sanitization
- HTTPS enforcement in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [Vite](https://vitejs.dev/) for the fast build tool

## 🔄 Changelog

### v1.0.0 (2025-01-XX)
- Initial release
- Complete CRUD operations for lecturer management
- PWA support with offline capabilities
- Responsive design
- Search and filtering functionality

---

**Live Demo**: [https://lecturers.netlify.app//](https://lecturers.netlify.app/)
