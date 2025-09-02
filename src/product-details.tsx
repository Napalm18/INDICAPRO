import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { product } from './product-data';

const ProductDetails: React.FC = () => {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <div>
        <h2>Features</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {product.features}
        </ReactMarkdown>
      </div>
      <div>
        <h2>Coverage</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {product.coverage}
        </ReactMarkdown>
      </div>
      <div>
        <h2>Packaging</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {product.packaging}
        </ReactMarkdown>
      </div>
      <div>
        <h2>Application Tools</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {product.applicationTools}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ProductDetails;
