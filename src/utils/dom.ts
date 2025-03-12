import { DragEvent } from "react";
/**
 * Get all elements that match the selector
 * @param selector - The selector to match
 * @returns An array of elements that match the selector
 */
export const getElements = <T extends HTMLElement>(selector: string) => {
  return Array.from(document.querySelectorAll(selector)) as T[]
}

export const getNearestElement = <T extends DragEvent>(element: T, elements: HTMLElement[]) => {
  const DISTANCE_OFFSET = 50;
  const el = elements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();

      const offset = element.clientY - (box.top + DISTANCE_OFFSET);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
      element: elements[elements.length - 1],
    }
  );
  return el;
}