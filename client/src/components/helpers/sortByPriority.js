export default function sortyByPriority(tasks) {
  return tasks.sort((a, b) => {
    const taskOne = a.taskPriority;
    const taskTwo = b.taskPriority;

    // Sort by Task Priority
    if (
      (taskOne === "High" && taskTwo === "High") ||
      (taskOne === "Medium" && taskTwo === "Medium") ||
      (taskOne === "Low" && taskTwo === "Low")
    )
      return 0;

    if (taskOne === "High" && taskTwo === "Medium") return -1;
    if (taskOne === "High" && taskTwo === "Low") return -1;
    if (taskOne === "Medium" && taskTwo === "High") return 1;
    if (taskOne === "Medium" && taskTwo === "Low") return -1;
    if (taskOne === "Low" && taskTwo === "High") return 1;
    if (taskOne === "Low" && taskTwo === "Medium") return 1;

    return 0;
  });
}
