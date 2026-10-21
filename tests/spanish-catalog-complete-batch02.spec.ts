import batch from "../src/lib/spanish-catalog-complete-batch02.json" with { type: "json" };
import { completeSpanishCatalogBatchTests } from "./spanish-catalog-complete-helpers";

completeSpanishCatalogBatchTests(2, batch);
