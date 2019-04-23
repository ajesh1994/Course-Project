import courseReducer from "./courseReducer";
import * as actions from "../actions/courseActions";

it("Should add course when passed CREATE_COURSE_SUCESS", () => {
  const initialState = [{ title: "A" }, { title: "B" }, { title: "C" }];

  const newCourse = {
    title: "D"
  };

  const action = actions.createCourseSuccess(newCourse);

  const newState = courseReducer(initialState, action);

  expect(newState.length).toEqual(4);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
  expect(newState[3].title).toEqual("D");
});
