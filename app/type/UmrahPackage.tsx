export class UmrahPackage {
    id: string;
    name: string;
    price_single: string;
    what_to_expect: string;
    price_quad: string;
    main_points: string;
    price_double: string;
    price_tripple: string;
    currency: string;
    hotel_makkah_name: string;
    hotel_madina_name: string;
    hotel_makkah_detail: string;
    hotel_madina_detail: string;
    hotel_madina_image: any;
    hotel_makkah_image: any;
    trans_title: string;
    trans_detail: string;
    trans_image: any;
    visa_title: string;
    visa_detail: string;
    visa_image: any;
    nights_makkah: number;
    nights_madina: number;
    nights: number;
    is_roundtrip: boolean;
    ziyarat: boolean;
    guide: boolean;
    email: string;
    whatsapp: string;
    phone: string;
    hotel_makkah_enabled: boolean;
    hotel_madina_enabled: boolean;
    visa_enabled: boolean;
    ticket_enabled: boolean;
    breakfast_enabled: boolean;
    dinner_enabled: boolean;
    visa_duration: string;
    package_image: any;
    transport_enabled: boolean;

    constructor(data: {
        id: string;
        name: string;
        price_single: string;
        what_to_expect: string;
        price_quad: string;
        main_points: string;
        price_double: string;
        price_tripple: string;
        currency: string;
        hotel_makkah_name: string;
        hotel_madina_name: string;
        hotel_makkah_detail: string;
        hotel_madina_detail: string;
        hotel_madina_image: any;
        hotel_makkah_image: any;
        trans_title: string;
        trans_detail: string;
        trans_image: any;
        visa_title: string;
        visa_detail: string;
        visa_image: any;
        nights_makkah: number;
        nights_madina: number;
        nights: number;
        is_roundtrip: boolean;
        ziyarat: boolean;
        guide: boolean;
        email: string;
        whatsapp: string;
        phone: string;
        hotel_makkah_enabled: boolean;
        hotel_madina_enabled: boolean;
        visa_enabled: boolean;
        ticket_enabled: boolean;
        breakfast_enabled: boolean;
        dinner_enabled: boolean;
        visa_duration: string;
        package_image: any;
        transport_enabled: boolean;
    }) {
        this.id = data.id;
        this.name = data.name;
        this.price_single = data.price_single;
        this.what_to_expect = data.what_to_expect;
        this.price_quad = data.price_quad;
        this.main_points = data.main_points;
        this.price_double = data.price_double;
        this.price_tripple = data.price_tripple;
        this.currency = data.currency;
        this.hotel_makkah_name = data.hotel_makkah_name;
        this.hotel_madina_name = data.hotel_madina_name;
        this.hotel_makkah_detail = data.hotel_makkah_detail;
        this.hotel_madina_detail = data.hotel_madina_detail;
        this.hotel_madina_image = data.hotel_madina_image;
        this.hotel_makkah_image = data.hotel_makkah_image;
        this.trans_title = data.trans_title;
        this.trans_detail = data.trans_detail;
        this.trans_image = data.trans_image;
        this.visa_title = data.visa_title;
        this.visa_detail = data.visa_detail;
        this.visa_image = data.visa_image;
        this.nights_makkah = data.nights_makkah;
        this.nights_madina = data.nights_madina;
        this.nights = data.nights;
        this.is_roundtrip = data.is_roundtrip;
        this.ziyarat = data.ziyarat;
        this.guide = data.guide;
        this.email = data.email;
        this.whatsapp = data.whatsapp;
        this.phone = data.phone;
        this.hotel_makkah_enabled = data.hotel_makkah_enabled;
        this.hotel_madina_enabled = data.hotel_madina_enabled;
        this.visa_enabled = data.visa_enabled;
        this.ticket_enabled = data.ticket_enabled;
        this.breakfast_enabled = data.breakfast_enabled;
        this.dinner_enabled = data.dinner_enabled;
        this.visa_duration = data.visa_duration;
        this.package_image = data.package_image;
        this.transport_enabled = data.transport_enabled;
    }
    static fromJson(json: any): UmrahPackage {
        return new UmrahPackage({
            id: json.id || "",
            name: json.name || "",
            price_single: json.price_single || "",
            what_to_expect: json.what_to_expect || "",
            price_quad: json.price_quad || "",
            main_points: json.main_points || "",
            price_double: json.price_double || "",
            price_tripple: json.price_tripple || "",
            currency: json.currency || "",
            hotel_makkah_name: json.hotel_makkah_name || "",
            hotel_madina_name: json.hotel_madina_name || "",
            hotel_makkah_detail: json.hotel_makkah_detail || "",
            hotel_madina_detail: json.hotel_madina_detail || "",
            hotel_madina_image: json.hotel_madina_image || null,
            hotel_makkah_image: json.hotel_makkah_image || null,
            trans_title: json.trans_title || "",
            trans_detail: json.trans_detail || "",
            trans_image: json.trans_image || null,
            visa_title: json.visa_title || "",
            visa_detail: json.visa_detail || "",
            visa_image: json.visa_image || null,
            nights_makkah: json.nights_makkah || 0,
            nights_madina: json.nights_madina || 0,
            nights: json.nights || 0,
            is_roundtrip: json.is_roundtrip || false,
            breakfast_enabled: json.breakfast_enabled || false,
            ziyarat: json.ziyarat || false,
            guide: json.guide || false,
            transport_enabled: json.transport_enabled || false,
            email: json.email || "",
            whatsapp: json.whatsapp || "",
            phone: json.phone || "",
            hotel_makkah_enabled: json.hotel_makkah_enabled || false,
            hotel_madina_enabled: json.hotel_madina_enabled || false,
            visa_enabled: json.visa_enabled || false,
            ticket_enabled: json.ticket_enabled || false,
            dinner_enabled: json.dinner_enabled || false,
            visa_duration: json.visa_duration || "",
            package_image: json.package_image || null,
        });
    }

    static getInitialData(): UmrahPackage {
        return {
            id: "",
            name: "",
            price_single: "",
            what_to_expect: "",
            price_quad: "",
            main_points: "",
            price_double: "",
            price_tripple: "",
            currency: "",
            hotel_makkah_name: "",
            hotel_madina_name: "",
            hotel_makkah_detail: "",
            hotel_madina_detail: "",
            hotel_madina_image: null,
            hotel_makkah_image: null,
            trans_title: "",
            trans_detail: "",
            trans_image: null,
            visa_title: "",
            visa_detail: "",
            visa_image: null,
            nights_makkah: 0,
            nights_madina: 0,
            nights: 0,
            is_roundtrip: false,
            breakfast_enabled: false,
            ziyarat: false,
            guide: false,
            transport_enabled: false,
            email: "",
            whatsapp: "",
            phone: "",
            hotel_makkah_enabled: false,
            hotel_madina_enabled: false,
            visa_enabled: false,
            ticket_enabled: false,
            dinner_enabled: false,
            visa_duration: "",
            package_image: null,
        };
    }

    static getDummy(): UmrahPackage {
        return new UmrahPackage({
            id: "dummy-id",
            name: 'Dummy Package',
            price_single: '100',
            what_to_expect: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price_quad: '150',
            main_points: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price_double: '120',
            price_tripple: '180',
            currency: 'USD',
            hotel_makkah_name: 'Dummy Makkah Hotel',
            hotel_madina_name: 'Dummy Madina Hotel',
            hotel_makkah_detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            hotel_madina_detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            hotel_madina_image: null,
            hotel_makkah_image: null,
            trans_title: 'Dummy Transportation Title',
            trans_detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            trans_image: null,
            visa_title: 'Dummy Visa Title',
            visa_detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            visa_image: null,
            nights_makkah: 5,
            nights_madina: 5,
            nights: 10,
            is_roundtrip: true,
            ziyarat: true,
            guide: true,
            email: 'dummy@example.com',
            whatsapp: '1234567890',
            phone: '9876543210',
            hotel_makkah_enabled: true,
            hotel_madina_enabled: true,
            visa_enabled: true,
            ticket_enabled: true,
            breakfast_enabled: true,
            dinner_enabled: true,
            visa_duration: '30 days',
            package_image: null,
            transport_enabled: true,
        });
    }

}
