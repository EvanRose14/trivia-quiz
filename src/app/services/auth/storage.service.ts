import { Injectable } from "@angular/core";

export enum StorageKey {
    AUTH_REFRESH_TOKEN = 'trivia.backend.refresh.token',
    AUTH_ACCESS_TOKEN = 'trivia.backend.refresh.token'
}

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor() {}

    set(key: StorageKey, value: any) {
        localStorage.setItem(key, value);
    }

    get(key: StorageKey) {
        return localStorage.getItem(key);
    }

    delete(key: StorageKey) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}