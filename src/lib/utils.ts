import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function sanitizeText(text?: string): string {
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
    const slug = sanitizeText(text)
    return slug
        .split('-')
        .filter(Boolean)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
}

export function sanitizeObject(
    obj: Record<string, any> = {}
): Record<string, any> {
    if (typeof obj !== 'object' || obj === null) return obj

    for (let ob_key of Object.keys(obj)) {
        const value = obj[ob_key]
        if (typeof value === 'string') {
            obj[ob_key] = value.trim()
        } else if (typeof value === 'object') {
            obj[ob_key] = sanitizeObject(value)
        }
    }

    return obj
}

export function convertTo12Hour(time24: string) {
    // Split hours and minutes
    const [hourStr, minute] = time24.split(':')
    let hour = parseInt(hourStr)

    // Determine AM or PM
    const ampm = hour >= 12 ? 'PM' : 'AM'

    // Convert hour from 24-hour to 12-hour format
    hour = hour % 12 || 12 // 0 becomes 12

    // Pad single digit hours with 0 if needed (optional)
    const hourStr12 = hour < 10 ? `0${hour}` : `${hour}`

    return `${hourStr12}:${minute}${ampm}`
}
