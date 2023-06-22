import { Injectable } from '@angular/core';
import { ToastOptions, ToastaService } from 'ngx-toasta';

@Injectable({
  providedIn: 'root'
})
export class ToastAlertService {

constructor(private toastaService: ToastaService) { }

  addToast(error: string) {
    const toastOptions: ToastOptions = {
        title: 'Error',
        msg: error,
        showClose: true,
        timeout: 5000,
        theme: 'default',
    };
    this.toastaService.warning(toastOptions);
  }
}
