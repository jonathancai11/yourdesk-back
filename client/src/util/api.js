import axios from "axios";
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from './config.js';


export const URI = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/share' : 'https://yourdesk.wl.r.appspot.com/share';
// export const URL = 

// --------------- DESKS ---------------

export function getDesks() {
    return fetch("/api/desk/all").then(resp => resp.json());
}

export function getFeaturedDesks() {
    return fetch("/api/desk/all/featured").then(resp => resp.json());
}

export function getTopDesks() {
    return getFeaturedDesks();
}

export function deleteDesks() {
    return fetch("/api/desk/all", {
        method: 'DELETE'
    }).then(resp => resp.json());
}

export function createDesk(desk) {
    return fetch("/api/desk", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({"desk": desk})
    }).then(resp => resp.json());
}

export function getProducts() {
    return fetch("/api/product/all").then(resp => resp.json());
}

export function getDesk(username, deskId) {
    let params = {
        "username": username, 
        "deskId": deskId
    };
      
    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
      
    return fetch("/api/desk?" + query, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      }
    ).then(resp => resp.json())
}

// --------------- PRODUCTS ---------------

export function getFeaturedProducts() {
    return fetch("/api/product/featured").then(resp => resp.json());
}

export function getTopProducts() {
    return getFeaturedProducts();
}

export function createProduct(product) {
    return fetch("/api/product", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({"product": product})
    }).then(resp => resp.json());
}


// --------------- IMAGE ---------------

export function uploadImage(file) {
    var bodyFormData = new FormData();
    bodyFormData.set('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    bodyFormData.append('file', file);

    return axios({
        method: 'post',
        url: CLOUDINARY_UPLOAD_URL,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}


// --------------- USER ---------------

export function createUser(user) {
    return fetch("/api/user", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({"user": user})
    }).then(resp => resp.json());
}

export function getUser(email) {
    let params = {
        "email": email, 
    };
      
    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
      
    return fetch("/api/user?" + query, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      }
    ).then(resp => resp.json())
}