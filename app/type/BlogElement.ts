export default class BlogElement {
    id: number;
    element_type: string;
    value: any;
    blog_id: number;
    created_at: Date | null;
    updated_at: Date | null;

    constructor(id: number, element_type: string, value: string | any, blog_id: number, created_at: Date | null, updated_at: Date | null) {
        this.id = id;
        this.element_type = element_type;
        this.value = value;
        this.blog_id = blog_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    static copy(element: BlogElement): BlogElement {
        // Create a new instance of BlogElement with the same properties as the passed element
        return new BlogElement(
            element.id,
            element.element_type,
            element.value,
            element.blog_id,
            element.created_at,
            element.updated_at
        );
    }

    static fromJson(json: any): BlogElement {
        return new BlogElement(
            json.id,
            json.element_type,
            json.value,
            json.blog_id,
            json.created_at ? new Date(json.created_at) : null,
            json.updated_at ? new Date(json.updated_at) : null
        );
    }

    toJson(): any {
        return {
            id: this.id,
            element_type: this.element_type,
            value: this.value,
            blog_id: this.blog_id,
            created_at: this.created_at ? this.created_at.toISOString() : null,
            updated_at: this.updated_at ? this.updated_at.toISOString() : null
        };
    }
}
