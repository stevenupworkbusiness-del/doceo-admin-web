// pages/api/upload.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Express, { Request } from 'express';

type CustomRequest = Request & NextApiRequest;

// Ensure upload directory exists
const uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, uploadDir);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const fileType = file.mimetype.startsWith('image/') ? 'image' : 'video';
        cb(null, `${fileType}-${uniqueSuffix}${ext}`);
    },
});

// Add file filter for images and videos
const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image and video files are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
    }
});

// Helper to run multer middleware in Next.js API route
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

interface ExtendedRequest extends NextApiRequest {
    file: Express.Multer.File;
}

const apiRoute = createRouter<ExtendedRequest, NextApiResponse>();

apiRoute
    .use(async (req, res, next) => {
        // @ts-ignore
        await runMiddleware(req, res, upload.single('file'));
        next();
    })
    .post((req, res) => {
        // @ts-ignore
        const fileUrl = `/uploads/${req.file.filename}`;
        res.status(200).json({ url: fileUrl });
    });

export default apiRoute.handler();

export const config = {
    api: {
        bodyParser: false,
    },
};
