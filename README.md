# zigzag-test
 Test for ZigZag

Huge problem fixed. Jack Russell Terrier added.

Underscores for private

## Configuration

Scripts in package.json to run both FE & BE

added tailwind

responsive

### Restructuring

components
services
interfaces
state

## Back-end

Explain the two approaches in the controller

Controller can have one query configured for all breeds as well as the breeds by the name provided

http://localhost:3000/api/breed?name=labr

http://localhost:3000/api/breed/details?name=shep

## Front-end

### NgRx

Actions

Intro to ActionTypes for cleaner structure

```typescript
export enum ActionTypes {
  GET_BREED_LIST = '[Breed] Get Breed List',
  GET_BREED_LIST_SUCCESS = '[Breed] Get Breed List Success',
  GET_BREED_LIST_FAILURE = '[Breed] Get Breed List Failure',
}
```

added selectors
