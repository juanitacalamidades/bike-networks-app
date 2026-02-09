// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  // Define where Tailwind should look for classes to include in the final CSS
  // This is crucial: if you don't include a directory, classes from those files won't work
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",      // For Pages Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Components
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // For App Router
    "./src/**/*.{js,ts,jsx,tsx,mdx}",        // If using src/ folder
  ],

  theme: {
    extend: {
      // extend: keeps Tailwind's default values and adds yours
      // Without extend, you would completely replace the default values
      
      colors: {
        // Torres Bay color palette (blues)
        // Usage: className="bg-torres-bay-500 text-torres-bay-50"
        'torres-bay': {
          50: 'var(--torres-bay-50)',
          100: 'var(--torres-bay-100)',
          200: 'var(--torres-bay-200)',
          300: 'var(--torres-bay-300)',
          400: 'var(--torres-bay-400)',
          500: 'var(--torres-bay-500)',  // Primary color
          600: 'var(--torres-bay-600)',
          700: 'var(--torres-bay-700)',
          800: 'var(--torres-bay-800)',
          900: 'var(--torres-bay-900)',
          950: 'var(--torres-bay-950)',
        },
        
        // Grenadier color palette (oranges)
        // Usage: className="bg-grenadier-500 hover:bg-grenadier-600"
        'grenadier': {
          50: 'var(--grenadier-50)',
          100: 'var(--grenadier-100)',
          200: 'var(--grenadier-200)',
          300: 'var(--grenadier-300)',
          400: 'var(--grenadier-400)',
          500: 'var(--grenadier-500)',  // Primary color
          600: 'var(--grenadier-600)',
          700: 'var(--grenadier-700)',
          800: 'var(--grenadier-800)',
          900: 'var(--grenadier-900)',
          950: 'var(--grenadier-950)',
        },
          // Base colors (black/white)
        // Usage: className="bg-base-black text-base-white"
        'base': {
          black: 'var(--base-black)',
          white: 'var(--base-white)',
        },

        // Zinc colors (grays scale)
        // Usage: className="text-zinc-500 bg-zinc-100"
        'zinc': {
          50: 'var(--zinc-50)',
          100: 'var(--zinc-100)',
          200: 'var(--zinc-200)',
          300: 'var(--zinc-300)',
          400: 'var(--zinc-400)',
          500: 'var(--zinc-500)',
          600: 'var(--zinc-600)',
          700: 'var(--zinc-700)',
          800: 'var(--zinc-800)',
          900: 'var(--zinc-900)',
          950: 'var(--zinc-950)',
        }
      },

      // Custom font sizes
      // fontSize accepts: string, [size, line-height], or [size, config object]
      fontSize: {
        // Override default sizes with Figma values
        'xs': 'var(--text-xs)',       // 12px - Usage: text-xs
        'sm': 'var(--text-sm)',       // 14px - Usage: text-sm
        'base': 'var(--text-base)',   // 16px - Usage: text-base (default)
        'lg': 'var(--text-lg)',       // 18px - Usage: text-lg
        'xl': 'var(--text-xl)',       // 20px - Usage: text-xl
        '2xl': 'var(--text-2xl)',     // 24px - Usage: text-2xl
        '3xl': 'var(--text-3xl)',     // 30px - Usage: text-3xl
        '4xl': 'var(--text-4xl)',     // 36px - Usage: text-4xl
        
        // Example with custom line-height:
        // 'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },

      // Font family
      // This makes Poppins the default sans font
      fontFamily: {
        // sans: replaces the default sans-serif font
        // Now any text will use Poppins automatically
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        
        // If you want Poppins as a separate option:
        // poppins: ['var(--font-poppins)', 'sans-serif'],
        // Usage: className="font-poppins"
      },
    },
  },

  // Tailwind plugins (optional)
  // Here you would add plugins like @tailwindcss/forms, @tailwindcss/typography, etc.
  plugins: [],
};

export default config;