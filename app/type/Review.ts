export class Review {
    id: number;
    user_name: string;
    detail: string;
    video_url: string;
    created_at: Date;
    updated_at: Date;

    constructor(data: any) {
        this.id = Number(data.id);
        this.user_name = data.user_name;
        this.detail = data.detail;
        this.video_url = data.video_url;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }

    static fromJson(data: any): Review {
        return new Review(data);
    }
}