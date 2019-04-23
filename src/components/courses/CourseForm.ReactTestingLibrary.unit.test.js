import React from "react";
import CourseForm from "./CourseForm";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("Should render Add course header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
});

it("labels save buttons as Save when not saving", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it("labels save buttons as Saving when saving", () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText("Saving...");
});
