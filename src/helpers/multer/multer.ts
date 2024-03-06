import multer from 'multer'
import path from 'path'
import fs from 'fs'

// TODO (asked by mahdi from sina): Separate these functions and make them modular and write code documentation

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createRoute(req: { body: { fileUploadPath: string } }) {
    //   const date = new Date();
    const year = new Date().getFullYear().toString()
    const month = (new Date().getMonth() + 1).toString() // Months are 0-indexed, so add 1
    const day = new Date().getDate().toString()
    const directory = path.join(
        __dirname,
        '..',
        '..',
        'public',
        'uploads',
        'blogs',
        year,
        month,
        day
    )
    req.body.fileUploadPath = path.join('uploads', 'blogs', year, month, day)
    fs.mkdirSync(directory, { recursive: true })
    return directory
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const filePath = createRoute(req)
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        const filename = String(new Date().getTime() + ext)
        req.body.filename = filename
        cb(null, filename)
    },
})

const uploadFile = multer({ storage })

export default uploadFile
