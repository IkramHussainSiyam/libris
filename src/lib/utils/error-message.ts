export function getErrorMessage(error: unknown) {
  let errorMsg: string | unknown = "";

  if (error instanceof Error) {
    errorMsg = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    errorMsg = error.message;
  } else if (typeof error === "string") {
    errorMsg = error;
  } else {
    errorMsg = "Something went wrong!";
  }

  return errorMsg;
}
