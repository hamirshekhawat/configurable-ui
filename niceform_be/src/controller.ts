import { fileService } from "./service";
import { GetFormResponseBody, GetFormRequestQuery } from "./types";
import type { Request, Response } from "express";

const getFormById = async (
  req: Request<{}, GetFormResponseBody, {}, GetFormRequestQuery>,
  res: Response
) => {
  try {
    if (!req.query.id) throw 400;
    const formJson = await fileService.getFormById(req.query.id);
    if (!formJson) throw 404;
    const formConfig: GetFormResponseBody = {
      id: req.query.id,
      formJson,
    };
    res.send(formConfig);
  } catch (error) {
    if ([404, 400].includes(error)) {
      res.sendStatus(error);
    }
  }
};

const getAllForms = async (req: Request, res: Response) => {
  try {
    const allFormIds = fileService.getAllFormId();
    res.send(allFormIds);
  } catch (error) {
    if ([404, 400].includes(error)) {
      res.sendStatus(error);
    }
  }
};

const saveFilledForm = async (
  req: Request<{}, GetFormResponseBody, {}, GetFormRequestQuery>,
  res: Response
) => {
  try {
    if (!req.query.id || !req.body) throw 400;
    const result = fileService.saveFilledForm(req.query.id, req.body);
    res.send(result);
  } catch (error) {
    if ([404, 400].includes(error)) {
      res.sendStatus(error);
    }
  }
};

const getAllFilledFormsForFormId = async (
  req: Request<{}, {}, {}, GetFormRequestQuery>,
  res: Response
) => {
  try {
    if (!req.query.id) throw 400;
    const allFormIds = fileService.getAllFilledFormsById(req.query.id);
    if (allFormIds.length > 0) {
      res.send(allFormIds);
    } else {
      throw 404;
    }
  } catch (error) {
    if ([404, 400].includes(error)) {
      res.sendStatus(error);
    }
  }
};

const getFilledFormById = async (
  req: Request<{}, GetFormResponseBody, {}, GetFormRequestQuery>,
  res: Response
) => {
  try {
    if (!req.query.id) throw 400;
    const formJson = await fileService.getFilledFormById(req.query.id);
    if (!formJson) throw 404;
    const formConfig: GetFormResponseBody = {
      id: req.query.id,
      formJson,
    };
    res.send(formConfig);
  } catch (error) {
    if ([404, 400].includes(error)) {
      res.sendStatus(error);
    }
  }
};

export const fileController = {
  getFormById,
  saveFilledForm,
  getAllForms,
  getAllFilledFormsForFormId,
  getFilledFormById,
};
