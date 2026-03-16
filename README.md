# Personal Portfolio

A modern, responsive, and interactive personal portfolio built with React, Vite, and Three.js.

## Technologies Used
- **Frontend Framework**: React 19, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Icons**: Lucide React
- **Email Service**: EmailJS

## Features
- **3D Interactive Elements**: Floating shapes, 3D tilt cards, and glowing components.
- **Smooth Animations**: Page-level transitions, scroll-triggered animations, and continuous elements.
- **Responsive Layout**: Fully optimized and seamlessly responsive across mobile, tablet, and desktop devices.
- **Working Contact Form**: Real-time message delivery fully integrated via EmailJS.

## Setup & Configuration

1. **Clone the repository** and navigate to the project directory.
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Create a new file named `.env` in the root menu (or copy `.env.example`) and add your EmailJS configuration:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the local URL (typically `http://localhost:5173`).

## Building for Production
To generate an optimized build of your application:
```bash
npm run build
```
The output will be contained within the `dist` folder, ready for deployment on platforms such as Vercel, Netlify, or GitHub Pages.