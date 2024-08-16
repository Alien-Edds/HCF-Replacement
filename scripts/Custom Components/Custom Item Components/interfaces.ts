import { ItemComponentCompleteUseEvent, ItemComponentConsumeEvent, ItemComponentHitEntityEvent, ItemComponentMineBlockEvent, ItemComponentUseEvent, ItemComponentUseOnEvent } from "@minecraft/server"
import { HCFQueueCommands, QueueCommands } from "../interfaces"

export interface HCFItemComponent{
    componentID: string,
    events: {
        /**
         * @remarks
         * An event for when the item is used.
         */
        onUse?: {
            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: ItemComponentUseEvent) => void,
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
             * If set to true, it will reduce the durability of the item when succesfully ran.
             */
            reduceDurability?: boolean,
            /**
             * @remarks
             * If set to true, it will reduce the stack size of the item when succesfully ran.
             */
            reduceStack?: boolean
        },
        /**
         * @remarks
         * An event for when the item is used on a block.
         */
        onUseOn?: {
            /**
             * @remarks
             * Adding this will only make this run if this returns true.
             */
            condition?: {
                blockID: string
            },
            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: ItemComponentUseOnEvent) => void,
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
             * If set to true, it will reduce the durability of the item when succesfully ran.
             */
            reduceDurability?: boolean,
            /**
             * @remarks
             * If set to true, it will reduce the stack size of the item when succesfully ran.
             */
            reduceStack?: boolean
        },
        /**
         * @remarks
         * An event for when the player mines a block with the item.
         */
        onMineBlock?: {
            /**
             * @remarks
             * Adding this will only make this run if this returns true.
             */
            condition?: {
                blockID: string
            },
            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: ItemComponentMineBlockEvent) => void,
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
             * If set to true, it will reduce the durability of the item when succesfully ran.
             */
            reduceDurability?: boolean,
            /**
             * @remarks
             * If set to true, it will reduce the stack size of the item when succesfully ran.
             */
            reduceStack?: boolean
        },
        /**
         * @remarks
         * An event for when the player hits another entity with this item.
         */
        onHitEntity?: {
            /**
             * @remarks
             * Adding this will only make this run if this returns true.
             */
            condition?: {
                entityID?: string,
                hasFamily?: string
            },
            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: ItemComponentHitEntityEvent) => void,
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
             * If set to true, it will reduce the stack size of the item when succesfully ran.
             */
            reduceStack?: boolean
        },
        /**
         * @remarks
         * An event for when this item is consumed.
         */
        onConsume?: {
            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: ItemComponentConsumeEvent) => void,
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
             * If set to true, it will reduce the durability of the item when succesfully ran.
             */
            reduceDurability?: boolean,
            /**
             * @remarks
             * If set to true, it will reduce the stack size of the item when succesfully ran.
             */
            reduceStack?: boolean,
            /**
             * @remarks
             * If set to true, disables the item check that normally prevents items from being swapped to other items.
             */
            ignoreItemCheck: boolean
        },
        /**
         * @remarks
         * An event for when this item is completely used.
         */
        onCompleteUse?: {
            /**
             * 
             * @remarks
             * An option to run normal scripting code.
             */
            code?: (data: ItemComponentCompleteUseEvent) => void,
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
             * If set to true, it will reduce the durability of the item when succesfully ran.
             */
            reduceDurability?: boolean,
            /**
             * @remarks
             * If set to true, it will reduce the stack size of the item when succesfully ran.
             */
            reduceStack?: boolean,
            /**
             * @remarks
             * If set to true, disables the item check that normally prevents items from being swapped to other items.
             */
            ignoreItemCheck: boolean
        },
    }
}