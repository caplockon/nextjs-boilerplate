import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,tsx,jsx,tsx,mdx}',
    './src/providers/**/*.{js,tsx,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: '#1976D2',
          50: '#ADD1F5',
          100: '#9BC7F3',
          200: '#77B3EF',
          300: '#529FEA',
          400: '#2E8AE6',
          500: '#1976D2',
          600: '#135AA0',
          700: '#0D3E6E',
          800: '#07213C',
          900: '#010509',
          950: '#000000',
        },
        secondary: {
          DEFAULT: '#1976D2',
          50: '#ADD1F5',
          100: '#9BC7F3',
          200: '#77B3EF',
          300: '#529FEA',
          400: '#2E8AE6',
          500: '#1976D2',
          600: '#135AA0',
          700: '#0D3E6E',
          800: '#07213C',
          900: '#010509',
          950: '#000000',
        },
        success: {
          DEFAULT: '#43936C',
        },
        error: {
          DEFAULT: '#F15950',
        },
        danger: {
          DEFAULT: '#F15950',
        },
        warning: {
          DEFAULT: '#85E0A3',
        },
        gray: {
          DEFAULT: '#697A8D',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

export default config
