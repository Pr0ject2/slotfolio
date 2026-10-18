import copy from "../src/lib/english-catalog-complete-batch02.json" with { type: "json" };
import { completeCatalogBatchTests } from "./english-catalog-complete-helpers";

completeCatalogBatchTests(2, copy);
