import copy from "../src/lib/english-catalog-complete-batch08.json" with { type: "json" };
import { completeCatalogBatchTests } from "./english-catalog-complete-helpers";

completeCatalogBatchTests(8, copy);
