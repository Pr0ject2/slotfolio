import batch from "../src/lib/spanish-catalog-complete-batch06.json" with { type: "json" };
import { completeSpanishCatalogBatchTests } from "./spanish-catalog-complete-helpers";

completeSpanishCatalogBatchTests(6, batch);
