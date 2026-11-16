import React from "react";
import { render, screen } from "@testing-library/react";

import TaskcommentsPage from "../TaskcommentsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders taskcomments page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TaskcommentsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("taskcomments-datatable")).toBeInTheDocument();
    expect(screen.getByRole("taskcomments-add-button")).toBeInTheDocument();
});
