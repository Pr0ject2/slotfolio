import copy from "../src/lib/english-catalog-complete-batch09.json" with { type: "json" };
import { completeCatalogBatchTests } from "./english-catalog-complete-helpers";

completeCatalogBatchTests(9, copy);
