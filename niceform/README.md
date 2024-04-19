# NiceForm

Upload a form json and use them to record reponses.

# Creating form using NiceForm interface

To create a form JSON object using the NiceForm interface, we need to use the `Page`, `FormField`, `TextInputField`, and `MultiSelectField` interfaces. Here is a step by step guide on how to create the form:

## TextInputField

This represents a text field in the form. It has two properties:

- **validation_regex**: This is a string that determines the regular expression against which the input value will be validated.
- **value**: This is the default value of the input field.

Example:

```json
{
  "validation_regex": "^\\w+$",
  "value": "Default Value"
}
```

## MultiSelectOption

This represents an option in a multi-select field. It has three properties:

- **text**: This is the label of the option that will be displayed.
- **isChecked**: This is a boolean that indicates whether the option is checked by default.
- **id**: This is the unique identifier for the option.

Example:

```json
{
  "text": "Option 1",
  "isChecked": false,
  "id": "option1"
}
```

## MultiSelectField

This represents a multi-select field. It has two properties:

- **minRequiredSelection**: Minimum number of required selections.
- **options**: Array of `MultiSelectOption` options for the field.

Example:

```json
{
  "minRequiredSelection": 1,
  "options": [
    /* array of MultiSelectOption */
  ]
}
```

## FormField

This represents a field in the form. It has five properties:

- **label**: This is the label for the field.
- **input**: This can be a `TextInputField` or a `MultiSelectField`.
- **required**: This is a boolean indicating whether this field is required.
- **error_message**: This is the error message that will be shown if the field is not filled properly.
- **id**: This is the unique identifier for the field.

Example:

```json
{
  "label": "Question 1",
  "input": /* TextInputField or MultiSelectField */,
  "required": false,
  "error_message": "This field is required.",
  "id": "q1"
}
```

## Page

A page object contains an array of `FormField` objects:

```json
{
  "questions": [
    /* array of FormField */
  ]
}
```

## NiceForm

The `NiceForm` interface is the top-level interface for a form. It contains:

- **pages**: An array of `Page` objects.
- **timeout**: Timer for the form. After the specified time in milliseconds is reached, a user will not be able to make any more changes to the form.

Example:

```json
{
  "pages": [
    /* array of Page */
  ],
  "timeout": 600000
}
```