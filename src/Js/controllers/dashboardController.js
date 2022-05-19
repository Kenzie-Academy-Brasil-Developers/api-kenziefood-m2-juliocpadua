import { UserService } from "../services/UserService.js";
import { ShowHandler } from "../handlers/ShowHandler.js";
import { FormHandler } from "../handlers/FormHandler.js";
import { AuthHandler } from "../handlers/AuthHandler.js";
import { DashboardHandler } from "../handlers/DashBoardHandler.js";

const verify = await AuthHandler.userVerify();

ShowHandler.headerMain(verify);

const registerProduct = document.getElementById("optionAddProduct");
registerProduct.addEventListener("click", () => {
  DashboardHandler.addClassList("modal__product");
});

const closeModalButton = document.getElementById("fechar_modal");
closeModalButton.addEventListener("click", () => {
  DashboardHandler.removeClassList("modal__product");
});

const openModalEdit = document.getElementById("edit");
openModalEdit.addEventListener("click", () => {
  DashboardHandler.addClassList("modal__edit--product");
});

const openRemoveProduct = document.getElementById("fechar_modal--edit");
openRemoveProduct.addEventListener("click", () => {
  DashboardHandler.removeClassList("modal__edit--product");
});

const openModalRemove = document.getElementById("remove");
openModalRemove.addEventListener("click", () => {
  DashboardHandler.addClassList("modal__remove--product");
});

const closeModalRemove = document.getElementById("fechar_modal--remove");
closeModalRemove.addEventListener("click", () => {
  DashboardHandler.removeClassList("modal__remove--product");
});
