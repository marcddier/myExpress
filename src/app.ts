import myExpress from './myExpress';

const app = new myExpress();

app.get('/coucou', (req: any, res: any) => {
  res.write('coucou')
  res.end()
})

app.listen(4242);