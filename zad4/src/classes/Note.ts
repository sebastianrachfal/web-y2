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
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M13.828 1.686l8.486 8.486-1.415 1.414-.707-.707-4.242 4.242-.707 3.536-1.415 1.414-4.242-4.243-4.95 4.95-1.414-1.414 4.95-4.95-4.243-4.242 1.414-1.415L8.88 8.05l4.242-4.242-.707-.707 1.414-1.415zm.708 3.536l-4.671 4.67-2.822.565 6.5 6.5.564-2.822 4.671-4.67-4.242-4.243z" fill="currentColor"/></svg>
					</div>
					<div 
						class="note__remove"						
						onclick="app.handleRemove('${this.id}')"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
					</div>
				</div>`;
	}
}
