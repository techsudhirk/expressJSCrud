const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
const courses = [
    {id : 1, name : 'course1'},
    {id : 2, name : 'course2'},
    {id : 3, name : 'course3'}
]
app.get('/', (req, res) => {
    res.send('hellosk!!!!');
    console.log("hi")
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
   const course = courses.find(c => parseInt(req.params.id) === c.id)
   if(!course) res.status(404).send('The course with given id doesn\'t exist'); 
   res.send(course);
})

app.get('/api/courses/:id/:name', (req, res) => {
    res.send(req.query);
})

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);
    console.log("result error: ",error);
    if(error){
        res.status(400).send(error);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name 
    }
    courses.push(course);
    res.send(courses);
})

app.put('/api/courses/:id', (req,res) =>{
    //Look up the course
    // If not existing, return 404
    const course = courses.find(c => parseInt(req.params.id) === c.id)
   if(!course) res.status(404).send('The course with given id doesn\'t exist'); 
    //Validate
    //If invalid, return 400- Bad request
    const result = validateCourse(req.body);
    const {error} = validateCourse(course);
    if(error){
        res.status(400).send(result.error);
    }
    //Update course
    //Return the updated course
    course.name = req.body.name;
    res.send(courses);
})

app.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(c => parseInt(req.params.id) === c.id)
    if(!course) res.status(404).send('The course with given id doesn\'t exist'); 

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

function validateCourse(course){
    console.log("course:",course)
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}
//PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})