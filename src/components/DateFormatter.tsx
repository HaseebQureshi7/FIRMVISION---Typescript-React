export function DateFormatter(dateString: any) {
  const date = new Date(dateString);
  const options: any = {
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
