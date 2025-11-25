import { Response } from "express";

export class BaseController {
  success(res: Response, data: any, message = "Success", code = 200) {
    return res.status(code).json({
      status: true,
      message,
      data,
    });
  }

  created(res: Response, data: any, message = "Resource created") {
    return res.status(201).json({
      status: false,
      message,
      data,
    });
  }

  error(res: Response, message = "Something went wrong", code = 500) {
    return res.status(code).json({
      status: false,
      message,
    });
  }

  notFound(res: Response, message = "Resource not found") {
    return res.status(404).json({
      status: false,
      message,
    });
  }

  noContent(res: Response) {
    return res.status(204).send();
  }
}
