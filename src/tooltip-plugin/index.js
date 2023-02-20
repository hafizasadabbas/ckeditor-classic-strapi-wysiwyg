import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import TooltipView from "@ckeditor/ckeditor5-ui/src/tooltip/tooltipview";
import { getOptimalPosition } from "@ckeditor/ckeditor5-utils/src/dom/position";

export default class MyTooltipPlugin extends Plugin {
  init() {
    const editor = this.editor;

    // Define the tooltip content
    const tooltipContent = "My tooltip content";

    // Create the tooltip view instance
    const tooltip = editor.ui.view.tooltip;
    const tooltipView = new TooltipView(editor.locale);

    // Set the content of the tooltip view
    tooltipView.bind("isEnabled").to(tooltip);
    tooltipView.set({
      text: tooltipContent,
      isVisible: false,
      position: new getOptimalPosition(),
    });

    // Register the tooltip view in the editor UI
    editor.ui.view.add(tooltipView);

    // Add the tooltip logic
    editor.editing.view.document.on("mouseover", (evt, data) => {
      const target = data.target;
      if (target.is("a")) {
        const position = getOptimalPosition.fromRect(
          target.getClientRects()[0]
        );
        tooltip.show(position, tooltipView, {
          // You can customize the position and offset of the tooltip relative to the target element
          position: "top",
          offset: 5,
        });
      }
    });

    editor.editing.view.document.on("mouseout", (evt, data) => {
      const target = data.target;
      if (target.is("a")) {
        tooltip.hide();
      }
    });
  }
}
