import { Block, ContainerSlot, Entity, ItemStack, Player, WorldInitializeBeforeEvent } from "@minecraft/server";
import { CommandTarget, HCFQueueCommands, QueueCommands } from "./interfaces";
import { HCFItemComponentManager } from "./Custom Item Components/manager";
import { HCFBlockComponentManager } from "./Custom Block Components/manager";
import { HCFSetBlockState } from "./Custom Block Components/interfaces";

export class HCFComponentManager{
    static runItem(evData: any, code: ((args: any) => void) | undefined, queueCommands: HCFQueueCommands | undefined, reduceDurability: boolean | undefined, reduceStackSize: boolean | undefined, mainhand: ContainerSlot, item: ItemStack | undefined, source: Player, entity: Entity | undefined, block: Block | undefined): void {
        if (code) code(evData)
        if (queueCommands) HCFComponentManager.runQueueCommands(queueCommands, source, entity, block)
        if (item && reduceDurability) mainhand.setItem(HCFItemComponentManager.reduceDurability(item, source))
        if (item && reduceStackSize) mainhand.setItem(HCFItemComponentManager.reduceStackSize(item))
    }

    static runBlock(evData: any, code: ((args: any) => void) | undefined, queueCommands: HCFQueueCommands | undefined, block: Block, entity: Entity | undefined, states: HCFSetBlockState[] | undefined): void {
        if (code) code(evData)
        if (queueCommands) this.runQueueCommands(queueCommands, undefined, entity, block)
        if (states) for (const state of states) block.setPermutation(block.permutation.withState(state.stateID, state.value))

    }

    private static runQueueCommands(data: HCFQueueCommands, source: Player | undefined, entity: Entity | undefined, block: Block | undefined): void {
        if (data.simple) {
            this.runCommands(data.simple.commands, data.simple.target, source, entity, block)
        } else if (data.advanced) {
            for (const input of data.advanced) {
                this.runCommands(input.commands, input.target, source, entity, block)
            }
        }
    }

    private static runCommands(commands: string[], target: CommandTarget | undefined, source: Player | undefined, entity: Entity | undefined, block: Block | undefined): void {

        if ((target == CommandTarget.Source || target == undefined) && source) {
            if (!source.isValid()) return
            for (const command of commands) {
                source.runCommand(command)
            }
        } else if ((target == CommandTarget.Block || target == undefined) && block) {
            const center = block.center()
            const dimension = block.dimension
            for (const command of commands) {
                dimension.runCommand(`execute positioned ${center.x} ${center.y} ${center.z} run ${command}`)
            }
        } else if (target == CommandTarget.Entity && entity) {
            if (!entity.isValid()) return
            for (const command of commands) {
                entity.runCommand(command)
            }
        }
    }

    static loadAll(data: WorldInitializeBeforeEvent): void {
        HCFItemComponentManager.loadAll(data)
        HCFBlockComponentManager.loadAll(data)
    }

}