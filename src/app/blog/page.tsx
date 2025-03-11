// src/app/blog/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogCard } from "@/components/enhanced/blog-card";
import { AnimatedText } from "@/components/animations/animated-text";
import { Background3D } from "@/components/enhanced/background-3d";

export const metadata = {
  title: 'Blog | Software Engineer Portfolio',
  description: 'Articles and insights on software engineering, data science, and AI.',
};

async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map(filename => {
    const slug = filename.replace(/\.mdx?$/, '');
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return { slug, ...data };
  });
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Background3D color="#60A5FA" backgroundColor="transparent" mouseMultiplier={0.1} />
          </div>
          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedText text="Blog" tag="h1" className="title-xl mb-6" />
              <p className="subtitle">
                Thoughts, tutorials, and insights on software engineering, data science, and artificial intelligence.
              </p>
            </div>
          </div>
        </section>
        
        {/* Blog Posts Grid */}
        <section className="py-24">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readingTime="~5 min read"
                  author={post.author}
                  slug={post.slug}
                  image={`/images/blog-${(index % 3) + 1}.svg`}
                  tags={post.tags}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
