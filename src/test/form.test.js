import React from "react";
import MaritalStatusForm from "../components/MaritalStatusForm";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import "mutationobserver-shim";
import CreateStore from "../store";

global.MutationObserver = window.MutationObserver;
const store = CreateStore();

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

describe("with invalid email", () => {
  it("renders the email validation error", async () => {
    const { getByTestId, container } = render(
      <ReduxProvider reduxStore={store}>
        <MaritalStatusForm />
      </ReduxProvider>
    );

    await act(async () => {
      const emailInput = getByTestId("description");
      fireEvent.change(emailInput, { target: { value: "asdasd" } });
    });

    expect(container.innerHTML).toMatch("Correo invalido");
  });
});

// describe.only("MaritalStatusForm", () => {
//     test("should watch input correctly", () => {
//       const { getByTestId } = render(<ReduxProvider reduxStore={store}><MaritalStatusForm /></ReduxProvider>);

//       fireEvent.change(getByTestId("description"), {
//         target: {
//           value: "Masculino"
//         }
//       });
//     });

//   test("should display correct error message", () => {
//     const { getByTestId, findByText, get } = render(<ReduxProvider reduxStore={store}><MaritalStatusForm /></ReduxProvider>);

//     fireEvent.click(getByTestId("submit"));

//     findByText("Required");
//   });

// });
