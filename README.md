# Valentine's Day Website 💕

An interactive, romantic website to ask someone special to be your valentine!

## Features

- Interactive multi-stage experience
- Heart animation effects
- Password verification
- Progressive "No" button responses
- Restaurant selection with elegant transitions
- Date-locked content

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## How It Works

1. **Name Verification**: Starts with a black screen asking for name confirmation
2. **Heart Animation**: Beautiful floating hearts animation
3. **Password Check**: Requires Apple Watch password (3580)
4. **Valentine Question**: Shows the cats image with the question
5. **Progressive No Button**: The "No" button gets more insistent with each click
6. **Restaurant Selection**: Elegant royal-themed page with restaurant options
7. **Date Lock**: "There's more" button is locked until February 14th

## Customization

- Update restaurant links in `src/App.jsx` (RESTAURANTS array)
- Modify password in the password check logic
- Adjust colors and styling in `src/App.css`
- Change the date check logic for the "There's more" feature

## Technologies Used

- React 18
- Vite
- HTML5/CSS3
- JavaScript (ES6+)

