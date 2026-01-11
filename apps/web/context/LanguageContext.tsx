'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, getTranslation } from '@/lib/translations'

type Language = 'th' | 'en'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en')
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // Load saved language preference from localStorage
        const savedLang = localStorage.getItem('accp-language') as Language
        if (savedLang && (savedLang === 'th' || savedLang === 'en')) {
            setLanguageState(savedLang)
        }
        setIsLoaded(true)
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem('accp-language', lang)
    }

    // Translation function
    const t = (key: string): string => {
        return getTranslation(key, language)
    }

    // Prevent hydration mismatch by not rendering until loaded
    if (!isLoaded) {
        return <>{children}</>
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        // Return default values if used outside provider
        return {
            language: 'en' as Language,
            setLanguage: () => { },
            t: (key: string) => getTranslation(key, 'en')
        }
    }
    return context
}

export { translations }
