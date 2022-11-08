/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Platform } from '@ionic/angular';

import { AppComponent } from '../app.component';

import { StorageService } from 'src/app/.services/storage.service';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@awesome-cordova-plugins/camera-preview/ngx';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  title = 'TestPage';
  theme: any = 'dark';

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1,
    storeToFile: false
  };
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  };
  picture: any = null;

  constructor(
    public app: AppComponent,
    public platform: Platform,
    private cdr: ChangeDetectorRef,
    public storage: StorageService,
    private cameraPreview: CameraPreview
  ) {
    console.log(`[${this.title}#constructor]`);
  }

  ngOnInit() {
    console.log(`[${this.title}#ngOnInit]`);
  }

  ionViewDidEnter() {
    this.platform.ready().then((readySource) => {
      console.log(`[${this.title}#ionViewDidEnter] platform.ready`, readySource);

      this.theme = this.storage.get('theme', this.title) == null ? 'dark' : this.storage.get('theme', this.title);

      this.startCamera();
    });
  }

  defaultOrder() {
    return 0;
  }

  updateView() {
    console.log(`[${this.title}#updateView]`);
    this.cdr.detectChanges();
    this.app.updateView(this.title);
  }

  redirectTo(url: string) {
    this.app.redirectTo(url, this.title);
  }

  startCamera() {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(`[${this.title}#startCamera] response`, res);
        // this.cameraPreview.show();
      },
      (err) => {
        console.log(`[${this.title}#startCamera] error`, err);
      });
  }

  takePicture() {
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;

      console.log(`[${this.title}#startCamera] picture`, this.picture);
    }, (err) => {
      console.log(`[${this.title}#startCamera] error`, err);
      this.picture = 'assets/img/test.jpg';

      console.log(`[${this.title}#startCamera] picture`, this.picture);
    });
  }

  takeSnapshot() {
    this.cameraPreview.takeSnapshot(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;

      console.log(`[${this.title}#takeSnapshot] picture`, this.picture);
    }, (err) => {
      console.log(`[${this.title}#takeSnapshot] error`, err);
      this.picture = 'assets/img/test.jpg';

      console.log(`[${this.title}#takeSnapshot] picture`, this.picture);
    });
  }

  switchCamera() {
    console.log(`[${this.title}#switchCamera]`);
    this.cameraPreview.switchCamera();
  }

  setColorEffect(effect: any) {
    console.log(`[${this.title}#setColorEffect] effect`, effect);
    this.cameraPreview.setColorEffect(effect);
  }

  stopCamera() {
    console.log(`[${this.title}#stopCamera]`);
    this.cameraPreview.stopCamera();
  }
}
