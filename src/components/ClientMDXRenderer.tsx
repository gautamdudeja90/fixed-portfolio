// src/components/ClientMDXRenderer.tsx
'use client';
import { MDXRemote } from 'next-mdx-remote';

export default function ClientMDXRenderer({ mdxSource }: { mdxSource: any }) {
  return <MDXRemote {...mdxSource} />;
}
