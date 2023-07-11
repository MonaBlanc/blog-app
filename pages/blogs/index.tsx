import BlogCard from "@/component/BlogCard";
import { readPostsInfo } from "@/lib/helper";
import exp from "constants";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { PostApiResponse } from "@/utils/types";

type PostApiResponse = {
        title: string;
        meta: string;
        slug: string;
    }[];


export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch("http://localhost:3000/api/posts").then((data) =>
//     data.json()
//   );
  const postInfo: PostApiResponse = readPostsInfo() 
  return {
    props: {
      posts: postInfo,
    },
  };
};


type Props = InferGetStaticPropsType<typeof getStaticProps>;

const blogs: NextPage<Props> = ({ posts }) => {
  return (
    <div className="max-w-3xl mx-auto p-5 space-y-5">
      {posts.map((post: { title: string; meta: string; slug: string }) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          desc={post.meta}
          slug={post.slug}
        />
      ))}
    </div>
  );
};

export default blogs;
