import { ContainerSlot, EntityEquippableComponent, EquipmentSlot, ItemCustomComponent, ItemDurabilityComponent, ItemEnchantableComponent, ItemStack, Player, world, WorldInitializeBeforeEvent } from "@minecraft/server";
import { HCFItemComponent } from "./interfaces";
import { HCFComponentManager } from "../manager";
import { HCFItemComponents } from "./data";

export class HCFItemComponentManager {
    static loadAll(data: WorldInitializeBeforeEvent): void {
        for (const comp of HCFItemComponents) {
            const loaded = this.load(comp)
            data.itemComponentRegistry.registerCustomComponent(loaded.id, loaded.code)
        }
    }
    static load(component: HCFItemComponent): { id: string, code: ItemCustomComponent } {
        let data: { id: string, code: ItemCustomComponent } = { id: component.componentID, code: {} }
        const events = component.events
        if (events.onUse) {
            const onUse = events.onUse
            data.code.onUse = (evData) => {
                const mainhand = this.getMainHand(evData.source)
                if (!mainhand) return
                const item = mainhand.getItem()
                if (!item || item.typeId != evData.itemStack?.typeId) return
                HCFComponentManager.runItem(evData, onUse.code, onUse.queue_commands, onUse.reduceDurability, onUse.reduceStack, mainhand, item, evData.source, undefined, undefined)
            }
        }
        if (events.onUseOn) {
            const onUseOn = events.onUseOn
            data.code.onUseOn = (evData) => {
                const player = evData.source as Player
                const mainhand = this.getMainHand(player)
                if (!mainhand) return
                const item = mainhand.getItem()
                if (!item || item.typeId != evData.itemStack?.typeId) return
                if (onUseOn.condition) {
                    if (evData.block.typeId == onUseOn.condition.blockID) {
                        HCFComponentManager.runItem(evData, onUseOn.code, onUseOn.queue_commands, onUseOn.reduceDurability, onUseOn.reduceStack, mainhand, item, player, undefined, evData.block)
                    }
                } else {
                    HCFComponentManager.runItem(evData, onUseOn.code, onUseOn.queue_commands, onUseOn.reduceDurability, onUseOn.reduceStack, mainhand, item, player, undefined, evData.block)
                }
            }
        }
        if (events.onMineBlock) {
            const onMineBlock = events.onMineBlock
            data.code.onMineBlock = (evData) => {
                const player = evData.source as Player
                const mainhand = this.getMainHand(player)
                if (!mainhand) return
                const item = mainhand.getItem()
                if (!item || item.typeId != evData.itemStack?.typeId) return
                if (onMineBlock.condition) {
                    if (evData.minedBlockPermutation.type.id == onMineBlock.condition.blockID) {
                        HCFComponentManager.runItem(evData, onMineBlock.code, onMineBlock.queue_commands, onMineBlock.reduceDurability, onMineBlock.reduceStack, mainhand, item, player, undefined, evData.block)
                    }
                } else {
                    HCFComponentManager.runItem(evData, onMineBlock.code, onMineBlock.queue_commands, onMineBlock.reduceDurability, onMineBlock.reduceStack, mainhand, item, player, undefined, evData.block)
                }
            }
        }
        if (events.onHitEntity) {
            const onHitEntity = events.onHitEntity
            data.code.onHitEntity = (evData) => {
                const player = evData.attackingEntity as Player
                const mainhand = this.getMainHand(player)
                if (!mainhand) return
                const item = mainhand.getItem()
                if (!item || item.typeId != evData.itemStack?.typeId) return
                if (onHitEntity.condition?.entityID) {
                    if (evData.hitEntity.typeId == onHitEntity.condition.entityID) {
                        if (onHitEntity.condition.hasFamily) {
                            if (evData.hitEntity.dimension.getEntities({type: evData.hitEntity.typeId, maxDistance: 0.1, location: evData.hitEntity.location, closest: 1, families: [onHitEntity.condition.hasFamily] })[0]) {
                                HCFComponentManager.runItem(evData, onHitEntity.code, onHitEntity.queue_commands, false, onHitEntity.reduceStack, mainhand, item, player, evData.hitEntity, undefined)
                            }
                        } else HCFComponentManager.runItem(evData, onHitEntity.code, onHitEntity.queue_commands, false, onHitEntity.reduceStack, mainhand, item, player, evData.hitEntity, undefined)
                    }
                } else if (onHitEntity.condition?.hasFamily) {
                    if (evData.hitEntity.dimension.getEntities({type: evData.hitEntity.typeId, maxDistance: 0.1, location: evData.hitEntity.location, closest: 1, families: [onHitEntity.condition.hasFamily] })[0]) {

                        if (onHitEntity.condition.entityID) {if (evData.hitEntity.typeId == onHitEntity.condition.entityID) HCFComponentManager.runItem(evData, onHitEntity.code, onHitEntity.queue_commands, false, onHitEntity.reduceStack, mainhand, item, player, evData.hitEntity, undefined) } else HCFComponentManager.runItem(evData, onHitEntity.code, onHitEntity.queue_commands, false, onHitEntity.reduceStack, mainhand, item, player, evData.hitEntity, undefined)
                    }
                } else {
                    HCFComponentManager.runItem(evData, onHitEntity.code, onHitEntity.queue_commands, false, onHitEntity.reduceStack, mainhand, item, player, evData.hitEntity, undefined)
                }
            }
        }
        if (events.onConsume) {
            const onConsume = events.onConsume
            data.code.onConsume = (evData) => {
                const mainhand = this.getMainHand(evData.source as Player)
                if (!mainhand) return
                const item = mainhand.getItem()
                if (onConsume.ignoreItemCheck) {
                    HCFComponentManager.runItem(evData, onConsume.code, onConsume.queue_commands, onConsume.reduceDurability, onConsume.reduceStack, mainhand, item, evData.source as Player, undefined, undefined)
                } else {
                    if (!item || item.typeId != evData.itemStack?.typeId) return
                    HCFComponentManager.runItem(evData, onConsume.code, onConsume.queue_commands, onConsume.reduceDurability, onConsume.reduceStack, mainhand, item, evData.source as Player, undefined, undefined)
                }
            }
        }
        if (events.onCompleteUse) {
            const onCompleteUse = events.onCompleteUse
            data.code.onCompleteUse = (evData) => {
                const mainhand = this.getMainHand(evData.source as Player)
                if (!mainhand) return
                const item = mainhand.getItem()
                if (onCompleteUse.ignoreItemCheck) {
                    HCFComponentManager.runItem(evData, onCompleteUse.code, onCompleteUse.queue_commands, onCompleteUse.reduceDurability, onCompleteUse.reduceStack, mainhand, item, evData.source as Player, undefined, undefined)
                } else {
                    if (!item || item.typeId != evData.itemStack?.typeId) return
                    HCFComponentManager.runItem(evData, onCompleteUse.code, onCompleteUse.queue_commands, onCompleteUse.reduceDurability, onCompleteUse.reduceStack, mainhand, item, evData.source as Player, undefined, undefined)
                }
            }
        }
        return data
    }
    static reduceStackSize(item: ItemStack): ItemStack | undefined {
        if (item.amount - 1 <= 0) {
            return undefined
        } else {
            item.amount = item.amount - 1
            return item
        }
    }
    static getMainHand(player: Player): ContainerSlot | undefined {
        const comp = player.getComponent(EntityEquippableComponent.componentId) as EntityEquippableComponent
        if (!comp) return
        return comp.getEquipmentSlot(EquipmentSlot.Mainhand)
    }
    static reduceDurability(item: ItemStack, player?: Player): ItemStack | undefined {
        const durComp = item.getComponent(ItemDurabilityComponent.componentId) as ItemDurabilityComponent
        if (!durComp) return item
        const unbreakingLevel: number | undefined = (item.getComponent(ItemEnchantableComponent.componentId) as ItemEnchantableComponent)?.getEnchantment("unbreaking")?.level
        if (!unbreakingLevel) {
            if (durComp.damage + 1 > durComp.maxDurability) {
                player?.playSound("random.break")
                return undefined
            } else {
                durComp.damage = durComp.damage + 1
                return item
            }
        } else {
            let chance = 20
            if (unbreakingLevel == 2) {
                chance = 26.7
            } else if (unbreakingLevel == 3) chance = 30
            const random = Math.random() * 100
            if (random > chance) {
                if (durComp.damage + 1 > durComp.maxDurability) {
                    player?.playSound("random.break")
                    return undefined
                } else {
                    durComp.damage = durComp.damage + 1
                    return item
                }
            }
        }
    }
}