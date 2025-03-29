import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AdUnit from '@/components/AdUnit';

interface Blog {
  id: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  coverImage: string;
  gallery?: string[];
}

interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'blogs.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContent);
  
  return data.blogs.map((blog: Blog) => ({
    id: blog.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogPost(params.id);
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const description = blog.content.slice(0, 160);
  const keywords = [...blog.tags, 'blog', 'development', 'programming'];

  return {
    title: blog.title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Your Name' }],
    openGraph: {
      title: blog.title,
      description,
      type: 'article',
      publishedTime: blog.date,
      authors: ['Your Name'],
      tags: blog.tags,
      images: [{ url: blog.coverImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description,
      images: [blog.coverImage],
    },
  };
}

async function getBlogPost(id: string): Promise<Blog | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'blogs.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return data.blogs.find((blog: Blog) => blog.id === id) || null;
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}

export default async function BlogPost({ params }: Props) {
  const blog = await getBlogPost(params.id);

  if (!blog) {
    notFound();
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    image: blog.coverImage,
    datePublished: blog.date,
    author: {
      '@type': 'Person',
      name: 'Your Name',
    },
    keywords: blog.tags.join(', '),
    description: blog.content.slice(0, 160),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to all posts
          </Link>
          
          <header className="mb-8">
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{blog.title}</h1>
            <div className="flex items-center justify-between">
              <time className="text-muted-foreground">
                {format(new Date(blog.date), 'MMMM d, yyyy')}
              </time>
              <div className="flex gap-2">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </header>

          {/* Top Ad Unit */}
          <AdUnit slot="TOP_OF_CONTENT_SLOT_ID" className="mb-8" />

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {blog.content.split('\n').map((paragraph, index) => {
              // Insert mid-content ad after the first paragraph
              if (index === 1) {
                return (
                  <>
                    <p key={index} className="mb-4 text-lg leading-relaxed">
                      {paragraph}
                    </p>
                    <AdUnit slot="MID_CONTENT_SLOT_ID" className="my-8" />
                  </>
                );
              }
              return (
                <p key={index} className="mb-4 text-lg leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {blog.gallery && blog.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Image Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blog.gallery.map((image, index) => (
                  <div key={index} className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Ad Unit */}
          <AdUnit slot="BOTTOM_OF_CONTENT_SLOT_ID" className="mt-8" />
        </div>
      </article>
    </>
  );
}