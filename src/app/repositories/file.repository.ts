import { Injectable } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class FileRepository {
    constructor(private sanitizer: DomSanitizer) {
    }

    generateJsonUri<T>(data: T): SafeUrl {
        if (data == null) throw new Error("Data not provided.");

        let jsonContent = JSON.stringify(data);
        let blob = new Blob([jsonContent], { type: 'text/json' });
        let url = window.URL.createObjectURL(blob);
        let uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(encodeURI(url));
        return uri;
    }
}