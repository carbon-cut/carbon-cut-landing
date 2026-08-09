import { z } from "zod";
import heating from "./raw";

import fioul from "./fioul";
import gasTank from "./gasTank";
import charcoal from "./charcoal";
import wood from "./wood";
import Gpl from "./gpl";
import heatingBill from "./heatingNetwork";

const output = z.preprocess((input, ctx) => {
  fioul(input, ctx);
  gasTank(input, ctx);
  wood(input, ctx);
  charcoal(input, ctx);
  Gpl(input, ctx);
  heatingBill(input, ctx);
  return input;
}, heating);

export default output;
