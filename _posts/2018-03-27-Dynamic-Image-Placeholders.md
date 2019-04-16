---
layout: post
title: Dynamic Image/Video Placeholders
---

There are quite some cool ways out there to do dynamic image plaeholders. That basically being a way to reserve some space on the layout for an image that will be downloaded and shown. For example if you use a img tag with 100% width it will eventually snap into position and look good.

However to start with it will seem like the grid is being filled with nothing and then something - which is not the nicest UI.

Components to the rescue! 

But first like I mentioned above some cool solutions out there. 

My favorite is the 'blur up' technique that [Medium.com](medium.com) uses or that was at least the first place I saw it in [this](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/) article. 

[Tumblr](tumblr.com) as has a similar technique but much less backend magic.

The problem with the blur-up technique is that we also need to process a new tiny image that we could inline in the server response when we get the said image object. So yeah more "work" to achive the results, but definitiely in my opinion the nicest end result.

What we are gonna do is make a component that reserves some space has a background color of gray and a nice little icon centered.

Most of the magic takes place in the css so this component could very easily be made into a React or Angular component - since its just html/css and a few dynamic values.

I made this originally for an angular app so this will be an AngularJS component.

Onto the goodies.

```
 <article class="pttp-image-placeholder" title="{ {$ctrl.title} }">
 
    <a 
        ng-href="{ {$ctrl.url} }" 
        class="pttp-image-placeholder__image" 
        ng-style="{'background-image':'url(' + ($ctrl.image) + ')'}">
    </a>
  
    <div class="pttp-image-placeholder__background">
        <fa name="camera" size="5"></fa>
    </div>

</article>
```

So as you can see the template is pretty simple. We have component wrapper and inside an anchor tag which has a background image or the said image we are trying to display and the placeholder as well.

The SCSS magic that allows this to happen...

```

.pttp-image-placeholder {
  padding-bottom: 150%;
  position: relative;

  &__image {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__background {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background-size: cover;
    background-color: #999;
    z-index: 1;

    .fa-camera {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -40px;
      margin-left: -40px;
      color: white;
    }
  }
}
```

The "magic" here is the padding bottom of 150%. This is a trick I learned when dealing with 16:9 ratio video elements. So why not use it for 3:2 ratio image elements. I chose 3:2 as thats the standard ratio for full frame cameras which most if not all pro photographers use. 

If other ratios are needed a simple ratio class could be added based on the needs. 

So if your handy little math eyes caught the 150 == 3/2 * 100. You see 150 is just the upped ratio percentage based on a portrait size image - the 16:9 video is similar but in landscape mode so 9/16 == .5625 * 100 -> 56.25%.

Here is an [article](https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php)

We used very similar values for the dynamic image and the placeholder as the end outcome is the same just a different medium and ratio.

The css is pretty straight forward once we remove the values sizing our placeholder and image. The placeholder has a grey background with an font-awesome icon centered. The image itself has a 1 step higher z-index so when its loaded it will snap into place above the grey background. It has a background size of cover which will help to mitigate any small unmatched ratios between our perfect 3:2 and a slightly less or greater ratio image.

Pretty simple.

The final ng component looks like this.

```

angular.module('PTTP')
  .component('pttpImagePlaceholder', {
    template: require('./pttp-image-placeholder.html'),
    bindings: {
      title: '<',
      image: '<',
      url: '@'
    }
  });
```

A React component could look something like this...

```
const PTTPImagePlaceholder = ({title, image, url}) => {
     const backgroundImage = {backgroundImage: 'url(${image})'} //' are actually backticks 
     return (
        <article class="pttp-image-placeholder" title={title}>
    
            <a 
                href={url}
                class="pttp-image-placeholder__image" 
                style={backgroundImage}>
            </a>
        
            <div class="pttp-image-placeholder__background">
                <fa name="camera" size="5"></fa>
            </div>

        </article>
    );
};
```

Fun Stuff!
