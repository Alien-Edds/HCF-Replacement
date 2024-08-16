import { BlockComponentEntityFallOnEvent, BlockComponentPlayerDestroyEvent, BlockComponentPlayerInteractEvent, BlockComponentStepOffEvent, BlockComponentStepOnEvent, BlockComponentTickEvent, BlockCustomComponent } from "@minecraft/server";
import { HCFQueueCommands } from "../interfaces";

export interface HCFSetBlockState{
    stateID: string,
    value: any
}

export interface HCFMatchesBlockState{
    stateID: string,
    value: any
}

export interface HCFBlockComponent {
    componentID: string,
    events: {
        /**
         * @remarks
         * An event for when the block ticks with the 'minecraft:tick' component.
         */
        onTick?: {
            /**
             * @remarks
             * Adding this will only make this run if this returns true.
             */
            condition?: {
                blockStates?: HCFMatchesBlockState[]
            }

            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: BlockComponentTickEvent) => void,
            /**
             * @remarks
             * Warning: Unstable
             * 
             * depending on what commands you enter, it may crash the game.
             * 
             * 
             */
            queue_commands?: HCFQueueCommands,
            /**
             * @remarks
             * 
             */
            setBlockStates?: HCFSetBlockState[]

        },
        /**
         * @remarks
         * An event for when the block ticks with the 'minecraft:random_tick' component.
         */
        onRandomTick?: {
            /**
             * @remarks
             * Adding this will only make this run if this returns true.
             */
            condition?: {
                blockStates?: HCFMatchesBlockState[]
            }

            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: BlockComponentTickEvent) => void,
            /**
             * @remarks
             * Warning: Unstable
             * 
             * depending on what commands you enter, it may crash the game.
             * 
             * 
             */
            queue_commands?: HCFQueueCommands,
            /**
             * @remarks
             * 
             */
            setBlockStates?: HCFSetBlockState[]

        },
        /**
         * @remarks
         * An event for when an entity steps on this block.
         */
        onStepOn?: {
            /**
             * @remarks
             * Adding this will only make this run if this returns true.
             */
            condition?: {
                entityID?: string,
                hasFamily?: string,
                blockStates?: HCFMatchesBlockState[]
            }

            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: BlockComponentStepOnEvent) => void,
            /**
             * @remarks
             * Warning: Unstable
             * 
             * depending on what commands you enter, it may crash the game.
             * 
             * 
             */
            queue_commands?: HCFQueueCommands,
            /**
             * @remarks
             * 
             */
            setBlockStates?: HCFSetBlockState[]

        },
        /**
         * @remarks
         * An event for when an entity steps off of this block.
         */
        onStepOff?: {
            /**
             * @remarks
             * Adding this will only make this run if this returns true.
             */
            condition?: {
                entityID?: string,
                hasFamily?: string,
                blockStates?: HCFMatchesBlockState[]
            }

            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: BlockComponentStepOffEvent) => void,
            /**
             * @remarks
             * Warning: Unstable
             * 
             * depending on what commands you enter, it may crash the game.
             * 
             * 
             */
            queue_commands?: HCFQueueCommands,
            /**
             * @remarks
             * 
             */
            setBlockStates?: HCFSetBlockState[]

        },
        /**
         * @remarks
         * An event for when an entity falls on this block.
         */
        onEntityFallOn?: {
            /**
             * @remarks
             * Adding this will only make this run if this returns true.
             */
            condition?: {
                entityID?: string,
                hasFamily?: string,
                blockStates?: HCFMatchesBlockState[]
            }

            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: BlockComponentEntityFallOnEvent) => void,
            /**
             * @remarks
             * Warning: Unstable
             * 
             * depending on what commands you enter, it may crash the game.
             * 
             * 
             */
            queue_commands?: HCFQueueCommands,
            /**
             * @remarks
             * 
             */
            setBlockStates?: HCFSetBlockState[]

        },
        /**
         * @remarks
         * An event that runs when a player interacts with this block.
         */
        onPlayerInteract?: {
            /**
             * @remarks
             * Adding this will only make this run if this returns true.
             */
            condition?: {
                holdingItem?: string,
                blockStates?: HCFMatchesBlockState[]
            }

            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: BlockComponentPlayerInteractEvent) => void,
            /**
             * @remarks
             * Warning: Unstable
             * 
             * depending on what commands you enter, it may crash the game.
             * 
             * 
             */
            queue_commands?: HCFQueueCommands,
            /**
             * @remarks
             * Set block states when this is succesfully ran.
             */
            setBlockStates?: HCFSetBlockState[]
        },
        /**
         * @remarks
         * An event that runs when this block is broken by a player.
         */
        onPlayerDestroy?: {
            /**
             * @remarks
             * Adding this will only make this run if this returns true.
             */
            condition?: {
                blockStates?: HCFMatchesBlockState[]
            }

            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: BlockComponentPlayerDestroyEvent) => void,
            /**
             * @remarks
             * Warning: Unstable
             * 
             * depending on what commands you enter, it may crash the game.
             * 
             * 
             */
            queue_commands?: HCFQueueCommands,
            /**
             * @remarks
             * Set block states when this is succesfully ran.
             */
            setBlockStates?: HCFSetBlockState[]
        },
        /**
         * @remarks
         * An event that runs when this block is placed.
         */
        onPlace?: {
            /**
             * @remarks
             * Adding this will only make this run if this returns true.
             */
            condition?: {
                lastBlockID: string
            }

            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: BlockComponentPlayerDestroyEvent) => void,
            /**
             * @remarks
             * Warning: Unstable
             * 
             * depending on what commands you enter, it may crash the game.
             * 
             * 
             */
            queue_commands?: HCFQueueCommands,
            /**
             * @remarks
             * Set block states when this is succesfully ran.
             */
            setBlockStates?: HCFSetBlockState[]
        }
    }
}

const test: BlockCustomComponent = {

}