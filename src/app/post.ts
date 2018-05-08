import { Comment } from './comment'

export interface Post {

	title: string;
	body: string;
	comments: Comment[];
}
