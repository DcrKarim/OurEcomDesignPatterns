import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '@shared/services/error.service';

export const ErrorResponseInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  const errorService = inject(ErrorService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      errorService.setError(`Error code: ${error.status}, message: ${error.message}`);
      return throwError(() => error);
    })
  );
};
