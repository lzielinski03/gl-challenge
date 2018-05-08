import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
	{ path: 'posts', 		component: PostListComponent },
	{ path: 'post/:id',   component: PostComponent },
	{ path: '',
		redirectTo: '/posts',
		pathMatch: 'full'
	},
	//{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
