module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      },
      height: {
        128: '32rem'
      },
      colors: {
        blue: '#00aeef',
        black: '#141e2a'
      }
    },
    customForms: theme => ({
      default: {
        textarea: {
          '&:focus': {
            boxShadow: undefined,
            borderColor: theme('colors.teal.400'),
          }
        }
      }
    })
  },
  variants: {
    margin: ['responsive', 'first', 'last'],
    padding: ['responsive', 'first', 'last']
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ]
}
