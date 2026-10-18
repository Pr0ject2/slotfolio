import copy from "../src/lib/english-catalog-complete-batch05.json" with { type: "json" };
import { completeCatalogBatchTests } from "./english-catalog-complete-helpers";

completeCatalogBatchTests(5, copy);
