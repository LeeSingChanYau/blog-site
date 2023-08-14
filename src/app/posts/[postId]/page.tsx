import { prisma } from '@/db';
import Image from 'next/image';

async function getPostById(postId: string) {
  try {
    // Use the Prisma client to find a post by its ID
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    return post;
  } catch (error) {
    console.error('Error while fetching post by ID:', error);
    throw error; // Rethrow the error or handle it appropriately in your application
  }
}

type PostParams = {
  params: {
    postId: string;
  };
};

export default async function Post({ params: { postId } }: PostParams) {
  const post = await getPostById(postId);
  return (
    <main className="flex flex-col text-center justify-center">
      <h1 className="m-10 text-5xl text-slate-100">Alan&apos;s blog</h1>
      <hr />
      {post ? (
        <div
          key={post.id}
          className="cursor-pointer m-10 text-xl text-slate-100 hover:text-slate-500"
        >
          <h1 className="m-10 text-3xl text-slate-100">{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ) : (
        <div>Post does not exist</div>
      )}
    </main>
  );
}
