import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Post } from './../schemas/Post';
import { PostService } from './../services/post.service';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css'],
	providers: [ PostService ]
})
export class PostComponent implements OnInit {

	@Input() post: Post;

	constructor(
		private route: ActivatedRoute,
		private service: PostService,
		private location: Location
	) { }

	ngOnInit() {
		this.getPost()
	}

	getPost(): void {
		const id = + this.route.snapshot.paramMap.get('id');
		this.service.getPostWithComments(id)
			.subscribe(post => this.post = post );
	}

}
