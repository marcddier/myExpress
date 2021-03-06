import express, { MyHttpRequest, MyHttpResponse } from './lib/express'

const app = express();
const port = 3000;

// Routes http
app.get('/', (req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('get');
})

app.get('/api', (req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('get API');
  res.json({hello :'From API'});
})

// app.get('/api/:magicNumber', (req: MyHttpRequest, res: MyHttpResponse) => {
//   const { magicNumber } = req.params
//   res.json({hello : `from api ${magicNumber}`});
// })

app.get('/hello/:id',(req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('serv')
  console.log(res)
  console.log(req)
})

app.get('/home', (req: MyHttpRequest, res: MyHttpResponse) => {
  const value = {
    firstname: "Moi",
    lastname: 'Toi',
    age: 34
  }
  app.render('home', value, (err: Error | null, html: string | null) => {
    if (err) {
      res.json({ error: err.message })
      return
    }
    res.send(html || '')
  })
})

app.post('/sign-up', (req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('post sign-up');
})

app.put('/update-login', (req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('update login');
})

app.delete('/delete-login', (req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('delete login');
})

app.listen(port,() => {
  console.log(`Server is listenning on ${port}`);
})
