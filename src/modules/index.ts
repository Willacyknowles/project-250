import { aiFrameworkModule } from "@/modules/ai-framework";
import { caseFileEngineModule } from "@/modules/case-file-engine";
import { collectionsModule } from "@/modules/collections";
import { evidenceEngineModule } from "@/modules/evidence-engine";
import { investigationEngineModule } from "@/modules/investigation-engine";
import { knowledgeGraphModule } from "@/modules/knowledge-graph";
import { publicExperienceModule } from "@/modules/public-experience";
import { searchEngineModule } from "@/modules/search-engine";

export const platformModules = [
  investigationEngineModule,
  caseFileEngineModule,
  evidenceEngineModule,
  knowledgeGraphModule,
  aiFrameworkModule,
  searchEngineModule,
  publicExperienceModule,
  collectionsModule,
] as const;

export {
  aiFrameworkModule,
  caseFileEngineModule,
  collectionsModule,
  evidenceEngineModule,
  investigationEngineModule,
  knowledgeGraphModule,
  publicExperienceModule,
  searchEngineModule,
};
