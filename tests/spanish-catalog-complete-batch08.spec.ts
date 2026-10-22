import batch from "../src/lib/spanish-catalog-complete-batch08.json" with { type: "json" };
import { completeSpanishCatalogBatchTests } from "./spanish-catalog-complete-helpers";

completeSpanishCatalogBatchTests(8, batch);
