# Drum Kit

A basic vanilla JS project that when you click a specific key it plays a sound and a short animation where the key scales adding a yellow border. You can do this by adding a css class of 'playing'. In the HTML we use the `data-` attribute like `data-key` that will match with the audio source file to attach to the corresponding key.

## What we learn

- Key events
- Playing audio
- Listening for the transition end event
- And if dealing with animations, listening for the animation end event (which works the same way).

## Steps

We start with our two main functionalities: play audio and show animation

- To start we focus on listening on a key up event: add event listener to listen on the window
  To play the audio:
- Find/select audio element with the data-key attribute (that is equal to the keycode) - note that we are not using a class instead an attribute selector.
  To show animation:
- Select the key class and then add the css class 'playing' to it. You will have to also remove it after playing each key using a transition.
  NOTE - You cannot use an arrow function and still use the `this` keyword inside it as such, per removeTransition().

## Resources

[Keycode site](http://keycode.info/)

In order to avoid the `get favicon error` you can add a favicon [for more](https://stackoverflow.com/questions/49724821/get-favicon-ico-error-but-can-not-find-it-in-the-code)
