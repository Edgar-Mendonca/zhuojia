
// TAILWIND CONFIGURATION
tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#004C99',
                        secondary: '#0066CC',
                        accent: '#00A3FF',
                        dark: '#0F172A',
                        darker: '#020617',
                        light: '#F8FAFC',
                        card: '#FFFFFF'
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif']
                    },
                    boxShadow: {
                        soft: '0 10px 30px rgba(0,0,0,.08)',
                        card: '0 15px 40px rgba(15,23,42,.08)',
                        navbar: '0 8px 30px rgba(15,23,42,.08)'
                    },
                    keyframes: {
                        float: {
                            '0%,100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-12px)' }
                        },
                        pulseSlow: {
                            '0%,100%': { opacity: '1' },
                            '50%': { opacity: '.6' }
                        }
                    },
                    animation: {
                        float: 'float 6s ease-in-out infinite',
                        pulseSlow: 'pulseSlow 6s ease infinite'
                    }
                }
            }
        }


       
       