'use client';

import InteractiveDocumentViewer from '@/components/organisms/InteractiveDocumentViewer';
import MDXProvider from '@/components/organisms/MDXProvider';
import GoldrattContent from '@/content/goldratt.mdx';

export default function GoldrattPage() {
  return (
    <MDXProvider>
      <InteractiveDocumentViewer>
        <GoldrattContent />
      </InteractiveDocumentViewer>
    </MDXProvider>
  );
} 