# VerseIt

This is a Next.js project that uses Tailwind CSS for styling and includes various components, hooks, and data for building a blog-like application.

## Project Structure

The project is organized as follows:

```
.env.local            # Environment variables
.eslintrc.json        # ESLint configuration
.gitignore            # Git ignore rules
components.json       # Component metadata
next-env.d.ts         # Next.js TypeScript environment
next.config.js        # Next.js configuration
package.json          # Project dependencies and scripts
postcss.config.js     # PostCSS configuration
tailwind.config.ts    # Tailwind CSS configuration
tsconfig.json         # TypeScript configuration

.bolt/                # Bolt configuration
.next/                # Next.js build output
app/                  # Application pages and styles
components/           # Reusable React components
data/                 # Static data files
hooks/                # Custom React hooks
lib/                  # Utility libraries
public/               # Public assets
```

## Key Features

- **Next.js**: A React framework for building server-rendered and static web applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **TypeScript**: Strongly typed JavaScript for better developer experience.
- **Reusable Components**: Modular components for building UI, such as `AdUnit`, `BlogList`, and `SearchBar`.
- **Custom Hooks**: Includes hooks like `use-toast` for managing toast notifications.
- **Static Data**: JSON files for static data, such as `blogs.json`.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file and configure environment variables as needed.

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

To build the project for production:

```bash
npm run build
# or
yarn build
```

### Linting and Formatting

Run ESLint to check for code issues:

```bash
npm run lint
# or
yarn lint
```

## Folder Details

### app/
Contains the main application pages, including:

- `globals.css`: Global styles for the application.
- `layout.tsx`: Layout component for consistent page structure.
- `not-found.tsx`: Custom 404 page.
- `page.tsx`: Main entry page.
- `blog/`: Blog-related pages.

### components/
Reusable React components, including:

- `AdUnit.tsx`: Component for displaying advertisements.
- `BlogList.tsx`: Component for listing blogs.
- `SearchBar.tsx`: Component for search functionality.
- `ui/`: UI-specific components.

### data/
Static data files, such as `blogs.json`, for blog content.

### hooks/
Custom React hooks, such as `use-toast` for toast notifications.

### lib/
Utility libraries for shared functionality.

### public/
Public assets like images, icons, and other static files.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For questions or support, please contact [your-email@example.com].

