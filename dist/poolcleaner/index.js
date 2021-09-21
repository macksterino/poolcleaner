"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolCleaner = void 0;
class PoolCleaner {
    constructor(specification) {
        this.specification = specification;
        this.result = '';
    }
    handleSpecification() {
        for (const command of this.specification.commands) {
            this.handleDirection(command);
        }
        const { direction, x, y } = this.specification.initial;
        const { lengthX, lengthY } = this.specification.pool;
        if ((x > lengthX) || (x < 0) || (y > lengthY) || (y < 0)) {
            throw 'Neither X or Y cannot exceed the lX and lY of the pool. Please reconstruct your commands.';
        }
        this.result = direction.concat(' ', x.toString(), ' ', y.toString());
    }
    handleDirection(command) {
        const { direction } = this.specification.initial;
        switch (command) {
            case 'A':
                switch (direction) {
                    case 'N':
                        this.specification.initial.y += 1;
                        break;
                    case 'E':
                        this.specification.initial.x += 1;
                        break;
                    case 'S':
                        this.specification.initial.y -= 1;
                        break;
                    case 'W':
                        this.specification.initial.x -= 1;
                        break;
                    default:
                        break;
                }
                break;
            case 'L':
                switch (direction) {
                    case 'N':
                        this.specification.initial.direction = 'W';
                        break;
                    case 'E':
                        this.specification.initial.direction = 'N';
                        break;
                    case 'S':
                        this.specification.initial.direction = 'E';
                        break;
                    case 'W':
                        this.specification.initial.direction = 'S';
                        break;
                    default:
                        break;
                }
                break;
            case 'R':
                switch (direction) {
                    case 'N':
                        this.specification.initial.direction = 'E';
                        break;
                    case 'E':
                        this.specification.initial.direction = 'S';
                        break;
                    case 'S':
                        this.specification.initial.direction = 'W';
                        break;
                    case 'W':
                        this.specification.initial.direction = 'N';
                        break;
                    default: break;
                }
                break;
        }
    }
    /**
     * Simulate the robot's movement and output the end position.
     */
    simulate() {
        this.handleSpecification();
        const header = {
            author: 'Marcus Garpehäll Wiklund',
            description: 'This software simulates the movement of a pool cleaning robot and \npredicts its end position with the help of a few commands.',
            result: this.result
        };
        return `\nFteen 1000 Simulator by ${header.author}\n\n${header.description}\n\nThe result is: ${header.result}`;
    }
}
exports.PoolCleaner = PoolCleaner;
