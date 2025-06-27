export function formatDate(
  date: Date | string,
  format: "mm/dd/yyyy" | "abbreviated" | "withTime"
) {
  if (format === "abbreviated") {
    return new Date(date).toLocaleDateString("en", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } else if (format === "mm/dd/yyyy") {
    return new Date(date).toLocaleDateString();
  } else {
    return new Date(date).toLocaleDateString("en", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}
