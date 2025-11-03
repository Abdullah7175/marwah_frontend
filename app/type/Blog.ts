import BlogElement from "./BlogElement";

export class Blog {
  id: number;
  title: string;
  image: string | any;
  body: string;
  created_at: string;
  updated_at: string;
  elements: BlogElement[];
  
  // SEO fields
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;

  constructor(
    id: number, 
    title: string, 
    image: string | null, 
    body: string, 
    created_at: string, 
    updated_at: string, 
    elements: BlogElement[],
    meta_title?: string,
    meta_description?: string,
    meta_keywords?: string,
    og_title?: string,
    og_description?: string,
    og_image?: string,
    twitter_title?: string,
    twitter_description?: string,
    twitter_image?: string
  ) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.body = body;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.elements = elements;
    this.meta_title = meta_title;
    this.meta_description = meta_description;
    this.meta_keywords = meta_keywords;
    this.og_title = og_title;
    this.og_description = og_description;
    this.og_image = og_image;
    this.twitter_title = twitter_title;
    this.twitter_description = twitter_description;
    this.twitter_image = twitter_image;
  }

  static getInitial():Blog{
    return new Blog(
      -1,
      '',
      null,
      '',
      '',
      '',
      [],
      '', '', '', '', '', '', '', '', ''
    )
  }
  static copy(blog: Blog): Blog {
    return new Blog(
      blog.id,
      blog.title,
      blog.image,
      blog.body,
      blog.created_at,
      blog.updated_at,
      blog.elements.map(element => BlogElement.copy(element)),
      blog.meta_title,
      blog.meta_description,
      blog.meta_keywords,
      blog.og_title,
      blog.og_description,
      blog.og_image,
      blog.twitter_title,
      blog.twitter_description,
      blog.twitter_image
    );
  }
  

  static fromJson(data: any): Blog {
    // Convert elements data into BlogElement objects
    const elements: BlogElement[] = data.elements?.map((elementData: any) => BlogElement.fromJson(elementData)) || [];
    
    return new Blog(
      data.id,
      data.title,
      data.image,
      data.body || '',
      data.created_at,
      data.updated_at,
      elements,
      data.meta_title,
      data.meta_description,
      data.meta_keywords,
      data.og_title,
      data.og_description,
      data.og_image,
      data.twitter_title,
      data.twitter_description,
      data.twitter_image
    );
  }


  static getDummy(): Blog {
    return new Blog(0, 'Dummy', null, '', '', '', [], '', '', '', '', '', '', '', '', '');
  }
}