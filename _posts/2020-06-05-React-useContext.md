---
layout: post
title: Prop Drilling? React.useContext FTW!
---

Every now and again you find yourself in a situation using dumb components - aka u pass them their source of truth through props - and you realize there is this deeply nested child component.

So how to get the "goods" to the child? Well you could start passing props from the parent all the way down, but frankly its sucks, and its fugly. There must be a better way.

To begin with we could just store our goods on the global redux state and simply access it through there using the `useSelector` hook, however it's also not very elegant as ideally the prop should be consumed through the parent component and updated throught the API. You could still make the argument that Redux would work, and I would agree and we would go on with our day. However then we wouldn't get to check out the saaaaxy `useContext` hook.

Enter `React.useContext` and `React.createContext` it took me a little to track down a good example for my use case so maybe this will help other as well as get my point across that its pretty cool.

To start off with we wanna make a context in our case the parent component has a useState we wanna update with a child components data oh and the children are dynamically created "items."

```javascript
const ExampleContext = React.createContext({
    data: {},
    setData: (any) => {},
});
```

Simple. We have a context object with a setter function and a data object - eerily similar to this.

```javascript
const [data, setData] = React.useState({});
```

So our hook is setup for use by our children so we need to set up our Provider wrapper, which basically says anything inside this thing can use the context.

```javascript
export default ({ steps = [] }) => {
    const dispatch = useDispatch();
    const [data, setData] = React.useState({});
    const value = { data, setData };
    const submit = () => dispatch(actions.submit.trigger(data));

    return (
        <ExampleContext.Provider value={value}>
            <Wrapper>
                {steps?.map((step, key) => (
                    <Step step={step} key={key} />
                ))}
                <Button onClick={submit} theme="contained">
                    Submit!
                </Button>
            </Wrapper>
        </IntakeContext.Provider>
    );
};
```

Ok so now our Step component can update the "state" through the context we have set up. Onto the Step.

```javascript
const Step = ({ step }) => {
    const [text, setText] = React.useState("");
    const { data, setData } = React.useContext(IntakeContext);
    const handleChange = (text) => {
        setText(text);
        const textObject = {};
        textObject[step.name] = { value: text };
        setData({ ...data, ...textObject });
    };
    return (
        <TextField
            label={step.name}
            value={text}
            onChange={(e) => handleChange(e.target.value)}
        />
    );
};
```

So in short we grab the context to use through the `React.useContext` and then we are just spreading the newly create textObject and the data so we end up with a clean object that has the step name as the key and the value is another object with text inside it - like so.

```javascript
    {stepName1: {value: 'some text'}, stepName2: {value: 'some other text'}}
```

So it automatically updates the correct step name and we have a nice object to submit. If you were to place a `useEffect` in the parent you would see the updates live.

```javascript
export default ({ steps = [] }) => {
    const dispatch = useDispatch();
    const [data, setData] = React.useState({});
    const value = { data, setData };
    const submit = () => dispatch(actions.submit.trigger(data));

    //See the Live Updates!
    React.useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <ExampleContext.Provider value={value}>
            <Wrapper>
                {steps?.map((step, key) => (
                    <Step step={step} key={key} />
                ))}
                <Button onClick={submit} theme="contained">
                    Submit!
                </Button>
            </Wrapper>
        </IntakeContext.Provider>
    );
};
```

That pretty much wraps it up, i think context is a really nice and clean way for deep nested items to interact cleanly with a parent, in this instance it was super deeply nested but the proof of concept is there imagine a couple wrapper components inside step to get a better deeply nested feeling.
