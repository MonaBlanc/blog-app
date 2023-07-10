import matter from "gray-matter";
import { NextApiHandler } from "next";
const fs = require('fs');
const path = require('path');

const handler: NextApiHandler = (req, res) => {
    const { method } = req;
    
    switch (method) {
        case 'GET': {
            const data = readPostsInfo();
            return res.status(200).json({ postInfo: data});
        }
        default:
            return res.status(404).send('Not found');
    }
};

const readPostsInfo = () => {
    const dirPathToRead = path.join(process.cwd(), 'posts');
    const dirs = fs.readdirSync(dirPathToRead);
    const data = dirs.map((filename: string) => {
        const filePath = path.join(process.cwd(), "posts/" + filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return matter(fileContents).data;
    });
    return data;
}

export default handler;