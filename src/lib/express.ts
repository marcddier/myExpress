import * as http from 'http'
import { existsSync, readFileSync } from 'fs';
import { join } from 'path'

interface EmptyCallback {

}

export interface MyHttpResponse extends http.ServerResponse {
	json: (item: any) => void,
	send: (item: string) => void,
}

export interface MyHttpRequest {
	json: (item: any) => void
}

class Express {

  [x: string]: any;
  private server: any;
  private routes: any = {};

  private readonly WWW_DIRECTORY: string = 'www'
  private readonly TEMPLATE_PAGE_DIRECTORY: string = `pages`;
	private readonly TEMPLATE_EXTENSION: string = `.html.mustache`;

  constructor() {
    this._initialize()
  }

  private _initialize () {
    for (const method of ['GET', 'POST', 'PUT', 'DELETE']) {
      this.routes[method] = []
      this[method.toLowerCase()] = (url: string, callback: any) => {
        this.routes[method].push({url, callback})
      }
    }
    this.server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {
      const { method, url } = req

      if (!method || !url) {
        return
      }
      const response = this.handleResponse(res)
      const route = this.routes[method].find((item: {url: string}) => item.url === url);
      if (!route) {
        response.statusCode = 404
        response.end()
        return
      }
      route.callback(req, response)
    })
  }

  listen(port: number, callback: EmptyCallback): void {
    this.server.listen(port, callback)
  }

  handleResponse(res: http.ServerResponse): MyHttpResponse {
    let response: MyHttpResponse = res as MyHttpResponse
    response.json = (item: any) => {
      res.setHeader("Content-Type", "application/json")
      res.write(JSON.stringify(item))
      res.end()
    }
    response.send = (content: string): void => {
      res.setHeader("Content-Type", "text/html")
      res.write(content)
      res.end()
    }
    return response // destructure res
    // return Object.assign({}, {json}, res) // mets json dans le premier puis res dans le premier
  }

  render(fileName: string, values: any, callback: (error: Error | null, html: string | null) => void) {
    const pathName = join(process.cwd(), this.WWW_DIRECTORY, this.TEMPLATE_PAGE_DIRECTORY, `${fileName}${this.TEMPLATE_EXTENSION}`)
    if (!existsSync(pathName)) {
      callback(new Error(`404 Pages ${fileName} doesn't exist`), null);
      return;
    }
    const content = readFileSync(pathName, 'utf-8');
    const mustaches = content.replace(/{{(\w+)( ?[|] ?)?(\w+)?}}/gi, (item: string, ...args: any[]): string => {
      if (!values) {
        return 'undefined';
      }
      const [key, pipe, transform] = args
      const v = values[key]
      if (!v) {
        return 'undefined';
      }
      if (pipe && transform)  {
        const func = this[`_${transform}`];
        if (func) {
          return func(v);
        }
      }
      return v;
    })
    callback(null, mustaches)
  }

  private _upper(str: string): string {
    return str.toUpperCase()
  }

  private _lower(str: string): string {
    return str.toLowerCase()
  }
}

export default () => new Express()
