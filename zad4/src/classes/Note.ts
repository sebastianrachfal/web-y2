import profiler from '@/decorators/profiler';
import { uuid } from '@/helpers';
import { INote } from '@/interfaces/INote';

export default class Note implements INote {
	id: string;
	title: string;
	body: string;
	pinned: boolean;
	color: string;
	added: number;

	constructor({ title, body, pinned, color, added }: INote) {
		this.id = uuid();
		[this.title, this.body, this.pinned, this.color, this.added] = [
			title,
			body,
			pinned,
			color,
			added,
		];
	}

	@profiler
	getHTML(): string {
		return `<div class="note" style="background-color: ${this.color};">
					<h3>${this.title}</h3>
					<pre>${this.body}</pre>
					<div class="note__edit">
						<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 61.49"><g style="transform:translateX(10px)"><path d="M36,16.7a11.82,11.82,0,0,0,1.48-8.43,10.21,10.21,0,0,0-4.8-6.87c-5.05-3-11.8-1-15,4.42l-2.31,3.9L33.69,20.6Zm-4.22-3.43-9.09-5.4C24.51,5.47,27.63,4.6,30,6a4.91,4.91,0,0,1,2.29,3.35A6.4,6.4,0,0,1,31.78,13.27Z"/><path d="M1.51,53.93l1.57.78,15.27-8.25L31,25.19,12.62,14.3,0,35.58.08,51.41A3,3,0,0,0,1.51,53.93Zm13-32.32,9.17,5.44L14.51,42.47,5.39,47.4,5.34,37Z"/><rect y="56.16" width="45" height="5.33" rx="2.67" ry="2.67"/></g></svg>
					</div>
					<div 
					class="note__pushpin ${this.pinned ? 'note__pushpin--selected' : ''}"						
					onclick="app.handlePin('${this.id}')"
					>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0"
						y="0"
						style="enable-background: new 0 0 476.258 476.258"
						version="1.1"
						viewBox="0 0 476.258 476.258"
						xml:space="preserve"
					>
						<path
							d="M476.235 119.133L357.158 0 206.936 134.654c-19.906-7.082-39.446-10.666-58.205-10.666-31.648 0-58.709 10.364-78.259 29.972l-10.574 10.607 115.305 115.298L.023 455.045l21.213 21.213 175.18-175.181 115.325 115.318 10.606-10.614c16.936-16.948 27.105-39.913 29.41-66.414 1.905-21.911-1.6-45.947-10.156-70.022l134.634-150.212zm-41.293 1.124L323.736 244.33l-91.784-91.811L356.025 41.303l78.917 78.954zM310.52 372.75L103.519 165.76c12.401-7.74 27.764-11.773 45.212-11.773 16.56 0 34.831 3.715 53.014 10.748l109.781 109.813c14.892 38.271 14.343 73.659-1.006 98.202z"
						></path>
					</svg>
					<div>
				</div>`;
	}
}
