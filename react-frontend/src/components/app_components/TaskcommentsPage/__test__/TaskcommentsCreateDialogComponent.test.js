import React from "react";
import { render, screen } from "@testing-library/react";

import TaskcommentsCreateDialogComponent from "../TaskcommentsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders taskcomments create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TaskcommentsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("taskcomments-create-dialog-component")).toBeInTheDocument();
});
