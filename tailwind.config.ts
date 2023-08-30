import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'mulberry': {
          faint: '#fcfcff',
          lighter: '#f5f5ff',
          light: '#c7c7d8',
          DEFAULT: '#676777',
          medium: '#5a5a66',
          dark: '#434351',
        },
        'redax': {
          lighter: '#232323',
          light: '#212121',
          DEFAULT: '#151515',
          medium: '#191919',
          dark: '#131313',
        },
        'blue': {
          25: 'rgb(252,252,252)'
        },
      },
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        slideInFromRight: {
          'from': { transform: 'translate3d(100%,0,0)' }, 
          'to': { transform: 'translate3d(0,0,0)' },
        },
        slideOutToRight: {
          'from': { transform: 'translate3d(0,0,0)' },
          'to': { transform: 'translate3d(100%,0,0)' }, 
        },
        slideInFromLeft: {
          'from': { transform: 'translate3d(-100%,0,0)' }, 
          'to': { transform: 'translate3d(0,0,0)' },
        },
        slideOutToLeft: {
          'from': { transform: 'translate3d(0,0,0)' },
          'to': { transform: 'translate3d(-100%,0,0)' }, 
        },
        popUpFromBottom: {
          'from': { transform: 'translate3d(0,10%,0)', opacity: '0', }, 
          'to': { transform: 'translate3d(0,0,0)', opacity: '100%', },
        },
        popDownToBottom: {
          'from': { transform: 'translate3d(0,0,0)', opacity: '100%', },
          'to': { transform: 'translate3d(0,10%,0)', opacity: '0' }, 
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '100%' }, 
        },
        fadeOut: {
          'from': { opacity: '100%' },
          'to': { opacity: '0' }, 
        },
      },
      animation: {
        'slide-in-from-right': 'slideInFromRight 0.25s ease-in-out 1 forwards',
        'slide-out-to-right': 'slideOutToRight 0.25s ease-in-out 1 forwards',
        'slide-in-from-left': 'slideInFromLeft 0.25s ease-in-out 1 forwards',
        'slide-out-to-left': 'slideOutToLeft 0.25s ease-in-out 1 forwards',
        'pop-up-from-bottom': 'popUpFromBottom 0.25s ease-in-out 1 forwards',
        'pop-down-to-bottom': 'popDownToBottom 0.25s ease-in-out 1 forwards',
        'fade-in': 'fadeIn 0.25s ease-in-out 1 forwards',
        'fade-out': 'fadeOut 0.25s ease-in-out 1 forwards',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, addUtilities }) {
      const supportsTouchRule = '@supports (-webkit-touch-callout: none)';
      const webkitFillAvailable = '-webkit-fill-available';

      const utilities = {
          '.min-h-screen-ios': {
              [supportsTouchRule]: {
                  minHeight: webkitFillAvailable,
              },
          },
          '.h-screen-ios': {
              [supportsTouchRule]: {
                  height: webkitFillAvailable,
              },
          },
          '.': {
              letterSpacing: '0',
          }
      };
      addUtilities(utilities)
      addComponents({
        '.flag': {
            display: 'block',
            width: '26px',
            height: 'auto',
            borderRadius: '4px',
            filter: 'brightness(1.35) drop-shadow(0 1px 3px rgba(0,0,0,0.2))',
        },
      })
    })
  ],
}
export default config
