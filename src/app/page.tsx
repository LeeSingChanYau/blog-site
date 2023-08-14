import { prisma } from '@/db';
import Image from 'next/image';
import Link from 'next/link';

function getPosts() {
  return prisma.post.findMany();
}

async function createPost() {
  'use server';

  await prisma.post.create({
    data: {
      title: 'Guard Retention by John Danaher so far',
      content: `Right now im watching John Danaher's instructional on Guard Retention. It's good so far, and
      the content is easy to digest. Of course I cannot dictate the guard retentions that my opponents use, so I 
      make an emphasis to understand the main retention strategies of each common guard pass method instead of memorizing
      everything.`,
    },
  });
}

async function deletePosts() {
  'use server';

  await prisma.post.deleteMany();
}

export default async function Home() {
  // await deletePosts();
  await createPost();
  const posts = await getPosts();
  return (
    <main className="flex flex-col text-center justify-center">
      <h1 className="m-10 text-5xl text-slate-100">Alan&apos;s blog</h1>
      <hr />
      <ul>
        {posts.map((post) => (
          <Link key={post.id} href={`posts/${post.id}`}>
            <li className="cursor-pointer m-10 text-xl text-slate-100 hover:text-slate-500">
              {post.title}
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
