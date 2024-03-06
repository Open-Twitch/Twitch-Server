import appRoot from 'app-root-path'
import dotenv from 'dotenv'

export const loadDotenv = async (): Promise<void> => {
    try {
        dotenv.config({ path: appRoot.resolve('src/configs/env/.env') })
    } catch (error) {
        error
    }
}
