import { Router } from "express";
import { fileController } from "./controller";

export const router = Router();

router.route("/get-form").get(fileController.getFormById);
router.route("/save-form").post(fileController.saveFilledForm);
router.route("/get-all-forms").get(fileController.getAllForms);
router.route("/get-all-filled-forms").get(fileController.getAllFilledFormsForFormId);
router.route("/get-filled-form").get(fileController.getFilledFormById);