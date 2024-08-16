import { world } from "@minecraft/server";
import { HCFBlockComponent } from "./interfaces";
import { CommandTarget } from "../interfaces";

export const HCFBlockComponents: HCFBlockComponent[] = [
    {
        componentID: "hcf:test_block_component",
        events: {
            onTick: {
                code: (data) => {
                    world.sendMessage(`<${data.block.typeId}> tick`)
                }
            },
            onRandomTick: {
                condition: {
                    blockStates: [
                        {
                            stateID: "hcf:state",
                            value: 0
                        }
                    ]
                },
                queue_commands: {
                    simple: {
                        commands: [
                            "say random tick"
                        ]
                    }
                },
                setBlockStates: [
                    {
                        stateID: "hcf:state",
                        value: 1
                    }
                ]
            },
            onEntityFallOn: {
                condition: {
                    hasFamily: "player"
                },
                queue_commands: {
                    simple: {
                        commands: [
                            "say fall on"
                        ]
                    }
                }
            },
            onStepOff: {
                condition: {
                    hasFamily: "player"
                },
                queue_commands: {
                    simple: {
                        target: CommandTarget.Entity,
                        commands: [
                            "say step off"
                        ]
                    }
                }
            },
            onStepOn: {
                condition: {
                    hasFamily: "player"
                },
                queue_commands: {
                    simple: {
                        commands: [
                            "say step on"
                        ]
                    }
                }
            },
            onPlayerInteract: {
                condition: {
                    holdingItem: "minecraft:apple"
                },
                queue_commands: {
                    simple: {
                        target: CommandTarget.Entity,
                        commands: [
                            "say interact with apple"
                        ]
                    }
                }
            },
            onPlayerDestroy: {
                condition: {
                    blockStates: [
                        {
                            stateID: "hcf:state1",
                            value: 1
                        }
                    ]
                },
                queue_commands: {
                    simple: {
                        target: CommandTarget.Entity,
                        commands: [
                            "say destroyed state1"
                        ]
                    }
                }
            },
            onPlace: {
                condition: {
                    lastBlockID: "minecraft:water"
                },
                queue_commands: {
                    simple: {
                        commands: [
                            "say placed in water source block"
                        ]
                    }
                }
            }
        }
    }
]