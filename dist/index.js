"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rl = require("readline");
const poolcleaner_1 = require("./poolcleaner");
const prompts = rl.createInterface({ input: process.stdin, output: process.stdout });
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lengthX = yield new Promise(resolve => {
            prompts.question('lengthX: ', resolve);
        });
        if (Number(lengthX) < 0) {
            throw 'LengthX cannot be a negative number.';
        }
        const lengthY = yield new Promise(resolve => {
            prompts.question('lengthY: ', resolve);
        });
        if (Number(lengthY) < 0) {
            throw 'LengthY cannot be a negative number.';
        }
        const initialDirection = yield new Promise(resolve => {
            prompts.question('Initial direction: ', resolve);
        });
        const initialX = yield new Promise(resolve => {
            prompts.question('Initial X: ', resolve);
        });
        if (Number(initialX) < 0) {
            throw 'The initial X-axis value cannot be a negative number.';
        }
        else if (Number(initialX) > Number(lengthX)) {
            throw 'The initial X-axis value cannot surpass lengthX.';
        }
        const initialY = yield new Promise(resolve => {
            prompts.question('Initial Y: ', resolve);
        });
        if (Number(initialY) < 0) {
            throw 'The initial Y-axis value cannot be a negative number.';
        }
        else if (Number(initialY) > Number(lengthY)) {
            throw 'The initial Y-axis value cannot surpass lengthY.';
        }
        const numberOfCommands = yield new Promise(resolve => {
            prompts.question('Number of commands: ', resolve);
        });
        const isNumber = /^\d+$/.test(numberOfCommands);
        if (isNumber === false) {
            throw 'The number of commands needs to be a number.';
        }
        const commands = [];
        for (let i = 0; i < Number(numberOfCommands); i++) {
            const command = yield new Promise(resolve => {
                prompts.question(`Command ${i + 1}: `, resolve);
            });
            commands.push(command.toUpperCase());
        }
        const poolCleanerSpecifications = {
            pool: {
                lengthX: Number(lengthX),
                lengthY: Number(lengthY)
            },
            initial: {
                direction: initialDirection.toUpperCase(),
                x: Number(initialX),
                y: Number(initialY)
            },
            commands: commands
        };
        const pc = new poolcleaner_1.PoolCleaner(poolCleanerSpecifications);
        console.log(pc.simulate());
    }
    catch (error) {
        console.log('Error: '.concat(error));
    }
    finally {
        process.exit();
    }
}))();
