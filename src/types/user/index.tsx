export type User = {
	id: string;
	email: string;
	name: string;
	role: string;
	avatar?: string;
};

export type Session = {
	id: string;
	name: string;
	email: string;
	role: string;
	likedPosts: number[];
};