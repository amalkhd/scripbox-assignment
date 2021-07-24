import { Injectable } from "@angular/core";
import { boolean } from "joi";

import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class CommonService {
    toastrEvent: Subject<any> = new Subject();

    showToastr(message, status: "error" | "success", timeout = 5000) {
        console.log(message);
        this.toastrEvent.next({message, status});
        setTimeout(() => {
            this.toastrEvent.next(false);
        }, timeout)
    }
}