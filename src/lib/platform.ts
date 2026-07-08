import { platformModules } from "@/modules";

export function getPlatformModules() {
  return platformModules;
}

export function getReusablePlatformModules() {
  return platformModules.filter((module) => !module.collectionSpecific);
}
