# CSS variables and update with JS

Using CSS variables we can update styles (`spacing`, `color`, `blur`) directly, anywhere they are referenced with JS for an image. The `type` in the input tags of each style gives you various options.

## What we learn

- Working with CSS variables and how to update them with JS.
- Using the dataset object, `data-`.

## Steps

CSS variables are declared on an element, in this case, on `:root` or html which is our highest level:

- In your `html` file, inside the `<style>` tag, setup and declare your default values for your CSS variables.
- Grab the `img` and add the variables to the CSS properties.
- Add the highlight class as well and its corresponding property.

To add JS functionality:

- Select all three inputs.
- Add handleUpdate function for each input.
- Listen for a change event(s) for each of those inputs.
- Next, get the input values. Consider possible different units (in this case `px`) and the use of the dataset object.

## Resources

[Using CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
