import React from "react";
import { render, screen } from "@testing-library/react";

import TaskattachmentsPage from "../TaskattachmentsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders taskattachments page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TaskattachmentsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("taskattachments-datatable")).toBeInTheDocument();
    expect(screen.getByRole("taskattachments-add-button")).toBeInTheDocument();
});
