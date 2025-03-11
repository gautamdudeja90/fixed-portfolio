// src/app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import ClientMDXRenderer from '@/components/ClientMDXRenderer';
import { BlogCard } from '@/components/enhanced/blog-card'; // if you want to use a card layout for header info

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map(filename => ({
    slug: filename.replace(/\.mdx?$/, ''),
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content, { scope: data });

  return (
    <article className="prose dark:prose-invert mx-auto p-4">
      {/* Optionally use a card component for header */}
      <BlogCard
        title={data.title}
        excerpt={data.excerpt || ''}
        date={data.date}
        readingTime="~5 min read"
        author={data.author}
        slug={slug}
        image="/images/blog-placeholder.jpg"
      />
      <ClientMDXRenderer mdxSource={mdxSource} />
    </article>
  );
}
