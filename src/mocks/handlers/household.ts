import { http, HttpResponse } from "msw";
import makes from "@/mocks/data/makes.json";
import models from "@/mocks/data/models.json";
import airports from "@/mocks/data/airports.json";
import result from "@/mocks/data/result.json";

const serverUrl = process.env.NEXT_PUBLIC_SERVER;

export const householdHandlers = [
  http.get(`${serverUrl}/api/carbon-footprint/forms/cars/makes`, () => HttpResponse.json(makes)),
  http.get(`${serverUrl}/api/carbon-footprint/forms/cars/models`, ({ request }) => {
    const make = new URL(request.url).searchParams.get("make");
    return HttpResponse.json(models[make as keyof typeof models] || []);
  }),
  http.post(`${serverUrl}/api/carbon-footprint/forms/basic`, () =>
    HttpResponse.json({ id: 1, result })
  ),
  http.get(`${serverUrl}/api/carbon-footprint/responses/uid/:id`, () => HttpResponse.json(result)),
  http.get(`${serverUrl}/api/carbon-footprint/forms/airports`, () => HttpResponse.json(airports)),
];
