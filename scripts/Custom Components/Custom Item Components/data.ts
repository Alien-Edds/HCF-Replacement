import { world } from "@minecraft/server";
import { CommandTarget } from "../interfaces";
import { HCFItemComponent } from "./interfaces";

export const HCFItemComponents: HCFItemComponent[] = [
    {
        componentID: "hcf:test_item_component",
        events: {
            onUse: {
                code: (data) => {
                    world.sendMessage(`${data.itemStack?.typeId} this is script code`)
                },
                queue_commands: {
                    simple: {
                        target: CommandTarget.Source,
                        commands: [
                            "say this is a command"
                        ]
                    }
                }
            },
            onUseOn: {
                condition: {
                    blockID: "minecraft:grass_block"
                },
                queue_commands: {
                    simple: {
                        target: CommandTarget.Block,
                        commands: [
                            "particle minecraft:cauldron_explosion_emitter ~~1~"
                        ]
                    }
                },
                reduceDurability: true
            },
            onMineBlock: {
                condition: {
                    blockID: "minecraft:stone"
                },
                queue_commands: {
                    advanced: [
                        {
                            target: CommandTarget.Source,
                            commands: [
                                "say player broke block"
                            ]
                        },
                        {
                            target: CommandTarget.Block,
                            commands: [
                                "particle minecraft:cauldron_explosion_emitter"
                            ]
                        }
                    ]
                }
            },
            onHitEntity: {
                queue_commands: {
                    simple: {
                        target: CommandTarget.Entity,
                        commands: [
                            "summon cow"
                        ]
                    }
                }
            },
            onConsume: {
                ignoreItemCheck: true,
                queue_commands: {
                    simple: {
                        commands: [
                            "say eaten"
                        ]
                    }
                }
            },
            onCompleteUse: {
                ignoreItemCheck: true,
                queue_commands: {
                    simple: {
                        commands: [
                            "say completely used"
                        ]
                    }
                }
            }
        }
    }
]