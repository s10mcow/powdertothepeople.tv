---
layout: post
title: Angular Form Validation - Part 1 - ngModel Controller
---

Form validation the "Angular way" is an extremely powerful tool. We have the ability to pass a simple regular expression to the ng-pattern attribute of the input field for simple input
validation, or we can make our own custom validation functions utilizing the NgModelController. 

So you might be thinking to yourself yeah, but I can already use a pattern for validation in html5. True, indeed you can, but when you couple all the bits and pieces 
together and let Angular do its thing you have a complete tool set at your disposal.

In this post I wanna show how we can use the NgModelController in a custom validation directive to validate any piece of logic.

If you take a look at the Angular docs on the ngModel directive you see this:

###ngModel is responsible for:

* Binding the view into the model, which other directives such as input, textarea or select require.
* Providing validation behavior (i.e. required, number, email, url).
* Keeping the state of the control (valid/invalid, dirty/pristine, touched/untouched, validation errors).
* Setting related css classes on the element (ng-valid, ng-invalid, ng-dirty, ng-pristine, ng-touched, ng-untouched) including animations.
* Registering the control with its parent form.

You are no doubt already using this little piece of logic in your code and ng-model is one of the first pieces we learn when starting out with Angular - enter the ubiquitous hello world example.
 
```html

    <input type="text" ng-model="sometext" />
 
    <h1>Hello {{ sometext }}</h1>
    
```

That's right. That's all there is to the ng-model directive, it's easy to forget that every piece of code you use in the DOM from Angular is, yes, a directive.

However we aren't interested in the ng-model directive we wanna get down and dirty with the NgModelController which provides the API for the ngModel directive.

Again, from the documentation.

>The NgModelController contains services for data-binding, validation, CSS updates, and value formatting and parsing. It purposefully does not contain any logic which 
>deals with DOM rendering or listening to DOM events. Such DOM related logic should be provided by other directives which make use of NgModelController for data-binding.

So, in order to use it, we must do as the docs say. Lets create our own directive which makes use of the NgModelController.

```javascript

angular.module('PTTP.Directives.Validation', [])

    .directive('pttpValidator', function() {
    
        return {        
            restrict: 'A',
            require: '?ngModel',
            link: linker,
            scope: {
                validateFunction: '&'
            }
        }
    
    });
    
```

That's the basis of the directive; an attribute that has an isolate scope passing in a validateFunction - simple enough. 

What about the linker? Well that's where the *real* goodies live.  

```javascript

var linker = function(scope, element, attr, ngModelCtrl) {

        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    ngModel Controller Utilization
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

        ngModelCtrl.$parsers.push(function (value) {
            //Fire our validator function returning a boolean
            var result = scope.validatorFunction({ 'value': value });
        
            //Check the result to make sure it returned boolean and not undefined or null
            if (result || result === false) {
                ngModelCtrl.$setValidity(attrs.validatorName, result);
                return result ? value : undefined;  //Pass the value down the pipeline - here*

            }
            //*Or here
            return value;
        });

};

```

What the heck is going on here? So again if we decompose the logic line by line.

To begin with we are using the *$parsers* property to push a function with a value parameter. The $parsers pipeline simply is an array of functions that subsequently get called passing their 
return value to the next function. You can think of it like this.

```javascript

ngModelCtrl.$parsers = [func1, func2, func3]; //Initial $parsers setup

ngModelCtrl.$parsers.push(func4); //Push a new function

console.log(ngModelCtrl.$parsers); //[func1, func2, func3, func4];

```

So every time the ngModel value is changed this collection of functions is called each passing their return value to the next. Pretty straight forward.

From the docs...

>For validation, the parsers should update the validity state using $setValidity(), and return undefined for invalid values.

If we examine deeper into the passed in function we can see first off we are assigning a boolean value to the result variable. So simple put our validatorFunction that we pass in, returns either true or false. 
Next we check if the *result* is defined - either true or false. Then based on the value of the *result* we call $setValidity passing in the validatorName and the boolean *result.* Finally we
return a value passing it along to the next function in the pipeline.

Here is how we consume the directive. 

##HTML

```html

<form novalidate ng-controller="FormController"> 

    <!--Email-->
    
    <label for="email">
        Email
    </label>
    
    <input
        id="email"
        name="email"
        type="email"
        required
        />
        
        
        
    <!--Email Confirmation -->
    
    <label for="email-confirmation">
        Email Confirmation
    </label>
    
    <input
        pttp-validator
        id="email-confirmation"
        type="email"
        name="email-confirmation"
        validator-name="emailMatch"
        validator-function="checkEmailMatch(value)"
        required
        />
    
</form>
    
```

##Controller

```javascript

angular.module('PTTP.Controllers.Form',[])

    .controller('FormController', function($scope) {
    
        $scope.formElements = {
            email: '',
            emailConfirmation: ''
        };
        
        $scope.checkEmailMatch = function(value) {
            return value === $scope.formElements.email;  
        };
    };
    
```

In the html we have created a simple form with a novalidate attribute so as to stop the browser from validating the form itself, we want Angular to do this for us. Next we have set up two
input fields that are both expecting emails types the second of which has our pttp-validator directive. This element has three attribute worth mentioning: name, validator-name, validator-function.
 
First - name - this is an important attribute as Angular uses it to reference the input name. I will explain the use of it later, but for now just make sure it exists.

```html

    <input name="email" />

```

Second - validator name - this is the name of the class Angular will append to the input when the input is either valid or invalid

```html

    <input class="ng-invalid-email-match" />
    
    <!-- vs -->
    
    <input class="ng-valid-email-match" />


```

Third - validator function - this lives outside the scope of this directive which is important so the directive remains generic and reusable. We have a FormController wrapping the form, and
through it we have access to it's scoped methods and variables. In this case the *checkEmailMatch* method. 

```javascript

    $scope.checkEmailMatch = function(value) {
        return value === $scope.formElements.email;  
    };
    
```

That's pretty much all there is to it! This is the basis of the use of the NgModelController for form validation. Now go and validate the shit outta yer forms!




