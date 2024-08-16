import { world } from "@minecraft/server";
import { HCFComponentManager } from "./Custom Components/manager";
world.beforeEvents.worldInitialize.subscribe((data) => {
    HCFComponentManager.loadAll(data);
});
