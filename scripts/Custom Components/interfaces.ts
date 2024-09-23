import { BlockCustomComponent, ItemCustomComponent } from "@minecraft/server";

export enum CommandTarget{
    Source = "source",
    Block = "block",
    Entity = "entity"
}

export interface QueueCommands{
    /**
     * @remarks The command target.
     */
    target?: CommandTarget
    /**
     * @remarks The command(s) to run.
     */
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