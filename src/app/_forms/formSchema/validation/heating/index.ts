import {  z } from "zod";
import heating from "./raw";

import fioul from "./fioul";
import gasTank from "./gasTank";
import woodCharcoal from "./woodCharcoal";

  const output = z.preprocess((input, ctx)=>{

    fioul(input, ctx);
    gasTank(input, ctx);
    woodCharcoal(input, ctx, 'wood');
    woodCharcoal(input, ctx, 'charcoal');
    return input;
  }, heating);
  
  

  export default output;