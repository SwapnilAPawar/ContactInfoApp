import { LoaderService } from './_services/loader.service';
import { NotificationService } from './_services/notification.service';
import { ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, DoCheck {
  title = 'app';
  loader = 0;

  subActiveRoute = this.activatedRoute.data.subscribe((data: { title: string }) => {
    this.titleService.setTitle(data.title);
  });

  subLoader = this.loaderService.loadingFlagUpdated.subscribe((d) => {
    this.loader = d;
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.loader = 0;
  }

  public ngDoCheck() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subActiveRoute.unsubscribe();
    this.subLoader.unsubscribe();
  }
}
