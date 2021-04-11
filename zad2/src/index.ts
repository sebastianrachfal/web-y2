const LETTERS = ['a', 's', 'd', 'f', 'h', 'j', 'k', 'l'];
const AUDIO = [
	'boom',
	'clap',
	'hihat',
	'kick',
	'openhat',
	'ride',
	'snare',
	'tink',
];

class Main {
	lines: HTMLDivElement[] = [];
	audioEls: HTMLAudioElement[] = [];

	COLORS: string[] = [
		'#fe8936',
		'#7e1d21',
		'#844fed',
		'#2b6964',
		'#40b2aa',
		'#d07a85',
		'#6b84b3',
		'#061057',
	];

	constructor() {
		this.colorLines();
		this.audioFiles();
		this.applyEvents();
	}
	audioFiles() {
		for (let clip of AUDIO) {
			const audio = document.createElement('audio');
			const source = document.createElement('source');

			source.src = `./assets/${clip}.wav`;
			source.type = 'audio/wav';

			this.audioEls.push(audio);

			audio.appendChild(source);
			document.body.appendChild(audio);
		}
	}
	colorLines() {
		for (let letter of LETTERS) {
			const div = document.createElement('div');
			const span = document.createElement('span');

			span.innerText = letter;

			div.className = 'line';
			div.style.backgroundColor =
				Math.random() > 0.5 ? this.COLORS.pop() : this.COLORS.shift();

			this.lines.push(div);
			div.appendChild(span);
			document.body.appendChild(div);
		}
	}
	applyEvents() {
		document.addEventListener('keydown', (e) => {
			const index = LETTERS.indexOf(e.key.toLowerCase());
			if (index > -1) {
				this.playSound(this.audioEls[index]);

				this.lines[index].style.filter = 'brightness(1.6)';
				(this.lines[index]
					.children[0] as HTMLSpanElement).style.transform =
					'translateX(-50%) translateY(10px)';

				setTimeout(() => {
					this.lines[index].style.filter = '';
					(this.lines[index]
						.children[0] as HTMLSpanElement).style.transform =
						'translateX(-50%) translateY(0px)';
				}, 100);
			}
		});
	}
	playSound(el: HTMLAudioElement) {
		el.pause();
		el.currentTime = 0;
		el.play();
	}
}

new Main();
