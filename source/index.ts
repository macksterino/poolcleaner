import * as rl from 'readline';
import { PoolCleaner, Specification } from './poolcleaner';

const prompts = rl.createInterface({ input: process.stdin, output: process.stdout });

(async () => {
	try {
		const lengthX = await new Promise<string>(resolve => {
			prompts.question('lengthX: ', resolve);
		});

		if (Number(lengthX) < 0) {
			throw 'LengthX cannot be a negative number.';
		}

		const lengthY = await new Promise<string>(resolve => {
			prompts.question('lengthY: ', resolve);
		});

		if (Number(lengthY) < 0) {
			throw 'LengthY cannot be a negative number.';
		}

		const initialDirection = await new Promise<string>(resolve => {
			prompts.question('Initial direction: ', resolve);
		});

		const initialX = await new Promise<string>(resolve => {
			prompts.question('Initial X: ', resolve);
		});

		if (Number(initialX) < 0) {
			throw 'The initial X-axis value cannot be a negative number.';
		}
		else if (Number(initialX) > Number(lengthX)) {
			throw 'The initial X-axis value cannot surpass lengthX.';
		}

		const initialY = await new Promise<string>(resolve => {
			prompts.question('Initial Y: ', resolve);
		});

		if (Number(initialY) < 0) {
			throw 'The initial Y-axis value cannot be a negative number.';
		}
		else if (Number(initialY) > Number(lengthY)) {
			throw 'The initial Y-axis value cannot surpass lengthY.';
		}

		const numberOfCommands = await new Promise<string>(resolve => {
			prompts.question('Number of commands: ', resolve);
		});

		const isNumber = /^\d+$/.test(numberOfCommands);
		if (isNumber === false) {
			throw 'The number of commands needs to be a number.';
		}

		const commands: Array<string> = [];
		for (let i = 0; i < Number(numberOfCommands); i++) {
			const command = await new Promise<string>(resolve => {
				prompts.question(`Command ${i + 1}: `, resolve);
			});

			commands.push(command.toUpperCase());
		}

		const poolCleanerSpecifications: Specification = {
			pool: {
				lengthX: Number(lengthX),
				lengthY: Number(lengthY)
			},
			initial: {
				direction: initialDirection.toUpperCase() as any,
				x: Number(initialX),
				y: Number(initialY)
			},
			commands: commands as any
		}

		const pc = new PoolCleaner(poolCleanerSpecifications);
		console.log(pc.simulate());
	}
	catch (error) {
		console.log('Error: '.concat(error as string));
	}
	finally {
		process.exit();
	}
})();
