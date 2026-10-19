import copy from "../src/lib/english-catalog-complete-batch07.json" with { type: "json" };
import { completeCatalogBatchTests } from "./english-catalog-complete-helpers";

completeCatalogBatchTests(7, copy);
