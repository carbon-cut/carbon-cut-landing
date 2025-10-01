import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.get(`http://localhost:1337/api/carbon-footprint/forms/cars/makes`, () => {
    return HttpResponse.json([
        {model: 'Model S', make: 'Tesla'},
        {model: 'Model 3', make: 'Tesla'},
        {model: 'Model X', make: 'Tesla'},
    ])
  }),
]