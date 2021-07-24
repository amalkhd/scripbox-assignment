import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { CommonService } from "./common.service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private common: CommonService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            console.log(event.status)
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
          console.log(error);
        if (error.status != 200) {
          this.common.showToastr(
            error.error || "Something went wrong",
            "error"
          );
        }
        return throwError(error);
      })
    );
  }
}