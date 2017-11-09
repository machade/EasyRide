import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (platform.is('android')) {
        let funcaoRetorno = (data) => {
          //storage.set('isAlert', true);
        }
        window["plugins"].OneSignal.startInit("d1306049-5b2e-4d40-9625-d16b3a93004c","1074558556657")
        .handleNotificationOpened(funcaoRetorno).endInit();
      }
    });
  }
}
