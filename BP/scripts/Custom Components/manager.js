import { CommandTarget } from "./interfaces";
import { HCFItemComponentManager } from "./Custom Item Components/manager";
import { HCFBlockComponentManager } from "./Custom Block Components/manager";
export class HCFComponentManager {
    static runItem(evData, code, queueCommands, reduceDurability, reduceStackSize, mainhand, item, source, entity, block) {
        if (code)
            code(evData);
        if (queueCommands)
            HCFComponentManager.runQueueCommands(queueCommands, source, entity, block);
        if (item && reduceDurability)
            mainhand.setItem(HCFItemComponentManager.reduceDurability(item, source));
        if (item && reduceStackSize)
            mainhand.setItem(HCFItemComponentManager.reduceStackSize(item));
    }
    static runBlock(evData, code, queueCommands, block, entity, states) {
        if (code)
            code(evData);
        if (queueCommands)
            this.runQueueCommands(queueCommands, undefined, entity, block);
        if (states)
            for (const state of states)
                block.setPermutation(block.permutation.withState(state.stateID, state.value));
    }
    static runQueueCommands(data, source, entity, block) {
        if (data.simple) {
            this.runCommands(data.simple.commands, data.simple.target, source, entity, block);
        }
        else if (data.advanced) {
            for (const input of data.advanced) {
                this.runCommands(input.commands, input.target, source, entity, block);
            }
        }
    }
    static runCommands(commands, target, source, entity, block) {
        if ((target == CommandTarget.Source || target == undefined) && source) {
            if (!source.isValid())
                return;
            for (const command of commands) {
                source.runCommand(command);
            }
        }
        else if ((target == CommandTarget.Block || target == undefined) && block) {
            const center = block.center();
            const dimension = block.dimension;
            for (const command of commands) {
                dimension.runCommand(`execute positioned ${center.x} ${center.y} ${center.z} run ${command}`);
            }
        }
        else if (target == CommandTarget.Entity && entity) {
            if (!entity.isValid())
                return;
            for (const command of commands) {
                entity.runCommand(command);
            }
        }
    }
    static loadAll(data) {
        HCFItemComponentManager.loadAll(data);
        HCFBlockComponentManager.loadAll(data);
    }
}
