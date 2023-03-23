import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {catchError, mergeMap, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {

  constructor(private router: Router, private msg: NzMessageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const resetReq = request.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + localStorage.getItem('serverKey') ?? '',
        'Content-Type': 'application/json'
      },
      url: (localStorage.getItem('serverUrl') ?? '') + request.url
    });
    return next.handle(resetReq).pipe(catchError((error: any): Observable<any> => {
      this.msg.error(error.error.message ?? error.error);
      if (error.error === 'Unauthorized') {
        localStorage.setItem('serverKey', '');
        this.router.navigateByUrl('/login');
      }
      return of(error)
    }));
  }
}
