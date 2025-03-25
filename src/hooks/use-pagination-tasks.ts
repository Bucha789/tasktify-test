import { useMemo } from "react";
import { Task } from "../store/slices/task-slice";

export const usePaginationTasks = ( currentPage = 1, paginationLength = 10, tasks: Task[] ) => {
  const groupedTasks = useMemo(() => {
    const tempObj:Record<number, typeof tasks> = {};
    let numberPage = 0;
    tasks.forEach(item => {
      if (tempObj[numberPage] && tempObj[numberPage].length < paginationLength) {
        tempObj[numberPage].push(item)
      } else {
        tempObj[numberPage + 1] = [item]
        numberPage++;
      }
    })
    return tempObj;
  }, [paginationLength, tasks])
  return {
    allTasks: groupedTasks,
    currentTasks: groupedTasks[currentPage]
  }
}