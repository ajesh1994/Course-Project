import * as courseActions from "./actions/courseActions";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import { createStore } from "redux";

it("should handle creating courses", () => {
  const store = createStore(rootReducer, initialState);
  const course = {
    title: "Clean Code"
  };

  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});
