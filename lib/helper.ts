import { PostApiResponse } from "@/utils/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export const readPostsInfo = (): PostApiResponse => {
    const dirPathToRead = path.join(process.cwd(), 'posts');
    const dirs = fs.readdirSync(dirPathToRead);
    const data = dirs.map((filename: string) => {
        const filePath = path.join(process.cwd(), "posts/" + filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return matter(fileContents).data;
    });
    return data as PostApiResponse;
}