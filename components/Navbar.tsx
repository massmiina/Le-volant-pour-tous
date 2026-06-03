'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { data: session, status } = useSession();

  const mainLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.courses'), href: '/cours' },
    { name: t('nav.quiz'), href: '/quiz' },
    { name: t('nav.exam'), href: '/examen' },
    { name: t('nav.situations'), href: '/situations' },
    { name: t('nav.schools'), href: '/auto-ecole' },
  ];

  const dropdownLinks = [
    { name: t('nav.reviews'), href: '/avis' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const navLinks = [...mainLinks, ...dropdownLinks];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600 tracking-tight">
                {language === 'fr' ? 'Le Volant Pour Tous' : t('home.title')}
              </span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4 lg:space-x-5">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dropdown for "Plus" (Avis & Contact) */}
            <div 
              className="relative py-4"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button
                className={`inline-flex items-center px-1 pt-1 pb-1 border-b-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
                  dropdownLinks.some(link => pathname === link.href)
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <span>{t('nav.more') || "Plus"}</span>
                <svg className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMoreOpen && (
                <div className="absolute left-0 mt-1 w-40 rounded-xl shadow-xl bg-white border border-gray-100 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden transform origin-top-left transition-all duration-200">
                  <div className="py-1.5 px-1 space-y-0.5">
                    {dropdownLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-3.5 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                          pathname === link.href
                            ? 'bg-blue-50 text-blue-600 font-bold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative ml-3">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
              >
                <span className="mr-2">{languages.find(l => l.code === language)?.flag}</span>
                <span className="uppercase">{language}</span>
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden border border-gray-100">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors ${
                          language === lang.code ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-gray-700'
                        }`}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Auth Button */}
            <div className="ml-3 flex items-center">
              {status === "loading" ? (
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
              ) : session ? (
                <div className="relative group">
                  <Link href="/dashboard" className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 text-white flex items-center justify-center font-bold">
                      {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  </Link>
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
                    <Link href="/compte" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      👤 {t('account.title') || "Mon Compte"}
                    </Link>
                    <Link href="/dashboard" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      📊 {t('exam.dashboard_btn') || "Mon Dashboard"}
                    </Link>
                    <hr className="border-gray-100 my-1" />
                    <button onClick={() => signOut({ callbackUrl: '/' })} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors">
                      🚪 {t('auth.logout')}
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                  {t('auth.login')}
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden gap-4">
             {/* Mobile Language Selector */}
             <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="text-gray-500 px-2 py-1 border rounded text-sm uppercase"
              >
                {language}
              </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {(isOpen || isLangOpen) && (
        <div className="sm:hidden bg-white border-b border-gray-100">
          {isLangOpen ? (
            <div className="pt-2 pb-3 space-y-1">
               <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase">Langue / Choose Language</p>
               {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsLangOpen(false);
                  }}
                  className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    language === lang.code
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-500'
                  }`}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
              <div className="border-t border-gray-100 mt-2"></div>
            </div>
          ) : (
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    pathname === link.href
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
