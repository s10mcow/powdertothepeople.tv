---
layout: post
title: Angular Component Template Unit Testing.
---


https://stackoverflow.com/questions/41624014/how-to-unit-test-an-angular-1-5-component-template

```  

	it('should move to the previous period', inject(($compile) => {
       scope.test = {};
   
       element = angular.element('<period-picker date="test.date" period="month"></period-picker>');
       element = $compile(element)(scope);
   
       $rootScope.$digest();
   
       const buttons = element.find('button');
   
       angular.element(buttons[0]).triggerHandler('click');
   
       const isolatedScope = element.isolateScope();
   
       // last of February
       expect(isolatedScope.$ctrl.date).toEqual(moment('2015-02-28').toDate());
     }));
```