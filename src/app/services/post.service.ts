import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';

import { HttpClient } from '@angular/common/http';

import { Observable, pipe, forkJoin } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Post } from './../schemas/post'
import { Comment } from './../schemas/Comment'


@Injectable({
	providedIn: 'root'
})
export class PostService {

	private readonly BASEPATH = "https://jsonplaceholder.typicode.com";

	constructor(
		private http: HttpClient
	) {}

	// returns a list of all posts
	getPosts():Observable<Post[]> {
		return this.http
			.get<Post[]>(`${this.BASEPATH}/posts`)
			.pipe(map( response => <Post[]>(response)))
	}

	// returns a list of comments for the postId
	getComment(postId:number):Observable<Comment[]> {
		return this.http
			.get<Comment[]>(`${this.BASEPATH}/comments`)
			.pipe(
				map( response => response.filter(comment => comment.postId === postId))
			)
	}
	
	getPostWithComments(postId):Observable<Post> {
		let post = this.http.get<Post>(`${this.BASEPATH}/posts/${postId}`)
		let comments = this.http.get<Comment[]>(`${this.BASEPATH}/comments`)
			.pipe(
				map( response => response.filter(comment => comment.postId === postId))
			)

		return forkJoin([post, comments])
			.pipe(map(([post, comments]) => {
				post.comments = comments;
				return <Post>post;
			}))

	}
}
