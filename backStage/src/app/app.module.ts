import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule} from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CreateManagerPage } from '../pages/create-manager/create-manager';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { ReviseManagerPage } from '../pages/revise-manager/revise-manager';
import { CreateNewsPage } from '../pages/create-news/create-news';
import { CreateProductPage } from '../pages/create-product/create-product';
import { NewsDetailPage } from '../pages/news-detail/news-detail';
import { NewsImagePage } from '../pages/news-image/news-image';
import { NewsTexrPage } from '../pages/news-texr/news-texr';

@NgModule({
  declarations: [
    MyApp,
    HomePage, //首页
    LoginPage,  //登录页
    CreateManagerPage,//创新新的管理员
    ProductDetailPage,//查看商品详情图片
    ReviseManagerPage,//修改管理员信息
    CreateNewsPage,//创建新的资讯
    CreateProductPage,//创新新的商品
    NewsDetailPage,//查看资讯
    NewsImagePage,//查看咨询图片
    NewsTexrPage,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CreateManagerPage,
    ProductDetailPage,
    ReviseManagerPage,
    CreateNewsPage,
    CreateProductPage,
    NewsDetailPage,
    NewsImagePage,
    NewsTexrPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
