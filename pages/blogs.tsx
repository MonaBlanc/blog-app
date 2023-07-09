import BlogCard from '@/component/BlogCard';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';


export const getStaticProps: GetStaticProps = async() => {
    const res = await fetch('http://localhost:3000/api/posts').then((data) => data.json());
    return {
        props: {
            posts: res.postInfo,
        },
    };

};
type Props = InferGetStaticPropsType<typeof getStaticProps>;

const blogs: NextPage<Props> = ({posts}) => {
    
 return <div className='max-w-3xl mx-auto p-5 space-y-5'>
    {posts.map((post: { title: string; meta: string; }) => (
        <BlogCard title={post.title} desc={post.meta}/>
    ))}

 </div>;
};

export default blogs;