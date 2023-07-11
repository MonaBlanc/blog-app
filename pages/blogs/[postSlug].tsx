import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import path from "path";
import { ParsedUrlQuery } from "querystring";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = (props) => {
  return <div>
    <h1>{props.post.title}</h1>
    <p>{props.post.content}</p>
  </div>;
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
        postSlug: string
}

type Post = {
    post: {
        content: string;
        title: string;
    }
}

export const getStaticProps: GetStaticProps<Post> = (context) => {
  const { params } = context;
  const { postSlug } = params as IStaticProps;

  const filePath = path.join(process.cwd(), "posts/" + postSlug + ".md");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    props: {
      post: {
        content,
        title: data.title,
      },
    },
  };
};

export default SinglePage;
