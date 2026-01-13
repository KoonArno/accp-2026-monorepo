// Header component style constants
export const HEADER_COLORS = {
    active: '#FFBA00',
    light: '#fff',
    dark: '#000',
    langBtnActive: '#FFBA00',
    langBtnInactive: '#E8E8E8',
    langBtnBorder: 'rgba(0, 0, 0, 0.15)',
} as const;

export const getLanguageButtonStyle = (isActive: boolean, isScrolled: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '40px',
    background: isActive 
        ? HEADER_COLORS.langBtnActive 
        : isScrolled 
            ? HEADER_COLORS.langBtnInactive 
            : 'rgba(255, 255, 255, 0.1)',
    color: isActive 
        ? HEADER_COLORS.light 
        : HEADER_COLORS.dark,
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    backdropFilter: isActive || isScrolled ? 'none' : 'blur(4px)'
} as const);

export const languageSwitcherContainerStyle = {
    alignItems: 'center',
    gap: '0',
    border: `1px solid ${HEADER_COLORS.langBtnBorder}`,
    overflow: 'hidden',
    borderRadius: '4px'
} as const;

export const getMenuLinkColor = (isActive: boolean, headerBgWhite: boolean) => 
    isActive ? HEADER_COLORS.active : headerBgWhite ? HEADER_COLORS.dark : HEADER_COLORS.light;

export const getMenuLinkWeight = (isActive: boolean) => 
    isActive ? '600' : 'normal';

export const authButtonStyles = {
    login: {
        background: 'transparent',
        border: `2px solid ${HEADER_COLORS.light}`,
        color: HEADER_COLORS.light,
        padding: '10px 20px',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center'
    },
    signup: {
        background: 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)',
        border: 'none',
        color: HEADER_COLORS.light,
        padding: '10px 20px',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center'
    }
} as const;
