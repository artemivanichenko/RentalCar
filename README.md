# RentalCar

Web application for car rental company "RentalCar" built with Next.js.

## Description

RentalCar is a modern car rental platform that allows users to browse available
vehicles, filter by various criteria, save favorites, and book cars online. The
application provides an intuitive interface for finding the perfect rental car
for any journey.

## Main Features

-  🚗 **Car Catalog** - Browse all available vehicles with detailed information
-  🔍 **Advanced Filters** - Filter by brand, price, and mileage
-  ❤️ **Favorites** - Save preferred cars (persists after page reload)
-  📄 **Pagination** - Load more cars with backend pagination
-  📋 **Car Details** - View detailed specifications and rental conditions
-  📝 **Booking Form** - Easy car reservation process

## Technology Stack

-  **Next.js 15** - React framework with App Router
-  **TypeScript** - Type safety
-  **React Query (TanStack Query)** - Data fetching and caching
-  **Formik** - Form management
-  **Axios** - HTTP client
-  **CSS Modules** - Component styling
-  **Modern Normalize** - CSS reset

## Installation

1. Clone the repository:

```bash
git clone https://github.com/artemivanichenko/RentalCar.git
cd RentalCar
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server: npm run dev

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Home Page

-  Click "View Catalog" to browse available cars

### Catalog Page

-  Use filters to find cars by brand, price, and mileage
-  Click the heart icon to add/remove cars from favorites
-  Click "Read more" to view detailed car information
-  Click "Load more" to load additional cars

### Car Details Page

-  View complete car specifications
-  See rental conditions and features
-  Fill out the booking form to reserve a car

## Project Structure

```
RentalCar/
├── app/                    # Next.js App Router
│   ├── catalog/           # Catalog pages
│   │   ├── [id]/         # Dynamic car detail page
│   │   └── page.tsx      # Catalog list page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── CarList/          # Car cards grid
│   ├── CarDetails/       # Car detail view
│   ├── SearchBox/        # Filter form
│   ├── LoadMore/         # Pagination button
│   └── Header/           # Navigation header
├── hooks/                 # Custom React hooks
├── lib/                   # API functions
├── types/                 # TypeScript types
└── public/               # Static assets
```

## API

The application uses the backend API at: https://car-rental-api.goit.global

API Documentation: https://car-rental-api.goit.global/api-docs/

## Deployment

The project is deployed on Vercel/Netlify: [Add your deployed link here]

## Author

**Artem Ivanichenko**

-  GitHub: [@artemivanichenko](https://github.com/artemivanichenko)

## License

This project is created as a test assignment.
