import { EntityEquippableComponent, EquipmentSlot } from "@minecraft/server";
import { HCFComponentManager } from "../manager";
import { HCFBlockComponents } from "./data";
export class HCFBlockComponentManager {
    static loadAll(data) {
        for (const comp of HCFBlockComponents) {
            const loaded = this.load(comp);
            data.blockComponentRegistry.registerCustomComponent(loaded.id, loaded.code);
        }
    }
    static load(component) {
        let data = { id: component.componentID, code: {} };
        const events = component.events;
        if (events.onTick) {
            const onTick = events.onTick;
            data.code.onTick = (evData) => {
                if (onTick.condition) {
                    if (onTick.condition.blockStates && this.matchBlockStates(evData.block.permutation, onTick.condition.blockStates)) {
                        HCFComponentManager.runBlock(evData, onTick.code, onTick.queue_commands, evData.block, undefined, onTick.setBlockStates);
                    }
                }
                else {
                    HCFComponentManager.runBlock(evData, onTick.code, onTick.queue_commands, evData.block, undefined, onTick.setBlockStates);
                }
            };
        }
        if (events.onRandomTick) {
            const onRandomTick = events.onRandomTick;
            data.code.onRandomTick = (evData) => {
                if (onRandomTick.condition) {
                    if (onRandomTick.condition.blockStates && this.matchBlockStates(evData.block.permutation, onRandomTick.condition.blockStates)) {
                        HCFComponentManager.runBlock(evData, onRandomTick.code, onRandomTick.queue_commands, evData.block, undefined, onRandomTick.setBlockStates);
                    }
                }
                else {
                    HCFComponentManager.runBlock(evData, onRandomTick.code, onRandomTick.queue_commands, evData.block, undefined, onRandomTick.setBlockStates);
                }
            };
        }
        if (events.onStepOn) {
            const onStepOn = events.onStepOn;
            data.code.onStepOn = (evData) => {
                let run = true;
                if (onStepOn.condition) {
                    if (onStepOn.condition.entityID && evData.entity?.typeId != onStepOn.condition.entityID)
                        run = false;
                    if (onStepOn.condition.hasFamily && evData.entity?.dimension.getEntities({ type: evData.entity?.typeId, maxDistance: 0.1, location: evData.entity?.location, closest: 1, families: [onStepOn.condition.hasFamily] })[0] == undefined)
                        run = false;
                    if (onStepOn.condition.blockStates && !this.matchBlockStates(evData.block.permutation, onStepOn.condition.blockStates))
                        run = false;
                }
                if (run)
                    HCFComponentManager.runBlock(evData, onStepOn.code, onStepOn.queue_commands, evData.block, evData.entity, onStepOn.setBlockStates);
            };
        }
        if (events.onStepOff) {
            const onStepOff = events.onStepOff;
            data.code.onStepOff = (evData) => {
                let run = true;
                if (onStepOff.condition) {
                    if (onStepOff.condition.entityID && evData.entity?.typeId != onStepOff.condition.entityID)
                        run = false;
                    if (onStepOff.condition.hasFamily && evData.entity?.dimension.getEntities({ type: evData.entity?.typeId, maxDistance: 0.1, location: evData.entity?.location, closest: 1, families: [onStepOff.condition.hasFamily] })[0] == undefined)
                        run = false;
                    if (onStepOff.condition.blockStates && !this.matchBlockStates(evData.block.permutation, onStepOff.condition.blockStates))
                        run = false;
                }
                if (run)
                    HCFComponentManager.runBlock(evData, onStepOff.code, onStepOff.queue_commands, evData.block, evData.entity, onStepOff.setBlockStates);
            };
        }
        if (events.onEntityFallOn) {
            const onEntityFallOn = events.onEntityFallOn;
            data.code.onEntityFallOn = (evData) => {
                let run = true;
                if (onEntityFallOn.condition) {
                    if (onEntityFallOn.condition.entityID && evData.entity?.typeId != onEntityFallOn.condition.entityID)
                        run = false;
                    if (onEntityFallOn.condition.hasFamily && evData.entity?.dimension.getEntities({ type: evData.entity?.typeId, maxDistance: 0.1, location: evData.entity?.location, closest: 1, families: [onEntityFallOn.condition.hasFamily] })[0] == undefined)
                        run = false;
                    if (onEntityFallOn.condition.blockStates && !this.matchBlockStates(evData.block.permutation, onEntityFallOn.condition.blockStates))
                        run = false;
                }
                if (run)
                    HCFComponentManager.runBlock(evData, onEntityFallOn.code, onEntityFallOn.queue_commands, evData.block, evData.entity, onEntityFallOn.setBlockStates);
            };
        }
        if (events.onPlayerInteract) {
            const onPlayerInteract = events.onPlayerInteract;
            data.code.onPlayerInteract = (evData) => {
                const player = evData.player;
                let run = true;
                if (onPlayerInteract.condition) {
                    if (onPlayerInteract.condition.holdingItem) {
                        const mainhand = player?.getComponent(EntityEquippableComponent.componentId)?.getEquipmentSlot(EquipmentSlot.Mainhand);
                        if (!mainhand)
                            run = false;
                        if (mainhand?.getItem()?.typeId != onPlayerInteract.condition.holdingItem)
                            run = false;
                    }
                    if (onPlayerInteract.condition.blockStates && !this.matchBlockStates(evData.block.permutation, onPlayerInteract.condition.blockStates))
                        run = false;
                }
                if (run)
                    HCFComponentManager.runBlock(evData, onPlayerInteract.code, onPlayerInteract.queue_commands, evData.block, player, onPlayerInteract.setBlockStates);
            };
        }
        if (events.onPlayerDestroy) {
            const onPlayerDestroy = events.onPlayerDestroy;
            data.code.onPlayerDestroy = (evData) => {
                const player = evData.player;
                let run = true;
                if (onPlayerDestroy.condition) {
                    if (onPlayerDestroy.condition.blockStates && !this.matchBlockStates(evData.destroyedBlockPermutation, onPlayerDestroy.condition.blockStates))
                        run = false;
                }
                if (run)
                    HCFComponentManager.runBlock(evData, onPlayerDestroy.code, onPlayerDestroy.queue_commands, evData.block, player, onPlayerDestroy.setBlockStates);
            };
        }
        if (events.onPlace) {
            const onPlace = events.onPlace;
            data.code.onPlace = (evData) => {
                let run = true;
                if (onPlace.condition) {
                    if (onPlace.condition.lastBlockID !== evData.previousBlock.type.id)
                        run = false;
                }
                if (run)
                    HCFComponentManager.runBlock(evData, onPlace.code, onPlace.queue_commands, evData.block, undefined, onPlace.setBlockStates);
            };
        }
        return data;
    }
    static matchBlockStates(permutation, states) {
        let bool = true;
        for (const state of states) {
            if (permutation.getState(state.stateID) !== state.value)
                bool = false;
        }
        return bool;
    }
    static setStates(block, states) {
        for (const state of states) {
            block.setPermutation(block.permutation.withState(state.stateID, state.value));
        }
    }
}
