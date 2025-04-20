# YCatalyst Directory

YCatalyst is a comprehensive directory of Y Combinator startups, offering quick access to essential company information, founder details, and funding data. Built with Next.js 15, React, TypeScript, and Tailwind CSS.

![YCatalyst Directory](https://i.imgur.com/placeholder-image.png)

## Features

### 🔍 Advanced Filtering System
- **Industry Categories**: Filter by AI & Machine Learning, Health & Biotech, Developer Tools, Finance & Fintech, and more
- **Location Filtering**: Find startups by geographical regions like San Francisco Bay Area, New York, Europe, Asia, etc.
- **Team Size Filtering**: Filter by company size (1-10, 11-50, 51+)
- **Founded Year**: Filter startups by their founding year

### 🔎 Smart Search
- Real-time search across company names, descriptions, and industries
- Debounced search for improved performance
- Case-insensitive matching

### 📊 Data Visualization
- Clean, responsive company cards
- Founder information with LinkedIn links
- Social media and website links
- Industry tags and location information

### ⚡ Performance Optimizations
- Infinite scrolling with dynamic loading
- Loading states for both company cards and filters
- Optimized filtering with debounced search
- Categorized filters for easier navigation

### 🧩 Technical Features
- Multi-CSV data source integration
- Dynamic filter generation based on available data
- Responsive design for all device sizes
- Client-side filtering and sorting

## Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Data Parsing**: csv-parse

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Data Structure

The application reads startup data from multiple CSV files located in the `/lib` directory:
- `list1.csv`
- `list2.csv`
- `list3.csv`
- `list4.csv`

Each CSV file should have the following structure:
- Company name
- Website
- Description
- Industry (comma-separated)
- Founders (comma-separated, with optional LinkedIn URLs)
- Founded year
- Team size
- Location
- Social media links

## Project Structure

```
/app                  # Next.js app directory
  /api                # API routes
    /companies        # Company data API
  /page.tsx           # Main page with filtering logic
  /layout.tsx         # Root layout
/components           # React components
  /ui                 # UI components (Shadcn)
  /companycard.tsx    # Company card component
  /companyfilter.tsx  # Filter component
  /searchbar.tsx      # Search component
  /appbar.tsx         # Application header
/lib                  # Utilities and data
  /csvUtils.ts        # CSV parsing utilities
  /utils.ts           # General utilities
  /*.csv              # CSV data files
```

## Key Features Implementation

### Infinite Scrolling
The application implements infinite scrolling using the Intersection Observer API, loading companies in batches as the user scrolls down the page.

### Categorized Filters
Filters are intelligently categorized based on keywords in the data, making it easier to navigate large sets of filter options.

### Debounced Search
Search functionality is optimized with debouncing to prevent excessive filtering operations during typing.

### Loading States
Both the company cards and filter sections display loading states while data is being fetched, providing a consistent user experience.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

[MIT](https://choosealicense.com/licenses/mit/)
