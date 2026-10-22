import batch from "../src/lib/spanish-catalog-complete-batch03.json" with { type: "json" };
import { completeSpanishCatalogBatchTests } from "./spanish-catalog-complete-helpers";

completeSpanishCatalogBatchTests(3, batch);
