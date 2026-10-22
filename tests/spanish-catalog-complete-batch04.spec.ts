import batch from "../src/lib/spanish-catalog-complete-batch04.json" with { type: "json" };
import { completeSpanishCatalogBatchTests } from "./spanish-catalog-complete-helpers";

completeSpanishCatalogBatchTests(4, batch);
