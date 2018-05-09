import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';

import { AppRoutingModule } from './app-routing.module'

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule,
		HttpClientModule
	],
	declarations: [
		AppComponent,
		PostComponent,
		PostListComponent
	],
	providers: [],
	bootstrap: [AppComponent],
	exports: [HttpClientModule]
})
export class AppModule { }
