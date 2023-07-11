import fs from "fs";
import matter from "gray-matter";
import {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
    NextPage,
} from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { ParsedUrlQuery } from "querystring";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = ({ post }) => {
  const { content, title } = post;
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-semibold text-2xl py-5">{title}</h1>
      <div className="prose pb-20">
        <MDXRemote {...content} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  //reading paths
  const dirPathToRead = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPathToRead);
  const paths = dirs.map((filename: string) => {
    const filePath = path.join(process.cwd(), "posts/" + filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return { params: { postSlug: matter(fileContents).data.slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: {
    content: MDXRemoteSerializeResult;
    title: string;
  };
};

export const getStaticProps: GetStaticProps<Post> = async (context) => {
  const { params } = context;
  const { postSlug } = params as IStaticProps;

  const filePath = path.join(process.cwd(), "posts/" + postSlug + ".md");
  const fileContents = fs.readFileSync(filePath, "utf8");
  //   const { data, content } = matter(fileContents);
  const source: any = await serialize(fileContents, { parseFrontmatter: true });
  return {
    props: {
      post: {
        content: source,
        title: source.frontmatter.title,
      },
    },
  };
};

export default SinglePage;
