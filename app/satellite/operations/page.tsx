'use client';

import InteractiveDocumentViewer from '@/components/organisms/InteractiveDocumentViewer';
import MDXProvider from '@/components/organisms/MDXProvider';
import OperationsContent from '@/content/operations.mdx';

export default function OperationsPage() {
  return (
    <MDXProvider>
      <InteractiveDocumentViewer>
        <OperationsContent />
      </InteractiveDocumentViewer>
    </MDXProvider>
  );
} 