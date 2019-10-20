import http, { IncomingMessage, ServerResponse } from 'http'

interface Route {
  method: string,
  path: string,
  callback: Function
}

class myExpress {
  private httpServer: (http.Server | null) = null;
  private routes: Route[] = [];

  listen (port: number): void {
    this.httpServer = http.createServer((req: IncomingMessage, res: ServerResponse) => {
      const {method, url} = req;
      
      const requestedRoute = this.routes.find((route) => {
        if (route.method === method && route.path === url) {
          return route
        }
        return undefined
      })

      if (requestedRoute) {
        requestedRoute.callback(req, res);
      } else {
        res.write(404);
        res.end();
      }
    }).listen(port)
  }

  get (path: string, callback: Function) {
    this.routes.push({ method: 'GET', path, callback})
  }
}

export default myExpress;

