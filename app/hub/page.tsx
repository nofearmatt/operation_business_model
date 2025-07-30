'use client';

import InteractiveDocumentViewer from '@/components/organisms/InteractiveDocumentViewer';
import MDXProvider from '@/components/organisms/MDXProvider';
import HubContent from '@/content/hub.mdx';

export default function HubPage() {
  return (
    <MDXProvider>
      <InteractiveDocumentViewer>
        <HubContent />
      </InteractiveDocumentViewer>
    </MDXProvider>
  );
} 