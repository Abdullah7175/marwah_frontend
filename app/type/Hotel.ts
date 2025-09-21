export class Hotel {
    constructor(
        public id: number,
        public name: string,
        public location: string,
        public charges: number,
        public rating: number,
        public status: string,
        public created_at: Date,
        public updated_at: Date,
        public currency: string,
        public dinner_enabled: boolean,
        public breakfast_enabled: boolean,
        public email: string, // Add email field
        public phone: string, // Add phone field
        public image?: string,
        public description?: string
    ) {}

    static getDummy(): Hotel {
        return new Hotel(
            -1,
            "Dummy Hotel",
            "Dummy Location",
            0,
            0,
            '',
            new Date(),
            new Date(),
            "USD",
            false,
            false,
            "", // Default value for email
            "", // Default value for phone
            "https://buffer.com/library/content/images/2023/10/free-images.jpg",
            "This is a dummy hotel used for testing purposes."
        );
    }

    static getInitialData(): Hotel {
        return new Hotel(
            -1,
            "",
            "",
            0,
            0,
            '',
            new Date(),
            new Date(),
            "USD",
            false,
            false,
            "", // Default value for email
            "", // Default value for phone
            "",
            ""
        );
    }

    static fromJSON(obj: any): Hotel {
        return new Hotel(
            obj.id,
            obj.name,
            obj.location,
            obj.charges,
            obj.rating,
            obj.status,
            new Date(obj.created_at),
            new Date(obj.updated_at),
            obj.currency,
            obj.dinner_enabled,
            obj.breakfast_enabled,
            obj.email, // Assign email
            obj.phone, // Assign phone
            obj.image,
            obj.description
        );
    }
}
