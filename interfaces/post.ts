export default interface Post {
  author: {
    id: string;
    bio: string;
    name: string;
    photo: {
      url: string;
    };
  };
  categories: [{ name: string; slug: string }];
  createdAt: Date;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  slug: string;
  title: string;
  content?: any;
}
