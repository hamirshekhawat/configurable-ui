Frontend
It should get a configuration json from BE which instructs the FE's rendering of the form fields. That means if the config JSON changes, the FE will change accordingly. 
The BE config JSON should be able to configure those in FE
the questions for each page
the number of form pages
for each question
validation criteria 
multi selection options
input type change: textinput -> multi selection
The form times out in 30 mins. The timeout threshold should be configurable through the config json as well. Upon timeout, if the form is not submitted, the user will be redirected to page 1 and all storage reset.
Typescript is strongly encouraged but not required.
Initial Form Config
Page 1
 [required] name: string
 [required] gender: select from M, F and Nonbinary 
 [required] age: number
Page 2
 [required] profession: select from “Owner”, “Agent”, “Buyer” and “Seller”. Allow custom input
 [Optional] what services do you need?: custom input
 Submit button: the submission should send the data entered above to the server

Backend
1. endpoints for FE to get the config json
2. endpoints to receive the submission data from FE with data validation. Data persistence is strongly encouraged but not required

Config json ->
- a question = type (text/multi selection), validation criteria (regex for text type, number of selections for multi selection type)
- a form page is an array of questions
- a form is an array of pages and has a time out 

ex:
text_input type :
{
    validation_regex: "",
    value: "",
    error_message: "",
    id
}

multi_select:
{
    options?: <multi_select_option>[],
    validation_selections: number,
    id
}

multi_select_option:
{
    text: "",
    isChecked: false,
    id
}

form_fields: 
{
    label: string,
    type: text_input | multi_select,
    required: bool,
    id: string
}

{
    pages: [
        {
            questions: <form_fields>[]
        }
    ],
    timeout: number in seconds
}


tasks:
FE
1. Define form schema.
2. Create form generator.
    a. Form should save values as user navigates through it.
BE
3. Define APIs to fetch form config json.
4. Define APIs to save form data. ( can save it in json form for now )
    a. We can save form data

FE
5. Connect APIs to UI
6. Create route to see forms
7. Create route to see responses.