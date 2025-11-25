"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    success(res, data, message = "Success", code = 200) {
        return res.status(code).json({
            status: true,
            message,
            data,
        });
    }
    created(res, data, message = "Resource created") {
        return res.status(201).json({
            status: false,
            message,
            data,
        });
    }
    error(res, message = "Something went wrong", code = 500) {
        return res.status(code).json({
            status: false,
            message,
        });
    }
    notFound(res, message = "Resource not found") {
        return res.status(404).json({
            status: false,
            message,
        });
    }
    noContent(res) {
        return res.status(204).send();
    }
}
exports.BaseController = BaseController;
