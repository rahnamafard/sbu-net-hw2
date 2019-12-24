const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require("cors");
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

let forms;
if (forms === undefined) {
    console.log('reading new info');
    fs.readFile(`${__dirname}/formDescriptors.json`, (err, data) => {
        if (err) throw err;

        forms = JSON.parse(data);
    })
}


app.get('/api/forms/:uid', (req, res) => {
    let request_id = req.params.uid;

    Array.prototype.forEach.call(forms.forms, element => {
        let id = element.id;
        let title = element.title;
        let url = "/form/" + id;
        if (id === request_id) {
            res.send(element);
        }

    });

    //res.send({});
})

app.get('/api/forms', (req, res) => {
    console.log("/getforms called");
    let results = { forms: [] };

    Array.prototype.forEach.call(forms.forms, element => {
        let id = element.id;
        let title = element.title;
        let url = "/form/" + id;
        results.forms.push({ id, title, url });
    });

    res.send(results);
})


app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`));

