import { Blog } from "../type/Blog";
import CustomPackage from "../type/CustomPackage";
import { Hotel } from "../type/Hotel";
import { UmrahPackage } from "../type/UmrahPackage";
import { BACKEND_BASE_URL, POST_CREATE_CUSTOM_PACKAGE, POST_CREATE_PACKAGE, POST_UPDATE_HOTEL, POST_UPDATE_PACKAGE, URL_CREATE_BLOG, URL_CREATE_HOTEL, URL_UPDATE_BLOG, POST_CREATE_INQUIRY } from "./Routes";


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
    formdata.append("visa_duration", p.visa_duration || '');
    formdata.append("transport_enabled", p.transport_enabled ? '1' : '0');
    formdata.append("category_id", category_id);
    formdata.append("visa_title", p.visa_title);
    formdata.append("visa_detail", p.visa_detail);
    formdata.append("trans_title", p.trans_title);
    formdata.append("trans_detail", p.trans_detail);

    // Add SEO fields
    if (p.meta_title) formdata.append("meta_title", p.meta_title);
    if (p.meta_description) formdata.append("meta_description", p.meta_description);
    if (p.meta_keywords) formdata.append("meta_keywords", p.meta_keywords);
    if (p.og_title) formdata.append("og_title", p.og_title);
    if (p.og_description) formdata.append("og_description", p.og_description);
    if (p.og_image) formdata.append("og_image", p.og_image);
    if (p.twitter_title) formdata.append("twitter_title", p.twitter_title);
    if (p.twitter_description) formdata.append("twitter_description", p.twitter_description);
    if (p.twitter_image) formdata.append("twitter_image", p.twitter_image);

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

    const myHeaders = new Headers();
    const token = localStorage.getItem('admin_token');
    if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`);
    }

    const requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        headers: myHeaders,
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
    formdata.append("location", p.location);
    formdata.append("charges", p.charges || "");
    formdata.append("rating", p.rating || "");
    formdata.append("description", p.description || "");
    formdata.append("currency", p.currency || "USD");
    formdata.append("email", p.email || "");
    formdata.append("phone", p.phone || "");
    formdata.append("breakfast_enabled", p.breakfast_enabled ? '1' : '0');
    formdata.append("dinner_enabled", p.dinner_enabled ? '1' : '0');

    if (p.image && typeof p.image === 'string' && p.image.startsWith('data:')) {
        const res = await fetch(p.image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append("image", blob, 'hotel_image.jpg');
        }
    }

    const myHeaders = new Headers();
    const token = localStorage.getItem('admin_token');
    if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`);
    }

    const requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        headers: myHeaders,
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
    formdata.append("body", p.body || '');

    // Add SEO fields
    if (p.meta_title) formdata.append("meta_title", p.meta_title);
    if (p.meta_description) formdata.append("meta_description", p.meta_description);
    if (p.meta_keywords) formdata.append("meta_keywords", p.meta_keywords);
    if (p.og_title) formdata.append("og_title", p.og_title);
    if (p.og_description) formdata.append("og_description", p.og_description);
    if (p.og_image) formdata.append("og_image", p.og_image);
    if (p.twitter_title) formdata.append("twitter_title", p.twitter_title);
    if (p.twitter_description) formdata.append("twitter_description", p.twitter_description);
    if (p.twitter_image) formdata.append("twitter_image", p.twitter_image);

    if (p.image) {
        const res = await fetch(p.image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append('image', blob, 'image.jpg');
        }
    }

    let imageCounter = 0;
    
    // Process elements in order
    for (let index = 0; index < p.elements.length; index++) {
        const e = p.elements[index];
        let elementValue = e.value;
        let elementJson = e.toJson();
        
        if (e.element_type == 'image') {
            // Check if this is a data URL (base64) or existing URL
            if (typeof e.value === 'string' && e.value.startsWith('data:')) {
                // It's a new image from file upload
                const res = await fetch(e.value);
                if (res.ok) {
                    const blob = await res.blob();
                    const fieldName = `image_${imageCounter}`;
                    formdata.append(fieldName, blob, `image${imageCounter}.jpg`);
                    elementValue = fieldName;
                    imageCounter++;
                }
            } else if (e.value.includes && e.value.includes('blogs_images')) {
                // Existing image URL - keep it as is, no change needed
            } else {
                // Might be a field name already set
            }
            
            // Update the value in the JSON before stringifying
            elementJson.value = elementValue;
            formdata.append("elements[" + index + "]", JSON.stringify(elementJson));
        } else {
            formdata.append("elements[" + index + "]", JSON.stringify(e.toJson()));
        }
    }

    const myHeaders = new Headers();
    const token = localStorage.getItem('admin_token');
    if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`);
    }

    const requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        headers: myHeaders,
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
    formdata.append("body", p.body || '');
    
    // Add SEO fields
    if (p.meta_title) formdata.append("meta_title", p.meta_title);
    if (p.meta_description) formdata.append("meta_description", p.meta_description);
    if (p.meta_keywords) formdata.append("meta_keywords", p.meta_keywords);
    if (p.og_title) formdata.append("og_title", p.og_title);
    if (p.og_description) formdata.append("og_description", p.og_description);
    if (p.og_image) formdata.append("og_image", p.og_image);
    if (p.twitter_title) formdata.append("twitter_title", p.twitter_title);
    if (p.twitter_description) formdata.append("twitter_description", p.twitter_description);
    if (p.twitter_image) formdata.append("twitter_image", p.twitter_image);

    // Handle main image - upload new or keep existing
    if (p.image && typeof p.image === 'string' && p.image.startsWith('data:')) {
        // New image upload
        const res = await fetch(p.image);
        if (res.ok) {
            const blob = await res.blob();
            formdata.append('image', blob, 'image.jpg');
        }
    } else if (p.image && typeof p.image === 'string') {
        // Existing image - send URL as a field so backend knows it's unchanged
        formdata.append('image_url', p.image);
    }

    let imageCounter = 0;
    
    // Process elements in order
    for (let index = 0; index < p.elements.length; index++) {
        const e = p.elements[index];
        let elementValue = e.value;
        let elementJson = e.toJson();
        
        if (e.element_type == 'image') {
            // Check if this is a new image (data URL) or existing
            if (typeof e.value === 'string' && e.value.startsWith('data:')) {
                // It's a new image from file upload
                const res = await fetch(e.value);
                if (res.ok) {
                    const blob = await res.blob();
                    const fieldName = `image_${imageCounter}`;
                    formdata.append(fieldName, blob, `image${imageCounter}.jpg`);
                    elementValue = fieldName;
                    imageCounter++;
                }
            }
            // For existing images, keep the URL as is
            // Don't try to re-upload existing blog images
            
            // Update the value in the JSON before stringifying
            elementJson.value = elementValue;
            formdata.append("elements[" + index + "]", JSON.stringify(elementJson));
        } else {
            formdata.append("elements[" + index + "]", JSON.stringify(e.toJson()));
        }
    }

    const myHeaders = new Headers();
    const token = localStorage.getItem('admin_token');
    if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`);
    }

    const requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        headers: myHeaders,
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
        .then(async (response) => {
            const result = await response.text();
            if (!response.ok) {
                // Handle HTTP error status (4xx, 5xx)
                onUnexpected(new Error(`HTTP ${response.status}: ${result || response.statusText}`));
            } else {
                onSuccess(result);
            }
        })
        .catch((error) => onUnexpected(error))
        .finally(onProgressEnd);
}


export async function updateHotelsCloud(p: Hotel, onStart: () => void, onProgressEnd: () => void, onSuccess: (res: any) => any, onUnexpected: (error: any) => void) {

    onStart();
    const formdata = new FormData();
    formdata.append("name", p.name);
    formdata.append("location", p.location);
    formdata.append("charges", p.charges || "");
    formdata.append("rating", p.rating || "");
    formdata.append("description", p.description || "");
    formdata.append("currency", p.currency || "USD");
    formdata.append("email", p.email || "");
    formdata.append("phone", p.phone || "");
    formdata.append("breakfast_enabled", p.breakfast_enabled ? '1' : '0');
    formdata.append("dinner_enabled", p.dinner_enabled ? '1' : '0');

    if (p.image) {
        // Only upload if it's a new image (data URL) or existing URL doesn't contain storage path
        if (typeof p.image === 'string' && p.image.startsWith('data:')) {
            const res = await fetch(p.image);
            if (res.ok) {
                const blob = await res.blob();
                formdata.append("image", blob, 'hotel_image.jpg');
            }
        } else if (typeof p.image === 'string' && !p.image.includes('/storage/')) {
            // If it's an existing URL from a different source, might need to upload
            const res = await fetch(p.image);
            if (res.ok) {
                const blob = await res.blob();
                formdata.append("image", blob, 'hotel_image.jpg');
            }
        }
        // If it's an existing /storage/ path, backend will keep it as-is
    }

    const myHeaders = new Headers();
    const token = localStorage.getItem('admin_token');
    if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`);
    }

    const requestOptions: RequestInit = {
        method: "PUT",
        body: formdata,
        headers: myHeaders,
        redirect: "follow"
    };

    await fetch(POST_UPDATE_HOTEL + '/' + p.id, requestOptions)
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
    formdata.append("visa_duration", p.visa_duration || '');
    formdata.append("transport_enabled", p.transport_enabled ? '1' : '0');
    formdata.append("category_id", category_id);
    formdata.append("visa_title", p.visa_title);
    formdata.append("visa_detail", p.visa_detail);
    formdata.append("trans_title", p.trans_title);
    formdata.append("trans_detail", p.trans_detail);

    // Add SEO fields
    if (p.meta_title) formdata.append("meta_title", p.meta_title);
    if (p.meta_description) formdata.append("meta_description", p.meta_description);
    if (p.meta_keywords) formdata.append("meta_keywords", p.meta_keywords);
    if (p.og_title) formdata.append("og_title", p.og_title);
    if (p.og_description) formdata.append("og_description", p.og_description);
    if (p.og_image) formdata.append("og_image", p.og_image);
    if (p.twitter_title) formdata.append("twitter_title", p.twitter_title);
    if (p.twitter_description) formdata.append("twitter_description", p.twitter_description);
    if (p.twitter_image) formdata.append("twitter_image", p.twitter_image);

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

    const myHeaders = new Headers();
    const token = localStorage.getItem('admin_token');
    if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`);
    }

    const requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        headers: myHeaders,
        redirect: "follow"
    };

    await fetch(POST_UPDATE_PACKAGE, requestOptions)
        .then((response) => response.text())
        .then((result) => onSuccess(result))
        .catch((error) => onUnexpected(error)).finally(onProgressEnd);
}

export async function createInquiry(inquiry: any, onProgressStart: () => void, onProgressEnd: () => void, onSuccess: (result: any) => void, onUnexpected: (error: any) => void) {
    onProgressStart();
    const formdata = new FormData();
    formdata.append("name", inquiry.name);
    formdata.append("email", inquiry.email);
    formdata.append("phone", inquiry.phone);
    formdata.append("message", inquiry.message);

    const requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    await fetch(POST_CREATE_INQUIRY, requestOptions)
        .then((response) => response.text())
        .then((result) => onSuccess(result))
        .catch((error) => onUnexpected(error)).finally(onProgressEnd);
}