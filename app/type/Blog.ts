import BlogElement from "./BlogElement";

export class Blog {
  id: number;
  title: string;
  image: string | any;
  body: string;
  created_at: string;
  updated_at: string;
  elements: BlogElement[]; // Array of BlogElement objects

  constructor(id: number, title: string, image: string | null, body: string, created_at: string, updated_at: string, elements: BlogElement[]) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.body = body;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.elements = elements;
  }

  static getInitial():Blog{
    return new Blog(
      -1,
      '',
      null,
      '',
      '',
      '',
      []
    )
  }
  static copy(blog: Blog): Blog {
    // Create a new instance of Blog with the same properties
    return new Blog(
      blog.id,
      blog.title,
      blog.image,
      blog.body,
      blog.created_at,
      blog.updated_at,
      blog.elements.map(element => BlogElement.copy(element)) // Ensure deep copy of elements
    );
  }
  

  static fromJson(data: any): Blog {
    // Convert elements data into BlogElement objects
    const elements: BlogElement[] = data.elements.map((elementData: any) => BlogElement.fromJson(elementData));
    
    return new Blog(
      data.id,
      data.title,
      data.image,
      data.body || '',
      data.created_at,
      data.updated_at,
      elements
    );
  }


  static getDummy(): Blog {
    return new Blog(0, 'Dummy', null, '', '', '', []);
  }
}