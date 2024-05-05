import { ToastProps } from "./Toast";

interface ToastState {
  toasts: ToastProps[];
}

interface AddToastAction {
  type: "ADD_TOAST";
  payload: ToastProps;
}

interface DeleteToastAction {
  type: "DELETE_TOAST";
  payload: number;
}

type ToastAction = AddToastAction | DeleteToastAction;

export const toastReducer = (
  state: ToastState,
  action: ToastAction
): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case "DELETE_TOAST":
      const updatedToasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
      return {
        ...state,
        toasts: updatedToasts,
      };
    default:
      throw new Error(`Unhandled action type: ${(action as any).type}`);
  }
};
