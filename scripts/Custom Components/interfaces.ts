import { BlockCustomComponent, ItemCustomComponent } from "@minecraft/server";

export enum CommandTarget{
    Source = "source",
    Block = "block",
    Entity = "entity"
}

export interface QueueCommands{
    target?: CommandTarget
    commands: string[]
}

export interface HCFQueueCommands{
    /**
     * @example
     * 
     * {
     * 
     *  target: "source",
     * 
     *  commands: [
     *      "say test source"
     *  ]
     * 
     * }
     */
    simple?: QueueCommands,
    /**
     * @example
     * 
     * [
     *  {
     * 
     *      target: "source",
     * 
     *      commands: [
     *          "say test source"
     *      ]
     * 
     *  },
     *  {
     *      target: "block",
     *      
     *      commands: [
     *          "say test block"    
     *      ]
     *  }
     * ]
     */
    advanced?: QueueCommands[]
}