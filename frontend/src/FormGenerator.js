import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
//import schemaMaker from './SchemaConverter';
import Form from "react-jsonschema-form";

//import { GoogleMap } from "react-google-maps"

function type_finder(raw_type) {
    switch (raw_type) {
        case "Text":
            return { type: "string" };

        case "Number":
            return { type: "number" };


        case "Date":
            return {
                type: "string",
                format: "date"
            };

        case "Location":
            return { type: "string" };

        default:
            return {type: raw_type}
    }

}

function schemaMaker(raw_json) {
    let output_schema = {};
    output_schema.required = [];
    output_schema.properties = {}
    output_schema.title = raw_json.title;
    output_schema.id = raw_json.id;
    output_schema.type = "object";
    for (const element of raw_json.fields) {
        if (element.required === true) {
            output_schema.required.push(element.name);
        }
        output_schema.properties[element.name] = {};
        let type_vars = type_finder(element.type);
        for (let key in type_vars) {
            output_schema.properties[element.name][key] = type_vars[key];
        }
        output_schema.properties[element.name].title = element.title;
    }
    return output_schema;
}
let input = '{ "title":"A smaple form" , "id" : "1234" , "fields" : [ { "name":"First_Name" , "title" : "First Name" , "type" : "Date", "required":true } , { "name":"Loc" , "title" : "Your Location" , "type" : "Location", "required":false } , { "name":"Request_Type" , "title" : "Request Type" , "type" : "Text" , "options" : [ {"label" : "Help" , "value" : "Help"}, {"label" : "Info" , "value" : "Information"} ] } , { "name":"Base_Location" , "title" : "Base Location" , "type" : "Location" , "options" : [ {"label" : "Base1" , "value" : {"lat" : "1.2" , "long": "3.2"}}, {"label" : "Base2" , "value" : {"lat" : "2.3" , "long" : "1.434" }} ] } ] } ';
let object_input = JSON.parse(input);
let converted_schema = schemaMaker(object_input);
const schema = converted_schema;

const uiSchema = {
    Base_Location: {
        "ui:field": "geo"
    }
}
const onSubmit = ({ formData }, e) => console.log("Data submitted: ", formData);


// render((
//   <Form     schema={schema}
//   fields={fields} 
//   onSubmit={onSubmit}
//   uiSchema={uiSchema}
//   />
// ), document.getElementById("root"));

class myForm extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            input_object: this.props.objectInput
        }
    }

    render() {
        return (
            <Form schema={schema}
                
                onSubmit={onSubmit}
                uiSchema={uiSchema}
            />
        );
    }
}


export default myForm;