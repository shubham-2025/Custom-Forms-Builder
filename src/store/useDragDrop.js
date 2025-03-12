import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

export const useDragDrop = (index, moveField) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "FIELD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "FIELD",
    hover: (item) => {
      if (item.index !== index) {
        moveField(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return { ref, isDragging };
};
