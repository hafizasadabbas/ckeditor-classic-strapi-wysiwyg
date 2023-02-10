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

      view.on("execute", () => {
        editor.execute("tooltip");
      });

      return view;
    });

    editor.addCommand("tooltip", new DialogCommand("tooltipDialog"));

    editor.dialog.add("tooltipDialog", {
      title: "Tooltip Dialog",
      minWidth: 400,
      minHeight: 200,
      elements: [
        {
          type: "text",
          id: "text",
          label: "Text",
          validate: validateNotEmpty("Text field cannot be empty."),
        },
        {
          type: "text",
          id: "tooltipText",
          label: "Tooltip Text",
          validate: validateNotEmpty("Tooltip text field cannot be empty."),
        },
      ],
      onOk: (dialog) => {
        const text = dialog.getValueOf("text");
        const tooltipText = dialog.getValueOf("tooltipText");
        editor.model.change((writer) => {
          const tooltip = writer.createText(text, {
            tooltip: tooltipText,
          });
          editor.model.insertContent(tooltip, editor.model.document.selection);
        });
      },
    });
  }
}
