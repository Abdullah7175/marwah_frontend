export default class CustomPackage {
    user_name: string;
    tour_days: number;
    flight_from: string;
    country: string;
    city: string;
    no_of_travelers: number;
    travelers_visa_details: string;
    phone: string;
    email: string;
    additional_comments: string;
    total_amount_hotels: string;
    hotel_makkah_id: string;
    hotel_madina_id: string;
    signature_image_url: any;
    updated_at?: Date;
    created_at?: Date;
    id: number;
    nights_in_makkah?: number;
    nights_in_madina?: number;

    constructor(data: any) {
        this.user_name = data.user_name;
        this.tour_days = Number(data.tour_days);
        this.flight_from = data.flight_from;
        this.country = data.country;
        this.city = data.city;
        this.no_of_travelers = Number(data.no_of_travelers);
        this.travelers_visa_details = data.travelers_visa_details;
        this.phone = data.phone;
        this.email = data.email;
        this.additional_comments = data.additional_comments;
        this.total_amount_hotels = data.total_amount_hotels;
        this.hotel_makkah_id = data.hotel_makkah_id;
        this.hotel_madina_id = data.hotel_madina_id;
        this.signature_image_url = data.signature_image_url;
        this.updated_at = new Date(data.updated_at);
        this.created_at = new Date(data.created_at);
        this.id = Number(data.id);
        this.nights_in_makkah = data.nights_in_makkah !== undefined ? Number(data.nights_in_makkah) : undefined;
        this.nights_in_madina = data.nights_in_madina !== undefined ? Number(data.nights_in_madina) : undefined;
    }

    static fromJson(json: any): CustomPackage {
        return new CustomPackage(json);
    }

}
