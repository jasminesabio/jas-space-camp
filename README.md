# Space Camp Bachelorette Website

A retro NASA-themed website for Jasmine's Space Camp Bachelorette Party at the U.S. Space & Rocket Center in Huntsville, Alabama.

## Features

- Retro space age design with vintage NASA vibes
- Easy navigation with smooth scrolling sections
- Responsive design for mobile and desktop
- All content editable through a simple JSON file

## Quick Start

### Running the Website Locally

1. Navigate to the project directory:
   ```bash
   cd space-camp-bachelorette
   ```

2. Install dependencies (first time only):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The page will automatically reload when you make changes!

## Editing Content

All website content is stored in a single, easy-to-edit JSON file:

**`src/data.json`**

### How to Update Information

1. Open `src/data.json` in any text editor
2. Find the section you want to edit
3. Update the text between the quotation marks
4. Save the file
5. The website will automatically update!

### What You Can Edit

#### Event Details
```json
"event": {
  "title": "Space Camp Bachelorette",
  "bride": "Jasmine",
  "dates": "January 30 - February 1, 2026",
  ...
}
```

#### Space Camp Information
- About description
- What's included in the program
- What's not included

#### Expenses
- Space camp tuition amount
- Additional costs (hotels, meals, activities)
- Estimated totals

#### Guest Directory
Add or modify guests:
```json
{
  "name": "Guest Name",
  "role": "Space Cadet",
  "funFact": "Add a fun fact here!",
  "hometown": "Add hometown"
}
```

#### Packing Guide
- Essentials list
- Optional items
- Things not to bring

#### Recommendations
- Movies (title, year, why)
- Books (title, author, why)

## Deployment

### Option 1: Netlify (Recommended - Free and Easy)

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "New site from Git"
4. Connect your GitHub repository
5. Build command: `npm run build`
6. Publish directory: `build`
7. Click "Deploy site"

You'll get a free URL like `your-site.netlify.app`

### Option 2: Vercel (Also Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Option 3: GitHub Pages

1. Build the site:
   ```bash
   npm run build
   ```

2. Install the gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/space-camp-bachelorette",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Customization

### Changing Colors

Edit the color variables in `src/App.css`:

```css
:root {
  --retro-orange: #FF6B35;
  --retro-red: #D32F2F;
  --retro-blue: #004E89;
  --retro-navy: #1A1A2E;
  --retro-cream: #F7F3E9;
  --retro-yellow: #FFB627;
  --retro-teal: #00A5A5;
  --space-black: #0B0C10;
}
```

### Adding More Sections

1. Add your content to `src/data.json`
2. Create a new section in `src/App.js` following the existing pattern
3. Add a navigation button for the new section

## Troubleshooting

**The site won't start:**
- Make sure you've run `npm install` first
- Check that Node.js is installed: `node --version`

**Changes aren't showing:**
- Make sure you saved the file
- Check the browser console for errors
- Try refreshing the page with Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

**JSON file has errors:**
- Make sure all quotes are closed
- Check that commas are in the right places
- Use a JSON validator online if needed

## Support

For React-specific questions, see the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

---

Have an amazing time at Space Camp! See you among the stars!
