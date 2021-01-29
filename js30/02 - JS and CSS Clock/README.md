# JSS and CSS Clock

A vanilla JS CSS clock that takes the current time from javascript and updates the clock's hands based on hour, minutes and seconds.

## What we learn

- Working with the Date object
- Movement with CSS transition/transform

## Steps

The goal is to apply a rotate to each hands depending on what time it currently is. To start, add to the `.hand` class:

- `transform-origin` so when we add the rotate it will do so in the x axis and center of the clock.
- `transform` rotate to 90° so the hands start at the 12 o'clock position.
- `transition` so the hands move smoothly when ticking.
- `transition-timing-function` this gives the hands an old-fashioned forwards/backwards movement.

Remember, you can test/edit your styles directly in the browser and then copy to your CSS if you like them.

To add the functionality:

- First, starting with the seconds hand, set your date, get seconds and set the degrees, then add your style to create the movement.
- Continue with the minutes and then the hour hand.

## Resources

[MDN Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
