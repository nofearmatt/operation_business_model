'use client';

import InteractiveDocumentViewer from '@/components/organisms/InteractiveDocumentViewer';
import MDXProvider from '@/components/organisms/MDXProvider';
import ProductsContent from '@/content/products.mdx';

export default function ProductsPage() {
  return (
    <MDXProvider>
      <InteractiveDocumentViewer>
        <ProductsContent />
      </InteractiveDocumentViewer>
    </MDXProvider>
  );
} 