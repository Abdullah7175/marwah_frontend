import { Blog } from "../type/Blog";
import CustomPackage from "../type/CustomPackage";
import { Hotel } from "../type/Hotel";
import { UmrahPackage } from "../type/UmrahPackage";
import { BACKEND_BASE_URL, POST_CREATE_CUSTOM_PACKAGE, POST_CREATE_PACKAGE, POST_UPDATE_HOTEL, POST_UPDATE_PACKAGE, URL_CREATE_BLOG, URL_CREATE_HOTEL, URL_UPDATE_BLOG } from "./Routes";


export type ApiCallProps = {
    postUrl: string;
    data: any;
    onStart: () => void;
    onProgressEnd: () => void;
    onSuccess: (res: any) => any;
    onUnexpected: (res: any) => any;
};

export async function makePostCall({ postUrl, data, onStart, onProgressEnd, onSuccess, onUnexpected }: ApiCallProps): Promise<any> {
    onStart();
    
    // Check if this is an admin API call that needs authentication
    const isAdminApi = postUrl.includes('/api/panel/') || postUrl.includes('/api/packages/') || postUrl.includes('/api/categories/') || postUrl.includes('/api/hotels/') || postUrl.includes('/api/blogs/') || postUrl.includes('/api/reviews/') || postUrl.includes('/api/inquiries/');
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    // Add authentication header for admin APIs
    if (isAdminApi) {
        const token = localStorage.getItem('admin_token');
        if (token) {
            myHeaders.append("Authorization", `Bearer ${token}`);
        }
    }
    
    await fetch(postUrl, {
        method: "POST",
        body: data, 
        headers: myHeaders
    }).then((response) => {
        if (!response.ok) {
            if (response.status === 401 && isAdminApi) {
                // Authentication expired, redirect to login
                localStorage.removeItem('admin_token');
                localStorage.removeItem('admin_user');
                window.location.href = '/admin/login';
                return;
            }
            throw new Error(response.status + "");
        }
        return response.json();
    }).then((responseData) => {
        onSuccess(responseData);
    }).catch((error) => {
        onUnexpected(error);
    }).finally(() => {
        onProgressEnd();
    });
}
export async function makeGetCall({ postUrl, data, onStart, onProgressEnd, onSuccess, onUnexpected }: ApiCallProps): Promise<any> {
    onStart();
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        // Check if this is an admin API call that needs authentication
        const isAdminApi = postUrl.includes('/api/panel/') || postUrl.includes('/api/packages/') || postUrl.includes('/api/categories/') || postUrl.includes('/api/hotels/') || postUrl.includes('/api/blogs/') || postUrl.includes('/api/reviews/') || postUrl.includes('/api/inquiries/');
        
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        
        // Add authentication header for admin APIs
        if (isAdminApi) {
            const token = localStorage.getItem('admin_token');
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }
        
        const response = await fetch(postUrl, {
            method: "GET",
            headers,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            if (response.status === 401 && isAdminApi) {
                // Authentication expired, redirect to login
                localStorage.removeItem('admin_token');
                localStorage.removeItem('admin_user');
                window.location.href = '/admin/login';
                return;
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const responseData = await response.json();
        onSuccess(responseData);
        
    } catch (error) {
        console.error("API Error:", error);
        onUnexpected(error);
    } finally {
        onProgressEnd();
    }
}


export async function createPackage(p: UmrahPackage, category_id: string, onStart: () => void, onProgressEnd: () => void, onSuccess: (res: any) => any, onUnexpected: (error: any) => void) {

    onStart();
    const formdata = new FormData();
    formdata.append("name", p.name);
    formdata.append("price_single", p.price_single);
    formdata.append("what_to_expect", p.what_to_expect);
    formdata.append("price_quad", p.price_quad);
    formdata.append("main_points", p.main_points);
    formdata.append("price_double", p.price_double);
    formdata.append("price_tripple", p.price_tripple);
    formdata.append("currency", p.currency);
    formdata.append("hotel_makkah_name", p.hotel_makkah_name);
    formdata.append("hotel_madina_name", p.hotel_madina_name);
    formdata.append("hotel_makkah_detail", p.hotel_makkah_detail);
    formdata.append("hotel_madina_detail", p.hotel_madina_detail);
    formdata.append("nights_makkah", p.nights_makkah.toString());
    formdata.append("nights_madina", p.nights_madina.toString());
    formdata.append("nights", p.nights.toString());
    formdata.append("is_roundtrip", p.is_roundtrip ? '1' : '0');
    formdata.append("ziyarat", p.ziyarat ? '1' : '0');
    formdata.append("guide", p.guide ? '1' : '0');
    formdata.append("email", p.email);
    formdata.append("whatsapp", p.whatsapp);
    formdata.append("phone", p.phone);
    formdata.append("hotel_makkah_enabled", p.hotel_makkah_enabled ? "1" : '0');
    formdata.append("hotel_madina_enabled", p.hotel_madina_enabled ? '1' : "0");
    formdata.append("visa_enabled", p.visa_enabled ? '1' : '0');
    formdata.append("ticket_enabled", p.ticket_enabled ? '1' : '0');
    formdata.append("breakfast_enabled", p.breakfast_enabled ? '1' : '0');
    formdata.append("dinner_enabled", p.dinner_enabled ? '1' : '0');
    formdata.append("visa_duration", p.visa_duration ? '1' : '0');
    formdata.append("transport_enabled", p.transport_enabled ? '1' : '0');
    formdata.append("category_id", category_id);
    formdata.append("visa_title", p.visa_title);
    formdata.append("visa_detail", p.visa_detail);
    formdata.append("trans_title", p.trans_title);
    formdata.append("trans_detail", p.trans_detail);

    if (p.hotel_madina_image) {
        const res = await fetch(p.hotel_madina_image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("hotel_madina_image", blob, p.hotel_madina_name);
        }
    }
    if (p.hotel_makkah_image) {

        const res = await fetch(p.hotel_makkah_image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("hotel_makkah_image", blob, p.hotel_makkah_name);
        }
    }

    if (p.trans_image) {
        const res = await fetch(p.trans_image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("trans_image", blob, p.trans_title);
        }
    }
    if (p.package_image) {

        const res = await fetch(p.package_image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("package_image", blob, p.name);
        }
    }

    if (p.visa_image) {

        const res = await fetch(p.visa_image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("visa_image", blob, p.visa_title);
        }
    }

    const requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    await fetch(POST_CREATE_PACKAGE, requestOptions)
        .then((response) => response.text())
        .then((result) => onSuccess(result))
        .catch((error) => onUnexpected(error)).finally(onProgressEnd);
}

export async function createHotel(p: Hotel, onStart: () => void, onProgressEnd: () => void, onSuccess: (res: any) => any, onUnexpected: (error: any) => void) {

    onStart();
    const formdata = new FormData();
    formdata.append("name", p.name);
    formdata.append("charges", p.charges.toString());
    formdata.append("rating", p.rating.toString());
    formdata.append("location", p.location.toString());

    formdata.append("currency", p.currency);
    formdata.append("description", p.description ?? "");
    formdata.append("email", p.email);

    formdata.append("phone", p.phone);


    formdata.append("breakfast_enabled", p.breakfast_enabled ? '1' : '0');
    formdata.append("dinner_enabled", p.dinner_enabled ? '1' : '0');



    if (p.image) {
        const res = await fetch(p.image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("image", blob, p.image);
        }
    }



    const requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    await fetch(URL_CREATE_HOTEL, requestOptions)
        .then((response) => response.text())
        .then((result) => onSuccess(result))
        .catch((error) => onUnexpected(error)).finally(onProgressEnd);
}


export async function createBlog(p: Blog, onStart: () => void, onProgressEnd: () => void, onSuccess: (res: any) => any, onUnexpected: (error: any) => void) {






    onStart();
    const formdata = new FormData();
    formdata.append("title", p.title);

    const res = await fetch(p.image);
    if (res.ok) {
        const blob = await res.blob();
        formdata.append('image', blob, 'image.jpg');
    }


    p.elements.forEach(async (e, index) => {


        if (e.element_type == 'image') {
            var key = e.value.substring(0, 5);
            const res = await fetch(e.value);
            if (res.ok) {
                const blob = await res.blob();
                formdata.append(key, blob, key);
            }
            e.value = key;
            formdata.append("elements[" + index + "]", JSON.stringify(e.toJson()));
        } else {


            formdata.append("elements[" + index + "]", JSON.stringify(e.toJson()));
        }

    })


    const requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    await fetch(URL_CREATE_BLOG, requestOptions)
        .then((response) => response.text())
        .then((result) => onSuccess(result))
        .catch((error) => onUnexpected(error)).finally(onProgressEnd);
}
export async function updateBlogCloud(p: Blog, onStart: () => void, onProgressEnd: () => void, onSuccess: (res: any) => any, onUnexpected: (error: any) => void) {






    onStart();
    const formdata = new FormData();

    formdata.append("title", p.title);

    const res = await fetch(p.image);
    if (res.ok) {
        const blob = await res.blob();
        formdata.append('image', blob, 'image.jpg');
    }


    p.elements.forEach(async (e, index) => {


        if (e.element_type == 'image' && !e.value.includes("blog_images")) {
            var key = e.value.substring(0, 5);
            const res = await fetch(e.value);
            if (res.ok) {
                const blob = await res.blob();
                formdata.append(key, blob, key);
            }
            e.value = key;
            formdata.append("elements[" + index + "]", JSON.stringify(e.toJson()));
        } else {


            formdata.append("elements[" + index + "]", JSON.stringify(e.toJson()));
        }

    })


    const requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    await fetch(URL_UPDATE_BLOG + p.id, requestOptions)
        .then((response) => response.text())
        .then((result) => onSuccess(result))
        .catch((error) => onUnexpected(error)).finally(onProgressEnd);
}


function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function submitCustomPackage(p:CustomPackage, onStart: () => void, onProgressEnd: () => void, onSuccess: (res: any) => any, onUnexpected: (error: any) => void) {
    const formdata = new FormData();
    formdata.append("user_name", p.user_name);
    formdata.append("tour_days", p.tour_days.toString());
    formdata.append("flight_from", p.flight_from);
    formdata.append("country", p.country);

    formdata.append("nights_in_makkah", (p.nights_in_makkah??0).toString());
    formdata.append("nights_in_madina",(p.nights_in_madina??0).toString());
    formdata.append("hotel_makkah_id", (p.hotel_makkah_id??-1).toString());
    formdata.append("hotel_madina_id", (p.hotel_madina_id??-1).toString());

    formdata.append("city", p.city);
    formdata.append("no_of_travelers", p.no_of_travelers.toString());
    formdata.append("travelers_visa_details", p.travelers_visa_details);
    formdata.append("phone", p.phone);
    formdata.append("email", p.email);
    formdata.append("additional_comments", p.additional_comments);
    formdata.append("total_amount_hotels", p.total_amount_hotels);
    
    if (p.signature_image_url && !p.signature_image_url.includes('signature_images')) {
        const res = await fetch(p.signature_image_url);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("signature_image", blob, p.user_name+""+p.total_amount_hotels);
        }
    }
    


    const requestOptions :RequestInit = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };
    await delay(2000);
    await fetch(POST_CREATE_CUSTOM_PACKAGE, requestOptions)
        .then((response) => response.text())
        .then((result) => onSuccess(result))
        .catch((error) => onUnexpected(error)).finally(onProgressEnd);
}


export async function updateHotelsCloud(p: Hotel, onStart: () => void, onProgressEnd: () => void, onSuccess: (res: any) => any, onUnexpected: (error: any) => void) {


    onStart();
    const formdata = new FormData();
    formdata.append("id", p.id.toString());
    formdata.append("name", p.name);
    formdata.append("charges", p.charges.toString());
    formdata.append("rating", p.rating.toString());
    formdata.append("location", p.location.toString());

    formdata.append("currency", p.currency);
    formdata.append("description", p.description ?? "");
    formdata.append("email", p.email);

    formdata.append("phone", p.phone);


    formdata.append("breakfast_enabled", p.breakfast_enabled ? '1' : '0');
    formdata.append("dinner_enabled", p.dinner_enabled ? '1' : '0');



    if (p.image && !p.image.includes('hotel_images')) {
        const res = await fetch(p.image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("image", blob, p.image);
        }
    }




    const requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    await fetch(POST_UPDATE_HOTEL, requestOptions)
        .then((response) => response.text())
        .then((result) => onSuccess(result))
        .catch((error) => onUnexpected(error)).finally(onProgressEnd);
}


export async function updatePackageCloud(p: UmrahPackage, category_id: string, onStart: () => void, onProgressEnd: () => void, onSuccess: (res: any) => any, onUnexpected: (error: any) => void) {

    onStart();
    const formdata = new FormData();
    formdata.append('id', p.id);
    formdata.append("name", p.name);
    formdata.append("price_single", p.price_single);
    formdata.append("what_to_expect", p.what_to_expect);
    formdata.append("price_quad", p.price_quad);
    formdata.append("main_points", p.main_points);
    formdata.append("price_double", p.price_double);
    formdata.append("price_tripple", p.price_tripple);
    formdata.append("currency", p.currency);
    formdata.append("hotel_makkah_name", p.hotel_makkah_name);
    formdata.append("hotel_madina_name", p.hotel_madina_name);
    formdata.append("hotel_makkah_detail", p.hotel_makkah_detail);
    formdata.append("hotel_madina_detail", p.hotel_madina_detail);
    formdata.append("nights_makkah", p.nights_makkah.toString());
    formdata.append("nights_madina", p.nights_madina.toString());
    formdata.append("nights", p.nights.toString());
    formdata.append("is_roundtrip", p.is_roundtrip ? '1' : '0');
    formdata.append("ziyarat", p.ziyarat ? '1' : '0');
    formdata.append("guide", p.guide ? '1' : '0');
    formdata.append("email", p.email);
    formdata.append("whatsapp", p.whatsapp);
    formdata.append("phone", p.phone);
    formdata.append("hotel_makkah_enabled", p.hotel_makkah_enabled ? "1" : '0');
    formdata.append("hotel_madina_enabled", p.hotel_madina_enabled ? '1' : "0");
    formdata.append("visa_enabled", p.visa_enabled ? '1' : '0');
    formdata.append("ticket_enabled", p.ticket_enabled ? '1' : '0');
    formdata.append("breakfast_enabled", p.breakfast_enabled ? '1' : '0');
    formdata.append("dinner_enabled", p.dinner_enabled ? '1' : '0');
    formdata.append("visa_duration", p.visa_duration ? '1' : '0');
    formdata.append("transport_enabled", p.transport_enabled ? '1' : '0');
    formdata.append("category_id", category_id);
    formdata.append("visa_title", p.visa_title);
    formdata.append("visa_detail", p.visa_detail);
    formdata.append("trans_title", p.trans_title);
    formdata.append("trans_detail", p.trans_detail);

    if (p.hotel_madina_image && !p.hotel_madina_image.includes('package_images')) {
        const res = await fetch(p.hotel_madina_image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("hotel_madina_image", blob, p.hotel_madina_name);
        }
    }
    if (p.hotel_makkah_image && !p.hotel_makkah_image.includes('package_images')) {

        const res = await fetch(p.hotel_makkah_image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("hotel_makkah_image", blob, p.hotel_makkah_name);
        }
    }

    if (p.trans_image && !p.trans_image.includes('package_images')) {
        const res = await fetch(p.trans_image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("trans_image", blob, p.trans_title);
        }
    }
    if (p.package_image && !p.package_image.includes('package_images')) {

        const res = await fetch(p.package_image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("package_image", blob, p.name);
        }
    }

    if (p.visa_image && !p.visa_image.includes('package_images')) {

        const res = await fetch(p.visa_image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("visa_image", blob, p.visa_title);
        }
    }

    const requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    await fetch(POST_UPDATE_PACKAGE, requestOptions)
        .then((response) => response.text())
        .then((result) => onSuccess(result))
        .catch((error) => onUnexpected(error)).finally(onProgressEnd);
}