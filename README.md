# Chen Yue - Portfolio

个人作品集网站，展示项目、技能、兴趣，吸引潜在雇主与合作者。

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Routing**: React Router DOM
- **API Integration**: Notion API (serverless proxy)
- **Testing**: Jest + React Testing Library + Playwright
- **Linting**: ESLint + Prettier
- **Deployment**: GitHub Pages + GitHub Actions

## 📁 Project Structure

```
src/
├── components/           # Reusable components
│   ├── ui/              # Basic UI components
│   │   └── Hero.tsx
│   ├── layout/          # Layout components
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── features/        # Feature-specific components
│   │   ├── ProjectCard.tsx
│   │   ├── SkillBar.tsx
│   │   └── VideoGallery.tsx
│   └── index.ts         # Component exports
├── pages/               # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── ProjectDetail.tsx
│   ├── Skills.tsx
│   ├── Interests.tsx
│   └── Contact.tsx
├── lib/                 # Shared utilities and configurations
│   ├── constants/       # App constants
│   │   └── index.ts
│   └── utils/           # Utility functions
│       ├── animations.ts
│       ├── cn.ts        # Class name utility
│       ├── format.ts    # Formatting utilities
│       └── index.ts
├── services/            # API services
│   ├── notion.ts        # Notion API integration
│   └── index.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── styles/              # Global styles
│   └── globals.css
└── assets/              # Static assets
    ├── images/
    └── icons/
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/chenyue/chen-yue-portfolio.git
cd chen-yue-portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NOTION_SECRET=your_notion_integration_secret
NOTION_PROJECT_DB_ID=your_notion_project_database_id
NOTION_VIDEO_DB_ID=your_notion_video_database_id
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript type checking

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Run E2E tests with UI
```

## 🎨 Design System

The project follows a modern, minimalist design inspired by Apple's website:

- **Colors**: Dark theme with accent blue (#0a84ff)
- **Typography**: Inter font family with responsive scales
- **Animations**: Smooth, accessible animations with Framer Motion
- **Responsive**: Mobile-first approach with Tailwind breakpoints

## 🔧 API Integration

The project integrates with Notion API through serverless functions:

- `/api/projects` - Fetch all projects
- `/api/projects/[slug]` - Fetch project by slug  
- `/api/videos` - Fetch video gallery

## 🚀 Deployment

The project is configured for automatic deployment to GitHub Pages:

1. Push to `main` branch triggers GitHub Actions
2. Build process runs with environment variables
3. Static files deployed to `gh-pages` branch
4. Site available at `https://chenyue.github.io/chen-yue-portfolio`

### Manual Deployment

```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

## 🧪 Testing

### Unit Tests
- Components tested with React Testing Library
- Utilities and services have dedicated test suites
- Run with `npm run test`

### E2E Tests  
- Critical user flows tested with Playwright
- Cross-browser testing (Chrome, Firefox, Safari)
- Run with `npm run test:e2e`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contact

Chen Yue - [hello@chenyue.dev](mailto:hello@chenyue.dev)

Project Link: [https://github.com/chenyue/chen-yue-portfolio](https://github.com/chenyue/chen-yue-portfolio)
