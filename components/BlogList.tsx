'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistance } from 'date-fns';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';

interface Blog {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/data/blogs.json');
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchQuery))
  );

  return (
    <div className="grid gap-8 mt-8">
      {filteredBlogs.map((blog) => (
        <Link href={`/blog/${blog.id}`} key={blog.id}>
          <Card className="transition-all hover:shadow-lg overflow-hidden">
            <div className="relative w-full h-[300px]">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-2xl">{blog.title}</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {formatDistance(new Date(blog.date), new Date(), { addSuffix: true })}
                </span>
              </div>
              <CardDescription className="text-base">{blog.excerpt}</CardDescription>
              <div className="flex gap-2 mt-4">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}