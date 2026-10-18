import copy from "../src/lib/english-catalog-complete-batch04.json" with { type: "json" };
import { completeCatalogBatchTests } from "./english-catalog-complete-helpers";

completeCatalogBatchTests(4, copy);
