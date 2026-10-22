import batch from "../src/lib/spanish-catalog-complete-batch09.json" with { type: "json" };
import { completeSpanishCatalogBatchTests } from "./spanish-catalog-complete-helpers";

completeSpanishCatalogBatchTests(9, batch);
