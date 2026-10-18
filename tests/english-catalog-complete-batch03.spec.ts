import copy from "../src/lib/english-catalog-complete-batch03.json" with { type: "json" };
import { completeCatalogBatchTests } from "./english-catalog-complete-helpers";

completeCatalogBatchTests(3, copy);
