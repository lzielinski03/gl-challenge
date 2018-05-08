import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, Subject, pipe, forkJoin } from 'rxjs';
import { map, takeUntil, tap, mergeMap, filter } from 'rxjs/operators';


import { Post } from './post'
import { Comment } from './Comment'


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
	
	// returns a single post with comments
	getPostWithComments2(postId):Observable<Post> {
		return this.http
			.get<Post>(`${this.BASEPATH}/posts/${postId}`)
			.pipe(tap( post => {
				this.getComment(postId).subscribe(result => post.comments = result);
			}))
	}

	getPostWithComments(postId):Observable<Post> {
		let post = this.http.get<Post>(`${this.BASEPATH}/posts/${postId}`)
		let comments = this.http.get<Comment[]>(`${this.BASEPATH}/comments`)
			.pipe(
				map( response => response.filter(comment => comment.postId === postId))
			)

		return forkJoin([post, comments])
			.pipe(map(([x, y]) => {
				x.comments = y;
				return <Post>x;
			}))

	}
}
