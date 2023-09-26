import { Request, Response } from 'express';
import fs from 'fs';

export class HandleFileController {
    constructor() { }

    async moveFile(req: Request, res: Response) {
        try {
            const { origin, destiny } = req.body;

            fs.rename(origin, destiny, (err) => {
                if (err) throw err;
                return res.json({ message: 'file moved' });
            });
        } catch (error) {
            return res.json({ message: 'error', error: error });
        }
    }

    async getFile(req: Request, res: Response): Promise<Response> {
        try {
            const { origin } = req.body;

            const file = fs.readFileSync(origin, 'base64');
            const fileName = origin.split('/').pop();
            const fileExtension = origin.split('.').pop();

            return res.json({ file: file, fileName: fileName, fileExtension: fileExtension });
        } catch (error) {
            return res.json({ message: 'error', error: error });
        }
    }
}