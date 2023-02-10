import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import pencil from "@ckeditor/ckeditor5-core/theme/icons/pencil.svg";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

export default class ToolTip extends Plugin {
  static get pluginName() {
    return "Tooltip";
  }
  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add("tooltip", (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: "Tooltip",
        icon: pencil,
        tooltip: true,
      });
      // Callback executed once the image is clicked.
      view.on("execute", () => {
        const inputTooltipText = prompt("ToolTip Text");
        editor.model.change((writer) => {
          const link = writer.createText(inputTooltipText, {
            linkHref: "#bayut-content-tooltip",
          });
          // Insert the image in the current selection location.
          editor.model.insertContent(link, editor.model.document.selection);
        });
      });

      return view;
    });
  }
}
