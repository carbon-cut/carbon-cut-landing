import { http, HttpResponse } from "msw";
import makes from "./data/makes.json";
import models from "./data/models.json";
import airports from "./data/airports.json";
import result from "./data/result.json";

export const handlers = [
  http.get(`http://localhost:1337/api/carbon-footprint/forms/cars/makes`, () => {
    return HttpResponse.json(makes);
  }),
  http.get(
    `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/cars/models`,
    ({ request }) => {
      const url = new URL(request.url);

      const make = url.searchParams.get("make");

      const output = models[make as keyof typeof models] || [];
      return HttpResponse.json(output);
    }
  ),
  http.post(`${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/basic`, () => {
    return HttpResponse.json({ id: 1, result: result });
  }),
  http.get(
    `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/responses/uid/:id`,
    ({ params }) => {
      return HttpResponse.json(result);
    }
  ),
  http.get(`${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/airports`, () => {
    return HttpResponse.json(airports);
  }),
];
