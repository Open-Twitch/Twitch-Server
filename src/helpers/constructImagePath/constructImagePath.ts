import path from 'path'

/**
 * @desc    Construct the image path for the shop
 * @param   {string} fileUploadPath - The file upload path
 * @param   {string} filename - The filename
 * @returns {string} The constructed image path
 */

export const constructImagePath = (
    fileUploadPath: string,
    filename: string
): string => {
    const imagePath = path.join(fileUploadPath, filename)
    return imagePath.replace(/\\/g, '/')
}
