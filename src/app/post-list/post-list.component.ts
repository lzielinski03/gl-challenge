import { Component, OnInit } from '@angular/core';
import { Post } from './../schemas/post';
import { PostService } from './../services/post.service';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css'],
	providers: [ PostService ]
})
export class PostListComponent implements OnInit {

	posts: Post[];

	constructor(private service: PostService) { }

	ngOnInit() {
		this.service.getPosts()
			.subscribe(posts => this.posts = posts );
	}

}
