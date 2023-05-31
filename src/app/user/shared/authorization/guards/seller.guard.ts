import { CanActivateFn } from '@angular/router';

export const sellerGuard: CanActivateFn = (route, state) => {
  return true;
};
