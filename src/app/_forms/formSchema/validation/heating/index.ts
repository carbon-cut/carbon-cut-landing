import {  z } from "zod";
import heating from "./raw";

import fioul from "./fioul";
import gasTank from "./gasTank";
import woodCharcoal from "./woodCharcoal";
import Gpl from "./gpl";

  const output = z.preprocess((input, ctx)=>{

    fioul(input, ctx);
    gasTank(input, ctx);
    woodCharcoal(input, ctx, 'wood');
    woodCharcoal(input, ctx, 'charcoal');
    Gpl(input, ctx);
    return input;
  }, heating);
  
  

  export default output;