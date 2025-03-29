import BlogList from '@/components/BlogList';
import SearchBar from '@/components/SearchBar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dev Blog | Home',
  description: 'A collection of thoughts and tutorials about software development',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Dev Blog</h1>
          <p className="text-muted-foreground">
            Exploring the world of software development, one post at a time
          </p>
        </header>
        <SearchBar />
        <BlogList />
      </div>
    </main>
  );
}