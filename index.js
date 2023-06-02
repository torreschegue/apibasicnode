const express = require('express');
const { parse } = require('path');
const app = express();

app.use(express.json())

const students = [
    {id:1, name: 'Jose', age:21, email:'jose@test.com'},
    {id:2, name: 'Juan', age:23, email:'juan@test.com'},
    {id:3, name: 'Pedro', age:24, email:'pedro@test.com'}
]

app.get('/api/students', (req, res)=>{
    res.send(students)
})

app.get('/api/students/:id', (req, res)=>{
   const student = students.find(c => c.id === parseInt(req.params.id));
   if(!student)
    return res.status(404).json({mensaje: 'No encontrado'})
   else res.send(student)
})

app.post('/api/students', (req, res)=>{
    const student = {
        id: students.length+1,
        name: req.body.name, 
        age: parseInt(req.body.age),
        email: req.body.email
    };

    students.push(student);
    res.send(student);
})

app.delete('/api/students/:id', (req, res)=>{
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student)
     return res.status(404).json({mensaje: 'No encontrado'})

    const index = students.indexOf(student);
    students.splice(index,1);
    res.send(student);  
 })


const port = process.env.port || 80;
app.listen(port, ()=>  console.log(`Escuchando en el puerto ${port} ... `))