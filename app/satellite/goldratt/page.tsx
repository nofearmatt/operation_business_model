import { Suspense } from 'react';
import Navigation from '@/components/molecules/Navigation';
import MDXProvider from '@/components/organisms/MDXProvider';
import GoldrattContent from '@/content/goldratt.mdx';

export default function GoldrattPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cloud via-white to-steel/10 blueprint-bg">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <Suspense fallback={
          <div className="animate-pulse">
            <div className="h-8 bg-steel/20 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-steel/20 rounded w-full mb-2"></div>
            <div className="h-4 bg-steel/20 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-steel/20 rounded w-4/6"></div>
          </div>
        }>
          <MDXProvider>
            <GoldrattContent />
          </MDXProvider>
        </Suspense>
      </main>
    </div>
  );
} 