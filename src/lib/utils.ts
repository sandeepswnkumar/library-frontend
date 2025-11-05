import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function senetizeText(text?: string): string {
    if (!text) return ''

    // Normalize diacritics, remove quotes, keep alphanumerics, spaces, dash and underscore
    const cleaned = text
        .toString()
        .normalize('NFKD') // separate accents from letters
        .replace(/\p{Diacritic}/gu, '') // remove diacritic marks (modern approach)
        .replace(/["'`’”“‘]/g, '') // remove various quote characters
        .toLowerCase()
        .trim()

    // Replace any character that is not a-z, 0-9, space, dash or underscore with empty
    const safe = cleaned.replace(/[^a-z0-9 _-]+/g, '')

    // Collapse spaces to single hyphen and collapse multiple hyphens
    return safe
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/(^-|-$)/g, '')
}

export function makeBreadcrumbText(text?: string): string {
    if (!text) return ''
    // sanitize then convert slug to Title Case for breadcrumb
    const slug = senetizeText(text)
    return slug
        .split('-')
        .filter(Boolean)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
}
