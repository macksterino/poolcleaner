declare type Direction = 'N' | 'E' | 'S' | 'W';
declare type Command = 'A' | 'L' | 'R';
export declare type Specification = {
    pool: {
        lengthX: number;
        lengthY: number;
    };
    initial: {
        direction: Direction;
        x: number;
        y: number;
    };
    commands: Array<Command>;
};
export declare class PoolCleaner {
    private readonly specification;
    private result;
    constructor(specification: Specification);
    private handleSpecification;
    private handleDirection;
    /**
     * Simulate the robot's movement and output the end position.
     */
    simulate(): string;
}
export {};
