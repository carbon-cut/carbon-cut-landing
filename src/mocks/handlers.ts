import { http, HttpResponse } from 'msw'
import makes from "./data/makes.json"
import models from "./data/models.json"

export const handlers = [
  http.get(`http://localhost:1337/api/carbon-footprint/forms/cars/makes`, () => {
    return HttpResponse.json(makes)
  }),
  http.get(`${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/cars/models`, ({request}) => {
    const url = new URL(request.url)

    const make = url.searchParams.get('make')
    
    const output = models[make as keyof typeof models] || []
    console.log("mocked result:", output)
    return HttpResponse.json(output)
  }),
]