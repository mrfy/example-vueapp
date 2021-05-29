import { onBeforeUnmount, onMounted, reactive, ref } from "vue";

// type ReturnUseResizeObserver = {};

interface ResizeState {
  dimensions: DOMRectReadOnly;
}

export const useResizeObserver = () => {
  const resizeRef = ref();
  const resizeState = reactive({
    dimensions: {},
  }) as ResizeState;

  const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    entries.forEach((entry: ResizeObserverEntry) => {
      console.log("width", entry.contentRect.width);
      console.log("height", entry.contentRect.height);
      resizeState.dimensions = entry.contentRect;
    });
  });

  onMounted(() => {
    resizeState.dimensions = resizeRef.value.getBoundingClientRect();
    observer.observe(resizeRef.value);
  });

  onBeforeUnmount(() => {
    observer.unobserve(resizeRef.value);
  });

  return { resizeState, resizeRef };
};

export default useResizeObserver;
