# 🏥 Health Timeline Visualizer

A minimalist healthcare website that visualizes CSV timeline data through an interactive draggable horizontal slider. Built with Next.js 15, TypeScript, and Tailwind CSS with a beautiful blue theme.

## ✨ Features

- **📁 CSV Upload**: Upload healthcare timeline data in CSV format
- **🎚️ Draggable Slider**: Horizontal scrolling timeline with mouse drag support
- **📊 Data Visualization**: Each timeline entry displayed as an interactive card
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🎨 Blue Theme**: Clean, minimalist healthcare-focused design
- **📋 Detailed View**: Click any timeline entry to see full details
- **📈 Stats Sidebar**: View timeline statistics and current entry info
- **📥 Sample Data**: Includes sample healthcare timeline CSV for testing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- VS Code (recommended)

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the project files
   cd your-project-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 How to Use in VS Code

### Step 1: Open the Project

1. Launch VS Code
2. Go to `File > Open Folder...`
3. Select the project directory
4. Click "Select Folder"

### Step 2: Install Dependencies

1. Open the integrated terminal in VS Code (`Ctrl + \` or `View > Terminal`)
2. Run the installation command:
   ```bash
   npm install
   ```

### Step 3: Run the Development Server

In the VS Code terminal, run:
```bash
npm run dev
```

### Step 4: View the Application

1. Open your web browser
2. Go to [http://localhost:3000](http://localhost:3000)
3. You should see the Health Timeline Visualizer homepage

### Step 5: Test with Sample Data

1. On the homepage, click "Download Sample CSV" to get the sample file
2. Upload the downloaded CSV file using the file uploader
3. Explore the interactive timeline visualization

## 📊 CSV Format

The application expects CSV files with the following format:

```csv
| Month | Member Concern | Decision by Elyx | Reason for Decision |
| Jan | Family history of heart disease... | Baseline cardiovascular diagnostics... | Due to family history and early risk... |
```

**Required Columns:**
- `Month`: The month identifier (e.g., Jan, Feb, Mar)
- `Member Concern`: The health concern or issue
- `Decision by Elyx`: The decision made by the healthcare provider
- `Reason for Decision`: The reasoning behind the decision

## 🎯 How It Works

1. **Upload CSV**: Users upload their healthcare timeline data as a CSV file
2. **Data Parsing**: The application parses the CSV and extracts timeline entries
3. **Timeline Display**: Each entry is displayed as a card in a horizontal slider
4. **Interactive Navigation**: 
   - Drag horizontally to scroll through the timeline
   - Click any card to view detailed information
   - Use the scrollbar for precise navigation
5. **Detailed View**: Selected entries show full information in a detailed panel
6. **Statistics**: Sidebar shows timeline statistics and current entry info

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and custom scrollbar
│   └── page.tsx            # Main application page
├── components/
│   └── ui/                 # shadcn/ui components
├── hooks/                  # Custom React hooks
└── lib/                    # Utility functions

public/
├── elyx_member_timeline.csv  # Sample CSV data
├── logo.svg               # Application logo
└── robots.txt             # SEO configuration
```

## 🎨 Design Features

- **Color Scheme**: Blue gradient background with blue accent colors
- **Minimalist Design**: Clean, uncluttered interface focused on content
- **Responsive Layout**: Adapts to different screen sizes
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Custom Scrollbar**: Styled horizontal scrollbar for the timeline
- **Card-based Layout**: Each timeline entry displayed as an interactive card

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the CSV format matches the expected structure
2. Ensure all dependencies are installed correctly
3. Verify you're using a supported browser version
4. Review the console for any error messages

---

Built with ❤️ for healthcare data visualization. Powered by Next.js and modern web technologies.
