import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './interceptors/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tcc';
  showSpinner = false;
  
  constructor(private loaderService: LoaderService, private cdRef: ChangeDetectorRef){}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.loaderService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });
  }
}
