import React from "react";
import { render, screen } from "@testing-library/react";

import TaskcommentsEditDialogComponent from "../TaskcommentsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders taskcomments edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TaskcommentsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("taskcomments-edit-dialog-component")).toBeInTheDocument();
});
