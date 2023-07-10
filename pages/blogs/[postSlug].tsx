import { GetStaticPaths, NextPage } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Props {}

const SinglePage: NextPage<Props> = () => {
  return <div>SinglePage</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
    //reading paths
    const dirPathToRead = path.join(process.cwd(), 'posts');
    const dirs = fs.readdirSync(dirPathToRead);
    const data = dirs.map((filename: string) => {
        const filePath = path.join(process.cwd(), "posts/" + filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return {params: {postSlug: matter(fileContents).data}}
    });

    return {
        paths: [{params: {postSlug: "clever-lazy-loading-for-javascript"}}],
        fallback: false,
    };
};

export const getStaticProps = async () => {
    return {
        props: {},
    };
}


export default SinglePage;
