/**
 * @desc    Clean and format the data for updating the shop
 * @param   {object} body - The request body data
 * @returns {object} The cleaned and formatted data
 */

export const cleanAndFormatData = (body: any): any => {
    const data = { ...body }
    const nullishData = ['', ' ', '0', 0, undefined, null]
    const blackListData = ['bookmark', 'dislike', 'comment', 'like', 'author']

    Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'string') {
            data[key] = data[key].trim()
        }

        if (blackListData.includes(key)) {
            // TODO (asked by mahdi from sina): Do not delete keys dynamicaly
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete data[key]
        }

        if (Array.isArray(data[key]) && data[key].length > 0) {
            data[key] = data[key].map((item: string) => item.trim())
        }

        if (nullishData.includes(data[key])) {
            // TODO (asked by mahdi from sina): Do not delete keys dynamicaly
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete data[key]
        }
    })

    return data
}
