import { Icontroller } from "@/presentation/protocols";

import { RequestHandler } from "express";

type Adapter = (Controller: Icontroller) => RequestHandler;

export const routerAdapter: Adapter =
  (Controller) => async (request, response) => {
    const Input: Icontroller.Input = {
      params: request.params,
      body: request.body,
    };
    const { statusCode, body } = await Controller.execute(Input);

    const json = [200, 204].includes(statusCode)
      ? body
      : { error: body.message };

    response.status(statusCode).json(json);
  };
