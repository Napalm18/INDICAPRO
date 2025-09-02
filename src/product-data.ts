import { Product } from './types';

export const product: Product = {
  id: '1',
  name: 'Sample Product',
  description: 'This is a sample product description.',
  price: 99.99,
  features: `
- Feature 1
- Feature 2
- Feature 3
  `,
  coverage: `
- Coverage 1
- Coverage 2
- Coverage 3
  `,
  packaging: `
- Packaging 1
- Packaging 2
- Packaging 3
  `,
  applicationTools: `
- Tool 1
- Tool 2
- Tool 3
  `,
  image: '/path/to/image.jpg',
};
