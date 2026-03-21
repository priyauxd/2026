import React, { useEffect, useState } from 'react'
import Cursor from '../components/Cursor'

/* ─── DATA ────────────────────────────────────────────────── */

const OUTCOMES = [
  { n: '35+', l: 'UI components' },
  { n: '7', l: 'Shadow elevations' },
  { n: '2', l: 'Theme modes (Light / Dark)' },
  { n: '60+', l: 'Primitive tokens' },
]

const COMPONENTS = [
  { name: 'Buttons', variants: '5 sizes × 8 hierarchies × 6 states', desc: 'Primary, outlined, tertiary, secondary, link, and white variants — each with Default, Hover, Focused, Disabled, Loading states.' },
  { name: 'Form Fields', variants: 'Input, textarea, disabled, error, success', desc: 'Rounded inputs with teal border, icon slots, and validation states using Manrope for helper text.' },
  { name: 'Toggles', variants: 'Standard, pet, gender', desc: 'Custom toggle switches for pet selection and gender filtering, plus standard on/off toggles.' },
  { name: 'Avatars', variants: 'Multiple sizes with status', desc: 'User and pet avatars with online/offline indicators and pet breed imagery.' },
  { name: 'Dropdowns', variants: 'List items + full dropdown', desc: 'Filterable dropdown menus with search, multi-select, and icon support.' },
  { name: 'Date Picker', variants: 'Calendar cells + list items', desc: 'Calendar grid with selectable cells and a list-view alternative for date ranges.' },
  { name: 'Modals', variants: 'Confirmation + informational', desc: 'Centred overlay dialogs with header, body, and dual-action footer patterns.' },
  { name: 'Toast Notifications', variants: 'Success, error, warning, info', desc: 'Auto-dismissing notification bars with icon + message + optional action.' },
  { name: 'Chips & Status', variants: 'Status icons + filter chips', desc: 'Colour-coded status indicators (Expired, Active, Pending) and selectable filter chips.' },
  { name: 'Sliders & Steps', variants: 'Range slider + step indicator', desc: 'Continuous range slider for numeric inputs and a multi-step progress indicator.' },
  { name: 'Tooltips', variants: 'Top, bottom, left, right', desc: 'Contextual info popups anchored to any interactive element.' },
  { name: 'File Upload', variants: 'Drag + browse', desc: 'Drag-and-drop upload zone with browse fallback and file type validation.' },
]

const TYPE_SCALE = [
  { name: 'Display 2xl', size: '72px / 4.5rem', lh: '90px / 5.625rem', tracking: '−2%' },
  { name: 'Display xl',  size: '60px / 3.75rem', lh: '72px / 4.5rem',  tracking: '−2%' },
  { name: 'Display lg',  size: '48px / 3rem',    lh: '60px / 3.75rem', tracking: '−2%' },
  { name: 'Display md',  size: '36px / 2.25rem', lh: '44px / 2.75rem', tracking: '−2%' },
  { name: 'Display sm',  size: '30px / 1.875rem',lh: '38px / 2.375rem',tracking: '0' },
  { name: 'Display xs',  size: '24px / 1.5rem',  lh: '32px / 2rem',    tracking: '0' },
  { name: 'Text xl',     size: '20px / 1.25rem', lh: '30px / 1.875rem',tracking: '0' },
  { name: 'Text lg',     size: '18px / 1.125rem',lh: '28px / 1.75rem', tracking: '0' },
  { name: 'Text md',     size: '16px / 1rem',    lh: '24px / 1.5rem',  tracking: '0' },
  { name: 'Text sm',     size: '14px / 0.875rem',lh: '20px / 1.25rem', tracking: '0' },
  { name: 'Text xs',     size: '12px / 0.75rem', lh: '18px / 1.125rem',tracking: '0' },
]

const SHADOWS = [
  { name: 'shadow-xs',  desc: 'Subtle surface lift for cards at rest',         css: '0 1px 2px rgba(0,0,0,.05)' },
  { name: 'shadow-sm',  desc: 'Default interactive element resting state',     css: '0 1px 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.06)' },
  { name: 'shadow-md',  desc: 'Hovered cards and dropdown menus',              css: '0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.06)' },
  { name: 'shadow-lg',  desc: 'Modals and floating panels',                    css: '2px 4px 18px rgba(0,0,0,.1)' },
  { name: 'shadow-xl',  desc: 'Prominent popovers and toast notifications',    css: '0 20px 24px -4px rgba(0,0,0,.08), 0 8px 8px -4px rgba(0,0,0,.03)' },
  { name: 'shadow-2xl', desc: 'Primary overlays and full-screen modals',       css: '0 24px 48px -12px rgba(0,0,0,.18)' },
  { name: 'shadow-3xl', desc: 'Hero imagery and showcase elements',            css: '0 32px 64px -12px rgba(0,0,0,.14)' },
]

const COLOR_GROUPS = [
  {
    label: 'Gray',
    colors: [
      { token: 'Gray/25',  light: '#FCFCFD', dark: '#FAFAFA' },
      { token: 'Gray/50',  light: '#F9FAFB', dark: '#F5F5F5' },
      { token: 'Gray/100', light: '#F2F4F7', dark: '#F5F5F5' },
      { token: 'Gray/200', light: '#EAECF0', dark: '#E5E5E5' },
      { token: 'Gray/300', light: '#D0D5DD', dark: '#D4D4D4' },
      { token: 'Gray/500', light: '#667085', dark: '#737373' },
      { token: 'Gray/700', light: '#344054', dark: '#4D4E4F' },
      { token: 'Gray/900', light: '#101828', dark: '#171717' },
    ],
  },
  {
    label: 'Brand',
    colors: [
      { token: 'Black',    light: '#000000', dark: '#FFFFFF' },
      { token: 'White',    light: '#FFFFFF', dark: '#0A0A0A' },
      { token: 'Brand',    light: '#5BB9C4', dark: '#5BB9C4' },
    ],
  },
]

const SECTIONS = [
  {
    tag: '01 — Overview',
    title: 'A design system for compassionate pet care',
    body: `Oslo Pet Insurance needed a cohesive visual language that could scale across web, mobile, and print — from policy dashboards to physical pet tags.\n\nThe Pet Protect design system was built from the ground up with a token-first architecture. Every decision — from colour to elevation to type scale — is driven by semantic variables, enabling instant theme switching between light and dark modes without touching a single component.`,
  },
  {
    tag: '02 — Approach',
    title: 'Token-first, not component-first',
    body: `Rather than jumping straight to UI components, we started with the primitive layer: defining every colour, spacing value, radius, shadow, and type style as a reusable token.\n\nThis meant the system could support two full theme modes (Mode 1 / Mode 2) from day one, with every component automatically inheriting the correct values. Figma Variables were used throughout — no hard-coded hex values, no magic numbers.`,
  },
]

/* ─── SHARED STYLES ───────────────────────────────────────── */

const SL: React.CSSProperties = {
  fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em',
  textTransform: 'uppercase', color: 'var(--gold)',
}
const SH: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond",Georgia,serif',
  fontSize: 'clamp(1.5rem,2.8vw,2.4rem)', fontWeight: 300,
  lineHeight: 1.1, marginBottom: 20, color: 'var(--white)',
}
const ROW: React.CSSProperties = {
  display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64,
  marginBottom: 96, paddingBottom: 96,
  borderBottom: '1px solid var(--bdr2)', alignItems: 'start',
}

/* ─── PET TOGGLE ──────────────────────────────────────────── */

const DOG_SVG = (
  <svg viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.67823 0.0726567C7.05267 -0.14383 8.37244 0.137589 9.36377 0.728907C10.1333 1.18803 10.7488 1.86818 10.979 2.68106C12.3076 2.4443 13.6725 2.45808 14.9956 2.72109C15.2416 1.90012 15.8947 1.21447 16.6831 0.752344C17.7058 0.153038 19.0608 -0.144528 20.4399 0.0726567C21.5265 0.243468 22.428 0.868735 23.1519 1.66348C23.8753 2.45797 24.452 3.45417 24.895 4.44473C25.3395 5.43853 25.6604 6.45076 25.8608 7.29531C25.961 7.71761 26.0328 8.10401 26.0747 8.43008C26.115 8.74402 26.1322 9.04131 26.105 9.26699C26.0543 9.68537 25.783 10.0451 25.481 10.3119C25.1639 10.5918 24.7421 10.8352 24.2554 11.0102C23.9665 11.114 23.6495 11.1939 23.311 11.2445C23.6148 12.3692 23.7741 13.524 23.7798 14.685V14.6879C23.7796 17.4009 22.4899 19.5055 20.4429 20.9096C18.4146 22.3006 15.6575 22.9994 12.6694 22.9994C9.68143 22.9994 6.92424 22.3006 4.896 20.9096C2.91304 19.5494 1.64078 17.5319 1.56299 14.9408L1.55909 14.6879C1.55794 13.4655 1.70621 12.2467 2.00147 11.0561C1.95476 11.0409 1.90816 11.0265 1.8628 11.0102C1.37611 10.8352 0.955221 10.5918 0.638187 10.3119C0.335974 10.045 0.0638359 9.68555 0.0131873 9.26699C-0.014001 9.04133 0.00317546 8.744 0.0434607 8.43008C0.0853235 8.10404 0.157147 7.71756 0.257328 7.29531C0.457732 6.45081 0.778762 5.43847 1.22315 4.44473C1.66611 3.45427 2.24294 2.45793 2.96631 1.66348C3.69006 0.86881 4.59176 0.243537 5.67823 0.0726567ZM8.76514 1.73281C8.0164 1.28615 6.97359 1.05251 5.85987 1.22793C5.1204 1.34425 4.44329 1.77894 3.83155 2.45059C3.21954 3.12266 2.70303 3.99989 2.29053 4.92227C1.8795 5.84144 1.58157 6.78296 1.396 7.56484C1.30332 7.95545 1.23929 8.30162 1.20362 8.57949C1.16646 8.86921 1.16497 9.04975 1.17432 9.12734C1.1754 9.13268 1.18269 9.16294 1.21729 9.21719C1.25532 9.27678 1.3174 9.35272 1.41162 9.43594C1.60085 9.60301 1.88785 9.77643 2.2583 9.90957C2.99526 10.1744 4.01351 10.2601 5.1294 9.8666C6.55986 9.36138 7.35941 8.32125 7.81202 7.15371C7.92882 6.85281 8.26785 6.70311 8.56885 6.81973C8.86988 6.93642 9.01938 7.27551 8.90284 7.57656C8.3616 8.97278 7.35165 10.3218 5.51905 10.9691C4.68092 11.2648 3.87469 11.3446 3.15186 11.2846C2.87046 12.4007 2.72788 13.5427 2.72901 14.6879L2.74073 15.1107C2.86441 17.1948 3.906 18.8126 5.55811 19.9457C7.33933 21.1671 9.84528 21.8305 12.6694 21.8305C15.4939 21.8305 18.0005 21.1673 19.7817 19.9457C21.5431 18.7376 22.6088 16.9785 22.6099 14.6908C22.6042 13.5419 22.4347 12.3985 22.1089 11.2885C21.6262 11.2525 21.1186 11.1524 20.5991 10.9691C18.7423 10.3132 17.8796 8.9401 17.3511 7.57656C17.2346 7.27567 17.3844 6.93658 17.6851 6.81973C17.9861 6.70306 18.3251 6.85281 18.4419 7.15371C18.9071 8.354 19.5826 9.36991 20.9888 9.8666C22.1046 10.2602 23.1229 10.1743 23.8599 9.90957C24.2302 9.77649 24.5173 9.60295 24.7065 9.43594C24.8007 9.35282 24.8628 9.27674 24.9009 9.21719C24.9357 9.16265 24.9438 9.13243 24.9448 9.12734C24.9542 9.04974 24.9517 8.86925 24.9146 8.57949C24.8789 8.30159 24.8149 7.9555 24.7222 7.56484C24.5366 6.78291 24.2387 5.8415 23.8276 4.92227C23.4151 3.99978 22.8987 3.12269 22.2866 2.45059C21.6748 1.77885 20.9979 1.34418 20.2583 1.22793C19.1493 1.05329 18.0663 1.29674 17.2739 1.76113C16.4654 2.23514 16.0591 2.86793 16.0591 3.43008C16.059 3.61114 15.9749 3.78232 15.8315 3.89297C15.6882 4.00341 15.5017 4.04124 15.3267 3.99551C13.7928 3.59413 12.1734 3.57794 10.6304 3.94766C10.4563 3.98926 10.2719 3.94909 10.1314 3.83828C9.99098 3.72756 9.90894 3.55805 9.9087 3.3793C9.9087 2.80325 9.52425 2.1857 8.76514 1.73281ZM13.8384 15.5922C14.0958 15.5922 14.3231 15.761 14.398 16.0072C14.4726 16.2538 14.377 16.5205 14.1626 16.6635L12.9937 17.4438C12.7973 17.5745 12.5406 17.5746 12.3442 17.4438L11.1753 16.6635C10.9612 16.5205 10.8654 16.2537 10.9399 16.0072C11.0147 15.761 11.2422 15.5924 11.4995 15.5922H13.8384ZM7.60205 13.2533C7.92482 13.2535 8.18702 13.5155 8.18702 13.8383V14.6176C8.187 14.9404 7.92481 15.2023 7.60205 15.2025C7.27912 15.2025 7.01711 14.9405 7.01709 14.6176V13.8383C7.01709 13.5153 7.27911 13.2533 7.60205 13.2533ZM17.7368 13.2533C18.0598 13.2533 18.3218 13.5153 18.3218 13.8383V14.6176C18.3218 14.9405 18.0598 15.2025 17.7368 15.2025C17.4141 15.2023 17.1519 14.9404 17.1519 14.6176V13.8383C17.1519 13.5155 17.4141 13.2536 17.7368 13.2533Z" fill="currentColor"/>
  </svg>
)

const CAT_SVG = (
  <svg viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <path d="M24.4902 0.095731C24.9686 -0.00176799 25.6941 -0.150474 26.1572 0.38577C27.2509 1.64408 26.8309 5.29983 25.917 7.96878C26.508 9.29602 26.8129 10.7337 26.8125 12.1866V12.7403H28.5186C28.6801 12.7403 28.835 12.8048 28.9492 12.919C29.0634 13.0332 29.1278 13.1881 29.1279 13.3496C29.1279 13.5113 29.0635 13.667 28.9492 13.7813C28.835 13.8954 28.68 13.959 28.5186 13.959H26.6904C26.6383 14.2669 26.5701 14.5722 26.4863 14.8731H27.2998C27.4613 14.8731 27.6162 14.9376 27.7305 15.0518C27.8447 15.166 27.9091 15.3209 27.9092 15.4824C27.9092 15.6441 27.8447 15.7998 27.7305 15.9141C27.6162 16.0282 27.4613 16.0918 27.2998 16.0918H26.041C25.3493 17.6287 24.2292 18.9336 22.8145 19.8496C21.3996 20.7657 19.75 21.2547 18.0645 21.2569H11.1855C9.50004 21.2547 7.8504 20.7657 6.43555 19.8496C5.02078 18.9336 3.89977 17.6288 3.20801 16.0918H1.82812C1.66668 16.0918 1.51169 16.0282 1.39746 15.9141C1.28318 15.7998 1.21875 15.6441 1.21875 15.4824C1.21883 15.3209 1.28326 15.166 1.39746 15.0518C1.51171 14.9376 1.66659 14.8731 1.82812 14.8731H2.76367C2.6799 14.5722 2.61175 14.2669 2.55957 13.959H0.609375C0.447924 13.959 0.292941 13.8954 0.178711 13.7813C0.0644322 13.667 0 13.5113 0 13.3496C8.85407e-05 13.1881 0.064511 13.0332 0.178711 12.919C0.292956 12.8048 0.447851 12.7403 0.609375 12.7403H2.4375V12.1866C2.44007 10.7409 2.74494 9.31094 3.33301 7.99026C2.42516 5.32133 1.99911 1.66563 3.09277 0.407254C3.5405 -0.128794 4.28042 0.0197143 4.75879 0.117215C5.98057 0.348775 7.55654 1.36949 8.93066 2.55472C10.1711 2.05084 11.498 1.79207 12.8369 1.793H16.4131C17.7516 1.79014 19.0784 2.04702 20.3193 2.54886C21.6934 1.36373 23.2715 0.342626 24.4902 0.095731ZM13.4062 3.01175V4.22464C13.4062 4.38623 13.3418 4.54103 13.2275 4.6553C13.1133 4.76957 12.9585 4.834 12.7969 4.83401C12.6353 4.83401 12.4805 4.76958 12.3662 4.6553C12.2519 4.54102 12.1875 4.38625 12.1875 4.22464V3.04593C9.87483 3.21269 7.71098 4.24733 6.12891 5.94241C4.54684 7.63749 3.66331 9.86789 3.65625 12.1866V12.7403H5.3623C5.52378 12.7403 5.67872 12.8049 5.79297 12.919C5.90717 13.0332 5.97159 13.1881 5.97168 13.3496C5.97168 13.5113 5.90725 13.667 5.79297 13.7813C5.67873 13.8953 5.52371 13.959 5.3623 13.959H3.80273C3.86495 14.268 3.94494 14.5735 4.04297 14.8731H5.35352C5.51504 14.8731 5.66994 14.9376 5.78418 15.0518C5.89839 15.166 5.96281 15.3209 5.96289 15.4824C5.96289 15.6441 5.89846 15.7998 5.78418 15.9141C5.66995 16.0282 5.51496 16.0918 5.35352 16.0918H4.57031C5.21601 17.2837 6.17179 18.2792 7.33594 18.9737C8.50004 19.668 9.8301 20.0362 11.1855 20.0381H18.0645C19.4199 20.0362 20.7499 19.668 21.9141 18.9737C23.0782 18.2792 24.034 17.2837 24.6797 16.0918H23.7656C23.6042 16.0918 23.4492 16.0281 23.335 15.9141C23.2207 15.7998 23.1562 15.6441 23.1562 15.4824C23.1563 15.3209 23.2208 15.166 23.335 15.0518C23.4492 14.9377 23.6041 14.8731 23.7656 14.8731H25.2129C25.3109 14.5735 25.3909 14.268 25.4531 13.959H23.7656C23.6042 13.959 23.4492 13.8953 23.335 13.7813C23.2207 13.667 23.1562 13.5113 23.1562 13.3496C23.1563 13.1881 23.2208 13.0332 23.335 12.919C23.4492 12.8048 23.6041 12.7403 23.7656 12.7403H25.5938V12.1866C25.5908 9.97082 24.7876 7.82976 23.332 6.15921C21.8765 4.48879 19.8662 3.40102 17.6719 3.09475V4.21585C17.6718 4.37735 17.6074 4.53231 17.4932 4.64651C17.3789 4.7607 17.224 4.8252 17.0625 4.82522C16.901 4.82522 16.7461 4.76067 16.6318 4.64651C16.5176 4.53231 16.4532 4.37735 16.4531 4.21585V3.01175H15.5391V5.44925C15.5391 5.61079 15.4745 5.76565 15.3604 5.87991C15.2461 5.99418 15.0913 6.05861 14.9297 6.05862C14.7681 6.05862 14.6133 5.99419 14.499 5.87991C14.3848 5.76564 14.3203 5.61081 14.3203 5.44925V3.01175H13.4062ZM14.625 12.7617C14.7866 12.7618 14.9414 12.8262 15.0557 12.9405C15.1699 13.0547 15.2343 13.2096 15.2344 13.3711C15.2344 13.6079 15.3287 13.8355 15.4961 14.003C15.6635 14.1701 15.8904 14.2637 16.127 14.2637C16.2811 14.2649 16.4332 14.2254 16.5674 14.1494C16.7015 14.0735 16.8132 13.9637 16.8916 13.8311C16.9329 13.7625 16.9874 13.7029 17.0518 13.6553C17.1162 13.6077 17.1898 13.573 17.2676 13.5537C17.3454 13.5345 17.4266 13.5309 17.5059 13.543C17.585 13.5551 17.661 13.5826 17.7295 13.6241C17.8674 13.7075 17.967 13.8426 18.0059 13.9991C18.0446 14.1554 18.0194 14.3208 17.9365 14.459C17.7473 14.7698 17.4818 15.0269 17.165 15.2061C16.8482 15.3853 16.4909 15.4804 16.127 15.4824C15.8473 15.4827 15.5704 15.4276 15.3125 15.3194C15.0545 15.2111 14.8207 15.0515 14.625 14.8516C14.4293 15.0515 14.1955 15.2111 13.9375 15.3194C13.6797 15.4276 13.4027 15.4827 13.123 15.4824C12.7591 15.4804 12.4017 15.3852 12.085 15.2061C11.7683 15.0269 11.5027 14.7698 11.3135 14.459C11.2302 14.3204 11.205 14.1539 11.2441 13.9971C11.2833 13.8406 11.3832 13.7062 11.5215 13.6231C11.6601 13.5398 11.8266 13.5146 11.9834 13.5537C12.1401 13.5929 12.2752 13.6926 12.3584 13.8311C12.4368 13.9638 12.5485 14.0735 12.6826 14.1494C12.8168 14.2254 12.9689 14.2649 13.123 14.2637C13.3596 14.2636 13.5866 14.1701 13.7539 14.003C13.9213 13.8355 14.0156 13.6079 14.0156 13.3711C14.0157 13.2096 14.0801 13.0547 14.1943 12.9405C14.3086 12.8263 14.4634 12.7617 14.625 12.7617ZM8.53125 10.6074C9.03594 10.6074 9.44511 11.0169 9.44531 11.5215C9.44531 12.0263 9.03607 12.4356 8.53125 12.4356C8.02644 12.4356 7.61719 12.0263 7.61719 11.5215C7.61739 11.0169 8.02656 10.6075 8.53125 10.6074ZM20.7188 10.6074C21.2234 10.6075 21.6326 11.0169 21.6328 11.5215C21.6328 12.0263 21.2235 12.4355 20.7188 12.4356C20.2139 12.4356 19.8047 12.0263 19.8047 11.5215C19.8049 11.0169 20.2141 10.6074 20.7188 10.6074ZM25.2676 1.22073C25.0868 1.22435 24.9071 1.24809 24.7314 1.29104C23.8387 1.47081 22.6443 2.21075 21.5078 3.13089C22.0273 3.42421 22.5207 3.76192 22.9824 4.13968C23.0823 4.02534 23.2212 3.95186 23.3721 3.9346C23.5229 3.91734 23.6747 3.95715 23.7979 4.04593C23.921 4.13474 24.0069 4.2665 24.0381 4.41507C24.0692 4.5636 24.0438 4.71883 23.9668 4.84964L23.8848 4.97464C24.3365 5.43856 24.7448 5.94337 25.1035 6.48245C25.658 4.295 25.7732 1.89734 25.2676 1.22073ZM3.98242 1.22073C3.47674 1.89728 3.59234 4.29528 4.1377 6.47366C4.49654 5.9344 4.90453 5.42892 5.35645 4.96487L5.27441 4.83987C5.19404 4.7091 5.16545 4.55293 5.19531 4.40237C5.22527 4.25172 5.31118 4.11751 5.43555 4.02737C5.55986 3.93731 5.71381 3.89767 5.86621 3.91604C6.01873 3.93453 6.1595 4.00973 6.25879 4.12698C6.72046 3.74934 7.21402 3.41144 7.7334 3.11819C6.6061 2.20417 5.41127 1.47083 4.51855 1.29104C4.34299 1.24787 4.16318 1.22413 3.98242 1.22073Z" fill="currentColor"/>
  </svg>
)

function PetToggleShowcase() {
  const [selected, setSelected] = useState<'dog' | 'cat'>('dog')
  const [size, setSize] = useState<'default' | 'sm'>('default')

  const teal = '#5BB9C4'
  const tealLight = '#c0ecf1'
  const tealBorder = '#99dfe8'
  const textColor = '#01749c'
  const isDefault = size === 'default'
  const h = isDefault ? 48 : 32
  const iconSize = isDefault ? 26 : 18
  const fontSize = isDefault ? 15 : 11
  const px = isDefault ? 16 : 10

  const pillStyle = (active: boolean, side: 'left' | 'right'): React.CSSProperties => ({
    flex: 1,
    height: h,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isDefault ? 6 : 4,
    background: active ? tealLight : '#fff',
    border: `1px solid ${tealBorder}`,
    borderRadius: side === 'left' ? `${h}px 0 0 ${h}px` : `0 ${h}px ${h}px 0`,
    cursor: 'pointer',
    transition: 'background .2s',
    padding: `0 ${px}px`,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Size selector */}
      <div style={{ display: 'flex', gap: 10 }}>
        {(['default', 'sm'] as const).map(s => (
          <button
            key={s}
            onClick={() => setSize(s)}
            style={{
              fontSize: '.6rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase',
              padding: '6px 14px', border: `1px solid ${size === s ? teal : 'var(--bdr2)'}`,
              background: size === s ? 'rgba(91,185,196,.1)' : 'transparent',
              color: size === s ? teal : 'var(--muted)', cursor: 'pointer', borderRadius: 2,
            }}
          >
            {s === 'default' ? 'Default' : 'Compact'}
          </button>
        ))}
      </div>

      {/* Toggle demo */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', width: isDefault ? 198 : 128, background: '#fff', borderRadius: h, overflow: 'hidden' }}>
          <div style={pillStyle(selected === 'dog', 'left')} onClick={() => setSelected('dog')}>
            <div style={{ width: iconSize, height: iconSize, color: textColor, flexShrink: 0 }}>{DOG_SVG}</div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize, fontWeight: 400, color: textColor }}>Dog</span>
          </div>
          <div style={pillStyle(selected === 'cat', 'right')} onClick={() => setSelected('cat')}>
            <div style={{ width: iconSize, height: iconSize, color: textColor, flexShrink: 0 }}>{CAT_SVG}</div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize, fontWeight: 400, color: textColor }}>Cat</span>
          </div>
        </div>
        <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>
          Selected: <span style={{ color: teal, fontWeight: 500 }}>{selected === 'dog' ? 'Dog' : 'Cat'}</span>
        </span>
      </div>

      {/* Variant showcase */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, background: 'var(--bdr2)' }}>
        {[
          { label: 'Default — Dog Selected', desc: 'Active teal highlight on the selected side, white on the inactive side.' },
          { label: 'Default — Cat Selected', desc: 'The same toggle flipped — cat side gets the teal highlight.' },
          { label: 'Wide Label Variant', desc: 'Stretched layout for use inside forms or settings panels where horizontal space is available.' },
          { label: 'Compact Size', desc: 'Smaller toggle for dashboard widgets, table rows, or mobile viewports.' },
        ].map(({ label, desc }) => (
          <div key={label} style={{ background: 'var(--s2)', padding: '18px 20px' }}>
            <div style={{ fontSize: '.72rem', fontWeight: 500, color: 'var(--white)', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: '.7rem', color: 'var(--muted)', lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Anatomy breakdown */}
      <div style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', padding: '24px 28px' }}>
        <div style={{ fontSize: '.55rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: teal, marginBottom: 14 }}>Anatomy</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            ['Pet Silhouette', 'Custom SVG icons — dog and cat — at 30px (default) or 22px (compact). Colour inherits from the text token.'],
            ['Segmented Pill', 'Two rounded halves with a 1px teal border. Active side fills with Primary/100; inactive stays white.'],
            ['Label', 'Inter Regular at 16px (default) or 12px (compact) in Secondary/400 for both states — no colour shift on select.'],
          ].map(([title, text]) => (
            <div key={title}>
              <div style={{ fontSize: '.72rem', fontWeight: 500, color: 'var(--white)', marginBottom: 5 }}>{title}</div>
              <div style={{ fontSize: '.7rem', color: 'var(--muted)', lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── COMPONENT ───────────────────────────────────────────── */

export default function CaseStudyPetProtect() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Cursor />
      <div style={{ background: 'var(--black)', color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontWeight: 300, minHeight: '100vh' }}>

        {/* NAV */}
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px var(--pad)', background: 'linear-gradient(180deg,rgba(8,8,15,.97) 0%,transparent 100%)' }}>
          <a href="https://priyauxd.github.io/2026/" style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--white)', textDecoration: 'none', letterSpacing: '.04em', cursor: 'none' }}>
            PRIYAMVADA <span style={{ color: 'var(--gold)' }}>·</span> UX
          </a>
          <a href="https://priyauxd.github.io/2026/" style={{ fontSize: '.72rem', fontWeight: 400, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', cursor: 'none', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >← Back to Work</a>
        </nav>

        {/* ── HERO ── */}
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px var(--pad) 80px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--bdr2)', textAlign: 'center' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 50% 20%,#0a2a30 0%,transparent 55%),linear-gradient(145deg,#040c0e 0%,#081a1e 55%,#040c0e 100%)', pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(91,185,196,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(91,185,196,.03) 1px,transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
            <span style={{ fontSize: '.65rem', fontWeight: 500, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, display: 'block' }}>
              Case Study · Design System · Pet Insurance · Oslo
            </span>
            <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(2.4rem,4.8vw,5.6rem)', fontWeight: 300, lineHeight: .95, letterSpacing: '-.01em', marginBottom: 28 }}>
              Pet Protect —<br />Design System for<br />
              <em style={{ fontStyle: 'italic', color: '#5BB9C4' }}>Oslo Pet Insurance</em>
            </h1>
            <p style={{ fontSize: '.95rem', lineHeight: 1.75, color: 'var(--muted)', maxWidth: 520, margin: '0 auto 48px' }}>
              A token-first design system powering Oslo's pet insurance platform — from primitive colour variables to a full typography scale, shadow library, and dual-mode theming.
            </p>
            <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap', paddingTop: 32, borderTop: '1px solid var(--bdr2)', marginBottom: 64 }}>
              {[['Role', 'Lead Product Designer'], ['Scope', 'Design System'], ['Tools', 'Figma · Variables'], ['Themes', 'Light + Dark']].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 5 }}>{k}</div>
                  <div style={{ fontSize: '.85rem', color: 'var(--white)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ── OUTCOMES STRIP ── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid var(--bdr2)' }}>
          {OUTCOMES.map(({ n, l }, i) => (
            <div key={l} style={{ padding: '40px var(--pad)', borderRight: i < OUTCOMES.length - 1 ? '1px solid var(--bdr2)' : 'none', textAlign: 'center' }}>
              <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(2rem,3.5vw,3.2rem)', fontWeight: 300, color: '#5BB9C4', lineHeight: 1, display: 'block', marginBottom: 8 }}>{n}</span>
              <span style={{ fontSize: '.63rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>{l}</span>
            </div>
          ))}
        </section>

        {/* ── MAIN CONTENT ── */}
        <main style={{ maxWidth: 1100, margin: '0 auto', padding: '100px var(--pad)' }}>

          {/* 01 OVERVIEW · 02 APPROACH */}
          {SECTIONS.map(({ tag, title, body }) => (
            <div key={tag} style={ROW}>
              <div><span style={SL}>{tag}</span></div>
              <div>
                <h2 style={SH}>{title}</h2>
                {body.split('\n\n').map((p, i) => (
                  <p key={i} style={{ fontSize: '.9rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: 16 }}>{p}</p>
                ))}
              </div>
            </div>
          ))}

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              03 — TYPOGRAPHY
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={ROW}>
            <div><span style={SL}>03 — Typography</span></div>
            <div>
              <h2 style={SH}>Inter — a type scale built for clarity</h2>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 32 }}>
                Inter was chosen for its excellent legibility at small sizes and its wide range of weights. The type scale spans 11 levels — from Display 2xl (72px) for hero headlines down to Text xs (12px) for metadata — each with four weight variants: Regular, Medium, Semibold, and Bold.
              </p>

              {/* Font specimen */}
              <div style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', padding: '32px 36px', marginBottom: 24 }}>
                <div style={{ fontSize: '.55rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Typeface</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400, color: 'var(--white)', lineHeight: 1.1, marginBottom: 12 }}>
                  Inter
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(.85rem,1.2vw,1rem)', fontWeight: 400, color: 'var(--muted)', lineHeight: 1.9, letterSpacing: '-.01em' }}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                  abcdefghijklmnopqrstuvwxyz<br />
                  {'0123456789 !@#$%^&*()'}
                </div>
              </div>

              {/* Scale table */}
              <div style={{ border: '1px solid var(--bdr2)', overflow: 'hidden' }}>
                {/* Table header */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 100px', background: 'var(--s3)', padding: '10px 20px', gap: 12 }}>
                  {['Scale', 'Font Size', 'Line Height', 'Tracking'].map(h => (
                    <div key={h} style={{ fontSize: '.55rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>{h}</div>
                  ))}
                </div>
                {TYPE_SCALE.map(({ name, size, lh, tracking }, i) => (
                  <div key={name} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 100px', padding: '12px 20px', gap: 12, background: i % 2 === 0 ? 'var(--s2)' : 'var(--s1)', borderTop: '1px solid var(--bdr2)' }}>
                    <div style={{ fontSize: '.78rem', fontWeight: 500, color: 'var(--white)' }}>{name}</div>
                    <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{size}</div>
                    <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{lh}</div>
                    <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{tracking}</div>
                  </div>
                ))}
              </div>

              {/* Weight samples */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'var(--bdr2)', marginTop: 24 }}>
                {(['Regular', 'Medium', 'Semibold', 'Bold'] as const).map((w, i) => (
                  <div key={w} style={{ background: 'var(--s2)', padding: '24px 20px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.6rem', fontWeight: [400, 500, 600, 700][i], color: 'var(--white)', marginBottom: 8, lineHeight: 1 }}>Ag</div>
                    <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>{w}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              04 — COLOUR TOKENS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={ROW}>
            <div><span style={SL}>04 — Colour Tokens</span></div>
            <div>
              <h2 style={SH}>Primitive tokens with dual-mode support</h2>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 32 }}>
                Every colour in the system is defined as a Figma Variable with two modes. Mode 1 (light) and Mode 2 (dark) swap automatically — no manual overrides, no duplicate components.
              </p>

              {COLOR_GROUPS.map(({ label, colors }) => (
                <div key={label} style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: '.55rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>{label}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 2, background: 'var(--bdr2)' }}>
                    {colors.map(({ token, light, dark }) => (
                      <div key={token} style={{ background: 'var(--s2)', padding: '16px 14px' }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 4, background: light, border: '1px solid rgba(255,255,255,.08)', flexShrink: 0 }} />
                          <div style={{ width: 28, height: 28, borderRadius: 4, background: dark, border: '1px solid rgba(255,255,255,.08)', flexShrink: 0 }} />
                        </div>
                        <div style={{ fontSize: '.72rem', fontWeight: 500, color: 'var(--white)', marginBottom: 3 }}>{token}</div>
                        <div style={{ fontSize: '.62rem', color: 'var(--muted)', fontFamily: 'monospace' }}>
                          {light} / {dark}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Brand callout */}
              <div style={{ background: 'linear-gradient(135deg,rgba(91,185,196,.08) 0%,var(--s2) 100%)', border: '1px solid rgba(91,185,196,.18)', padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 2, background: '#5BB9C4', alignSelf: 'stretch', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '.58rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: '#5BB9C4', marginBottom: 10 }}>Brand colour</div>
                  <div style={{ fontSize: '.88rem', color: 'var(--white)', lineHeight: 1.75 }}>
                    Oslo's signature teal <span style={{ color: '#5BB9C4', fontWeight: 500 }}>#5BB9C4</span> remains constant across both modes — it's the one colour that never swaps, anchoring the brand identity in every context.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              05 — SHADOWS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={ROW}>
            <div><span style={SL}>05 — Elevation & Shadows</span></div>
            <div>
              <h2 style={SH}>Seven levels of elevation</h2>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 32 }}>
                The shadow system uses seven levels of elevation — from shadow-xs (subtle card lift) to shadow-3xl (hero imagery). Each shadow is built from variable-driven colour tokens so they adapt correctly across light and dark modes.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
                {SHADOWS.map(({ name, desc, css }) => (
                  <div key={name} style={{ background: '#fff', borderRadius: 12, padding: 20, height: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: css, border: '1px solid #f5f5f5' }}>
                    <span style={{ fontSize: '.75rem', fontWeight: 500, color: '#344054' }}>{name}</span>
                    <span style={{ fontSize: '.62rem', color: '#667085', lineHeight: 1.5 }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              06 — FOCUS & ACCESSIBILITY
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={ROW}>
            <div><span style={SL}>06 — Focus & Accessibility</span></div>
            <div>
              <h2 style={SH}>Focus rings that meet WCAG standards</h2>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 32 }}>
                Two focus ring variants — primary (brand teal) and secondary (gray) — ensure visible keyboard navigation across every interactive element. Both use 2px offset for clear separation from element boundaries.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'var(--bdr2)' }}>
                {[
                  { label: 'Primary Focus Ring', color: '#5BB9C4', desc: 'Used on primary actions, CTAs, and brand-coloured interactive elements.' },
                  { label: 'Secondary Focus Ring', color: '#D0D5DD', desc: 'Used on secondary buttons, inputs, and neutral interactive elements.' },
                ].map(({ label, color, desc }) => (
                  <div key={label} style={{ background: 'var(--s2)', padding: '28px 24px' }}>
                    <div style={{ width: 200, height: 100, borderRadius: 12, background: '#fff', border: '1px solid #f5f5f5', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', outline: `3px solid ${color}`, outlineOffset: 2 }}>
                      <span style={{ fontSize: '.7rem', fontWeight: 500, color: '#344054' }}>Interactive element</span>
                    </div>
                    <div style={{ fontSize: '.72rem', fontWeight: 500, color: 'var(--white)', marginBottom: 6 }}>{label}</div>
                    <div style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.65 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              07 — BRAND TOUCHPOINT
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={ROW}>
            <div><span style={SL}>07 — Brand Touchpoint</span></div>
            <div>
              <h2 style={SH}>From screen to collar — the Oslo tag</h2>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 32 }}>
                The design system extends beyond digital. Oslo's physical pet tag uses the same brand teal and Nunito typeface, with a front-facing logo and a back-side TAG ID for quick identification. This bridges the digital insurance experience with the real-world product.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                {[
                  { label: 'Front', desc: 'Oslo logo with heart icon — brand recognition at a glance.', img: `${import.meta.env.BASE_URL}images/oslo-tag-front.png` },
                  { label: 'Back', desc: 'Unique TAG ID field — links the physical tag to the digital policy.', img: `${import.meta.env.BASE_URL}images/oslo-tag-back.png` },
                ].map(({ label, desc, img }) => (
                  <div key={label} style={{ background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 3, padding: 28, textAlign: 'center' }}>
                    <img src={img} alt={`Oslo pet tag — ${label}`} style={{ width: 180, height: 180, margin: '0 auto 20px', display: 'block', objectFit: 'contain' }} />
                    <div style={{ fontSize: '.72rem', fontWeight: 500, color: 'var(--white)', marginBottom: 6 }}>{label}</div>
                    <div style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.65 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              08 — COMPONENT LIBRARY
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={ROW}>
            <div><span style={SL}>08 — Component Library</span></div>
            <div>
              <h2 style={SH}>35+ components, every state accounted for</h2>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 32 }}>
                The component library covers every interaction pattern in the Oslo platform — from buttons with 5 size variants and 8 hierarchy levels to specialised pet-specific toggles and insurance status chips. Each component is built on the primitive token layer, so they adapt instantly across both theme modes.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, background: 'var(--bdr2)', marginBottom: 24 }}>
                {COMPONENTS.map(({ name, variants, desc }) => (
                  <div key={name} style={{ background: 'var(--s2)', padding: '20px 22px' }}>
                    <div style={{ fontSize: '.78rem', fontWeight: 500, color: 'var(--white)', marginBottom: 4 }}>{name}</div>
                    <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: '#5BB9C4', marginBottom: 8 }}>{variants}</div>
                    <div style={{ fontSize: '.73rem', color: 'var(--muted)', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>

              {/* Dashboard callout */}
              <div style={{ background: 'linear-gradient(135deg,rgba(91,185,196,.08) 0%,var(--s2) 100%)', border: '1px solid rgba(91,185,196,.18)', padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 2, background: '#5BB9C4', alignSelf: 'stretch', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '.58rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: '#5BB9C4', marginBottom: 10 }}>Dashboard integration</div>
                  <div style={{ fontSize: '.88rem', color: 'var(--white)', lineHeight: 1.75 }}>
                    All components are battle-tested in the Oslo dashboard — a full pet insurance management interface featuring policy stats, pet profiles, claim tracking, referral programs, and vet consultation flows.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              09 — PET TOGGLE COMPONENT
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div style={ROW}>
            <div><span style={SL}>09 — Component Spotlight</span></div>
            <div>
              <h2 style={SH}>Pet Toggle — Dog or Cat, one tap</h2>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: 32 }}>
                A domain-specific segmented control designed specifically for Oslo. Instead of a generic toggle, it uses custom dog and cat silhouettes with the brand teal highlight to make pet selection feel native to the product. Available in default and compact sizes with four layout variants.
              </p>

              <PetToggleShowcase />
            </div>
          </div>

          {/* 10 — LEARNINGS */}
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64, alignItems: 'start' }}>
            <span style={SL}>10 — Learnings</span>
            <div>
              <h2 style={SH}>What worked, what we'd iterate on</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  ['Tokens before components', 'Starting with primitive variables meant we never had to refactor when dark mode was added. Every component inherited the correct values automatically — zero rework.'],
                  ['Two modes aren\'t just light and dark', 'Mode 2 isn\'t just "invert the colours." Contrast ratios, shadow opacity, and even border visibility needed independent calibration for each mode.'],
                  ['Physical + digital = brand coherence', 'Extending the design system to the pet tag wasn\'t in the original brief, but it unified the brand experience and gave the marketing team a tangible asset.'],
                ].map(([b, t]) => (
                  <div key={b} style={{ paddingLeft: 20, borderLeft: '2px solid rgba(91,185,196,.3)' }}>
                    <div style={{ fontSize: '.82rem', fontWeight: 500, color: 'var(--white)', marginBottom: 6 }}>{b}</div>
                    <div style={{ fontSize: '.82rem', lineHeight: 1.75, color: 'var(--muted)' }}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </main>

        {/* FOOTER CTA */}
        <section style={{ borderTop: '1px solid var(--bdr2)', padding: '72px var(--pad)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Next steps</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(1.4rem,2.5vw,2.2rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--white)' }}>
              Want to see the full token library or component specs?
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="mailto:priyamvada.s.m@gmail.com"
              style={{ display: 'inline-block', fontSize: '.72rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--black)', background: 'var(--gold)', padding: '13px 28px', textDecoration: 'none', cursor: 'none', transition: 'background .25s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold2)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold)')}
            >Get in touch →</a>
            <a href="https://priyauxd.github.io/2026/"
              style={{ display: 'inline-block', fontSize: '.72rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--border)', padding: '13px 28px', textDecoration: 'none', cursor: 'none', transition: 'border-color .25s,color .25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)' }}
            >← All Work</a>
          </div>
        </section>

      </div>
    </>
  )
}
