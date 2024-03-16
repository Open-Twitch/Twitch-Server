import i18n from 'i18n'
import path from 'path'
import { type Request, type Response, type NextFunction } from 'express'
import appRoot from 'app-root-path'

i18n.configure({
    locales: ['en', 'fa', 'ar', 'tr'],
    defaultLocale: 'en',
    directory: path.join(appRoot.path, 'src/public', 'locales'),
})

export const i18nConfig = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    i18n.init(req, res)
    const acceptLanguageHeader = req.headers['accept-language']
    const primaryLanguage = acceptLanguageHeader
        ? acceptLanguageHeader.split(',')[0]
        : 'en'
    i18n.setLocale(primaryLanguage)
    next()
}
